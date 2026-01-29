import { Octokit } from "octokit";
import { db } from "~/server/db";

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});


const githubUrl = "https://github.com/ShubhamSingh-dev/zustand"

type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;
    commitDate: string;
}

export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
   const {data} = await octokit.rest.repos.listCommits({
    owner: "ShubhamSingh-dev",
    repo: "zustand",
   })

   const sortedCommit = data.sort((a : any, b : any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime())

   return sortedCommit.slice(0 , 15).map((commit : any) => ({
    commitHash: commit.sha as string,
    commitMessage: commit.commit.message ?? "",
    commitAuthorName: commit.commit?.author?.name ?? "",
    commitAuthorAvatar: commit.author?.avatar_url ?? "",
    commitDate: commit.commit?.author?.date ?? "",
   }))
}

export const pollCommits = async (projectId: string) => {
    const {project, githubUrl} = await fetchProjectGithubUrl(projectId)

    if(!githubUrl) throw new Error("Project not found or git url not found");
    const commitHashes = await getCommitHashes(githubUrl)

    const unprocessedCommits = await filterprocessedCommits(commitHashes, projectId)

    return unprocessedCommits
}

async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            repoUrl: true,
        }
    })
    return {project , githubUrl: project?.repoUrl}
}

async function filterprocessedCommits(commitHashes:Response[], projectId:string) {
    const processedCommits = await db.commit.findMany({
        where: { projectId }
    })

    const unprocessedCommits = commitHashes.filter((commit) => {
        return !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash)
    })

    return unprocessedCommits
}

pollCommits("cmkzny2oi0000i4lo1vz5uznm")
