"use client";

import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import React, { useState } from "react";
// import { readStreamableValue } from "ai/rsc";
// import CodeReferences from "./code-references";
import { toast } from "sonner";
import { Code, Paperclip, SaveIcon, Sparkles, Terminal } from "lucide-react";
import useProject from "~/hooks/use-project";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { askQuestion } from "./action";
import { readStreamableValue } from "@ai-sdk/rsc";
import CodeReferences from "./code-references";
// import useRefetch from "@/hooks/use-refetch";

const AskQuestionCard = () => {
  const { project } = useProject();
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [filesReferences, setFilesReferences] = useState<
    { fileName: string; sourceCode: string; summary: string }[]
  >([]);
  const [answer, setAnswer] = useState("");
  const saveAnswer = api.project.saveAnswer.useMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAnswer("");
    setFilesReferences([]);
    e.preventDefault();
    if (!project?.id) return;
    setLoading(true);

    const { output, filesReferences } = await askQuestion(question, project.id);

    setOpen(true);
    setFilesReferences(filesReferences);

    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setAnswer((ans) => ans + delta);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-[80vw] sm:max-w-[90vw] h-[90vh]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle>
                <div className="bg-brand-primary flex h-10 w-10 items-center justify-center rounded-sm">
                  <Sparkles className="size-6 text-xl text-white" />
                </div>
              </DialogTitle>
              <Button
              disabled={saveAnswer.isPending}
                variant="outline"
                size="sm"
                onClick={() => {
                  saveAnswer.mutate(
                    {
                      projectId: project!.id,
                      question,
                      answer,
                      fileReferences: filesReferences,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Answer saved successfully!");
                      },
                      onError: () => {
                        toast.error("Failed to save the answer.");
                      },
                    },
                  );
                }}
              >
                Save Answer
              </Button>
            </div>
          </DialogHeader>
          <MDEditor.Markdown
            source={answer}
            className="h-auto! max-h-[70vh] w-full overflow-auto"
          />
          <div className="h-4"></div>
          <CodeReferences fileReferences={filesReferences} />
          <Button
            type="button"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <Card className="border-charcoal-800 relative rounded-sm border bg-transparent shadow-2xl lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold tracking-tight text-white uppercase italic">
                Ask Code Assistant
              </CardTitle>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Natural language codebase querying
              </p>
            </div>
            <div className="text-brand-primary bg-brand-primary/10 rounded-sm p-2">
              <Terminal className="size-5" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="group relative">
              <Textarea
                className="bg-charcoal-900 border-charcoal-800 focus:border-brand-primary h-40 w-full resize-none rounded-sm border p-5 font-mono text-sm text-white transition-all outline-none placeholder:text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="> Query: How does the authentication flow work in the account module?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <div className="absolute right-4 bottom-4 flex space-x-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="hover:text-brand-primary cursor-pointer text-slate-500 transition-colors hover:bg-transparent"
                  aria-label="Attach file"
                >
                  <Paperclip className="size-5" />
                </Button>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  <div className="border-charcoal-950 h-7 w-7 rounded-sm border bg-slate-700" />
                  <div className="border-charcoal-950 h-7 w-7 rounded-sm border bg-slate-600" />
                </div>
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  12 Active Nodes
                </span>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="bg-brand-primary hover:bg-brand-primary/80 h-auto cursor-pointer rounded-sm px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all"
              >
                {loading ? "Processing..." : "Execute Query"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
