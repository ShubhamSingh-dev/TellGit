import InsightsList from "./insights";

type InsightsProps = {
  params: Promise<{ meetingId: string }>;
};

export default async function Insights({ params }: InsightsProps) {
  const { meetingId } = await params;
  return <InsightsList meetingId={meetingId} />;
}
