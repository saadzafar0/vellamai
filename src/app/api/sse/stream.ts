import { AGENT_LABELS } from "@/lib/constants";
import { graph } from "@/app/api/agents/graph";
import type { SSEEvent } from "@/types/sse-events";

const NODE_LABELS: Record<string, string> = {
  research_node: AGENT_LABELS.research,
  writer_node: AGENT_LABELS.writer,
  seo_node: AGENT_LABELS.seo,
  imagePrompt_node: AGENT_LABELS.imagePrompt,
  assembler_node: AGENT_LABELS.assembler,
};

function encode(event: SSEEvent): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`);
}

export function createGraphStream(topic: string): ReadableStream<Uint8Array> {
  return new ReadableStream({
    async start(controller) {
      try {
        const stream = await graph.stream({ topic }, { streamMode: "updates" });
        let finalPost = null;

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
          if (update.assembler_node?.post) {
            finalPost = update.assembler_node.post;
          }
        }

        if (finalPost) {
          controller.enqueue(encode({ type: "complete", post: finalPost }));
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
