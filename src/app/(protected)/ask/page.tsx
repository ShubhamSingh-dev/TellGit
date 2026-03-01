"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import useProject from "~/hooks/use-project";
import { api } from "~/trpc/react";
import AskQuestionCard from "../dashboard/ask-question-card";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";

const QAPage = () => {
  const { projectId } = useProject();
  const { data: questions } = api.project.getQuestions.useQuery({
    projectId: projectId!,
  }, {
    enabled: !!projectId
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions?.[questionIndex];

  return (
    <Sheet>
      <div className="flex flex-col gap-y-10 p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between border-b border-charcoal-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-white uppercase italic">
              Knowledge Repository
            </h1>
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Archived AI Analysis and Queries from your codebase
            </p>
          </div>
        </div>

        <AskQuestionCard />

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 bg-brand-primary" />
            <h3 className="text-[10px] font-bold tracking-widest text-brand-primary uppercase">
              Saved Analysis History
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {questions?.map((question, index) => (
              <SheetTrigger
                key={question.id}
                onClick={() => setQuestionIndex(index)}
              >
                <div className="group relative flex items-center gap-6 rounded-sm border border-charcoal-800 bg-charcoal-900/50 p-5 transition-all hover:border-brand-primary/50 hover:bg-charcoal-900">
                  <div className="shrink-0">
                    <Image
                      className="h-12 w-12 rounded-full border border-charcoal-700"
                      src={question.user.image ?? ""}
                      alt={question.user.name ?? "User"}
                      height={48}
                      width={48}
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1 gap-4">
                      <p className="text-sm font-semibold tracking-tight text-slate-200 uppercase italic">
                        {question.question}
                      </p>
                      <span className="shrink-0 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                        {question.createdAt.toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-xs text-slate-500 font-mono">
                      {question.answer}
                    </p>
                  </div>
                </div>
              </SheetTrigger>
            ))}
          </div>
        </div>
      </div>

      {question && (
        <SheetContent className="w-full md:max-w-[80vw] bg-charcoal-950 border-l border-charcoal-800 p-0 overflow-hidden flex flex-col">
          <SheetHeader className="p-6 border-b border-charcoal-800 bg-charcoal-900/50">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-brand-primary animate-pulse rounded-full" />
              <SheetTitle className="text-white text-lg font-bold tracking-tight uppercase italic text-left">
                {question.question}
              </SheetTitle>
            </div>
            <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase text-left">
              Recorded analysis from {question.createdAt.toLocaleDateString()}
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            <section className="space-y-4">
              <h3 className="text-[10px] font-bold tracking-widest text-brand-primary uppercase">
                Analysis Content
              </h3>
              <div className="prose prose-invert max-w-none">
                <MDEditor.Markdown
                  source={question.answer}
                  className="bg-transparent! text-slate-300! font-sans text-sm leading-relaxed"
                  style={{
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-[10px] font-bold tracking-widest text-brand-primary uppercase text-left">
                  Reference Context
                </h3>
              </div>
              <CodeReferences
                fileReferences={(question.fileReferences ?? []) as any}
              />
            </section>
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default QAPage;
