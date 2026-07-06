import type { GraphStateType } from "@/app/api/agents/state";
import { createOllamaClient } from "@/app/api/llm/ollama-client";
import { SEO_PROMPT } from "@/app/api/agents/prompts/seo.prompt";
import { seoSchema } from "@/app/api/agents/schemas/seo.schema";

export async function seoOptimizer(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const llm = createOllamaClient();
  const structuredLlm = llm.withStructuredOutput(seoSchema);

  const seo = await structuredLlm.invoke([
    { role: "system", content: SEO_PROMPT },
    {
      role: "user",
      content: JSON.stringify({ content: state.content, strategy: state.strategy }),
    },
  ]);

  return { seo };
}
