"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
import useProject from "~/hooks/use-project";
import { Info, Terminal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  repoUrl: z.url("Must be a valid URL"),
  githubToken: z.string().optional(),
});

type FormInput = z.infer<typeof createProjectSchema>;

const CreatePage = () => {
  const router = useRouter();
  const { setProjectId } = useProject();

  const checkCredits = api.project.checkCredits.useMutation();

  const utils = api.useUtils();
  const form = useForm<FormInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      repoUrl: "",
      githubToken: "",
    },
  });

  const createProject = api.project.createProject.useMutation({
    onSuccess: (project) => {
      toast.success("Project created successfully!");
      setProjectId(project.id);
      form.reset();
      router.push("/dashboard");
      void utils.project.getProjects.refetch();
    },
    onError: (error) => {
      toast.error("Failed to create project: " + error.message);
    },
  });

  const onSubmit = (data: FormInput) => {
    if (!!checkCredits.data) {
      createProject.mutate({
        name: data.name,
        repoUrl: data.repoUrl,
        githubToken: data.githubToken,
      });
    } else {
      checkCredits.mutate({
        repoUrl: data.repoUrl,
        githubToken: data.githubToken,
      });
    }
  };

  const hasEnoughCredits = checkCredits.data
    ? checkCredits.data.userCredits >= checkCredits.data.fileCount
    : true;

  return (
    <div className="flex h-full items-center justify-center gap-12 bg-charcoal-950 p-6">
      <div className="hidden lg:block">
        <Image
          src="/undraw_programming.svg"
          alt="undraw_programming"
          width={400}
          height={400}
          className="h-72 w-auto opacity-80"
          priority
        />
      </div>
      
      <Card className="w-full max-w-md border-charcoal-800 bg-charcoal-900 shadow-2xl rounded-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Terminal className="size-6 text-brand-primary" />
            LINK REPOSITORY
          </CardTitle>
          <CardDescription className="text-slate-400 font-mono text-xs uppercase tracking-widest">
            Initialise your project on TellGit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Project Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="my-awesome-project" 
                          {...field} 
                          className="bg-charcoal-950 border-charcoal-800 rounded-sm focus-visible:ring-brand-primary h-11"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Repository URL</FormLabel>
                      <FormControl>
                        <Input 
                          type="url" 
                          placeholder="https://github.com/user/repo" 
                          {...field} 
                          className="bg-charcoal-950 border-charcoal-800 rounded-sm focus-visible:ring-brand-primary h-11"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="githubToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">GitHub Token (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Personal Access Token"
                          {...field}
                          className="bg-charcoal-950 border-charcoal-800 rounded-sm focus-visible:ring-brand-primary h-11"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              {!!checkCredits.data && (
                <Alert
                  variant={hasEnoughCredits ? "default" : "destructive"}
                  className={`border-brand-primary/20 bg-brand-primary/5 rounded-sm overflow-hidden ${!hasEnoughCredits && 'border-destructive/20 bg-destructive/5'}`}
                >
                  <Info className={`size-4 ${hasEnoughCredits ? 'text-brand-primary' : 'text-destructive'}`} />
                  <AlertTitle className={`font-mono text-xs font-bold tracking-wider ${hasEnoughCredits ? 'text-brand-primary' : 'text-destructive'}`}>
                    CREDIT ANALYSIS
                  </AlertTitle>
                  <AlertDescription className="mt-2 font-mono text-[11px]">
                    <div className="flex justify-between items-center opacity-80">
                      <span>PROJECT COST:</span>
                      <span className="font-bold ">{checkCredits.data?.fileCount} CREDITS</span>
                    </div>
                    <div className="flex justify-between items-center mt-1 opacity-80">
                      <span>WALLET BALANCE:</span>
                      <span className="font-bold">{checkCredits.data?.userCredits} CREDITS</span>
                    </div>
                    {!hasEnoughCredits && (
                      <div className="mt-3 py-1 bg-destructive/10 text-destructive text-center font-bold border border-destructive/20 uppercase tracking-tighter">
                        Insufficient Funds
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-sm h-11 tracking-wider uppercase"
                disabled={createProject.isPending || checkCredits.isPending || (!!checkCredits.data && !hasEnoughCredits)}
              >
                {createProject.isPending || checkCredits.isPending ? (
                  <span className="flex items-center gap-2 text-xs">
                    <span className="animate-spin size-4 border-2 border-white/20 border-t-white rounded-full"></span>
                    PROCESSING...
                  </span>
                ) : !!checkCredits.data ? (
                  "CREATE PROJECT"
                ) : (
                  "CHECK CREDITS"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePage;
