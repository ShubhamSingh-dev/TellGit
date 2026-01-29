import { api } from "~/trpc/react";
import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const useProject = () => {
  const { data: projects } = api.project.getProjects.useQuery();

  const [projectId, setProjectId] = useLocalStorage<string | null>(
    "TellGit-projectId",
    null,
  );
  const project = projects?.find((p) => p.id === projectId) ?? null;

  useEffect(() => {
    if (!projectId && projects?.length && projects.length > 0) {
      setProjectId(projects[0]!.id);
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
