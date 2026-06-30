import { END, START, StateGraph } from "@langchain/langgraph";
import { MAX_RETRIES } from "@/lib/constants";
import { contentWriter } from "@/lib/agents/nodes/content-writer";
import { imagePromptAgent } from "@/lib/agents/nodes/image-prompt-agent";
import { postAssembler } from "@/lib/agents/nodes/post-assembler";
import { qualityCritic } from "@/lib/agents/nodes/quality-critic";
import { researchAgent } from "@/lib/agents/nodes/research-agent";
import { seoOptimizer } from "@/lib/agents/nodes/seo-optimizer";
import { GraphState, type GraphStateType } from "@/lib/agents/state";

function shouldRetry(state: GraphStateType): "retry" | "continue" {
  if (!state.critic?.approved && state.retryCount < MAX_RETRIES) {
    return "retry";
  }
  return "continue";
}

export function buildGraph() {
  const graph = new StateGraph(GraphState)
    .addNode("research", researchAgent)
    .addNode("writer", contentWriter)
    .addNode("seo", seoOptimizer)
    .addNode("imagePrompt", imagePromptAgent)
    .addNode("critic", qualityCritic)
    .addNode("assembler", postAssembler)
    .addEdge(START, "research")
    .addEdge("research", "writer")
    .addEdge("writer", "seo")
    .addEdge("seo", "imagePrompt")
    .addEdge("seo", "critic")
    .addEdge("imagePrompt", "assembler")
    .addConditionalEdges("critic", shouldRetry, {
      retry: "writer",
      continue: "assembler",
    })
    .addEdge("assembler", END);

  return graph.compile();
}

export const graph = buildGraph();
