import { getSession } from "~/server/better-auth/server";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    // User is not authenticated
    return <div>Not authenticated</div>;
  }

  const userName = session.user.name;

  return <div>Welcome, {userName}!</div>;
}
