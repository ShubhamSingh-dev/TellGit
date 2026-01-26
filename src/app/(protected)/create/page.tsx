"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { api } from "~/trpc/react";

const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  repoUrl: z.string().url("Must be a valid URL"),
  githubToken: z.string().optional(),
});

type FormInput = z.infer<typeof createProjectSchema>;

const CreatePage = () => {
  const utils = api.useUtils();
  const form = useForm<FormInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      repoUrl: "",
      githubToken: "",
    },
  });

  const createProject = api.project.createProject.useMutation();

  const onSubmit = (data: FormInput) => {
    createProject.mutate(
      {
        name: data.name,
        repoUrl: data.repoUrl,
        githubToken: data.githubToken,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully!");
          void utils.project.getProjects.invalidate();
          form.reset();
        },
        onError: (error) => {
          toast.error("Failed to create project: " + error.message);
        },
      }
    );
  };

  return (
    <div className="flex h-full items-center justify-center gap-12">
      <Image
        src="/undraw_programming.svg"
        alt="undraw_programming"
        width={300}
        height={300}
        className="h-56 w-auto"
        priority
      />
      <div className="max-w-md w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">
            Link your GitHub repository
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the URL of your GitHub repository to get started.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="Repository URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Token (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="GitHub Personal Access Token"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={createProject.isPending}>
              {createProject.isPending ? "Linking..." : "Link Repository"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
