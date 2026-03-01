"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary flex items-center justify-center font-bold text-primary-foreground italic group-hover:scale-110 transition-transform">
            TG
          </div>
          <span className="font-bold tracking-[0.2em] font-mono text-xs uppercase group-hover:text-primary transition-colors">
            TellGit
          </span>
        </Link>
        <div className="hidden md:flex gap-8 font-mono text-xs uppercase">
          <a href="#features" className="hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">
            Workflow
          </a>
          <a href="#pricing" className="hover:text-primary transition-colors">
            Pricing
          </a>
        </div>
        <Link href="/signin">
          <Button
            asChild
            className="font-bold font-mono uppercase transition-colors shadow-[0_0_15px_rgba(79,70,229,0.5)]"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LOGIN
            </motion.div>
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
}
