import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Checkout } from "@polar-sh/nextjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;

  if (!userId) redirect("/signin");

  const isActive = await db.subscription.findFirst({
    where: { userId },
    select: { status: true },
  });

  if (isActive?.status === "ACTIVE") redirect("/dashboard");

  // Use the Checkout function to create a handler
  const checkoutHandler = Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    successUrl: `https://repogpt.sohamgupta.me/dashboard`,
    server: process.env.POLAR_SERVER as "production" | "sandbox"
  });

  // Pass the request to the handler
  return checkoutHandler(request);
};