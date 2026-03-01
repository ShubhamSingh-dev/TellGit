"use client";

import React from "react";
import { motion } from "motion/react";

export function TechStack() {
  const technologies = [
    "GITHUB",
    "GEMINI AI",
    "ASSEMBLY AI",
    "POSTGRESQL",
    "NEXT.JS",
    "FRAMER MOTION",
    "TYPESCRIPT",
  ];

  return (
    <section className="py-20 border-t border-border bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-xs font-bold text-center text-primary mb-12 uppercase tracking-widest">
          POWERING THE INTELLIGENCE ENGINE
        </p>
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-16 w-max opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        >
          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              {technologies.map((tech) => (
                <span
                  key={`${tech}-${i}`}
                  className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground to-muted-foreground/50 italic font-mono px-8"
                >
                  {tech}
                </span>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
