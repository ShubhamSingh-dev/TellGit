"use client";

import React, { useState } from "react";
import { Presentation, Upload, FileAudio, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "~/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import useProject from "~/hooks/use-project";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const MeetingCard = () => {
  const {project} = useProject();

  const utils = api.useUtils();
  const processMeeting = useMutation({
    mutationFn: async (data: {
      meetingUrl: string;
      meetingId: string;
      projectId: string;
    }) => {
      const response = await axios.post("/api/process-meeting", data);
      return response.data;
    },
    onSuccess: () => {
        void utils.project.getMeetings.invalidate();
    }
  });


  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const uploadMeeting = api.project.uploadMeeting.useMutation();

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a"],
    },
    multiple: false,
    noClick: true, // Prevent the entire card from opening the file dialog
    maxSize: 50_000_000,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      if (!project) return;

      setIsUploading(true);
      setProgress(0);
      try {
        const downloadUrl = await uploadFile(file as File, setProgress);
        uploadMeeting.mutate({
          projectId: project?.id || "",
          meetingUrl: downloadUrl,
          name: file.name,
        },{
          onSuccess: (meeting) => {
            toast.success("Meeting recording uploaded successfully!");
            router.push("/meetings")
            processMeeting.mutate({
              meetingUrl: downloadUrl,
              meetingId: meeting.id,
              projectId: project.id,
            });
          },
          onError: () => {
            toast.error("Failed to upload recording.");
          }
        });
        
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload recording.");
      } finally {
        setIsUploading(false);
      }
    },
  });

  return (
    <Card className="border-charcoal-800 bg-transparent rounded-sm shadow-2xl flex flex-col h-full overflow-hidden group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold tracking-tight text-white uppercase italic">
              Meeting Context
            </CardTitle>
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Analyze conversational data
            </p>
          </div>
          <div className="bg-brand-primary/10 rounded-sm p-2 text-brand-primary">
            <Presentation className="size-5" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div
          {...getRootProps()}
          onClick={open} // Clicking the dropzone area also opens it
          className={cn(
            "flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-sm border-charcoal-800 p-8 transition-all cursor-pointer",
            isDragActive
              ? "border-brand-primary bg-brand-primary/5 scale-[0.98]"
              : "hover:border-charcoal-700 hover:bg-charcoal-900/40",
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          <input {...getInputProps()} />

          {isUploading ? (
            <div className="flex flex-col items-center space-y-4 w-full px-4">
              <div className="relative flex items-center justify-center">
                <Loader2 className="size-10 text-brand-primary animate-spin" />
                <span className="absolute text-[10px] font-bold text-white">
                  {progress}%
                </span>
              </div>
              <div className="w-full space-y-2">
                <Progress value={progress} className="h-1 bg-charcoal-800" />
                <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase text-center">
                  Processing Audio Stream...
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="bg-charcoal-900 border border-charcoal-800 rounded-sm p-4 text-slate-400 group-hover:text-brand-primary transition-colors focus-within:ring-2 focus-within:ring-brand-primary">
                <FileAudio className="size-8" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-white uppercase tracking-tight">
                  {isDragActive ? "Drop to Initiate" : "Drop Audio File"}
                </p>
                <p className="text-[10px] font-medium text-slate-500">
                  MP3, WAV, M4A up to 50MB
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <Button
            type="button"
            disabled={isUploading}
            onClick={open}
            variant="outline"
            className="w-full h-11 border-2 border-white/10 hover:border-brand-primary/50 hover:bg-brand-primary/10 rounded-sm text-[10px] font-bold text-white uppercase transition-all bg-transparent gap-2"
          >
            <Upload className="size-4" />
            Manual Selection
          </Button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
              <span className="size-1.5 bg-brand-primary rounded-full animate-pulse" />
              <span className="text-[9px] font-bold tracking-[0.2em] text-brand-primary uppercase">
                Enterprise Layer
              </span>
            </div>
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              Ready
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingCard;
