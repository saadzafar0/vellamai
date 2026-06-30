import type { GraphStateType } from "@/lib/agents/state";
import { createOllamaClient } from "@/lib/llm/ollama-client";
import { RESEARCH_PROMPT } from "@/lib/agents/prompts/research.prompt";
import { strategySchema } from "@/lib/agents/schemas/strategy.schema";

export async function researchAgent(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const llm = createOllamaClient();
  const response = await llm.invoke([
    { role: "system", content: RESEARCH_PROMPT },
    { role: "user", content: state.topic },
  ]);

  const strategy = strategySchema.parse(JSON.parse(String(response.content)));
  return { strategy };
}
