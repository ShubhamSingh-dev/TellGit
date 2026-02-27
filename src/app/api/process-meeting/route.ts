import { NextResponse, type NextRequest } from "next/server";
import z from "zod";
import { processMeeting } from "~/lib/assembly";

import { getSession } from "~/server/better-auth/server";
import { db } from "~/server/db";

const bodyParser = z.object({
  meetingUrl: z.string().url(),
  projectId: z.string(),
  meetingId: z.string(),
});

export const maxDuration = 300; // 5 minutes

// POST /api/process-meeting
export async function POST(req: NextRequest) {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as unknown;
    const { meetingUrl, meetingId } = bodyParser.parse(body);
    const { summaries } = await processMeeting(meetingUrl);
    await db.issue.createMany({
      data: summaries.map((summary) => ({
        start: summary.start,
        end: summary.end,
        gist: summary.gist,
        headline: summary.headline,
        summary: summary.summary,
        meetingId,
      })),
    });

    await db.meeting.update({
      where: {
        id: meetingId,
      },
      data: {
        status: "COMPLETED",
        name: summaries[0]?.headline ?? "Meeting Summary",
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing meeting:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body", details: error.errors },
        { status: 400 },
      );
    }
    // Explicitly casting error to any to avoid "Unsafe assignment of an error typed value" lint error
    // when creating the JSON response, although usually Next.js handles unknown error objects reasonably well.
    // A better approach is to not return the raw error object if possible, or validate it.
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
