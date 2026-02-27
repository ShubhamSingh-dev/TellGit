import { redirect } from 'next/navigation';
import { db } from '~/server/db';
import { getSession } from '~/server/better-auth/server';

type Props = {
    params: Promise<{projectId: string}>
}

const JoinHandler = async ({params}: Props) => {
    const {projectId} = await params;
    
    const session = await getSession();
    if(!session?.user?.id) redirect("/sign-in");
    
    const userId = session.user.id;

    const project = await db.project.findUnique({
        where: {
            id: projectId
        }
    })
    
    if(!project) redirect("/dashboard");
    
    try {
        await db.userToProject.create({
            data: {
                userId: userId,
                projectId: projectId,
            }
        })
    } catch (error) {
      console.log("User already in project")  
    }
    
    return redirect(`/dashboard`);
}

export default JoinHandler;