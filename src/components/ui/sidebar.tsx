"use client";

import { cn } from "@/lib/utils";
import { type HTMLMotionProps, motion } from "framer-motion";
import Link, { type LinkProps } from "next/link";
import type React from "react";
import { createContext, useContext, useState } from "react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp ?? openState;
  const setOpen = setOpenProp ?? setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
  className,
  ...props
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      <div className={cn("h-full", className)} {...props}>
        {children}
      </div>
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as MobileSidebarProps)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      {...(props as React.ComponentProps<typeof motion.div>)}
      className={cn(
        "hidden h-full w-[300px] shrink-0 border-r border-gray-200 px-4 py-4 md:flex md:flex-col",
        className,
      )}
      animate={{
        width: animate ? (open ? "300px" : "70px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface MobileSidebarProps extends HTMLMotionProps<"div"> {
  className?: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const MobileSidebar = ({
  className,
  children,
  open,
  setOpen,
  ...props
}: MobileSidebarProps) => {
  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 md:hidden"
        onClick={() => setOpen(false)}
        style={{ display: open ? "block" : "none" }}
      />
      <motion.div
        {...(props as React.ComponentProps<typeof motion.div>)}
        initial={{ x: "-100%" }}
        animate={{ x: open ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[300px] p-4 md:hidden",
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
} & LinkProps) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      className={cn(
        "group/sidebar flex items-center rounded-md p-1 text-neutral-700 hover:text-neutral-900",
        open ? "justify-start gap-2" : "justify-center",
        className,
      )}
      {...props}
      href={link.href}
    >
      <div className="flex h-6 w-6 items-center justify-center">
        {link.icon}
      </div>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="m-0! inline-block p-0! text-sm whitespace-pre transition duration-150 group-hover/sidebar:translate-x-1"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

export const SidebarGroup = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
};

export const SidebarGroupLabel = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { open, animate } = useSidebar();
  return (
    <motion.div
      {...(props as React.ComponentProps<typeof motion.div>)}
      animate={{
        display: animate ? (open ? "block" : "none") : "block",
        opacity: animate ? (open ? 1 : 0) : 1,
      }}
      className={cn(
        "text-xs font-semibold tracking-wider text-neutral-500 uppercase",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const SidebarGroupContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  );
};
