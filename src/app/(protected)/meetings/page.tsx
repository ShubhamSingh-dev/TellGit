"use client";

import MeetingCard from "@/app/(protected)/dashboard/meeting-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useProject from "@/hooks/use-project";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import Link from "next/link";
import { toast } from "sonner";

export default function Meeting() {
  const { projectId } = useProject();
  const { data: meetings, isLoading } = api.project.getMeetings.useQuery(
    { projectId },
    { refetchInterval: 4000 },
  );
  const deleteMeeting = api.project.deleteMeeting.useMutation();
  const { data: userPlan } = api.project.getUserLimits.useQuery();
  const analyzedMeetings = userPlan?.userMeetingCount ?? 0;
  const refetch = useRefetch();

  const getBadgeVariant = () => {
    if (analyzedMeetings >= 10) return "destructive";
    return "secondary";
  };

  const MeetingSkeleton = () => (
    <li className="flex animate-pulse flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center sm:gap-x-6">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="flex items-center gap-x-2 text-xs">
        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
        <span className="hidden sm:inline">•</span>
        <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <div className="h-9 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-9 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </li>
  );

  return (
    <>
      <MeetingCard />
      <div className="mt-3 h-full">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Meetings</h1>
          <Badge variant={getBadgeVariant()} className="ml-2">
            {analyzedMeetings} / 15 Analyzed
          </Badge>
        </div>

        {isLoading ? (
          <ul className="divide-y divide-gray-200">
            {[...Array(3)].map((_, index) => (
              <MeetingSkeleton key={index} />
            ))}
          </ul>
        ) : !meetings?.length ? (
          <div className="py-10 text-center">No meetings found</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {meetings?.map((meeting) => (
              <li
                key={meeting.id}
                className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center sm:gap-x-6"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/meetings/${meeting.id}`}
                      className="truncate text-sm font-semibold hover:underline"
                    >
                      {meeting.name}
                    </Link>
                    {meeting.status === "PROCESSING" && (
                      <Badge className="shrink-0 bg-yellow-500 text-white">
                        Processing...
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-x-2 text-xs text-gray-500">
                  <p className="whitespace-nowrap">
                    {meeting.createdAt.toLocaleDateString()}
                  </p>
                  <span className="hidden sm:inline">•</span>
                  <p className="truncate">
                    {meeting.insights.length}{" "}
                    {meeting.insights.length === 1 ? "insight" : "insights"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/meetings/${meeting.id}`}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      disabled={meeting.status === "PROCESSING"}
                    >
                      View
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={deleteMeeting.isPending}
                    onClick={() =>
                      deleteMeeting.mutate(
                        { meetingId: meeting.id, fileName: meeting.fileName },
                        {
                          onSuccess: () => {
                            toast.success(
                              "Meeting Analysis deleted successfully",
                            );
                            refetch();
                          },
                        },
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
