import { Octokit } from "octokit";
import { db } from "~/server/db";
import axios from "axios";
import { aiSummariseCommit } from "./gemini";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

type Response = {
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: string;
};

interface GithubCommit {
  sha: string;
  commit: {
    message: string;
    committer: {
      date: string;
    };
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    avatar_url: string;
  };
}

export const getCommitHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  const [owner, repo] = githubUrl.split("/").slice(-2);
  if (!owner || !repo) {
    throw new Error("Invalid github url");
  }
  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });

  const sortedCommits = data.sort((a: unknown, b: unknown) => {
    const commitA = a as GithubCommit;
    const commitB = b as GithubCommit;
    const dateA = new Date(commitA.commit.committer.date);
    const dateB = new Date(commitB.commit.committer.date);
    return dateB.getTime() - dateA.getTime();
  });

  return sortedCommits.slice(0, 10).map((commit: unknown) => {
    const c = commit as GithubCommit;
    return {
      commitHash: c.sha,
      commitMessage: c.commit.message ?? "",
      commitAuthorName: c.commit?.author?.name ?? "",
      commitAuthorAvatar: c.author?.avatar_url ?? "",
      commitDate: c.commit?.author?.date ?? "",
    };
  });
};

export const pollCommits = async (projectId: string) => {
  const { githubUrl } = await fetchProjectGithubUrl(projectId);
  const commitHashes = await getCommitHashes(githubUrl);
  const unprocessedCommits = await filterUnprocessedCommits(
    commitHashes,
    projectId,
  );

  const summaryResponses = await Promise.allSettled(
    unprocessedCommits.map((commit) => {
      return summariseCommit(githubUrl, commit.commitHash);
    }),
  );
  const summaries = summaryResponses.map((response) => {
    if (response.status === "fulfilled") {
      return response.value;
    }
    return "No summary generated";
  });

  const commits = await db.commit.createMany({
    data: summaries.map((summary, index) => {
      console.log(`processing commits ${index}`);
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

async function summariseCommit(githubUrl: string, commitHash: string) {
  const diffUrl = `${githubUrl}/commit/${commitHash}.diff`;
  console.log("Fetching diff from:", diffUrl);

  //currently only work on public repos
  const { data } = await axios.get<string>(diffUrl, {
    headers: {
      Accept: "application/vnd.github.v3.diff",
    },
  });

  const summary = (await aiSummariseCommit(data)) ?? "No summary generated";
  return summary;
}

async function fetchProjectGithubUrl(projectId: string) {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { repoUrl: true },
  });

  if (!project?.repoUrl) {
    throw new Error("Project has no github url");
  }
  return { project, githubUrl: project?.repoUrl };
}

async function filterUnprocessedCommits(
  commitHashes: Response[],
  projectId: string,
) {
  const processedCommits = await db.commit.findMany({
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
