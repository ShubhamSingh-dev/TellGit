"use server";

import { getSession } from "~/server/better-auth/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Updated to a valid Stripe API version.
});

export async function createCheckoutSession(credits: number) {
  const sessionAuth = await getSession();

  if (!sessionAuth?.user?.id) throw new Error("Unauthorized");
  const userId = sessionAuth.user.id;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${credits} TellGit Credits`,
          },
          unit_amount: Math.round((credits / 50) * 100),
        },
        quantity: 1,
      },
    ],
    customer_creation: "always",
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/create`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
    client_reference_id: userId.toString(),
    metadata: {
      credits: credits.toString(),
    },
  });

  if (!session.url) {
    throw new Error("Failed to create Stripe checkout session");
  }

  return redirect(session.url);
}
