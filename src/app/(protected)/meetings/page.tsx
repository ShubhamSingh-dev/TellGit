"use client";

import React from "react";
import useProject from "~/hooks/use-project";
import { api } from "~/trpc/react";
import MeetingCard from "../dashboard/meeting-card";
import { useRouter } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { 
  Video, 
  Calendar, 
  Clock, 
  MessageSquare, 
  ChevronRight, 
  PlayCircle,
  Loader2,
  Trash2
} from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { format } from "date-fns";
import { toast } from "sonner";

const MeetingsPage = () => {
    const router = useRouter();
    const { projectId } = useProject();
    const utils = api.useUtils();
    const { data: meetings, isLoading } = api.project.getMeetings.useQuery({
        projectId: projectId || "",
    });
    const deleteMeeting = api.project.deleteMeeting.useMutation({
        onSuccess: () => {
            toast.success("Meeting deleted successfully");
            void utils.project.getMeetings.invalidate();
        },
        onError: () => {
            toast.error("Failed to delete meeting");
        },
    });

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this meeting?")) {
            deleteMeeting.mutate({ meetingId: id });
        }
    };
    

    return (
        <div className="bg-charcoal-950 flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="mx-auto max-w-6xl space-y-12">
                
                {/* Hero / Upload Section */}
                <section className="animate-in fade-in slide-in-from-top-4 duration-700">
                    <MeetingCard />
                </section>

                {/* Meetings List Section */}
                <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-charcoal-800 pb-6 gap-4">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight text-white uppercase italic">
                                Meetings
                            </h1>
                            <p className="text-xs font-bold tracking-wide text-slate-500 uppercase">
                                Conversational analysis and AI-extracted insights
                            </p>
                        </div>
                        {meetings && meetings.length > 0 && (
                            <Badge variant="outline" className="border-charcoal-800 bg-charcoal-900/50 text-slate-400 font-mono text-[10px] uppercase px-3 py-1">
                                {meetings.length} Recorded Sessions
                            </Badge>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="grid gap-4">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="bg-charcoal-900/30 border-charcoal-800 p-3.5 py-0 overflow-hidden relative">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-11 w-11 rounded-sm bg-charcoal-800" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-3.5 w-1/4 bg-charcoal-800" />
                                            <Skeleton className="h-2.5 w-1/3 bg-charcoal-800" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : meetings && meetings.length === 0 ? (
                        <Card className="border-dashed border-2 border-charcoal-800 bg-transparent py-20">
                            <CardContent className="flex flex-col items-center justify-center text-center space-y-6">
                                <div className="bg-charcoal-900 size-16 flex items-center justify-center rounded-sm border border-charcoal-800 text-slate-600">
                                    <Video className="size-8" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">No Meetings Indexed</h3>
                                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                                        Your meeting archive is currently empty. Upload an audio recording to initiate AI analysis and issue tracking.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {meetings?.map((meeting) => (
                                <div key={meeting.id} className="group block cursor-pointer" onClick={() => router.push(`/meetings/${meeting.id}`)}>
                                    <Card className="bg-charcoal-900/40 border-charcoal-800 group-hover:border-brand-primary/50 group-hover:bg-charcoal-900/60 transition-all duration-300 overflow-hidden relative py-0">
                                        {/* Glow effect on hover */}
                                        <div className="absolute  inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        {/* Accent line on left */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-brand-primary transition-all duration-300" />
                                        
                                        <CardContent className="p-0 relative z-10">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-11 min-w-11 rounded-sm bg-charcoal-950 border border-charcoal-800 flex items-center justify-center text-slate-500 group-hover:text-brand-primary group-hover:border-brand-primary/30 transition-all duration-500 shadow-inner group-hover:scale-105">
                                                        {meeting.status === "PROCESSING" ? (
                                                            <Loader2 className="size-5.5 animate-spin" />
                                                        ) : (
                                                            <PlayCircle className="size-5.5" />
                                                        )}
                                                    </div>

                                                    <div className="space-y-1 overflow-hidden">
                                                        <div className="flex flex-wrap items-center gap-2.5">
                                                            <h3 className="text-[13px] font-bold text-white group-hover:text-brand-primary transition-colors uppercase tracking-tight truncate max-w-xs md:max-w-md">
                                                                {meeting.name}
                                                            </h3>
                                                            {meeting.status === "PROCESSING" ? (
                                                                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[8px] uppercase font-black tracking-widest rounded-none h-4.5 px-1.5 animate-pulse">
                                                                    Processing
                                                                </Badge>
                                                            ) : (
                                                                <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 text-[8px] uppercase font-black tracking-widest rounded-none h-4.5 px-1.5">
                                                                    Completed
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                                            <div className="flex items-center gap-1.5">
                                                                <Calendar className="size-3 text-slate-600" />
                                                                {format(new Date(meeting.createdAt), "MMM d, yyyy")}
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <MessageSquare className="size-3 text-slate-600" />
                                                                {meeting.issues.length} Issues
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                                                    <Button variant="outline" size="sm" onClick={() => router.push(`/meetings/${meeting.id}`)} className="bg-charcoal-950/50 border-charcoal-800 text-slate-400 group-hover:border-brand-primary group-hover:text-white group-hover:bg-brand-primary/10 transition-all duration-300 rounded-sm text-[9px] uppercase font-black tracking-widest h-8 px-3 gap-1.5 hover:cursor-pointer">
                                                        Reports
                                                        <ChevronRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                    <Button 
                                                        disabled={deleteMeeting.isPending} 
                                                        variant="destructive" 
                                                        size="sm" 
                                                        onClick={(e) => handleDelete(e, meeting.id)}
                                                        className="h-8 rounded-sm text-[9px] uppercase font-black tracking-widest px-3 gap-1.5"
                                                    >
                                                        {deleteMeeting.isPending ? (
                                                            <Loader2 className="size-3 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="size-3" />
                                                        )}
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default MeetingsPage;
