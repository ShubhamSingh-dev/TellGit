"use client";

import useProject from "~/hooks/use-project";
import Link from "next/link";
import { 
  ExternalLink, 
  Terminal, 
  Paperclip, 
  Presentation, 
  Activity, 
  GitCommit, 
  Brain, 
  Zap, 
  MessageSquare,
  Bot
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

export default function DashboardPage() {
  const { project } = useProject();
  
  return (
    <div className="flex-1 overflow-y-auto bg-charcoal-950 p-8">
      {project?.id}
      {/* Header Section */}
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center bg-brand-primary/10 border rounded-sm border-brand-primary/30 justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-brand-primary text-white rounded-sm flex items-center justify-center">
              <FaGithub className="size-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm font-mono">REPO: {project?.name}</h2>
              <div className="flex items-center gap-2">
                 <p className="text-brand-primary text-sm font-bold tracking-wider">LINK:</p>
                 <Link href={project?.repoUrl || ""} target="_blank" className="text-brand-primary text-sm font-bold tracking-wider hover:underline flex items-center gap-1">
                    {project?.repoUrl}
                    <ExternalLink className="size-3" />
                 </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="rounded-sm bg-charcoal-900 border border-charcoal-700 text-white px-3 py-1.5 font-bold text-[10px] uppercase hover:bg-charcoal-800 transition-colors cursor-pointer">Members</Button>
            <Button variant="outline" size="sm" className="rounded-sm bg-charcoal-900 border border-charcoal-700 text-white px-3 py-1.5 font-bold text-[10px] uppercase hover:bg-charcoal-800 transition-colors cursor-pointer">Invite</Button>
            <Button variant="outline" size="sm" className="rounded-sm bg-charcoal-900 border border-charcoal-700 text-white px-3 py-1.5 font-bold text-[10px] uppercase hover:bg-charcoal-800 transition-colors cursor-pointer">Archive</Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Ask Code Assistant */}
          <section className="lg:col-span-2 border border-charcoal-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6 ">
              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-tight italic">Ask Code Assistant</h2>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Natural language codebase querying</p>
              </div>
              <div className="text-brand-primary bg-brand-primary/10 p-2 rounded-sm">
                <Terminal className="size-5" />
              </div>
            </div>
            <div className="relative group">
              <Textarea 
                className="w-full h-40 p-5 bg-charcoal-900 border border-charcoal-800 rounded-sm focus:border-brand-primary transition-all resize-none text-white placeholder:text-slate-600 outline-none font-mono text-sm focus-visible:ring-0 focus-visible:ring-offset-0" 
                placeholder="> Query: How does the authentication flow work in the account module?"
              />
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button 
                  size="icon"
                  variant="ghost"
                  className="text-slate-500 hover:text-brand-primary hover:bg-transparent transition-colors"
                  aria-label="Attach file"
                >
                  <Paperclip className="size-5" />
                </Button>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {/* Placeholders for user avatars */}
                  <div className="w-7 h-7 rounded-sm border border-charcoal-950 bg-slate-700" />
                  <div className="w-7 h-7 rounded-sm border border-charcoal-950 bg-slate-600" />
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">12 Active Nodes</span>
              </div>
              <Button className="bg-brand-primary text-white h-auto px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-brand-primary/80 transition-all">
                Execute Query
              </Button>
            </div>
          </section>

          {/* Meeting Context */}
          <section className="border border-charcoal-800 p-6 flex flex-col items-center justify-between text-center">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-charcoal-900 border border-charcoal-800 rounded-sm flex items-center justify-center text-slate-500 mx-auto">
                <Presentation className="size-8" />
              </div>
              <div>
                <h2 className="text-md font-bold text-white uppercase italic tracking-tighter">Meeting Context</h2>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">Link conversational outcomes to source files.</p>
              </div>
            </div>
            <div className="w-full space-y-3 mt-6">
              <Button variant="outline" className="w-full h-auto border-white border-2 text-white py-3 rounded-sm font-bold text-[10px] uppercase hover:bg-white hover:text-charcoal-950 transition-all">
                Upload Recording
              </Button>
              <p className="text-[9px] text-brand-primary font-bold tracking-[0.2em] uppercase">Enterprise Layer</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
 