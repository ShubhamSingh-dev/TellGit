import { api } from "~/trpc/react";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const useProject = () => {
  const { data: projects } = api.project.getProjects.useQuery();

  const [projectId, setProjectId] = useLocalStorage<string | null>(
    "TellGit-projectId",
    null,
  );
  const project = projects?.find((p) => p.id === projectId) ?? null;

  useEffect(() => {
    if (!projects) return;

    if (!projectId && projects.length > 0) {
      setProjectId(projects[0]!.id);
      return;
    }

    if (projectId) {
      const isProjectValid = projects.some((p) => p.id === projectId);
      if (!isProjectValid) {
        setProjectId(projects.length > 0 ? projects[0]!.id : null);
      }
    }
  }, [projectId, projects, setProjectId]);

  return {
    project,
    projects,
    setProjectId,
    projectId,
  };
};

export default useProject;
