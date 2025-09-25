import { db } from '@/lib/db';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            redirectUri: process.env.BETTER_AUTH_URL! + "/api/auth/callback/google"
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            redirectUri: process.env.BETTER_AUTH_URL! + "/api/auth/callback/github"
        }
    },
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    // plugins: [nextCookies()],
});
