"use client";

import Image from "next/image";
import { LogOut, Settings, User as UserIcon, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface UserSectionProps {
  user: {
    name?: string;
    email?: string;
    image?: string | null;
  } | null;
  open: boolean;
  handleSignOut: () => Promise<void>;
}

export const UserSection = ({
  user,
  open,
  handleSignOut,
}: UserSectionProps) => {
  return (
    <div className="border-t border-charcoal-800 bg-charcoal-950/50 p-4">
      <div className="flex items-center space-x-3 px-3 py-2">
        <div className="h-8 w-8 overflow-hidden border border-charcoal-700 bg-charcoal-800 sharp-corners">
          {user?.image ? (
            <Image
              src={user.image}
              alt="User"
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-charcoal-700" />
          )}
        </div>
        {open && (
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-bold text-white">
              {user?.name ?? "User"}
            </p>
            <p className="truncate text-[10px] font-bold text-slate-500 uppercase">
              {user?.email ?? ""}
            </p>
          </div>
        )}
        {open && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="text-slate-500 hover:text-white outline-none"
                title="Settings"
              >
                <Settings className="size-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="end"
              className="w-56 bg-charcoal-900 border-charcoal-800 text-slate-200"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-charcoal-800" />
              <DropdownMenuItem className="focus:bg-charcoal-800 focus:text-white cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-charcoal-800 focus:text-white cursor-pointer">
                <Wallet className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-charcoal-800" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-500 focus:bg-charcoal-800 focus:text-red-400 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
