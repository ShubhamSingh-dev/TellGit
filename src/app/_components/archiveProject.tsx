"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useProject from "@/hooks/use-project";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function ArchiveButton() {
  const archiveProject = api.project.archiveProject.useMutation();
  const { projectId } = useProject();
  const refetch = useRefetch();

  const handleArchive = () => {
    archiveProject.mutate(
      { projectId },
      {
        onSuccess: () => {
          toast.success("project archived");
          refetch();
        },
        onError: () => {
          toast.error("failed to archive project");
        },
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={archiveProject.isPending}
          size="sm"
          variant="destructive"
        >
          Archive
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to archive this project? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleArchive}>Archive</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
