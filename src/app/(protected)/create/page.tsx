"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Github, Loader2, Lock } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";

// Zod schema for validation
const githubRepoSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  repoUrl: z
    .string()
    .url("Invalid URL format")
    .regex(
      /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-_]+$/,
      "Invalid GitHub repository URL",
    ),
  githubSecret: z.string().optional(),
});

type FormInput = z.infer<typeof githubRepoSchema>;

export default function Create() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(githubRepoSchema),
    defaultValues: {
      projectName: "",
      repoUrl: "",
      githubSecret: "",
    },
  });

  const createProject = api.project.createProject.useMutation();
  const checkCredits = api.project.checkCredits.useMutation();
  const refetch = useRefetch();

  function onSubmit(data: FormInput) {
    if (!!checkCredits.data) {
      createProject.mutate(
        {
          githubUrl: data.repoUrl,
          projectName: data.projectName,
          githubSecret: data.githubSecret ?? "",
        },
        {
          onSuccess: () => {
            toast.success("Project has been created successfully");
            refetch();
            reset();
            redirect("/dashboard");
          },
          onError: (error) => {
            if (error instanceof Error) {
              toast.error(`An error occurred: ${error.message}`);
            } else {
              toast.error("An error occurred while creating the Project");
            }
          },
        },
      );
    } else {
      checkCredits.mutate({
        githubUrl: data.repoUrl,
        githubSecret: data.githubSecret,
      });
    }
  }

  const hasCredits = checkCredits?.data?.userCredits
    ? checkCredits.data?.fileCount <= checkCredits.data?.userCredits
    : true;

  const isLoading = createProject.isPending || checkCredits.isPending;

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-8 md:py-12">
      <div className="grid w-full max-w-3xl gap-8 md:grid-cols-5">
        <div className="hidden md:col-span-2 md:flex md:flex-col md:items-center md:justify-center">
          <Image src="/repo.svg" height={128} width={128} alt="Repository" />
          <div className="mt-6 space-y-2 text-center">
            <h2 className="text-xl font-semibold">Connect with GitHub</h2>
            <p className="text-muted-foreground text-sm">
              Link your repository to analyze code, track changes and get
              AI-powered insights.
            </p>
          </div>
        </div>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Github className="h-5 w-5" />
              Link Repository
            </CardTitle>
            <CardDescription>
              Connect your GitHub repository to start analyzing the codebase
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              id="repo-form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  {...register("projectName")}
                  placeholder="My Awesome Project"
                  className={errors.projectName ? "border-red-500" : ""}
                />
                {errors.projectName && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.projectName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="repoUrl">GitHub Repository URL</Label>
                <Input
                  id="repoUrl"
                  {...register("repoUrl")}
                  type="url"
                  placeholder="https://github.com/username/repository"
                  className={errors.repoUrl ? "border-red-500" : ""}
                />
                {errors.repoUrl && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.repoUrl.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="githubSecret"
                  className="flex items-center gap-1"
                >
                  <Lock className="h-3.5 w-3.5" />
                  GitHub Token{" "}
                  <span className="text-muted-foreground text-xs">
                    (Optional)
                  </span>
                </Label>
                <Input
                  id="githubSecret"
                  {...register("githubSecret")}
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxx"
                />
                <p className="text-muted-foreground text-xs">
                  Required for private repositories.{" "}
                  <a
                    href="https://github.com/settings/tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Generate a token
                  </a>
                </p>
              </div>

              {!!checkCredits.data && (
                <div className="pt-2">
                  <Alert
                    variant={hasCredits ? "default" : "destructive"}
                    className="border"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Credit Information</AlertTitle>
                    <AlertDescription className="mt-1">
                      <p>
                        You will be charged{" "}
                        <strong>{checkCredits.data?.fileCount}</strong> credits
                        for this repository.
                      </p>
                      <p className="mt-1">
                        You have{" "}
                        <strong>{checkCredits.data?.userCredits}</strong>{" "}
                        credits remaining.
                      </p>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              form="repo-form"
              type="submit"
              className="w-full"
              disabled={isLoading || !hasCredits}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!!checkCredits.data
                ? createProject.isPending
                  ? "Creating Project..."
                  : "Create Project"
                : checkCredits.isPending
                  ? "Checking Credits..."
                  : "Check Credits"}
            </Button>

            {!hasCredits && (
              <p className="text-center text-sm text-red-500">
                You don't have enough credits to create this project.
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
