"use client";

import React from 'react'
import useProject from '~/hooks/use-project';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { toast } from 'sonner';

const InviteButton = () => {
  const { projectId } = useProject();
  const [open, setOpen] = React.useState(false);
  const [host, setHost] = React.useState("");

  React.useEffect(() => {
    setHost(window.location.origin);
  }, []);

  const inviteUrl = `${host}/join/${projectId}`;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Ask them to copy and paste this link
          </p>
          <Input
            className="mt-4"
            readOnly
            onClick={() => {
              navigator.clipboard.writeText(inviteUrl);
              toast.success("copied to clipboard");
            }}
            value={inviteUrl}
          />
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
  )
}

export default InviteButton