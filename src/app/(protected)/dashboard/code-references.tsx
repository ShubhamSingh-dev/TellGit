"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "~/lib/utils";

type CodeReferencesProps = {
  fileReferences: { fileName: string; sourceCode: string; summary: string }[];
};
const CodeReferences = ({ fileReferences }: CodeReferencesProps) => {
  const [tab, setTab] = React.useState(fileReferences[0]?.fileName || "");
  if (fileReferences.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex gap-2 overflow-x-auto rounded-sm bg-charcoal-900 p-1 border border-charcoal-800 mb-4 no-scrollbar">
          {fileReferences.map((file) => (
            <button
              onClick={() => setTab(file.fileName)}
              key={file.fileName}
              className={cn(
                "hover:bg-charcoal-800/50 rounded-sm px-3 py-1.5 text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all border border-transparent",
                {
                  "bg-brand-primary/10 text-brand-primary border-brand-primary/20": tab === file.fileName,
                  "text-slate-500": tab !== file.fileName,
                },
              )}
            >
              {file.fileName}
            </button>
          ))}
        </div>
        {fileReferences.map((file) => (
          <TabsContent
            key={file.fileName}
            value={file.fileName}
            className="max-h-[50vh] w-full overflow-auto rounded-sm border border-charcoal-800 bg-charcoal-950/50"
          >
            <SyntaxHighlighter
              language="typescript"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '1.25rem',
                background: 'transparent',
                fontSize: '0.8rem',
              }}
            >
              {file.sourceCode}
            </SyntaxHighlighter>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeReferences;
