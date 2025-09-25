"use client";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthSession } from "@/lib/auth-client";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { Calendar, CreditCard, Github, Info, Package } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

export default function BillingSettings() {
  const { data: projects, isLoading: projectsLoading } =
    api.project.getAllProjects.useQuery();
  const { data: userPlan, isLoading: limitsLoading } =
    api.project.getUserLimits.useQuery();
  const { data: session, isPending: userLoading } = useAuthSession();
  const [progressValue, setProgressValue] = useState(0);

  const remainingHours =
    ((userPlan?.maxMeetingSeconds ?? 0) - (userPlan?.meetingUsage ?? 0)) / 3600;
  const maxHours = (userPlan?.maxMeetingSeconds ?? 0) / 3600;
  const percentRemaining = maxHours > 0 ? (remainingHours / maxHours) * 100 : 0;

  const maxProjects = userPlan?.subscription?.maxProjects ?? 0;
  const remainingProjects = userPlan?.userProjectCount ?? 0;

  // Animate progress bar on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(percentRemaining);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentRemaining]);

  const getProgressColor = () => {
    if (percentRemaining <= 20) return "bg-destructive";
    if (percentRemaining <= 50) return "bg-chart-5";
    return "bg-chart-1";
  };

  const loading = userLoading || projectsLoading || limitsLoading;

  return (
    <div className="text-foreground font-sans font-light">
      <div className="relative">
        <div
          className="absolute top-0 left-0 h-full w-full bg-cover bg-repeat opacity-30"
          style={{ backgroundImage: "url('/img/branding/grid-lines.svg')" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl p-6 md:p-8">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-xl font-light">
                Loading your billing details...
              </div>
            </div>
          ) : (
            <>
              <header className="mb-8 text-center md:text-left">
                <h1 className="mb-2 font-serif text-3xl font-light md:text-4xl">
                  Billing & Settings
                </h1>
                <p className="text-muted-foreground text-lg">
                  Manage your subscription and project resources
                </p>
              </header>

              <div className="grid gap-6 md:grid-cols-2">
                {/* User Details */}
                <Card className="bg-card overflow-hidden rounded-lg border shadow-xs">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center font-serif text-xl font-normal">
                      <Package className="text-primary mr-2 h-5 w-5" />
                      Account Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-medium">{session?.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium">{session?.user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex gap-2">
                        Credits
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="cursor-help">
                              <Info className="h-3.5 w-3.5 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Credits Remaining</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                      <Badge variant="outline" className="font-medium">
                        {userPlan?.userCredits ?? 0}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Subscription Status */}
                <Card className="bg-card overflow-hidden rounded-lg border shadow-xs">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center font-serif text-xl font-normal">
                      <CreditCard className="text-primary mr-2 h-5 w-5" />
                      Subscription
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {userPlan?.subscription ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Plan</span>
                          <Badge className="bg-chart-2 text-white">
                            {userPlan.subscription.planType}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status</span>
                          <span className="font-medium">
                            {userPlan.subscription.status}
                          </span>
                        </div>
                        {userPlan.subscription.endDate && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Expiry
                            </span>
                            <span className="flex items-center font-medium">
                              <Calendar className="text-muted-foreground mr-1 h-4 w-4" />
                              {new Date(
                                userPlan.subscription.endDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="py-4 text-center">
                        <p className="text-muted-foreground mb-4">
                          No active subscription found
                        </p>
                        <Button className="bg-linear-to-br from-slate-600 to-zinc-900 font-serif text-lime-300 hover:translate-y-[-2px]">
                          Upgrade Plan
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Meeting Usage */}
              <Card className="bg-card mt-6 overflow-hidden rounded-lg border shadow-xs">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif text-xl font-normal">
                    Resource Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="mb-2 flex justify-between">
                      <span className="text-muted-foreground">
                        Meeting Hours
                      </span>
                      <span className="font-medium">
                        {remainingHours.toFixed(1)} / {maxHours.toFixed(1)}{" "}
                        hours
                      </span>
                    </div>
                    <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
                      <Progress
                        value={progressValue}
                        className={`h-full ${getProgressColor()}`}
                      />
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {percentRemaining <= 20
                        ? "Running low! Consider upgrading your plan."
                        : "You have plenty of meeting time remaining."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Projects */}
              <Card className="bg-card mt-6 overflow-hidden rounded-lg border shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="font-serif text-xl font-normal">
                    Projects
                  </CardTitle>
                  <Badge className="bg-chart-3 ml-2 text-white">
                    {remainingProjects} / {maxProjects}
                  </Badge>
                </CardHeader>
                <CardContent>
                  {projects?.length ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="bg-secondary/20 hover:bg-secondary/30 rounded-lg border p-4 transition-colors"
                        >
                          <div className="mb-2 font-medium">{project.name}</div>
                          <div className="text-muted-foreground flex items-center text-sm">
                            <Link
                              href={`${project.githubUrl}`}
                              className="hover:text-black/80 hover:underline"
                            >
                              <Github className="mr-1 h-4 w-4" />
                              {project.githubUrl}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground mb-4">
                        You don't have any projects yet
                      </p>
                      <Button className="bg-linear-to-br from-slate-600 to-zinc-900 font-serif text-lime-300 hover:translate-y-[-2px]">
                        Create Your First Project
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <Button
                  className="inline-flex w-full justify-center rounded-lg bg-linear-to-br from-slate-600 to-zinc-900 p-4 text-center font-serif text-lg font-normal text-lime-300 no-underline transition-all duration-150 hover:translate-y-[-2px] hover:shadow-lg sm:w-auto md:px-10"
                  onClick={() => redirect("/portal")}
                >
                  Manage Subscription
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
