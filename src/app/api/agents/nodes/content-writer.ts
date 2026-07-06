import type { GraphStateType } from "@/app/api/agents/state";
import { createOllamaClient } from "@/app/api/llm/ollama-client";
import { WRITER_PROMPT } from "@/app/api/agents/prompts/writer.prompt";
import { contentSchema } from "@/app/api/agents/schemas/content.schema";

export async function contentWriter(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const llm = createOllamaClient();
  const structuredLlm = llm.withStructuredOutput(contentSchema);

  const content = await structuredLlm.invoke([
    { role: "system", content: WRITER_PROMPT },
    { role: "user", content: JSON.stringify(state.strategy) },
  ]);

  return { content };
}
