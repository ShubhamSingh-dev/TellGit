"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createAuthClient } from "better-auth/react";
import { Github, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import Image from "next/image";

export default function SocialSignIn() {
  const { signIn } = createAuthClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<{
    google: boolean;
    github: boolean;
  }>({
    google: false,
    github: false,
  });
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // On mount, read the "plan" query parameter from the URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    setSelectedPlan(plan);
  }, []);

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setIsLoading((prev) => ({ ...prev, [provider]: true }));
    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
        newUserCallbackURL: selectedPlan
          ? `/checkout?plan=${selectedPlan}`
          : `/dashboard`,
      });
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md overflow-hidden border shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="from-primary/80 to-primary mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            {/* <Image src="/RepoGPT.svg" alt="RepoGPT" width={35} height={35} /> */}
          </div>
          <CardTitle className="text-xl font-bold">
            Welcome to TellGit
          </CardTitle>
          <CardDescription>Continue with your social account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          <Button
            variant="outline"
            className={cn(
              "group border-muted hover:border-primary/20 hover:bg-primary/5 relative w-full gap-3 overflow-hidden rounded-lg border-2 py-6 text-base font-medium transition-all duration-200",
            )}
            onClick={() => handleSocialSignIn("google")}
            disabled={isLoading.google || isLoading.github}
          >
            {isLoading.google ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <div className="bg-muted/30 absolute bottom-0 left-0 flex h-full w-12 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="transition-transform duration-200 group-hover:scale-110"
                  >
                    <path
                      fill="currentColor"
                      d="M11.99 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05c0 5.71-3.83 9.77-9.6 9.77c-5.52 0-10-4.48-10-10S6.48 2 12 2c2.7 0 4.96.99 6.69 2.61l-2.84 2.76c-.72-.68-1.98-1.48-3.85-1.48c-3.31 0-6.01 2.75-6.01 6.12s2.7 6.12 6.01 6.12c3.83 0 5.24-2.65 5.5-4.22h-5.51z"
                    ></path>
                  </svg>
                </div>
                <span className="ml-4">Continue with Google</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            className={cn(
              "group border-muted hover:border-primary/20 hover:bg-primary/5 relative w-full gap-3 overflow-hidden rounded-lg border-2 py-6 text-base font-medium transition-all duration-200",
            )}
            onClick={() => handleSocialSignIn("github")}
            disabled={isLoading.google || isLoading.github}
          >
            {isLoading.github ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <div className="bg-muted/30 absolute bottom-0 left-0 flex h-full w-12 items-center justify-center">
                  <Github className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                </div>
                <span className="ml-4">Continue with GitHub</span>
              </>
            )}
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center px-6 pt-0 pb-6">
          <p className="text-muted-foreground mt-4 text-center text-xs">
            By continuing, you agree to our{" "}
            <Button
              variant="link"
              className="h-auto p-0 text-xs font-normal"
              onClick={() => router.push("/tos")}
            >
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button
              variant="link"
              className="h-auto p-0 text-xs font-normal"
              onClick={() => router.push("/privacy-policy")}
            >
              Privacy Policy
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
