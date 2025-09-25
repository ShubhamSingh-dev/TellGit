import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ projectId: string }>;
};

const JoinProject = async (props: Props) => {
  const { projectId } = await props.params;
  const session = await auth.api.getSession({ headers: await headers() });
  const dbUser = await db.user.findUnique({
    where: { id: session?.user.id },
  });

  if (!dbUser || !session?.user.id) return redirect("/signin");

  const project = await db.project.findUnique({ where: { id: projectId } });

  if (!project) return redirect("/dashboard");

  try {
    await db.userToProject.create({ data: { userId: dbUser.id, projectId } });
  } catch (error) {
    console.error("Already a part of the Project 🪿", error);
  }
  return redirect("/dashboard");
};

export default JoinProject;
