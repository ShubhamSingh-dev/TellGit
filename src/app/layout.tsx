import "@/styles/globals.css";
import { type Metadata, type Viewport } from "next";
import { Bricolage_Grotesque, Lexend } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://repogpt.sohamgupta.me"),
  title: {
    default: "RepoGPT — your codebase brought to life",
    template: `%s | RepoGPT`,
  },
  description:
    "Conversational AI for GitHub repositories that creates vector embeddings of your code, providing context-based answers and insights. It also summarizes and provides key insights from uploaded meetings.",
  keywords: [
    "GitHub",
    "repository",
    "AI",
    "code",
    "conversation",
    "meeting summarizer",
    "meeting insights",
    "knowledge",
    "kt",
  ],
  authors: [{ name: "Soham Gupta" }],

  // Open Graph
  openGraph: {
    title: "RepoGPT — your codebase brought to life",
    description:
      "Conversational AI for GitHub repositories that creates vector embeddings of your code, providing context-based answers and insights about your source code.",
    images: ["/og.png"],
    siteName: "RepoGPT",
    url: "https://repogpt.sohamgupta.me",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "RepoGPT",
    description:
      "Conversational AI for GitHub repositories, providing context-based answers and insights about your source code.",
    images: ["/og.png"],
    creator: "@sohamgpt",
  },

  // Additional metadata
  icons: {
    icon: "/favicon.ico",
  },
};

// Add viewport export as recommended by Next.js
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${lexend.variable}`}
    >
      <body className="bg-background text-foreground font-sans antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
