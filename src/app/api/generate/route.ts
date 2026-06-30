import { createGraphStream } from "@/lib/sse/stream";

export async function POST(request: Request) {
  const { topic } = (await request.json()) as { topic: string };

  if (!topic?.trim()) {
    return Response.json({ error: "Topic is required" }, { status: 400 });
  }

  const stream = createGraphStream(topic.trim());

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
