"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import useRefetch from "~/hooks/use-refetch";
import { api } from "~/trpc/react";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const refetch = useRefetch();
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();

  const onSubmit = (data: FormInput) => {
    createProject.mutate({
      name: data.projectName,
      repoUrl: data.repoUrl,
      githubToken: data.githubToken,
    },{
      onSuccess: () => {
        toast.success("Project created successfully!");
        refetch();
        reset();
      },
      onError: (error) => {
        toast.error("Failed to create project: " + error.message);
      }
    });
    return true;
  };

  return (
    <>
      <div className="flex h-full items-center justify-center gap-12">
        <img src="./undraw_programming.svg" alt="undraw_programming" className="h-56 w-auto" />
        <div>
          <div>
            <h1 className="text-2xl font-semibold">
              Link your GitHub repository
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter the URL of your GitHub repository to get started.
            </p>
          </div>
          <div className="h4"></div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                required
                {...register("projectName", { required: true })}
                placeholder="Project Name"
              />
              <Input
                required
                {...register("repoUrl", { required: true })}
                placeholder="Repository URL"
                type="url"
              />
              <div className="h-2"></div>
              <Input
                type="password"
                {...register("githubToken")}
                placeholder="GitHub Personal Access Token (optional)"
              />
              <div className="h-4"></div>
              <Button type="submit" disabled={createProject.isPending}>
                Link Repository
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
