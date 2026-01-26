"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  Brain,
  LayoutDashboard,
  Plus,
  Sparkles,
  Video,
  Wallet,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { authClient } from "~/server/better-auth/client";
import { UserSection } from "./user-section";
import useProject from "~/hooks/use-project";
import { getProjectColor } from "~/lib/project-color";

const mainMenu = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Q&A",
    href: "/ask",
    icon: Brain,
  },
  {
    label: "Meetings",
    href: "/meetings",
    icon: Video,
  },
  {
    label: "Billing",
    href: "/billings",
    icon: Wallet,
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { projects, projectId } = useProject();

  const { open } = useSidebar();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-charcoal-800 bg-charcoal-900 border-r text-white"
    >
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-primary flex h-8 w-8 items-center justify-center rounded-sm">
            <Sparkles className="size-5 text-xl text-white" />
          </div>
          {open && (
            <span className="text-xl font-bold tracking-tight text-white uppercase italic">
              TELL-GIT
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-4 space-y-8 px-4">
        {/* Main Menu */}
        <div>
          <h3 className="mb-3 px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Main Menu
          </h3>
          <SidebarMenu className="space-y-1">
            {mainMenu.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className="hover:sidebar-item-active p-0 hover:text-inherit"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex w-full items-center space-x-3 px-3 py-2.5",
                        isActive
                          ? "sidebar-item-active rounded-none"
                          : "sidebar-item-hover rounded-sm",
                      )}
                    >
                      <Icon className="size-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>

        {/* Repositories */}
        <div>
          <h3 className="mb-3 px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Repositories
          </h3>
          <SidebarMenu className="space-y-1">
            {projects?.map((project) => {
              const isActive = project.id === projectId;
              const projectColorClass = getProjectColor(
                project.id ?? project.name,
              ) ?? "bg-indigo-500";
              const activeBorderClass = projectColorClass.replace(
                "bg-",
                "border-",
              );

              return (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton
                    asChild
                    className="p-0 hover:bg-transparent hover:text-inherit"
                  >
                    <Link
                      href="#"
                      className={cn(
                        "flex w-full items-center space-x-3 px-3 py-2",
                        isActive
                          ? cn(
                              "bg-charcoal-800 border-l-4 text-white rounded-none",
                              activeBorderClass,
                            )
                          : "sidebar-item-hover rounded-sm",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          projectColorClass,
                        )}
                      ></span>
                      <span className="font-mono text-sm font-medium">
                        {project.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>

        <div className="px-3">
          <button
            onClick={() => {
              router.push("/create");
            }}
            className="bg-brand-primary sharp-corners flex w-full items-center justify-center space-x-2 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" />
            <span>Connect Repository</span>
          </button>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-0">
        <UserSection
          user={user ?? null}
          open={open}
          handleSignOut={handleSignOut}
        />
      </SidebarFooter>
    </Sidebar>
  );
};
