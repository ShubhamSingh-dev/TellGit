"use client";

import CodeHighlighter from "@/app/_components/CodeHighlighter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn, getLanguageFromFileName } from "@/lib/utils";
import { useState } from "react";
import { FormattedText } from "./commit-log";

interface CodeReferencesProps {
  fileReferences: { fileName: string; sourceCode: string; summary: string }[];
}

const formatCode = (code: string) => {
  // Remove wrapping quotes if present
  let formattedCode = code.replace(/^["']|["']$/g, "");

  // Handle different types of line endings
  formattedCode = formattedCode
    .replace(/\\r\\n/g, "\n") // Windows style
    .replace(/\\n/g, "\n") // Unix style
    .replace(/\\r/g, "\n"); // Old Mac style

  // Replace escaped quotes with regular quotes
  formattedCode = formattedCode.replace(/\\"/g, '"');

  // Handle special case where content might be JSON stringified
  try {
    const parsed = JSON.parse(`"${formattedCode}"`);
    return parsed;
  } catch {
    // If parsing fails, return the formatted code as is
    return formattedCode;
  }
};

export default function CodeReferences({
  fileReferences,
}: CodeReferencesProps) {
  const [tab, setTab] = useState(
    fileReferences!.length > 0 ? fileReferences[0]!.fileName : "",
  );

  if (!fileReferences || fileReferences.length === 0) return null;

  return (
    <div className="w-full">
      <h1 className="mb-2 mt-4 text-xl font-bold">File References</h1>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="mb-2 flex flex-wrap gap-2 overflow-x-auto rounded-md bg-gray-200 p-2">
          {fileReferences.map((file) => (
            <Button
              onClick={() => setTab(file.fileName)}
              key={file.fileName}
              variant={file.fileName === tab ? "default" : "ghost"}
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted",
                {
                  "hover:bg-primary/90 hover:text-primary-foreground":
                    tab === file.fileName,
                },
              )}
            >
              {file.fileName}
            </Button>
          ))}
        </div>

        <div className="mt-2">
          {fileReferences.map((file) => (
            <TabsContent
              key={file.fileName}
              value={file.fileName}
              className="rounded-md border"
            >
              <div className="overflow-auto">
                {/* <div className="sticky top-0 z-10 bg-gray-800 px-4 py-2 text-sm text-gray-200">
                  {file.fileName}
                </div> */}
                <div className="max-h-[70vh] overflow-auto">
                  <CodeHighlighter
                    code={formatCode(file.sourceCode)}
                    language={getLanguageFromFileName(file.fileName)}
                  />
                </div>
              </div>

              {file.summary && (
                <div className="border-t bg-gray-50 p-4">
                  <h4 className="mb-1 text-sm font-medium">Summary</h4>
                  <div className="prose prose-sm max-w-none text-gray-600">
                    <FormattedText text={file.summary} />
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
