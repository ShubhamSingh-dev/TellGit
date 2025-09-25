"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { api, RouterOutputs } from "@/trpc/react";
import { VideoIcon } from "lucide-react";
import React from "react";

const InsightsList: React.FC<{ meetingId: string }> = ({ meetingId }) => {
  const { data: meeting, isLoading } = api.project.getInsights.useQuery(
    { meetingId },
    { refetchInterval: 4000 },
  );

  const MeetingHeaderSkeleton = () => (
    <div className="mx-auto flex max-w-2xl animate-pulse items-center justify-between gap-x-8 border-b pb-6 lg:mx-0 lg:max-w-none">
      <div className="flex items-center gap-x-6">
        <div className="rounded-full border bg-gray-200 p-3 dark:bg-gray-700">
          <div className="h-6 w-6" />
        </div>
        <div>
          <div className="mb-2 h-4 w-36 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-5 w-48 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );

  const InsightCardSkeleton = () => (
    <Card className="relative animate-pulse">
      <CardHeader>
        <div className="mb-3 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="border-b"></div>
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
      </CardHeader>
      <CardContent>
        <div className="h-9 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
      </CardContent>
    </Card>
  );

  if (isLoading || !meeting) {
    return (
      <div className="p-8">
        <MeetingHeaderSkeleton />
        <div className="h-4"></div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <InsightCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 border-b pb-6 lg:mx-0 lg:max-w-none">
          <div className="flex items-center gap-x-6">
            <div className="rounded-full border p-3">
              <VideoIcon className="h-6 w-6" />
            </div>
            <h1>
              <div className="text-sm leading-6 text-gray-600">
                Meeting on {meeting.createdAt.toLocaleDateString()}
              </div>
              <div className="mt-1 text-base leading-6 font-semibold text-gray-900">
                {meeting.name}
              </div>
            </h1>
          </div>
        </div>

        <div className="h-4"></div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {meeting.insights.map((insight: any) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </>
  );
};

function InsightCard({
  insight,
}: {
  insight: NonNullable<
    RouterOutputs["project"]["getInsights"]
  >["insights"][number];
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{insight.gist}</DialogTitle>
            <DialogDescription>
              {insight.createdAt.toLocaleDateString()}
            </DialogDescription>
            <p className="text-gray-600">{insight.headline}</p>
            <blockquote className="mt-2 border-l-4 border-gray-300 bg-gray-50 p-4">
              <span className="text-sm text-gray-600">
                {insight.start} - {insight.end}
              </span>
              <p className="leading-relaxed font-medium text-gray-900 italic">
                {insight.summary}
              </p>
            </blockquote>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Card className="relative">
        <CardHeader>
          <CardTitle className="text-xl">{insight.gist}</CardTitle>
          <div className="border-b"></div>
          <CardDescription>{insight.headline}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setOpen(true)}>Details</Button>
        </CardContent>
      </Card>
    </>
  );
}

export default InsightsList;
