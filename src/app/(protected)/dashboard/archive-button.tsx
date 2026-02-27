"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import useProject from "~/hooks/use-project";
import { toast } from "sonner";

const ArchiveButton = () => {
  const { projectId } = useProject();
  const utils = api.useUtils();
  const archiveProject = api.project.archiveProject.useMutation();

  return (
    <Button
      disabled={archiveProject.isPending}
      size="sm"
      variant="outline"
      className="bg-charcoal-900 border-charcoal-700 hover:bg-charcoal-800 cursor-pointer rounded-sm border px-3 py-1.5 text-[10px] font-bold text-white uppercase transition-colors"
      onClick={() => {
        const confirm = window.confirm(
          "Are you sure you want to archive this project?",
        );
        if (confirm && projectId) {
          archiveProject.mutate(
            { projectId },
            {
              onSuccess: () => {
                toast.success("Project archived successfully");
                void utils.project.getProjects.invalidate();
              },
              onError: () => {
                toast.error("Failed to archive project");
              },
            },
          );
        }
      }}
    >
      Archive
    </Button>
  );
};

export default ArchiveButton;