import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import type { Document } from "@langchain/core/documents";
import { generateEmbeddings, summarizedCode } from "./ai";
import { db } from "./db";
import { Octokit } from "octokit";

const getFileCount = async (path: string, octokit: Octokit, githubOwner: string, githubRepo: string, acc: number = 0) => {
  const { data } = await octokit.rest.repos.getContent({
    owner: githubOwner,
    repo: githubRepo,
    path,
  });
  if (!Array.isArray(data) && data.type === "file") {
    return (acc + 1);
  }

  if (Array.isArray(data)) {
    let fileCount = 0;
    const directories: string[] = [];

    for (const item of data) {
      if (item.type === "dir") {
        directories.push(item.path);
      } else {
        fileCount += 1;
      }
    }

    if (directories.length > 0) {
      const directoryCounts = await Promise.all(
        directories.map(async (directory) =>
          getFileCount(directory, octokit, githubOwner, githubRepo, 0))
      )
      fileCount += directoryCounts.reduce((acc, count) => acc + count, 0);
    }
    return (acc + fileCount);
  }
  return (acc + 1);
}

export const checkCredits = async (githubUrl: string, githubSecret?: string) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_OCTOKIT_TOKEN,
  });
  const githubOwner = githubUrl.split("/")[3];
  const githubRepo = githubUrl.split("/")[4];
  if (!githubOwner || !githubRepo) return 0;

  let fileCount = await getFileCount('', octokit, githubOwner, githubRepo, 0);
  if (fileCount >= 8000) {
    fileCount = Math.ceil(fileCount * 0.8);
  } else if (fileCount < 2000) {
    fileCount = Math.ceil(fileCount * 1.5);
  } else {
    // For fileCount between 1000 and 8000
    fileCount = Math.ceil(fileCount * 1.2);
  }
  return Math.max(587, fileCount);
}

export const loadGitHubRepo = async (
  githubUrl: string,
  githubSecret?: string,
  branch = "main",
) => {
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubSecret ?? "",
    branch,
    ignoreFiles: [
      "package-lock.json",
      "pnpm-lock.yaml",
      "yarn.lock",
      "bun.lock",
      ".eslintrc.json",
      "postcss.config.mjs",
      ".DS_Store",
      "node_modules",
      "build",
      "coverage",
      "*.min.js",
      "*.map",
    ],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 5,
  });

  return await loader.load();
};

// Process documents in smaller batches to prevent memory issues
async function processBatch(docs: Document[], projectId: string, batchSize = 10) {
  for (let i = 0; i < docs.length; i += batchSize) {
    const batch = docs.slice(i, i + batchSize);
    console.log(`Processing batch ${i / batchSize + 1} of ${Math.ceil(docs.length / batchSize)}`);

    try {
      const batchEmbeddings = await Promise.all(
        batch.map(async (doc) => {
          try {
            const summary = await summarizedCode(doc);
            const embedding = await generateEmbeddings(summary);
            return {
              summary,
              embedding,
              sourceCode: JSON.stringify(doc.pageContent),
              fileName: doc.metadata.source as string,
            };
          } catch (err) {
            console.error(`Error processing document ${doc.metadata.source}:`, err);
            return null;
          }
        })
      );

      // Filter out null results from failed processing
      const validEmbeddings = batchEmbeddings.filter(Boolean);

      // Store each embedding in the database
      for (const embedding of validEmbeddings) {
        if (!embedding) continue;

        try {
          const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
            data: {
              projectId,
              sourceCode: embedding.sourceCode,
              summary: embedding.summary,
              fileName: embedding.fileName,
            },
          });

          const vectorString = `[${embedding.embedding.join(",")}]`;
          await db.$executeRaw`
            UPDATE "SourceCodeEmbedding"
            SET "summaryEmbedding" = ${vectorString}::vector
            WHERE "id" = ${sourceCodeEmbedding.id}
          `;

          console.log(`Successfully stored embedding for ${embedding.fileName}`);
        } catch (dbErr) {
          console.error(`Database error while storing embedding for ${embedding.fileName}:`, dbErr);
        }
      }
    } catch (batchErr) {
      console.error(`Error processing batch ${i / batchSize + 1}:`, batchErr);
    }

    // Add a small delay between batches to prevent rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

export const indexGitHubRepo = async (
  projectId: string,
  githubUrl: string,
  githubSecret?: string,
) => {
  // Update the project status to indicate embedding is in progress
  await db.project.update({
    where: { id: projectId },
    data: { indexingStatus: "PROCESSING" },
  });

  // Process the embeddings in a fire-and-forget way
  (async () => {
    try {
      console.log(`Starting to load GitHub repo: ${githubUrl}`);
      const docs = await loadGitHubRepo(githubUrl, githubSecret);
      console.log(`Loaded ${docs.length} documents from GitHub repo`);

      // Process documents in batches
      await processBatch(docs, projectId);

      // Update project status to indicate completion
      await db.project.update({
        where: { id: projectId },
        data: { indexingStatus: "COMPLETED" },
      });

      console.log(`Successfully completed indexing for project ${projectId}`);
    } catch (error) {
      console.error(`Error indexing GitHub repo for project ${projectId}:`, error);

      // Update project status to indicate error
      await db.project.update({
        where: { id: projectId },
        data: { indexingStatus: "ERROR" },
      });
    }
  })();

  // Return immediately without waiting for the process to complete
  return { message: "Indexing started in the background" };
};

export const generateEmbeds = async (docs: Document[]) => {
  return await Promise.all(
    docs.map(async (doc) => {
      const summary = await summarizedCode(doc);
      const embedding = await generateEmbeddings(summary);
      return {
        summary,
        embedding,
        sourceCode: JSON.stringify(doc.pageContent),
        fileName: doc.metadata.source as string,
      };
    }),
  );
};
