import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding, summariseCode } from "./gemini";
import { db } from "~/server/db";
import { Octokit } from "octokit";

const getFileCount: any = async (path: string, octokit: Octokit, githubOwner: string, githubRepo: string, acc: number = 0) => {
  const { data } = await octokit.rest.repos.getContent({
    owner: githubOwner,
    repo: githubRepo,
    path,
  });

  if (!Array.isArray(data) && (data as any).type === "file") {
    return acc + 1;
  }

  if (Array.isArray(data)) {
    let fileCount = 0;
    const directories: string[] = [];

    for (const item of data) {
      if (item.type === "dir") {
        directories.push(item.path);
      } else {
        fileCount++;
      }
    }

    if (directories.length > 0) {
      const directoryCount = await Promise.all(
        directories.map((dir) => getFileCount(dir, octokit, githubOwner, githubRepo))
      );
      fileCount += directoryCount.reduce((acc: number, count: number) => acc + count, 0);
    }
    return acc + fileCount;
  }
  return acc;
};

export const checkCredits = async (githubUrl:string,githubToken?:string) => {
  const octokit = new Octokit({auth: githubToken});
  const githubOwner = githubUrl.split("/")[3];
  const githubRepo = githubUrl.split("/")[4];
  
  if(!githubOwner || !githubRepo) return 0;

  const fileCount = await getFileCount("",octokit,githubOwner,githubRepo,0);
  return fileCount;
}

export const loadGithubRepo = async (
  githubUrl: string,
  githubToken?: string,
) => {
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubToken || "",
    branch: "main",
    //need to correct the ignoreFiles,need to add more files so there wouldnt be waste of tokens
    ignoreFiles: [
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "bun.lock",
    ],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 5,
  });

  const docs = await loader.load();
  return docs;
};

export const indexGithubRepo = async (
  projectId: string,
  githubUrl: string,
  githubToken?: string,
) => {
  const docs = await loadGithubRepo(githubUrl, githubToken);
  const allEmbeddings = await generateEmbeddings(docs);
  const results = await Promise.allSettled(
    allEmbeddings.map(async (embedding, index) => {
      console.log(`processing ${index + 1} of ${allEmbeddings.length}`);
      if (!embedding) {
        console.log(`Skipping index ${index} - no embedding data`);
        return;
      }

      try {
        const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
          data: {
            summary: embedding.summary!,
            sourceCode: embedding.sourceCode,
            fileName: embedding.fileName,
            projectId,
          },
        });
        
        console.log(`Created record ${sourceCodeEmbedding.id}, updating embedding...`);

        // Convert embedding array to PostgreSQL vector format
        const embeddingString = `[${embedding.embedding?.join(',')}]`;

        await db.$executeRaw`
        UPDATE "SourceCodeEmbedding" 
        SET "summaryEmbedding" = ${embeddingString}::vector 
        WHERE "id" = ${sourceCodeEmbedding.id}
      `;
        
        console.log(`✓ Successfully stored embedding for ${embedding.fileName}`);
      } catch (error) {
        console.error(`❌ Failed to store embedding for ${embedding.fileName}:`, error);
        throw error;
      }
    }),
  );
  
  // Log summary of results
  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  console.log(`\n📊 Embedding storage complete: ${successful} successful, ${failed} failed\n`);
};

const generateEmbeddings = async (docs: Document[]) => {
  return await Promise.all(
    docs.map(async (doc) => {
      const summary = await summariseCode(doc);
      // Skip if summary is empty or failed
      if (!summary || summary.trim() === "") {
        console.log(`Skipping ${doc.metadata.source} - no summary generated`);
        return null;
      }
      
      const embedding = await generateEmbedding(summary);
      return {
        summary,
        embedding,
        sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
        fileName: doc.metadata.source,
      };
    }),
  );
};
