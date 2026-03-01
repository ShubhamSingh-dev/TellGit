"use client";

import React from "react";
import useProject from "~/hooks/use-project";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { Copy, UserPlus } from "lucide-react";

const InviteButton = () => {
  const { projectId } = useProject();
  const [open, setOpen] = React.useState(false);
  const [host, setHost] = React.useState("");

  React.useEffect(() => {
    setHost(window.location.origin);
  }, []);

  const inviteUrl = `${host}/join/${projectId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    toast.success("Invite link copied to clipboard");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-charcoal-900 border-charcoal-800 rounded-sm sm:max-w-md">
          <DialogHeader className="border-b border-charcoal-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-brand-primary/10 flex h-9 w-9 items-center justify-center rounded-sm border border-brand-primary/20">
                <UserPlus className="size-4 text-brand-primary" />
              </div>
              <div>
                <DialogTitle className="text-white font-bold tracking-tight uppercase italic">
                  Invite Team Members
                </DialogTitle>
                <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                  Share this link with your collaborators
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <p className="text-xs text-slate-400 font-mono">
              Anyone with this link can join your project workspace.
            </p>
            <div className="flex gap-2">
              <Input
                readOnly
                value={inviteUrl}
                className="bg-charcoal-950 border-charcoal-800 rounded-sm font-mono text-xs text-slate-300 focus-visible:ring-brand-primary focus-visible:ring-1 flex-1"
              />
              <Button
                onClick={handleCopy}
                size="icon"
                className="bg-brand-primary hover:bg-brand-primary/90 rounded-sm shrink-0 text-white"
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        onClick={() => setOpen(true)}
        size="sm"
        variant="outline"
        className="bg-charcoal-900 border-charcoal-700 hover:bg-charcoal-800 cursor-pointer rounded-sm border px-3 py-1.5 text-[10px] font-bold text-white uppercase transition-colors"
      >
        Invite
      </Button>
    </>
  );
};

export default InviteButton;