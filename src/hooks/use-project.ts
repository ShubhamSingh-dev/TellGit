import { api } from "@/trpc/react";
import { useLocalStorage } from "usehooks-ts"

export default function useProject() {
    const { data: projects } = api.project.getAllProjects.useQuery();
    const [projectId, setProjectId] = useLocalStorage("repoGPT-projectId", ""); // Persists value in local storage
    const project = projects ? projects.find((project: { id: string }) => project.id === projectId) : null;
    
    return { projects, project, projectId, setProjectId };
}
