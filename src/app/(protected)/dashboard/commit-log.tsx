import { ExternalLink, GitCommit } from "lucide-react";
import Link from "next/link";
import React from "react";
import useProject from "~/hooks/use-project";
import { api } from "~/trpc/react";

const CommitLog = () => {
  const { projectId, project } = useProject();
  const { data: commits } = api.project.getCommits.useQuery({
    projectId: projectId!,
  });

  // Helper function to format time ago
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    
      <div className="space-y-6">
        {commits?.map((commit) => {
          return (
            <div
              key={commit.id}
              className="border border-slate-800 bg-slate-900/30 hover:border-slate-700 transition-all"
            >
              <div className="p-4 flex gap-4">
                {/* Left side - Commit icon */}
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                    <img
                        src={commit.commitAuthorAvatar}
                        alt={commit.commitAuthorName}
                        className="rounded-full"
                      />
                  </div>
                </div>

                {/* Right side - Commit details */}
                <div className="flex-1 min-w-0">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      
                      <span className="text-white/95 font-bold text-md tracking-wide">
                        {commit.commitAuthorName}
                      </span>
                      <span className="text-slate-500 text-[11px] uppercase font-bold tracking-tighter">
                        Pushed to
                      </span>
                      <span className="text-brand-primary text-[11px] font-mono font-bold bg-brand-primary/10 px-2 py-0.5 border border-brand-primary/20">
                        main
                      </span>
                      
                    </div>
                    <span className="text-slate-500 text-[10px] font-mono uppercase tracking-wide">
                      {getTimeAgo(commit.commitDate)}
                    </span>
                  </div>

                  {/* Commit message */}
                  <Link
                    target="_blank"
                    href={`${project?.repoUrl}/commit/${commit.commitHash}`}
                    className="text-slate-300 font-bold text-sm mb-2 hover:text-white transition-colors inline-block"
                  >
                    {commit.commitMessage}
                    <ExternalLink className="size-3 ml-2 inline-block" />
                  </Link>

                  {/* Summary box */}
                  <div className="text-[12px] font-mono text-slate-400 bg-charcoal-900/50 p-2.5 border border-charcoal-800 leading-relaxed">
                    {commit.summary}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
  );
};

export default CommitLog;