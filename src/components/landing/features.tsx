"use client";

import React from "react";
import { motion } from "motion/react";
import { Code2, GitCommit, Users, Terminal } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Code2 className="w-10 h-10" />,
      title: "Ask Your Codebase",
      desc: "Context-aware natural language search through your entire repository logic and structure."
    },
    {
      icon: <GitCommit className="w-10 h-10" />,
      title: "Commit Intelligence",
      desc: "Understand the 'Why' behind every change. We analyze Git history to provide context."
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Meeting Analysis",
      desc: "Upload standups or technical recordings. Link spoken requirements to lines of code."
    },
    {
      icon: <Terminal className="w-10 h-10" />,
      title: "Team Collaboration",
      desc: "Share insights and technical summaries across the engineering team to onboard faster."
    }
  ];

  return (
    <section className="py-24 bg-background" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="font-mono text-xs font-bold text-primary mb-3 uppercase tracking-widest">Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-black italic uppercase text-foreground">Technical Intelligence.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ backgroundColor: "var(--color-charcoal-900)" }}
              className="bg-card p-8 group transition-colors cursor-pointer hover:bg-muted/50"
            >
              <div className="mb-6 text-primary drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase italic text-foreground">{feature.title}</h4>
              <p className="text-muted-foreground text-sm font-mono leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
