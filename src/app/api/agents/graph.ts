import { END, START, StateGraph } from "@langchain/langgraph";
import { contentWriter } from "@/app/api/agents/nodes/content-writer";
import { imagePromptAgent } from "@/app/api/agents/nodes/image-prompt-agent";
import { postAssembler } from "@/app/api/agents/nodes/post-assembler";
import { researchAgent } from "@/app/api/agents/nodes/research-agent";
import { seoOptimizer } from "@/app/api/agents/nodes/seo-optimizer";
import { GraphState } from "@/app/api/agents/state";

export function buildGraph() {
  const graph = new StateGraph(GraphState)
    .addNode("research_node", researchAgent)
    .addNode("writer_node", contentWriter)
    .addNode("seo_node", seoOptimizer)
    .addNode("imagePrompt_node", imagePromptAgent)
    .addNode("assembler_node", postAssembler)
    // Linear pipeline: research → writer → seo → imagePrompt → assembler
    .addEdge(START, "research_node")
    .addEdge("research_node", "writer_node")
    .addEdge("writer_node", "seo_node")
    .addEdge("seo_node", "imagePrompt_node")
    .addEdge("imagePrompt_node", "assembler_node")
    .addEdge("assembler_node", END);

  return graph.compile();
}

export const graph = buildGraph();
