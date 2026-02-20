"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "~/lib/utils";
import { FileCode, ChevronRight } from "lucide-react";

type CodeReferencesProps = {
  fileReferences: { fileName: string; sourceCode: string; summary: string }[];
};

const CodeReferences = ({ fileReferences }: CodeReferencesProps) => {
  const [tab, setTab] = React.useState(fileReferences[0]?.fileName || "");

  if (fileReferences.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-col rounded-sm border border-charcoal-800 bg-charcoal-950/50 overflow-hidden">
        {/* VS Code Style Header */}
        <div className="flex items-center gap-2 bg-charcoal-900 px-4 py-2 border-b border-charcoal-800">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-500">
            <span className="flex items-center gap-1.5 text-brand-primary">
              <FileCode className="size-3" />
              Source
            </span>
            <ChevronRight className="size-3" />
            <span className="text-slate-300">{tab}</span>
          </div>
        </div>

        {/* Editor Tabs */}
        <div className="flex gap-px overflow-x-auto bg-charcoal-900/50 p-0 border-b border-charcoal-800 no-scrollbar">
          {fileReferences.map((file) => (
            <button
              onClick={() => setTab(file.fileName)}
              key={file.fileName}
              className={cn(
                "group relative px-4 py-2 text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-2 border-r border-charcoal-800 min-w-fit",
                {
                  "bg-charcoal-950 text-white": tab === file.fileName,
                  "text-slate-500 hover:bg-charcoal-900/50":
                    tab !== file.fileName,
                }
              )}
            >
              {tab === file.fileName && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-primary" />
              )}
              <FileCode
                className={cn("size-3", {
                  "text-brand-primary": tab === file.fileName,
                  "text-slate-600": tab !== file.fileName,
                })}
              />
              {file.fileName}
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="max-h-[50vh] overflow-auto custom-scrollbar">
          {fileReferences.map(
            (file) =>
              tab === file.fileName && (
                <div key={file.fileName} className="w-full">
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1.5rem",
                      background: "transparent",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-mono)",
                      lineHeight: "1.6",
                    }}
                    showLineNumbers={true}
                    lineNumberStyle={{
                      minWidth: "3em",
                      paddingRight: "1em",
                      color: "#4b5563",
                      textAlign: "right",
                      userSelect: "none",
                    }}
                  >
                    {file.sourceCode}
                  </SyntaxHighlighter>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeReferences;
