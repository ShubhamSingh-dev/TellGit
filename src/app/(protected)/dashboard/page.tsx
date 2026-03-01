"use client";

import useProject from "~/hooks/use-project";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";
import MeetingCard from "./meeting-card";
import ArchiveButton from "./archive-button";
import InviteButton from "./invite-button";
import TeamMembers from "./team-members";

export default function DashboardPage() {
  const { project } = useProject();

  return (
    <div className="bg-charcoal-950 flex-1 overflow-y-auto p-8">
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
                  href={project?.repoUrl ?? ""}
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
            <TeamMembers/>
            <InviteButton/>
            <ArchiveButton />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Ask Code Assistant */}
          <AskQuestionCard />

          {/* Meeting Context */}
          <MeetingCard />

          {/* Commit Log — full-width row */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <h2 className="text-xl font-bold tracking-wider text-white uppercase italic">
                Commit Log
              </h2>
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Recent repository commits
              </p>
            </div>
            <section className="border-charcoal-800 border p-6">
              <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                <CommitLog />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
