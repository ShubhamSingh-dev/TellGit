import z from "zod";
import { createTRPCRouter, protectedProcedure} from "../trpc";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        repoUrl: z.string(),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.create({
        data: {
          name: input.name,
          repoUrl: input.repoUrl,
          githubToken: input.githubToken,
          userToProjects: {
            create: {
              userId: ctx.session.user.id,
            },
          },
        },
      });
      return project;
    }),
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany({
      where: {
        userToProjects: {
          some: {
            userId: ctx.session.user.id,
          },
        },
        deletedAt: null
      },
    });
    
    return projects;
  }),
});