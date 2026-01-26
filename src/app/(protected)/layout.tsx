import React from "react";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app/app-sidebar";
import { ModeToggle } from "~/components/theme-toggle";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
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
