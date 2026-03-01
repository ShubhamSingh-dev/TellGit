import { getSession } from "~/server/better-auth/server";
import { UserButton } from "./user-button";

export const UserButtonServer = async () => {
  const session = await getSession();

  if (!session?.user) {
    return <UserButton user={null} />;
  }

  const nameParts = session.user.name?.split(" ") ?? ["", ""];
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ") ?? "";

  return (
    <UserButton
      user={{
        id: session.user.id,
        email: session.user.email,
        firstName,
        lastName,
        image: session.user.image ?? undefined,
      }}
    />
  );
};
