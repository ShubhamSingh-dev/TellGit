import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// Safety limit to avoid context overflow
const MAX_DIFF_CHARS = 18_000;

export async function aiSummariseCommit(diff: string): Promise<string> {
  if (!diff || diff.trim().length === 0) {
    return "No meaningful code changes detected.";
  }

  const trimmedDiff = diff.slice(0, MAX_DIFF_CHARS);

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0.15,
    max_tokens: 280,
    messages: [
      {
        role: "system",
        content: `
You are a senior software engineer reviewing git commits.
You write high-quality commit summaries for professional teams.
Be accurate, concise, and technical.
        `.trim(),
      },
      {
        role: "user",
        content: `
Analyze the following git diff and produce a concise commit summary.

Rules:
- Output **no more than 5 markdown bullet points**
- Start with the most impactful change
- Describe behavioral, logical, or API changes
- Mention function names, variables, or configs when relevant
- Group related changes across files
- Ignore formatting, comments, renames, or whitespace-only changes
- Use inline backticks only (no code blocks)
- Do NOT add introductions or conclusions

Git diff reference:
- '+' lines indicate additions
- '-' lines indicate deletions
- Context lines explain surrounding logic

Git diff:
${trimmedDiff}

If more than 5 points are possible, merge them.
        `.trim(),
      },
    ],
  });

  return response.choices[0]?.message?.content?.trim() || "";
}

// FAILED
