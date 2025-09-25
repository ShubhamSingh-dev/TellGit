import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";
import { checkCredits, indexGitHubRepo } from "@/lib/github-loader";
import { deleteFile } from "@/lib/appwrite";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        githubUrl: z.string()
          .regex(
            /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-_]+$/,
            "Invalid GitHub repository URL",
          ),
        projectName: z.string(),
        githubSecret: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id! },
        select: { credits: true },
      });

      const userCredits = user?.credits ?? 0;
      const fileCount = await checkCredits(input.githubUrl, input.githubSecret);

      if (fileCount > userCredits) {
        throw new Error(`Insufficient credits. Required: ${fileCount}, Available: ${userCredits}`);
      }

      const project = await ctx.db.project.create({
        data: {
          githubUrl: input.githubUrl,
          name: input.projectName,
          users: {
            create: {
              userId: ctx.session?.user?.id,
            },
          },
        },
      });
      await indexGitHubRepo(project.id, input.githubUrl, input.githubSecret);
      await pollCommits(project.id);
      await ctx.db.user.update({
        where: { id: ctx.session.user.id! },
        data: { credits: { decrement: fileCount } },
      });
      return project;
    }),

  getAllProjects: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.project.findMany({
      where: {
        users: {
          some: {
            userId: ctx.session.user.id,
          },
        },
        deletedAt: null,
      },
    });
  }),

  getCommits: protectedProcedure.input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      pollCommits(input.projectId).then().catch(console.error);

      return await ctx.db.commitLogs.findMany({
        where: { projectId: input.projectId },
      });
    }),

  getProjectStatus: protectedProcedure.input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
        select: { indexingStatus: true },
      });
      return project?.indexingStatus || "PENDING";
    }),

  saveAnswer: protectedProcedure.input(
    z.object({
      projectId: z.string(),
      question: z.string(),
      fileReferences: z.any(),
      answer: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id!;
    const subscription = await ctx.db.subscription.findFirst({
      where: { userId, status: "ACTIVE" }, select: { maxQuestions: true },
    });
    if (!subscription) {
      throw new TRPCError({ code: "FORBIDDEN", message: "No active subscription found." });
    }
    const userQuestionCount = await ctx.db.question.count({ where: { userId } });

    // Check if the limit is reached
    if (userQuestionCount >= subscription.maxQuestions) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Save Question limit reached for your plan." });
    }

    return await ctx.db.question.create({
      data: {
        projectId: input.projectId,
        question: input.question,
        fileReferences: input.fileReferences,
        answer: input.answer,
        userId,
      },
    });
  }),

  getQuestions: protectedProcedure.input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.question.findMany({
        where: { projectId: input.projectId },
        include: { user: true },
        orderBy: { createdAt: "desc", },
      });
    }),

  deleteAnswer: protectedProcedure.input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.question.delete({
        where: { id: input.id },
      });
    }),

  uploadMeeting: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        meetingUrl: z.string(),
        name: z.string(),
        fileName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.meeting.create({
        data: {
          projectId: input.projectId,
          name: input.name,
          meetingUrl: input.meetingUrl,
          status: "PROCESSING",
          userId: ctx.session.user.id!,
          fileName: input.fileName,
        },
      });
    }),

  getMeetings: protectedProcedure.input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.meeting.findMany({
        where: { projectId: input.projectId },
        include: { insights: true },
      });
    }),

  deleteMeeting: protectedProcedure.input(z.object({ meetingId: z.string(), fileName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await deleteFile(input.fileName);
      return await ctx.db.meeting.delete({
        where: {
          id: input.meetingId,
        },
      });
    }),

  getInsights: protectedProcedure.input(z.object({ meetingId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.meeting.findUnique({
        where: { id: input.meetingId, },
        include: { insights: true },
      });
    }),

  archiveProject: protectedProcedure.input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.project.update({
        where: { id: input.projectId },
        data: { deletedAt: new Date() },
      });
    }),

  getTeamMembers: protectedProcedure.input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.userToProject.findMany({
        where: { projectId: input.projectId },
        select: { id: true, user: true },
      });
      // Randomly select 5 members
      // return allMembers.sort(() => Math.random() - 0.5).slice(0, 5);
    }),

  checkCredits: protectedProcedure.input(z.object({ githubUrl: z.string(), githubSecret: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const fileCount = await checkCredits(input.githubUrl, input.githubSecret);
      const userCredits = await ctx.db.user.findUnique({ where: { id: ctx.session.user.id! }, select: { credits: true } });
      return { fileCount, userCredits: userCredits?.credits ?? 0 };
    }),

  getUserLimits: protectedProcedure.query(async ({ ctx }) => {
    const userCredits = await ctx.db.user.findUnique({ where: { id: ctx.session.user.id! }, select: { credits: true } });
    const subscription = await ctx.db.subscription.findFirst({
      where: { userId: ctx.session.user.id!, status: "ACTIVE" },
      select: { planType: true, maxMeetingSeconds: true, maxQuestions: true, maxProjects: true, maxTeamMembers: true, startDate: true, endDate: true, status: true },
    });
    const userProjectCount = await ctx.db.project.count({ where: { users: { some: { userId: ctx.session.user.id! } } } });
    const userQuestionCount = await ctx.db.question.count({ where: { userId: ctx.session.user.id! } });
    const userMeetingCount = await ctx.db.meeting.count({ where: { userId: ctx.session.user.id } });
    // Calculate total meeting duration for the current billing period
    const totalMeetingDuration = await ctx.db.meeting.aggregate({
      where: { userId: ctx.session.user.id, createdAt: { gte: subscription?.startDate, lte: subscription?.endDate } },
      _sum: { duration: true }
    });
    return {
      userCredits: userCredits?.credits ?? 0,
      subscription,
      remainingQuestions: subscription ? (subscription.maxQuestions - userQuestionCount) : 0,
      meetingUsage: totalMeetingDuration._sum.duration,
      maxMeetingSeconds: subscription?.maxMeetingSeconds,
      userMeetingCount,
      userProjectCount,
    };
  }),
});
