"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import MDEditor from "@uiw/react-md-editor";
import { readStreamableValue } from "ai/rsc";
import { Info, Loader2, MessageSquare, Save, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { askQuestion } from "./actions";
import CodeReferences from "./code-ref";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function AskQuestions() {
  const { project } = useProject();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fileReferences, setFileReferences] = useState<
    { fileName: string; sourceCode: string; summary: string }[]
  >([]);
  const [answer, setAnswer] = useState<string>("");
  const [tokensConsumed, setTokensConsumed] = useState<number>(0);
  const [tokensLoading, setTokensLoading] = useState(false);
  const refetch = useRefetch();

  const saveAnswer = api.project.saveAnswer.useMutation();
  const { data: userPlan, isLoading } = api.project.getUserLimits.useQuery();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAnswer("");
    setFileReferences([]);
    setTokensConsumed(0);
    e.preventDefault();
    if (!project || typeof project.id !== "string") return;
    setLoading(true);
    setTokensLoading(true);

    try {
      const {
        output,
        filesReferences: fileReferences,
        tokenUsage,
      } = await askQuestion(question, project.id);

      setOpen(true);
      setFileReferences(
        fileReferences as {
          fileName: string;
          sourceCode: string;
          summary: string;
        }[],
      );
      setLoading(false);

      // Start streaming the output right away
      try {
        for await (const delta of readStreamableValue(output)) {
          if (delta) {
            setAnswer((ans) => ans + delta);
          }
        }

        // Only calculate token usage if streaming succeeded
        const usage = await tokenUsage;
        setTokensConsumed(usage.estimatedCost);
        setTokensLoading(false);
      } catch (streamError) {
        console.error("Error streaming output:", streamError);
        toast.error("Failed to get a complete answer. Please try again.");
        setLoading(false);
        setTokensLoading(false);
      }
    } catch (error) {
      toast.error("Failed to get an answer. Please try again.");
      setLoading(false);
      setTokensLoading(false);
    }
  };

  const handleSaveAnswer = () => {
    if (!project) return;

    saveAnswer.mutate(
      {
        projectId: project.id,
        question,
        fileReferences,
        answer,
      },
      {
        onSuccess: () => {
          toast.success("Answer saved successfully!");
          refetch();
        },
        onError: (error) => {
          toast.error("Failed to save answer");
        },
      },
    );
  };

  const remainingCredits = userPlan?.userCredits ?? 0;
  const canAskQuestion = !loading && !isLoading && remainingCredits > 0;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[90vh] max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-[85vw] md:max-w-[80vw]">
          <DialogHeader className="flex-none border-b p-4 md:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <DialogTitle className="text-xl font-bold">
                RepoGPT Answer
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-2">
                {tokensLoading ? (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Loader2 className="size-3 animate-spin" />
                    <span className="animate-pulse text-xs">
                      Calculating credits...
                    </span>
                  </Badge>
                ) : (
                  tokensConsumed > 0 && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Info className="size-3" />
                      <span className="text-xs">Credits: {tokensConsumed}</span>
                    </Badge>
                  )
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={handleSaveAnswer}
                  disabled={
                    saveAnswer.isPending ||
                    userPlan?.remainingQuestions === 0 ||
                    tokensLoading
                  }
                >
                  <Save className="size-4" />
                  <span className="hidden sm:inline">Save Answer</span>
                </Button>
                {/* <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-4" />
                  <span className="hidden sm:inline">Close</span>
                </Button> */}
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="answer" className="flex-1 overflow-hidden">
            <TabsList className="bg-muted/50 mx-4 mt-2">
              <TabsTrigger value="answer">Answer</TabsTrigger>
              {fileReferences.length > 0 && (
                <TabsTrigger value="references">
                  Code References ({fileReferences.length})
                </TabsTrigger>
              )}
            </TabsList>

            <div className="h-[calc(90vh-190px)] overflow-y-auto p-4 pb-16">
              <TabsContent value="answer" className="mt-0">
                <div className="bg-card rounded-md border p-4">
                  {loading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ) : (
                    <MDEditor.Markdown
                      source={answer}
                      className="prose prose-sm max-w-none rounded-md p-3"
                    />
                  )}
                </div>
              </TabsContent>

              {fileReferences.length > 0 && (
                <TabsContent value="references" className="mt-0">
                  <div className="bg-card rounded-md border p-4">
                    <CodeReferences fileReferences={fileReferences} />
                  </div>
                </TabsContent>
              )}
            </div>
          </Tabs>

          <DialogFooter className="flex-none border-t p-4">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="relative col-span-3 overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="size-5 text-purple-900" />
                Ask RepoGPT
              </CardTitle>
              <CardDescription className="mt-1">
                Get AI-powered insights about your codebase
              </CardDescription>
            </div>
            {!isLoading && (
              <Badge variant="outline" className="mt-2 sm:mt-0">
                {remainingCredits} Credits Available
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Textarea
              placeholder="Ask anything about your code, e.g., 'Which file should I edit to change the home page?'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[120px] resize-none focus-visible:ring-purple-600/70"
              required
            />
            <div className="flex items-center justify-between">
              <Button
                className="bg-purple-700 font-medium transition-all hover:bg-purple-900"
                type="submit"
                disabled={!canAskQuestion}
              >
                {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                {loading ? "Processing..." : "Ask RepoGPT"}
              </Button>

              {!canAskQuestion && remainingCredits <= 0 && !isLoading && (
                <p className="text-muted-foreground text-xs">
                  You've used all your credits
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
