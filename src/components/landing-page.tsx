"use client";

import React from "react";
import { Navigation } from "./landing/navigation";
import { Hero } from "./landing/hero";
import { Features } from "./landing/features";
import { Workflow } from "./landing/workflow";
import { Pricing } from "./landing/pricing";
import { TechStack } from "./landing/tech-stack";
import { Footer } from "./landing/footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary selection:text-primary-foreground">
      <Navigation />
      <Hero />
      <Features />
      <Workflow />
      <Pricing />
      <TechStack />
      <Footer />
    </div>
  );
}
