import { AGENT_LABELS } from "@/lib/constants";
import { graph } from "@/lib/agents/graph";
import type { SSEEvent } from "@/types/sse-events";

const NODE_LABELS: Record<string, string> = {
  research: AGENT_LABELS.research,
  writer: AGENT_LABELS.writer,
  seo: AGENT_LABELS.seo,
  imagePrompt: AGENT_LABELS.imagePrompt,
  critic: AGENT_LABELS.critic,
  assembler: AGENT_LABELS.assembler,
};

function encode(event: SSEEvent): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`);
}

export function createGraphStream(topic: string): ReadableStream<Uint8Array> {
  return new ReadableStream({
    async start(controller) {
      try {
        const stream = await graph.stream({ topic }, { streamMode: "updates" });

        for await (const update of stream) {
          const [node] = Object.keys(update);
          if (node && NODE_LABELS[node]) {
            controller.enqueue(
              encode({
                type: "step",
                agent: node,
                label: NODE_LABELS[node],
              }),
            );
          }
        }

        const result = await graph.invoke({ topic });
        if (result.post) {
          controller.enqueue(encode({ type: "complete", post: result.post }));
        } else {
          controller.enqueue(
            encode({ type: "error", message: "No post generated" }),
          );
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Generation failed";
        controller.enqueue(encode({ type: "error", message }));
      } finally {
        controller.close();
      }
    },
  });
}
