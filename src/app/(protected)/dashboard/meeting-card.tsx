"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useProject from "@/hooks/use-project";
import { uploadFile } from "@/lib/appwrite";
import { api } from "@/trpc/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Info, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export default function MeetingCard() {
  const project = useProject();
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [progressValue, setProgressValue] = React.useState(0);
  const uploadMeeting = api.project.uploadMeeting.useMutation();
  const { data: userPlan, isLoading } = api.project.getUserLimits.useQuery();
  const router = useRouter();

  const remainingHours =
    ((userPlan?.maxMeetingSeconds ?? 0) - (userPlan?.meetingUsage ?? 0)) / 3600;
  const maxHours = (userPlan?.maxMeetingSeconds ?? 0) / 3600;
  const percentRemaining = maxHours > 0 ? (remainingHours / maxHours) * 100 : 0;

  // Animate progress bar on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(percentRemaining);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentRemaining]);

  const getProgressColor = () => {
    if (percentRemaining <= 20) return "bg-red-500";
    if (percentRemaining <= 50) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const processRecording = useMutation({
    mutationFn: async (data: { meetingUrl: string; meetingId: string }) => {
      const { meetingUrl, meetingId } = data;
      toast.warning("Analyzing, may take < 5 minutes...");
      const response = await axios.post("/api/process-recording", {
        meetingUrl,
        meetingId,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Meeting Analyzed Successfully!");
      router.refresh();
    },
    onError: (error) => {
      toast.error("Error analyzing recording");
      console.error("Processing error:", error);
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a", ".flac"],
    },
    multiple: false,
    maxSize: 45_000_000, // 45MB file upload size limit
    onDrop: async (acceptedFiles) => {
      if (!project) return;
      setIsUploading(true);
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.size > 45_000_000) {
        return toast.error("File size exceeds 45MB limit");
      }

      // Check if the user has exceeded the meeting duration limit
      if (remainingHours <= 0) {
        return toast.success(
          "Meeting upload limit exceeded. Upgrade your plan to upload more meetings.",
        );
      }

      if (userPlan!.userMeetingCount > 15) {
        return toast.success(
          "Meeting cannot be analyzed. Please delete previous meetings to upload new ones.",
        );
      }
      try {
        const { downloadURL, fileId } = await uploadFile(
          file as File,
          setProgress,
        );

        // Use await to get the result directly
        const result = await uploadMeeting.mutateAsync({
          fileName: fileId,
          projectId: project.projectId,
          meetingUrl: downloadURL,
          name: file.name,
        });

        toast.success("Recording Uploaded Successfully!");
        router.push("/meetings");

        // Now we can safely use the meetingId from the result
        if (result && result.id) {
          await processRecording.mutateAsync({
            meetingUrl: downloadURL,
            meetingId: result.id,
          });
        } else {
          toast.error("Failed to get meeting ID");
        }
      } catch (error) {
        toast.error("Error Uploading Recording (45MB File Limit)");
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    },
    disabled:
      isLoading || (userPlan?.userCredits ?? 0) <= 0 || remainingHours <= 0,
  });

  return (
    <Card
      className="col-span-2 flex flex-col items-center justify-center p-10 hover:shadow-md"
      {...getRootProps()}
    >
      {!isUploading && (
        <>
          <Image
            src="/meeting.svg"
            alt="Meeting"
            width={40}
            height={40}
            className="h-10 w-10 animate-pulse"
          />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            Missed a Meeting?
          </h3>
          <p className="mt-1 text-center text-sm text-gray-500">
            {`Analyse your meeting using AI [upto 35MB]`}
            <br />
            Powered by RepoGPT
          </p>
          <div className="mt-6 w-full max-w-xs space-y-4">
            <Button
              disabled={
                isUploading ||
                isLoading ||
                (userPlan?.userCredits ?? 0) <= 0 ||
                remainingHours <= 0
              }
              className="w-full bg-purple-800 font-bold"
            >
              <Upload className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Upload Recording
              <input className="hidden" {...getInputProps()} />
            </Button>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span>Remaining time</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">
                        <Info className="h-3.5 w-3.5 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Time available for meeting analysis</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm font-medium">
                  {remainingHours.toFixed(1)} hours
                </span>
              </div>
              <Progress
                value={progressValue}
                className={`h-2 w-full ${getProgressColor()}`}
              />
            </div>
          </div>
        </>
      )}
      {isUploading && (
        <div>
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            className="size-20"
            styles={buildStyles({
              pathColor: `#a855f7`,
              textColor: `#a855f7`,
            })}
          />
          <p className="text-center text-sm text-gray-500">
            Uploading Your Recording...
          </p>
        </div>
      )}
    </Card>
  );
}
