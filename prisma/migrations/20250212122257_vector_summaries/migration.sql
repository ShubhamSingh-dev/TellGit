-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "CommitLogs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "projectId" TEXT NOT NULL,
    "commitHash" TEXT NOT NULL,
    "commitMessage" TEXT NOT NULL,
    "commitAuthorName" TEXT NOT NULL,
    "commitAuthorAvatar" TEXT NOT NULL,
    "commitDate" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "CommitLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceCodeEmbedding" (
    "id" TEXT NOT NULL,
    "summaryEmbedding" vector(768),
    "sourceCode" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "SourceCodeEmbedding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommitLogs" ADD CONSTRAINT "CommitLogs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SourceCodeEmbedding" ADD CONSTRAINT "SourceCodeEmbedding_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
