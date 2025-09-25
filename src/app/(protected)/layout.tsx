import SidebarWrapper from "@/app/_components/SidebarWrapper";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import "@/styles/globals.css";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  // If there's no session, redirect to signin
  if (!session?.user.id) {
    redirect("/signin");
  }

  // Fetch the subscription data
  const hasSubscription = await db.subscription.findFirst({
    where: { userId: session.user.id },
    select: { status: true, customerId: true },
  });

  // Create checkout URL
  const encodedName = encodeURIComponent(session.user.name ?? "").replace(
    /%20/g,
    "+",
  );
  const encodedEmail = encodeURIComponent(session.user.email ?? "");
  const checkoutUrl = `https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_jIJgu0EBixLAkIsDljqGcx9fqYbLsjDX3Vhdz3DHc6l/redirect?customerName=${encodedName}&customerEmail=${encodedEmail}`;
  
  try {

    // Handle expired or past due subscriptions
    if (
      hasSubscription?.status === "EXPIRED" ||
      hasSubscription?.status === "PAST_DUE"
    ) {
      redirect("/portal");
    }


    // If user has no customerId, redirect to checkout
    if (hasSubscription?.customerId == null) {
      redirect(checkoutUrl);
    }

    return (
      <>
        <SidebarWrapper>{children}</SidebarWrapper>
        <Toaster richColors />
      </>
    );
  } catch (error) {
    if (hasSubscription?.customerId == null) {
      redirect(checkoutUrl);
    }
    // Only redirect to signin for non-redirect errors
    console.error("Error in protected layout:", error);
    redirect("/signin");
  }
}
