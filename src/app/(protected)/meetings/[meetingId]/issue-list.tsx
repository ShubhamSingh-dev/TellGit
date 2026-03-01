"use client";

import { VideoIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { api, type RouterOutputs } from "~/trpc/react";

type Props = {
    meetingId: string;
};

const IssueList = ({ meetingId }: Props) => {
    const { data: meeting, isLoading } = api.meeting.getMeetingById.useQuery(
        { meetingId },
        { refetchInterval: 4000 }
    );

    if (isLoading || !meeting) {
        return (
            <div className="flex justify-center items-center h-full pt-16">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 border-b border-charcoal-800 pb-6 lg:mx-0 lg:max-w-none">
                <div className="flex items-center gap-x-6">
                    <div className="rounded-sm border border-charcoal-800 bg-charcoal-900 p-3 shadow-2xl flex items-center justify-center">
                        <VideoIcon className="h-6 w-6 text-brand-primary" />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                            Meeting on {meeting.createdAt.toLocaleDateString()}
                        </div>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white uppercase italic">
                            {meeting.name}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="h-6"></div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {meeting.issues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                ))}
            </div>
        </div>
    );
};

function IssueCard({
    issue,
}: {
    issue: NonNullable<RouterOutputs["meeting"]["getMeetingById"]>["issues"][number];
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[45vw] w-[95vw] bg-charcoal-950 border-charcoal-800 rounded-sm flex flex-col p-0 overflow-hidden shadow-2xl">
                    <DialogHeader className="p-6 border-b border-charcoal-800 bg-charcoal-900/50">
                        <DialogTitle className="text-white text-lg font-bold tracking-tight uppercase italic pb-2">
                            {issue.gist}
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-bold tracking-wider text-slate-500 uppercase pt-0">
                            {issue.headline}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-6 space-y-6">
                        <div className="relative overflow-hidden rounded-sm border border-charcoal-800 bg-charcoal-900/40 p-5 shadow-inner">
                            <div className="absolute left-0 top-0 h-full w-1 bg-brand-primary" />
                            <div className="mb-4 flex items-center gap-2">
                                <span className="rounded-sm bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 font-mono text-[10px] font-bold text-brand-primary tracking-widest">
                                    {issue.start} - {issue.end}
                                </span>
                            </div>
                            <p className="text-sm font-medium leading-relaxed text-slate-300">
                                &quot;{issue.summary}&quot;
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Card className="border-charcoal-800 bg-transparent rounded-sm shadow-2xl flex flex-col h-full transition-all hover:border-brand-primary/50 group relative overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-lg font-bold tracking-tight text-white uppercase italic line-clamp-1">
                        {issue.gist}
                    </CardTitle>
                    <div className="border-b border-charcoal-800 pt-3"></div>
                    <CardDescription className="line-clamp-2 pt-3 text-xs font-bold tracking-wider text-slate-500 uppercase">
                        {issue.headline}
                    </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                    <Button
                        onClick={() => setOpen(true)}
                        className="w-full bg-charcoal-900 border border-charcoal-800 hover:bg-brand-primary/10 hover:text-brand-primary hover:border-brand-primary/50 rounded-sm text-[10px] font-bold text-white uppercase tracking-widest transition-all"
                        variant="outline"
                    >
                        View Details
                    </Button>
                </CardContent>
            </Card>
        </>
    );
}

export default IssueList;