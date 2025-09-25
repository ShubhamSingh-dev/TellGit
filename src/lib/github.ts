import { Octokit } from "octokit";
import { db } from "./db";
import axios from "axios";
import { geminiSummary } from "./ai";

const octokit = new Octokit({
  auth: process.env.GITHUB_OCTOKIT_TOKEN,
});

export type Response = {
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: Date;
};

async function fetchGitHubUrl(projectId: string) {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { githubUrl: true },
  });

  if (!project?.githubUrl) {
    throw new Error("Project has no GitHub URL");
  }

  return { project, githubUrl: project.githubUrl };
}

async function filterUnprocessedCommits(
  projectId: string,
  commitHashes: Response[],
) {
  const processedCommits = await db.commitLogs.findMany({
    where: { projectId },
  });
  const unprocessedCommits = commitHashes.filter(
    (commit) =>
      !processedCommits.some(
        (processedCommit) => processedCommit.commitHash === commit.commitHash,
      ),
  );

  return unprocessedCommits;
}

export const getCommitHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  const [owner, repo] = githubUrl
    .replace("https://github.com/", "")
    .split("/") as [string, string];

  const { data } = await octokit.rest.repos.listCommits({ owner, repo });

  if (!owner || !repo) {
    throw new Error("Invalid GitHub URL");
  }

  const sortedCommits = data.sort(
    (a, b) =>
      new Date(b.commit.author!.date!).getTime() -
      new Date(a.commit.author!.date!).getTime(),
  ) as any[];

  return sortedCommits.slice(0, 10).map(
    (commit: {
      sha: string;
      commit: {
        message: string;
        author: { name: string; date: string };
      };
      author: { avatar_url: string };
    }) => ({
      commitHash: commit.sha,
      commitMessage: commit.commit.message ?? "",
      commitAuthorName: commit.commit?.author?.name ?? "",
      commitAuthorAvatar: commit?.author?.avatar_url ?? "",
      commitDate: new Date(commit.commit?.author?.date ?? ""),
    }),
  );
};

export const pollCommits = async (projectId: string) => {
  const { githubUrl } = await fetchGitHubUrl(projectId);
  const commitHashes = await getCommitHashes(githubUrl);
  const unprocessedCommits = await filterUnprocessedCommits(
    projectId,
    commitHashes,
  );
  const summaryResponses = await Promise.allSettled(
    unprocessedCommits.map((commit) => {
      return summarizeCommits(
        githubUrl,
        commit.commitHash,
        commit.commitMessage,
      );
    }),
  );
  const summaries = summaryResponses.map((response) => {
    if (response.status === "fulfilled") {
      return response.value;
    }
    return "";
  });

  const commits = await db.commitLogs.createMany({
    data: summaries.map((summary, index) => {
      return {
        projectId,
        commitHash: unprocessedCommits[index]!.commitHash,
        commitMessage: unprocessedCommits[index]!.commitMessage,
        commitAuthorName: unprocessedCommits[index]!.commitAuthorName,
        commitAuthorAvatar: unprocessedCommits[index]!.commitAuthorAvatar,
        commitDate: unprocessedCommits[index]!.commitDate,
        summary,
      };
    }),
  });

  return commits;
};

async function summarizeCommits(
  githubUrl: string,
  commitHash: string,
  commitMessage: string,
) {
  try {
    const { data } = await axios.get(
      `${githubUrl}/commits/${commitHash}.diff`,
      {
        headers: {
          Accept: "application/vnd.github.v3.diff",
        },
      },
    );

    let diffData: string = data;

    // Check if it's an initial commit
    const isInitialCommit = /\b(init|initial commit)\b/i.test(commitMessage);

    // Count additions and deletions
    // const additions = diffData.split('\n')
    //     .filter(line => line.startsWith('+')).length > 4000 ? true : false;

    const additions = ((c = 0) =>
      diffData
        .split("\n")
        .some((line) => line.startsWith("+") && ++c > 4000))();

    const deletions = ((c = 0) =>
      diffData.split("\n").some((line) => line.startsWith("+") && ++c > 2))();

    // If it's a large initial commit, return a standard message
    if (isInitialCommit || (additions && deletions)) {
      return "Initial repository setup with project structure and base files.";
    }

    // 1. Normalize newlines (CRLF -> LF) and trim whitespace:
    diffData = diffData.replace(/\r\n/g, "\n").trim();

    // 2. Sanitize Backticks in the Diff:
    diffData = diffData.replace(/(?<!`)`(?!`)/g, "\\`");

    // 3. Handle Binary Files (Important):
    if (diffData.includes("Binary files /dev/null and")) {
      diffData = "Binary file changes detected.  Summary not available.";
      return diffData; // Return early
    }

    // 4. Limit line length: Truncate to 2000 characters per line
    // diffData = diffData.split('\n').map(line => line.substring(0, 2000)).join('\n');

    return (await geminiSummary(diffData, commitMessage)) || "No summary available";
  } catch (error) {
    console.error("Error fetching or summarizing commit:", error);
    return "Error summarizing commit";
  }
}

// await pollCommits('bc6d0bed-7c0d-40f8-b74b-7d63d0e8831c').then(console.log);
