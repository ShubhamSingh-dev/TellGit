import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { db } from "~/server/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Updated to a valid Stripe API version. 2026-02-25.clover is likely fictional or preview.
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new NextResponse("Missing signature or webhook secret", {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return new NextResponse("Webhook signature verification failed", {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const credits = Number(session.metadata?.credits);
    const userId = session.client_reference_id!; // Using ! assertion as we expect client_reference_id to be present

    if (!userId || isNaN(credits)) {
      console.error("Missing user id or invalid credits in webhook session");
      return new NextResponse("Missing user id or credits", { status: 400 });
    }

    try {
      await db.stripeTransaction.create({
        data: { userId, credits },
      });
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          credits: {
            increment: credits,
          },
        },
      });

      return NextResponse.json(
        { message: "Credits added successfully" },
        { status: 200 },
      );
    } catch (dbError) {
      console.error("Database error updating credits:", dbError);
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
  return new NextResponse("Received", { status: 200 });
}
