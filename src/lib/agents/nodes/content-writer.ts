import type { GraphStateType } from "@/lib/agents/state";
import { createOllamaClient } from "@/lib/llm/ollama-client";
import { WRITER_PROMPT } from "@/lib/agents/prompts/writer.prompt";
import { contentSchema } from "@/lib/agents/schemas/content.schema";

export async function contentWriter(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const llm = createOllamaClient();
  const response = await llm.invoke([
    { role: "system", content: WRITER_PROMPT },
    { role: "user", content: JSON.stringify(state.strategy) },
  ]);

  const content = contentSchema.parse(JSON.parse(String(response.content)));
  return { content };
}
