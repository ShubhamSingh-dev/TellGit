"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { Button } from "~/components/ui/button";

export function Pricing() {
  const [sliderValue, setSliderValue] = useState(2500);
  const price = Math.floor(10 + sliderValue * 0.015);

  return (
    <section className="py-32 bg-background" id="pricing">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-mono text-xs font-bold text-primary mb-3 uppercase tracking-widest">Pricing</h2>
          <h3 className="text-4xl md:text-5xl font-black italic uppercase text-foreground">Pay for what you index.</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          whileHover={{ y: -5 }}
          className="bg-card border border-border p-10 lg:p-14 shadow-2xl relative overflow-hidden group sharp-corners"
        >
          {/* Animated border trim */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

          <div className="flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-border pb-8">
              <div>
                <p className="font-mono text-xs font-bold text-primary mb-2 tracking-wider">UNIT OF COMPUTE</p>
                <h4 className="text-3xl font-black uppercase text-foreground flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" /> 1 Credit = 1 File
                </h4>
              </div>
              <div className="text-left sm:text-right">
                <motion.span
                  key={price}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#818cf8] to-primary"
                >
                  ${price}
                </motion.span>
                <span className="font-mono text-sm text-muted-foreground ml-2">/mo</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between font-mono text-xs font-bold text-muted-foreground uppercase">
                <span>500 Files</span>
                <span>10,000 Files</span>
              </div>
              
              <div className="relative pt-1">
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-none appearance-none cursor-pointer outline-none"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) ${(sliderValue - 500) / 95}%, var(--color-charcoal-800) ${(sliderValue - 500) / 95}%)`,
                  }}
                />
                <style>{`
                  input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: #fff;
                    border: 2px solid hsl(var(--primary));
                    cursor: pointer;
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(79, 70, 229, 0.5);
                  }
                `}</style>
              </div>
              
              <div className="text-center pt-2">
                <span className="font-mono text-sm uppercase text-muted-foreground">Target: <span className="text-foreground font-bold text-lg">{sliderValue.toLocaleString()}</span> Credits</span>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm text-muted-foreground mt-4">
              {[
                "Unlimited repository connections",
                "Gemini 1.5 Pro inference engine",
                "Priority file re-indexing",
                "Webhooks & CI/CD integration"
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3"
                >
                  <span className="text-primary flex-shrink-0">✓</span> {feature}
                </motion.li>
              ))}
            </ul>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="w-full py-6 font-bold font-mono text-sm tracking-wider uppercase transition-colors shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] rounded-none"
              >
                CHOOSE PLAN
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
