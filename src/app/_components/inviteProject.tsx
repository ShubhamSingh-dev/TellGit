"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useProject from "@/hooks/use-project";
import { toast } from "sonner";
import { useState, useCallback } from "react";
import { Copy } from "lucide-react";

const InviteButton = () => {
  const { projectId } = useProject();
  const [open, setOpen] = useState(false);
  const [copying, setCopying] = useState(false);

  // Memoize the invite link to prevent recalculation
  const inviteLink = `${window.location.origin}/join/${projectId}`;

  const handleCopy = useCallback(async () => {
    if (copying) return;

    try {
      setCopying(true);
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link");
    } finally {
      setCopying(false);
    }
  }, [inviteLink, copying]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">
              Share this link with your team members to invite them to the
              project
            </p>

            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={inviteLink}
                className="font-mono text-sm"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleCopy}
                disabled={copying}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-gray-500 font-semibold">
              The invite link will give access to all project resources
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Button size="sm" onClick={() => setOpen(true)} variant="outline" className="gap-2">
        <Copy className="h-4 w-4" />
        Invite Members
      </Button>
    </>
  );
};

export default InviteButton;
