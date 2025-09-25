"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarLink,
} from "@/components/ui/sidebar";
import useProject from "@/hooks/use-project";
import { useAuthSession } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  NotebookText,
  PlusCircle,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useAuthSession();
  const user = session?.user;
  const { projects, projectId, setProjectId } = useProject();
  const pathname = usePathname();

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleSignOut = async () => {
    const { signOut } = createAuthClient();
    signOut();
    localStorage.clear();
    redirect("/");
  };

  const items = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-6 w-6" />,
    },
    {
      label: "Q&A",
      href: "/ask",
      icon: <NotebookText className="h-6 w-6" />,
    },
    {
      label: "Meetings",
      href: "/meetings",
      icon: (
        <Image
          src={"/meeting.svg"}
          alt="Meeting"
          height={24}
          width={24}
          className="h-6 w-6"
        />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 h-8 w-8 rounded-full shadow-md md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <Sidebar open={open} setOpen={setOpen} className="h-full">
        <SidebarBody className="flex flex-col justify-between gap-4">
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className={open ? "" : "flex justify-center"}>
              {open ? <Logo /> : <LogoIcon />}
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              {items.map((item, idx) => (
                <SidebarLink
                  key={idx}
                  href={item.href}
                  link={item}
                  className={`transition-colors duration-200 ${
                    pathname === item.href
                      ? "bg-purple-100 text-purple-800"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    if (isMobile) {
                      setOpen(false);
                    }
                  }}
                />
              ))}
            </nav>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                {projects?.map((project) => (
                  <SidebarLink
                    key={project.id}
                    href="#"
                    link={{
                      label: project.name,
                      href: "",
                      icon: <FolderKanban className="h-6 w-6" />,
                    }}
                    className={`transition-colors duration-200 ${
                      projectId === project.id
                        ? "bg-purple-100 text-purple-800"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setProjectId(project.id);
                      if (isMobile) {
                        setOpen(false);
                      }
                    }}
                  />
                ))}

                <div className={`mt-4 ${open ? "" : "flex justify-center"}`}>
                  <Link href="/create">
                    <Button
                      variant="outline"
                      className={`group mt-4 flex items-center gap-2 overflow-hidden transition-all ${
                        open
                          ? "w-full justify-start px-2 py-1.5"
                          : "h-9 w-9 min-w-[36px] justify-center"
                      }`}
                      onClick={() => {
                        if (isMobile) {
                          setOpen(false);
                        }
                      }}
                    >
                      <PlusCircle className="h-6 w-6 text-purple-600" />
                      <span
                        className={`text-sm font-medium text-purple-600 transition-opacity ${
                          open ? "opacity-100" : "hidden"
                        }`}
                      >
                        Create Project
                      </span>
                    </Button>
                  </Link>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>

          <UserSection user={user!} open={open} handleSignOut={handleSignOut} />
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 overflow-auto p-6 pt-16 md:pt-6">{children}</main>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-purple-800"
    >
      <Image src={"/RepoGPT.svg"} alt="RepoGPT" width={30} height={30} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-serif font-bold whitespace-pre text-purple-800"
      >
        RepoGPT
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center py-1 text-sm font-normal text-purple-800"
    >
      <Image src={"/RepoGPT.svg"} alt="RepoGPT" width={30} height={30} />
    </Link>
  );
};

interface UserSectionProps {
  user: {
    image?: string | null;
    name: string;
    email: string;
  } | null;
  open: boolean;
  handleSignOut: () => void;
}

const UserSection = ({ user, open, handleSignOut }: UserSectionProps) => {
  return (
    <div
      className={`flex flex-col gap-3 border-t border-gray-200 p-4 ${
        open ? "items-start" : "items-center"
      }`}
    >
      {user ? (
        <div className={`flex ${open ? "w-full" : ""}`}>
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full border ${
              open ? "" : "mx-auto"
            }`}
          >
            <Image
              src={user.image!}
              className="h-9 w-9 rounded-full border"
              width={36}
              height={36}
              alt="User Avatar"
            />
          </div>
          {open && (
            <div className="ml-3 flex flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-neutral-900">
                {user.name}
              </span>
              <span className="truncate text-xs text-neutral-500">
                {user.email}
              </span>
            </div>
          )}
        </div>
      ) : (
        <p className={`text-sm text-neutral-500 ${open ? "" : "hidden"}`}>
          Loading user...
        </p>
      )}
      <Button
        onClick={handleSignOut}
        variant="ghost"
        className={`flex items-center gap-2 text-sm font-medium text-red-500 transition-all hover:bg-red-50 hover:text-red-600 ${
          open
            ? "w-full justify-start px-2 py-1.5"
            : "mt-3 h-9 w-9 justify-center p-0"
        }`}
        title="Logout"
      >
        <LogOut className="h-6 w-6" />
        {open && "Logout"}
      </Button>
    </div>
  );
};
