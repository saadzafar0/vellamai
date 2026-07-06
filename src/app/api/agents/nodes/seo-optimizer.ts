import type { GraphStateType } from "@/app/api/agents/state";
import { createOllamaClient } from "@/app/api/llm/ollama-client";
import { SEO_PROMPT } from "@/app/api/agents/prompts/seo.prompt";
import { seoSchema } from "@/app/api/agents/schemas/seo.schema";
import { parseJsonFromLLM } from "@/lib/utils";

export async function seoOptimizer(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const llm = createOllamaClient();
  const response = await llm.invoke([
    { role: "system", content: SEO_PROMPT },
    {
      role: "user",
      content: JSON.stringify({ content: state.content, strategy: state.strategy }),
    },
  ]);

  let parsed = parseJsonFromLLM(String(response.content));
  if (Array.isArray(parsed)) {
    parsed = parsed[0];
  }
  const seo = seoSchema.parse(parsed);
  return { seo };
}
