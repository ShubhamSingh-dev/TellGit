"use client";

import AskQuestions from "@/app/(protected)/dashboard/ask-questions";
import CodeReferences from "@/app/(protected)/dashboard/code-ref";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import useProject from "@/hooks/use-project";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { Info, MessageSquare } from "lucide-react";

export default function AskPage() {
  const { projectId } = useProject();
  const { data: questions, isLoading: questionsLoading } =
    api.project.getQuestions.useQuery({ projectId });
  const { data: userPlan, isLoading: planLoading } =
    api.project.getUserLimits.useQuery();

  const maxSavedAnswers = userPlan?.subscription?.maxQuestions;
  const remainingSavedAnswers = userPlan?.remainingQuestions ?? 0;

  const getBadgeVariant = () => {
    if (remainingSavedAnswers <= 10) return "destructive";
    return "secondary";
  };

  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions?.[questionIndex] as unknown as {
    id: string;
    user: { image: string };
    question: string;
    answer: string;
    createdAt: Date;
    fileReferences: { fileName: string; sourceCode: string; summary: string }[];
  };
  const deleteAnswer = api.project.deleteAnswer.useMutation();
  const refetch = useRefetch();

  return (
    <Sheet>
      <AskQuestions />
      <div className="mt-3 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Saved Answers</h1>
          {planLoading ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            <Badge variant={getBadgeVariant()} className="ml-2">
              {remainingSavedAnswers} / {maxSavedAnswers} Left
            </Badge>
          )}
        </div>
        <div className="flex max-h-[calc(100vh-200px)] flex-col gap-2 overflow-y-auto">
          {questionsLoading ? (
            // Skeleton loaders for questions
            Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="w-full">
                  <CardContent className="flex items-center gap-4 p-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex flex-1 flex-col gap-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-9 w-16" />
                  </CardContent>
                </Card>
              ))
          ) : questions?.length ? (
            questions.map(
              (question: any, index: React.SetStateAction<number>) => (
                <SheetTrigger
                  key={question.id || index}
                  onClick={() => setQuestionIndex(index)}
                  className="w-full text-left"
                >
                  <div className="flex w-full items-center gap-4 rounded-lg border p-4 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                    <Image
                      className="rounded-full"
                      height={30}
                      width={30}
                      src={question.user.image}
                      alt={"RepoGPT"}
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-center justify-between gap-2">
                        <p className="line-clamp-1 text-lg font-medium text-gray-700 dark:text-gray-200">
                          {question.question}
                        </p>
                        <span className="text-xs whitespace-nowrap text-gray-400">
                          {question.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="line-clamp-1 text-sm text-gray-500">
                        {question.answer}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      disabled={deleteAnswer.isPending}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAnswer.mutate(
                          { id: question.id },
                          {
                            onSuccess: () => {
                              toast.success("Answer deleted successfully");
                              refetch();
                            },
                          },
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </SheetTrigger>
              ),
            )
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <MessageSquare className="mb-2 h-10 w-10 text-purple-600 opacity-70" />
              <h3 className="text-lg font-medium">No saved answers yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Ask RepoGPT a question and save the answer to see it here
              </p>
            </div>
          )}
        </div>
      </div>

      {question && (
        <SheetContent className="overflow-y-auto sm:max-w-[80vw]">
          <SheetHeader>
            <SheetTitle>{question?.question}</SheetTitle>
            <div className="mt-4">
              {deleteAnswer.isPending ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ) : (
                <MDEditor.Markdown
                  source={question?.answer}
                  className="prose prose-sm max-w-none rounded-md p-3 text-gray-800"
                />
              )}
            </div>
            {question?.fileReferences?.length > 0 && (
              <div className="mt-6">
                <div className="mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span className="font-medium">Code References</span>
                </div>
                {deleteAnswer.isPending ? (
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : (
                  <CodeReferences fileReferences={question?.fileReferences} />
                )}
              </div>
            )}
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
}
