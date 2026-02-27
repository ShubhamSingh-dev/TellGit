"use client";

import React from "react";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app/app-sidebar";
import { ModeToggle } from "~/components/theme-toggle";
import { authClient } from "~/server/better-auth/client";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-charcoal-950">
        <Loader2 className="size-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (!session) {
    return redirect("/signin");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="border-charcoal-800 bg-background flex items-center gap-2 border-b p-4 shadow-sm">
          {/* <SearchBar/> */}
          <div className="ml-auto"></div>
          <ModeToggle />
          {/* <UserButtonServer />  */}
        </div>

        {/* main content */}
        <div className="h-[calc(100vh-4rem)] overflow-y-scroll p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
