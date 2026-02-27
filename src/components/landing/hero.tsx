"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, GitCommit, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative pt-24 pb-32 border-b border-border overflow-hidden" id="hero">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.4,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 relative z-10 text-center"
      >
        <motion.div variants={itemVariants} className="inline-block border border-primary/30 bg-primary/10 px-3 py-1 mb-8 rounded-full">
          <span className="font-mono text-primary text-xs flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> v1.0.4 - Intelligence for Repositories
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 italic uppercase leading-tight tracking-tight text-foreground"
        >
          Understand Your <br />
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% auto",
              backgroundImage: "linear-gradient(to right, hsl(var(--primary)), #818cf8, hsl(var(--primary)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="px-2"
          >
            Codebase.
          </motion.span>
          <br className="md:hidden" /> Instantly.
        </motion.h1>

        <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12 font-mono leading-relaxed">
          &gt; Connect your GitHub repository. Ask complex questions. Get precise answers based on your actual source code and commit history.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/signin" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "4px 4px 0px 0px hsl(var(--primary))", x: -2, y: -2 }}
              whileTap={{ scale: 0.95, boxShadow: "0px 0px 0px 0px hsl(var(--primary))", x: 0, y: 0 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-6 font-bold font-mono text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-colors rounded-none"
              >
                GET STARTED FREE <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </Link>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-6 font-bold font-mono text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-2 rounded-none"
            >
              <Github className="w-4 h-4" /> VIEW DEMO
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="max-w-4xl mx-auto mt-24 p-px bg-border relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        <div className="bg-card p-6 font-mono text-sm text-muted-foreground border border-border shadow-2xl relative z-10 sharp-corners">
          <div className="flex gap-2 mb-6 border-b border-border pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          </div>
          <div className="space-y-3 font-mono">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <p><span className="text-success font-bold">$</span> tellgit init --repo="org/main-api"</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
              <p className="text-blue-400 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full"
                />
                Indexing 452 files...
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
              <p className="text-yellow-400 flex items-center gap-2">
                 <GitCommit className="w-4 h-4" /> Embedding commit history...
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}>
              <p className="mt-4"><span className="text-success font-bold">$</span> tellgit ask "Where is the auth middleware defined?"</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 5, duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="text-foreground border-l-2 border-primary pl-4 mt-3 py-2 bg-primary/5 rounded-r">
                The auth middleware is defined in <span className="text-primary font-bold">src/middleware/auth.ts</span>.<br/> 
                It was recently updated in commit <code className="bg-muted px-1.5 py-0.5 rounded text-muted-foreground">a7f2d9</code> to support JWT revocation.
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
