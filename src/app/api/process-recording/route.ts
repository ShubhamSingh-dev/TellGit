import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { processRecording } from "@/lib/assembly-meetings";
import { db } from "@/lib/db";

const bodyParser = z.object({
  meetingUrl: z.string(),
  meetingId: z.string(),
});

const maxDuration = 300; // 5 minutes without timeout (Vercel)

export async function POST(req: NextRequest) {
  const session = auth.handler(req);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { meetingUrl, meetingId } = bodyParser.parse(body);

    // Process the recording and analyze the insights
    const { summaries, audioDuration } = await processRecording(meetingUrl);

    // Save the insights to the database
    await db.insights.createMany({
      data: summaries.map((summary) => ({
        start: summary.start,
        end: summary.end,
        gist: summary.gist,
        headline: summary.headline,
        summary: summary.summary,
        meetingId,
      })),
    });

    // Update meeting with processed information
    await db.meeting.update({
      where: { id: meetingId },
      data: {
        status: "COMPLETED",
        name: summaries[0]!.headline,
        duration: audioDuration,
      },
    });

    if (!summaries || summaries.length === 0)
      return NextResponse.json({ error: "No insights generated" }, { status: 400 });

    return NextResponse.json({ success: "true" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unauthorized" });
  }
}
