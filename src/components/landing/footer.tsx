"use client";

import React from "react";
import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary flex items-center justify-center font-bold text-primary-foreground italic">TG</div>
              <span className="font-bold tracking-[0.2em] font-mono text-xs uppercase text-foreground">TellGit</span>
            </div>
            <p className="text-muted-foreground font-mono text-sm max-w-md mb-8 leading-relaxed">
              Built for developers who ship fast. Deep codebase intelligence without the fluff. Stop searching, start asking.
            </p>
            <div className="flex gap-6 text-muted-foreground">
              <Github className="w-6 h-6 cursor-pointer hover:text-foreground transition-colors" />
              <svg className="w-6 h-6 cursor-pointer hover:text-foreground transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
          </div>
          
          <div>
            <h5 className="font-mono text-sm font-bold text-foreground mb-6 uppercase tracking-wider">Product</h5>
            <ul className="text-muted-foreground font-sans text-sm space-y-4">
              <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-mono text-sm font-bold text-foreground mb-6 uppercase tracking-wider">Company</h5>
            <ul className="text-muted-foreground font-sans text-sm space-y-4">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest text-center">
            © {new Date().getFullYear()} TELLGIT ENGINE. ALL RIGHTS RESERVED. RUNNING ON EDGE.
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  );
}
