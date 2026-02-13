"use client";

import useProject from "~/hooks/use-project";
import Link from "next/link";
import {
  ExternalLink,
  Terminal,
  Paperclip,
  Presentation,
  Activity,
  GitCommit,
  Brain,
  Zap,
  MessageSquare,
  Bot,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import CommitLog from "./commit-log";

export default function DashboardPage() {
  const { project } = useProject();

  return (
    <div className="bg-charcoal-950 flex-1 overflow-y-auto p-8">
      {project?.id}
      {/* Header Section */}
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="bg-brand-primary/10 border-brand-primary/30 flex items-center justify-between rounded-sm border p-4">
          <div className="flex items-center space-x-4">
            <div className="bg-brand-primary flex h-10 w-10 items-center justify-center rounded-sm text-white">
              <FaGithub className="size-6 text-white" />
            </div>
            <div>
              <h2 className="font-mono text-sm font-bold text-white">
                REPO: {project?.name}
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-brand-primary text-sm font-bold tracking-wider">
                  LINK:
                </p>
                <Link
                  href={project?.repoUrl || ""}
                  target="_blank"
                  className="text-brand-primary flex items-center gap-1 text-sm font-bold tracking-wider hover:underline"
                >
                  {project?.repoUrl}
                  <ExternalLink className="size-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-charcoal-900 border-charcoal-700 hover:bg-charcoal-800 cursor-pointer rounded-sm border px-3 py-1.5 text-[10px] font-bold text-white uppercase transition-colors"
            >
              Members
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-charcoal-900 border-charcoal-700 hover:bg-charcoal-800 cursor-pointer rounded-sm border px-3 py-1.5 text-[10px] font-bold text-white uppercase transition-colors"
            >
              Invite
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-charcoal-900 border-charcoal-700 hover:bg-charcoal-800 cursor-pointer rounded-sm border px-3 py-1.5 text-[10px] font-bold text-white uppercase transition-colors"
            >
              Archive
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Ask Code Assistant */}
          <section className="border-charcoal-800 border p-6 shadow-2xl lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white uppercase italic">
                  Ask Code Assistant
                </h2>
                <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Natural language codebase querying
                </p>
              </div>
              <div className="text-brand-primary bg-brand-primary/10 rounded-sm p-2">
                <Terminal className="size-5" />
              </div>
            </div>
            <div className="group relative">
              <Textarea
                className="bg-charcoal-900 border-charcoal-800 focus:border-brand-primary h-40 w-full resize-none rounded-sm border p-5 font-mono text-sm text-white transition-all outline-none placeholder:text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="> Query: How does the authentication flow work in the account module?"
              />
              <div className="absolute right-4 bottom-4 flex space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:text-brand-primary text-slate-500 transition-colors hover:bg-transparent"
                  aria-label="Attach file"
                >
                  <Paperclip className="size-5" />
                </Button>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {/* Placeholders for user avatars */}
                  <div className="border-charcoal-950 h-7 w-7 rounded-sm border bg-slate-700" />
                  <div className="border-charcoal-950 h-7 w-7 rounded-sm border bg-slate-600" />
                </div>
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  12 Active Nodes
                </span>
              </div>
              <Button className="bg-brand-primary hover:bg-brand-primary/80 h-auto rounded-sm px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all">
                Execute Query
              </Button>
            </div>
          </section>

          {/* Meeting Context */}
          <section className="border-charcoal-800 flex flex-col items-center justify-between border p-6 text-center">
            <div className="space-y-4">
              <div className="bg-charcoal-900 border-charcoal-800 mx-auto flex h-14 w-14 items-center justify-center rounded-sm border text-slate-500">
                <Presentation className="size-8" />
              </div>
              <div>
                <h2 className="text-md font-bold tracking-tighter text-white uppercase italic">
                  Meeting Context
                </h2>
                <p className="mt-2 text-[11px] font-medium text-slate-500">
                  Link conversational outcomes to source files.
                </p>
              </div>
            </div>
            <div className="mt-6 w-full space-y-3">
              <Button
                variant="outline"
                className="hover:text-charcoal-950 h-auto w-full rounded-sm border-2 border-white py-3 text-[10px] font-bold text-white uppercase transition-all hover:bg-white"
              >
                Upload Recording
              </Button>
              <p className="text-brand-primary text-[9px] font-bold tracking-[0.2em] uppercase">
                Enterprise Layer
              </p>
            </div>
          </section>

          
            <div className="m-4">
              <h2 className="text-xl font-bold tracking-wider text-white uppercase italic">
                Commit Log
              </h2>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Recent repository commits
              </p>
            </div>

            <section className="border-charcoal-800 border p-6 lg:col-span-3">
            <div className="max-h-96 overflow-y-auto pr-2">
              <CommitLog />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
