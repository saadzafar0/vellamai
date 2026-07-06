import type { GraphStateType } from "@/app/api/agents/state";
import { createOllamaClient } from "@/app/api/llm/ollama-client";
import { RESEARCH_PROMPT } from "@/app/api/agents/prompts/research.prompt";
import { strategySchema } from "@/app/api/agents/schemas/strategy.schema";
import { parseJsonFromLLM } from "@/lib/utils";

export async function researchAgent(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const llm = createOllamaClient();
  const response = await llm.invoke([
    { role: "system", content: RESEARCH_PROMPT },
    { role: "user", content: state.topic },
  ]);

  let parsed = parseJsonFromLLM(String(response.content));
  if (Array.isArray(parsed)) {
    parsed = parsed[0];
  }
  const strategy = strategySchema.parse(parsed);
  return { strategy };
}
