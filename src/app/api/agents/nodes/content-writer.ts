import type { GraphStateType } from "@/app/api/agents/state";
import { createOllamaClient } from "@/app/api/llm/ollama-client";
import { WRITER_PROMPT } from "@/app/api/agents/prompts/writer.prompt";
import { contentSchema } from "@/app/api/agents/schemas/content.schema";
import { parseJsonFromLLM } from "@/lib/utils";

export async function contentWriter(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const llm = createOllamaClient();
  const response = await llm.invoke([
    { role: "system", content: WRITER_PROMPT },
    { role: "user", content: JSON.stringify(state.strategy) },
  ]);

  let parsed = parseJsonFromLLM(String(response.content));
  if (Array.isArray(parsed)) {
    parsed = parsed[0];
  }
  const content = contentSchema.parse(parsed);
  return { content };
}
