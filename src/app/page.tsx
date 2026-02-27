import { getSession } from "~/server/better-auth/server";
import { redirect } from "next/navigation";
import { LandingPage } from "~/components/landing-page";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return <LandingPage />;
}
