import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DIRECT_URL: z.string().url().optional(),
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    GITHUB_OCTOKIT_TOKEN: z.string(),
    GEMINI_API_KEY: z.string(),
    ASSEMBLYAI_API_KEY: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  client: {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: z.string(),
    NEXT_PUBLIC_APPWRITE_BUCKET_ID: z.string(),
  },
  runtimeEnv: {
    DIRECT_URL: process.env.DIRECT_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    GITHUB_OCTOKIT_TOKEN: process.env.GITHUB_OCTOKIT_TOKEN,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    ASSEMBLYAI_API_KEY: process.env.ASSEMBLYAI_API_KEY,
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT_ID:
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    NEXT_PUBLIC_APPWRITE_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
