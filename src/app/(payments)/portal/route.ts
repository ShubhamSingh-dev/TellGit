import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { CustomerPortal } from "@polar-sh/nextjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user.id;

    if (!userId) redirect("/signin");

    // Use the Checkout function to create a handler
    const checkoutHandler = CustomerPortal({
        accessToken: process.env.POLAR_ACCESS_TOKEN!,
        getCustomerId: async (req: NextRequest) => {
            const session = await auth.api.getSession({ headers: await headers() });
            if (!session) return '';

            const user = await db.user.findUnique({
                where: { id: session.user.id },
                select: { customerId: true },
            });

            return user?.customerId ?? '';
        }, // Function to resolve a Polar Customer ID
        server: process.env.POLAR_SERVER as "production" | "sandbox",
    });

    // Pass the request to the handler
    return checkoutHandler(request);
};
