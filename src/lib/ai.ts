import { GoogleGenerativeAI, type GoogleGenerativeAIError } from "@google/generative-ai";
import type { Document } from "@langchain/core/documents";

// Token bucket for rate limiting
class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  private readonly maxTokens: number;
  private readonly refillRate: number;

  constructor(maxTokens: number, refillRatePerMinute: number) {
    this.maxTokens = maxTokens;
    this.refillRate = refillRatePerMinute / (60 * 1000);
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  private refill() {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const newTokens = timePassed * this.refillRate;
    this.tokens = Math.min(this.maxTokens, this.tokens + newTokens);
    this.lastRefill = now;
  }

  async getToken(): Promise<void> {
    this.refill();
    if (this.tokens < 1) {
      const timeToWait = (1 - this.tokens) / this.refillRate;
      await new Promise(resolve => setTimeout(resolve, timeToWait));
      this.refill();
    }
    this.tokens -= 1;
  }
}

// Separate rate limiters for different models since they might have different quotas
const generativeRateLimiter = new TokenBucket(50, 50); // 50 requests per minute for gemini model
const embeddingRateLimiter = new TokenBucket(100, 100); // 100 requests per minute for embeddings

interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 5,
  initialDelay: 8000,
  maxDelay: 80000,
  backoffFactor: 2,
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const shouldRetry = (error: unknown): boolean => {
  if (error instanceof Error) {
    const genAIError = error as GoogleGenerativeAIError;
    if ('status' in genAIError && typeof genAIError.status === 'number') {
      if (genAIError.status === 429) return true;
      if (genAIError.status >= 500 && genAIError.status < 600) return true;
    }
  }
  return false;
};

async function withRetry<T>(
  operation: () => Promise<T>,
  rateLimiter: TokenBucket,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> {
  let lastError: Error | null = null;
  let delay = config.initialDelay;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      await rateLimiter.getToken();
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (!shouldRetry(error) || attempt === config.maxRetries) {
        throw error;
      }

      console.warn(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
      await sleep(delay);
      delay = Math.min(delay * config.backoffFactor, config.maxDelay);
    }
  }

  throw lastError;
}

export const geminiSummary = async (diff: string, commitMessage: string) => {
  try {
    const operation = async () => {
      const systemPrompt = await model.generateContent([
        `As an expert programmer analyzing a git diff, please provide a clear and concise summary of the changes. First, interpret the commit message and then understand git diff format:

        For every file, metadata includes:
        diff --git a/lib/index.js b/lib/index.js
        index aadf661..bfef603 100644
        --- a/lib/index.js
        +++ b/lib/index.js

        Key elements:
        - '+' prefix: Line added
        - '-' prefix: Line deleted  
        - Lines without prefixes provide context
        - File paths show modified files
        - Index lines show commit hashes
        - Pay attention to function signatures, variable declarations and logic changes

        Summary format:
        - Answer in no more than 5 bullet points in markdown syntax
        - Describe functionality changes with technical specificity
        - Start with most impactful changes
        - Omit obvious or routine changes 
        - Highlight function modifications with names
        - Include relevant variable and constant updates
        - Group related changes across files
        - Keep descriptions short but specific
        - Use backticks only for inline code references
        - Do not use code blocks or fenced code sections
        - No need to list files with trivial changes
        - Note API, interface or contract changes
        - Omit trivial formatting or comment changes
        - Do not begin with 'Here is a summary of changes' or similar phrases

        Example summary points:
        - Add user authentication to login flow
        - Update API rate limits from 100 to 1000 calls/min
        - Added \`Trending Feed\` feature
        - Defines **metadata for SEO**: including title, description and social sharing information

        Specifically, pay attention to the lines prefixed with '+' (additions) and '-' (deletions) to understand the changes.`,

        `Please summarize the following commit:${commitMessage} with its diff file: ${diff}`,
      ]);

      return systemPrompt.response.text();
    };

    return await withRetry(operation, generativeRateLimiter);
  } catch (error) {
    console.error("Error in geminiSummary:", error);
    return "Error summarizing commit";
  }
};

export async function summarizedCode(doc: Document) {
  try {
    const code = doc.pageContent.slice(0, 10000);

    const operation = async () => {
      const summary = await model.generateContent([
        `You are an intelligent senior software engineer who specialises in onboarding junior software engineers onto projects`,
        `You are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.source} file. 
          Here is the code:
          ---
          ${code}
          ---
          Give a summary no more than 100 words of the code above`,
      ]);
      return summary.response.text();
    };

    return await withRetry(operation, generativeRateLimiter);
  } catch (error) {
    console.error("Error in summarizedCode:", error);
    return "";
  }
}

export async function generateEmbeddings(summary: string) {
  try {
    const embeddingModel = genAI.getGenerativeModel({
      model: "text-embedding-004",
    });

    const operation = async () => {
      const result = await embeddingModel.embedContent(summary);
      return result.embedding.values;
    };

    return await withRetry(operation, embeddingRateLimiter);
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}
