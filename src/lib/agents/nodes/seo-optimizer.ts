import type { GraphStateType } from "@/lib/agents/state";
import { createOllamaClient } from "@/lib/llm/ollama-client";
import { SEO_PROMPT } from "@/lib/agents/prompts/seo.prompt";
import { seoSchema } from "@/lib/agents/schemas/seo.schema";

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

  const seo = seoSchema.parse(JSON.parse(String(response.content)));
  return { seo };
}
