"use client";

import React from "react";
import { motion } from "framer-motion";

export function Workflow() {
  const steps = [
    { step: "01", title: "Connect Repo", desc: "Securely sync your GitHub repositories. We support private and public repos with enterprise-grade security." },
    { step: "02", title: "Ask & Upload", desc: "Submit queries via text or upload engineering meetings for transcription and code-mapping." },
    { step: "03", title: "Get Insights", desc: "Receive accurate, grounded answers, diagrams, and summaries driven by advanced LLMs." }
  ];

  return (
    <section className="py-32 border-y border-border bg-background relative overflow-hidden" id="how-it-works">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="font-mono text-xs font-bold text-primary mb-3 uppercase tracking-widest">Workflow</h2>
          <h3 className="text-4xl md:text-5xl font-black italic uppercase text-foreground">Three Steps to Insight.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[40px] left-1/6 right-1/6 w-2/3 h-px border-t-2 border-dashed border-border mx-auto z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 text-center flex flex-col items-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180, borderRadius: "50%" }}
                transition={{ duration: 0.4 }}
                className="w-20 h-20 bg-card border-2 border-primary flex items-center justify-center text-2xl font-black font-mono text-primary mb-8 shadow-[0_0_30px_rgba(79,70,229,0.2)] bg-opacity-80 backdrop-blur"
              >
                <motion.span whileHover={{ rotate: -180 }} transition={{ duration: 0.4 }}>
                  {step.step}
                </motion.span>
              </motion.div>
              <h4 className="text-2xl font-bold mb-4 italic uppercase text-foreground">{step.title}</h4>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
