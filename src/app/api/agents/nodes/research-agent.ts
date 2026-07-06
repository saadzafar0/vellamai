import type { GraphStateType } from "@/app/api/agents/state";
import { createOllamaClient } from "@/app/api/llm/ollama-client";
import { RESEARCH_PROMPT } from "@/app/api/agents/prompts/research.prompt";
import { strategySchema } from "@/app/api/agents/schemas/strategy.schema";

export async function researchAgent(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const llm = createOllamaClient();
  const structuredLlm = llm.withStructuredOutput(strategySchema);
  
  const strategy = await structuredLlm.invoke([
    { role: "system", content: RESEARCH_PROMPT },
    { role: "user", content: state.topic },
  ]);

  return { strategy };
}
