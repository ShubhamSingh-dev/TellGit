import { auth } from "@/lib/auth";
import "@/styles/globals.css";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    // Get user session with consistent method
    const session = await auth.api.getSession({ headers: await headers() });
    // If already authenticated, redirect to dashboard
    if (session?.user?.id) {
      redirect("/dashboard");
    }

    return <>{children}</>;
  } catch (error) {
    return <>{children}</>;
  }
}
