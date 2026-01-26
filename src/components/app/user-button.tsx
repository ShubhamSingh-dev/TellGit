"use client";

import Image from "next/image";
import { LogOut, Settings } from "lucide-react";
import { authClient } from "~/server/better-auth/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface UserButtonProps {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image?: string;
  } | null;
}

export const UserButton = ({ user }: UserButtonProps) => {
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/signin";
        },
      },
    });
  };

  if (!user) {
    return (
      <Avatar className="h-9 w-9">
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
    );
  }

  const initials =
    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() ||
    "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <Avatar className="h-9 w-9 cursor-pointer transition-opacity hover:opacity-80">
            {user.image && (
              <AvatarImage src={user.image} alt={user.firstName} />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col space-y-1 p-2">
          <p className="text-sm leading-none font-medium">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-muted-foreground text-xs leading-none">
            {user.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/dashboard/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
