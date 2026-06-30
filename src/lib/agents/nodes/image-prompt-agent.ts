import type { GraphStateType } from "@/lib/agents/state";
import { createOllamaClient } from "@/lib/llm/ollama-client";
import { IMAGE_PROMPT } from "@/lib/agents/prompts/image.prompt";

export async function imagePromptAgent(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const llm = createOllamaClient();
  const response = await llm.invoke([
    { role: "system", content: IMAGE_PROMPT },
    { role: "user", content: JSON.stringify(state.seo) },
  ]);

  return { imagePrompt: String(response.content).trim() };
}
