import 'server-only';
import { AssemblyAI } from "assemblyai";
import { db } from './db';
import { auth } from './auth';
import { headers } from 'next/headers';

const client = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY! });

function msToTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export const processRecording = async (meetingUrl: string) => {
  const transcript = await client.transcripts.transcribe({
    audio: meetingUrl,
    auto_chapters: true,
    // audio_end_at: 2700000, // 45 minutes in ms (Starter Plan)
  });

  const summaries =
    transcript.chapters?.map((chapter) => ({
      start: msToTime(chapter.start),
      end: msToTime(chapter.end),
      gist: chapter.gist,
      headline: chapter.headline,
      summary: chapter.summary,
    })) || [];

  if (!transcript.text) throw new Error("No transcripts found.");

  // $0.45/hr and 1 credit = $0.005
  const creditsSpent = Math.ceil(transcript.audio_duration! * (0.6 / 3600) / 0.005);
  const session = await auth.api.getSession({ headers: await headers() });
  await db.user.update({
    where: { id: session?.user.id },
    data: { credits: { decrement: creditsSpent } }
  });

  return { summaries, creditsSpent, audioDuration: transcript.audio_duration };
};
