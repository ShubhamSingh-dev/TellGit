"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

// Import the IndexingStatus enum type for proper type checking
type IndexingStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "ERROR";

export default function CommitLog() {
  const { projectId, project } = useProject();
  const { data: commits, isLoading } = api.project.getCommits.useQuery({
    projectId,
  });
  const { data: projectStatus } = api.project.getProjectStatus.useQuery(
    {
      projectId,
    }, 
    {
      // Define proper refetchInterval logic that handles the complex query return type
      refetchInterval: (data) => {
        // If data doesn't exist or is still loading, poll every 60 seconds
        if (!data) return 60000;
        
        // Handle the status safely
        if (typeof data === 'string') {
          if (data === "COMPLETED" || data === "ERROR") {
            return false; // Stop polling
          }
        }
        return 60000; // Continue polling every 60 seconds
      }
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
        <CommitSkeleton />
      </div>
    );
  }
  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      {projectStatus && projectStatus !== "COMPLETED" && (
        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <div className="flex items-center gap-3">
            {projectStatus === "PROCESSING" && (
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            )}
            <Badge 
              variant={projectStatus === "ERROR" ? "destructive" : "secondary"}
              className="text-xs font-medium"
            >
              {projectStatus === "PENDING" && "Waiting to index"}
              {projectStatus === "PROCESSING" && "Indexing repository"}
              {projectStatus === "ERROR" && "Indexing error"}
            </Badge>
            <p className="text-sm text-blue-700">
              {projectStatus === "PENDING" && "Your repository is in the queue for indexing. This might take a few minutes."}
              {projectStatus === "PROCESSING" && "Your repository is being scanned and indexed. Commit data will appear here soon."}
              {projectStatus === "ERROR" && "There was a problem indexing your repository. Please try again later."}
            </p>
          </div>
        </div>
      )}
      
      <ul className="space-y-6">
        {commits?.map((commit, commitIdx) => (
          <li key={commit.id} className="relative flex gap-x-4">
            <div
              className={cn(
                commitIdx === commits.length - 1 ? "h-6" : "-bottom-6",
                "absolute top-0 left-0 flex w-6 justify-center",
              )}
            >
              <div className="w-px translate-x-1 bg-gray-200" />
            </div>
            <Image
              src={commit.commitAuthorAvatar}
              alt="commit avatar"
              width={40}
              height={40}
              className="relative mt-4 size-8 flex-none rounded-full bg-gray-50"
            />
            <div className="flex-auto rounded-lg p-3 shadow-xs ring-1 ring-gray-200 ring-inset">
              <div className="flex justify-between gap-x-4">
                <Link
                  target="_blank"
                  href={`${project?.githubUrl}/commits/${commit.commitHash}`}
                  className="group py-0.5 text-xs leading-5"
                >
                  <span className="font-medium text-gray-900">
                    {commit.commitAuthorName}{" "}
                  </span>
                  <span className="inline-flex items-center font-mono text-gray-500 transition-colors group-hover:text-indigo-500">
                    committed
                    <ExternalLink className="ml-1 size-4" />
                  </span>
                </Link>
              </div>
              <div className="top-0 right-0 flex items-end justify-end text-sm text-gray-500">
                {formatDistanceToNow(new Date(commit.commitDate), {
                  addSuffix: true,
                })}
              </div>
              <span className="font-semibold text-gray-900">
                {commit.commitMessage}
              </span>
              <pre className="mt-2 text-sm leading-6 whitespace-pre-wrap text-gray-500">
                <FormattedText text={commit.summary} />
              </pre>
            </div>
          </li>
        ))}
      </ul>
      
      {(projectStatus === "PENDING" || projectStatus === "PROCESSING") && (!commits || commits.length === 0) && (
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-indigo-500" />
          <h3 className="text-lg font-semibold text-gray-800">Indexing Repository</h3>
          <p className="mt-2 text-sm text-gray-600">
            We're processing your repository. Commit logs will appear here once indexing is complete.
          </p>
        </div>
      )}
      
      {projectStatus === "COMPLETED" && (!commits || commits.length === 0) && (
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800">No Commits Found</h3>
          <p className="mt-2 text-sm text-gray-600">
            No commit logs found for this repository.
          </p>
        </div>
      )}
    </div>
  );
}

function CommitSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {[1, 2, 3].map((index) => (
        <div key={index} className="flex gap-x-4 rounded-lg p-4 shadow-xs">
          <div className="shrink-0">
            <Skeleton className="size-8 rounded-full" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px] sm:w-[250px]" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FormattedText({ text }: { text: string }) {
  const renderFormattedText = (content: string) => {
    // Split text into segments based on markdown patterns
    const segments = content.split(/(\*\*.*?\*\*)/g);
    // Replace **text** with bold elements
    return segments.map((segment, index) => {
      if (segment.startsWith("**") && segment.endsWith("**")) {
        const boldText = segment.slice(2, -2);
        return (
          <strong key={index} className="font-bold text-gray-900">
            {boldText}
          </strong>
        );
      }

      // For backtick code segments
      if (segment.includes("`")) {
        const codeParts = segment.split(/(`.*?`)/g);
        return (
          <React.Fragment key={index}>
            {codeParts.map((part, codeIndex) => {
              if (part.startsWith("`") && part.endsWith("`")) {
                const codeText = part.slice(1, -1);
                return (
                  <code
                    key={codeIndex}
                    className="rounded bg-gray-100 px-1 font-mono text-sm text-gray-800"
                  >
                    {codeText}
                  </code>
                );
              }
              return part;
            })}
          </React.Fragment>
        );
      }
      return segment;
    });
  };

  return <>{renderFormattedText(text)}</>;
}
