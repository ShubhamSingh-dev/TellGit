"use server";

import { generateEmbeddings } from "@/lib/ai";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { headers } from "next/headers";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// Interface to track token usage and cost
interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCost: number;
}

export async function askQuestion(question: string, projectId: string) {
  const stream = createStreamableValue();

  const queryVector = await generateEmbeddings(question);
  const vectorQuery = `[${queryVector.join(",")}]`;

  // Similarity Score Calculation
  const result = await db.$queryRaw`
       SELECT "fileName", "sourceCode", "summary",
       1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
       FROM "SourceCodeEmbedding"
       WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > .5
       AND "projectId" = ${projectId}
       ORDER BY similarity DESC
       LIMIT 10
     `;

  let context = "";

  interface FileDoc {
    fileName: string;
    sourceCode: string;
    summary: string;
  }
  const fileResults = result as FileDoc[];
  for (const doc of fileResults) {
    context += `source: ${doc.fileName}\ncode content: ${doc.sourceCode}\n summary of file: ${doc.summary}\n\n`;
  }

  // Start streaming the output immediately
  const { textStream, usage } = await streamText({
    model: google("gemini-2.0-flash"),
    prompt: `
        You are a ai code assistant who answers questions about the codebase. Your target audience is a technical intern who understands the context of what an
        AI assistant is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind and inspiring and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain and is able to accurately answer nearly any question about any topic in the current context.
        If the question is asking about code or a specific file, AI will provide the detailed answer, giving step by step instructions when needed.
        
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        
        START QUESTION
        ${question}
        END OF QUESTION
        
        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
        If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer based on the context."
        AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
        AI assistant will not invent anything that is not drawn directly from the context.
        Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering, make sure there is no ambiguity in the response. 
      `,
  });

  // Promise for token usage calculation
  const tokenUsagePromise = new Promise<TokenUsage>(async (resolve) => {
    try {
      // Stream the output as it comes in
      for await (const delta of textStream) {
        stream.update(delta);
      }
      stream.done();

      // Calculate token usage after streaming is complete
      const usageData = await usage;
      const calculatedTokenUsage: TokenUsage = {
        inputTokens: usageData.promptTokens,
        outputTokens: usageData.completionTokens,
        totalTokens: usageData.totalTokens,
        estimatedCost: Math.max(10, Math.ceil(usageData.totalTokens / 1000) * 4.5),
      };

      // Deduct user credits
      const session = await auth.api.getSession({ headers: await headers() });
      if (session?.user.id) {
        await db.user.update({
          where: { id: session?.user.id },
          data: {
            credits: {
              decrement: calculatedTokenUsage.estimatedCost
            }
          },
        });
      }

      resolve(calculatedTokenUsage);
    } catch (error) {
      console.error('Error processing token usage:', error);
      resolve({
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        estimatedCost: 10 // Default minimum cost
      });
    }
  });

  return {
    output: stream.value,
    filesReferences: result,
    tokenUsage: tokenUsagePromise,
  };
}
