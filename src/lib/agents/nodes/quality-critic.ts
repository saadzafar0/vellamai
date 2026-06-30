import type { GraphStateType } from "@/lib/agents/state";
import { createOllamaClient } from "@/lib/llm/ollama-client";
import { CRITIC_PROMPT } from "@/lib/agents/prompts/critic.prompt";
import { criticSchema } from "@/lib/agents/schemas/critic.schema";

export async function qualityCritic(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const llm = createOllamaClient();
  const response = await llm.invoke([
    { role: "system", content: CRITIC_PROMPT },
    { role: "user", content: JSON.stringify(state.seo) },
  ]);

  const critic = criticSchema.parse(JSON.parse(String(response.content)));
  return { critic };
}
