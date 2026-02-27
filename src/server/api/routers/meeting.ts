import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const meetingRouter = createTRPCRouter({
  uploadMeeting: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        meetingUrl: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const meeting = await ctx.db.meeting.create({
        data: {
          meetingUrl: input.meetingUrl,
          projectId: input.projectId,
          name: input.name,
          status: "PROCESSING",
        },
      });
      return meeting;
    }),
  getMeetings: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.meeting.findMany({
        where: {
          projectId: input.projectId,
        },
        include: {
          issues: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  deleteMeeting: protectedProcedure
    .input(
      z.object({
        meetingId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.meeting.delete({
        where: {
          id: input.meetingId,
        },
      });
    }),
  getMeetingById: protectedProcedure
    .input(
      z.object({
        meetingId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.meeting.findUnique({
        where: {
          id: input.meetingId,
        },
        include: {
          issues: true,
        },
      });
    }),
});
