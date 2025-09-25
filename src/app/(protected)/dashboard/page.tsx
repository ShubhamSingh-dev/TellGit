"use client";

import ArchiveButton from "@/app/_components/archiveProject";
import TeamMembers from "@/app/_components/team-members";
import useProject from "@/hooks/use-project";
import { ExternalLinkIcon, GithubIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import AskQuestions from "./ask-questions";
import CommitLog from "./commit-log";
import MeetingCard from "./meeting-card";
const InviteButton = dynamic(() => import("@/app/_components/inviteProject"), {
  ssr: false,
});

export default function Page() {
  const { project } = useProject();

  return (
    <div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex w-fit items-center rounded-md border px-4 py-3">
          <GithubIcon className="size-5" />
          <div className="ml-2">
            <p className="text-sm font-semibold">
              This Project is linked to{" "}
              <Link
                href={project?.githubUrl ?? ""}
                target="_blank"
                rel="noopener noreferrer" // Security best practice
                className="inline-flex items-center text-purple-800 hover:underline"
              >
                {project?.githubUrl}
                <ExternalLinkIcon className="ml-1 size-4" />
              </Link>
            </p>
          </div>
        </div>

        <div className="flex h-4 items-center gap-4">
          <TeamMembers />
          <InviteButton />
          <ArchiveButton />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-5">
        <AskQuestions />
        <MeetingCard />
      </div>

      <div className="mt-8">
        <CommitLog />
      </div>
    </div>
  );
}
