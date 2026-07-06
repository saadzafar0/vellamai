---
name: add-agent-node
description: Add a new step/node to the LangGraph pipeline
---

# Add a New LangGraph Agent Node

This workflow details how to create and integrate a new agent node into the Vellam LangGraph pipeline.

## Step-by-Step Instructions

### Step 1: Define the Prompt
Create a new prompt file in `src/lib/agents/prompts/` (e.g. `src/lib/agents/prompts/my-agent.prompt.ts`):
```typescript
export const MY_AGENT_PROMPT = "Your single-sentence system prompt here.";
```

### Step 2: Define the Zod Schema (if applicable)
If the new node returns structured JSON, define its schema in `src/lib/agents/schemas/` (e.g. `src/lib/agents/schemas/my-agent.schema.ts`):
```typescript
import { z } from "zod";

export const myAgentSchema = z.object({
  myField: z.string(),
});

export type MyAgentOutput = z.infer<typeof myAgentSchema>;
```

### Step 3: Update Graph State
Add your new field or state variable to `src/lib/agents/state.ts`:
```typescript
import type { MyAgentOutput } from "@/lib/agents/schemas/my-agent.schema";

export const GraphState = Annotation.Root({
  // ... existing fields ...
  myAgentOutput: Annotation<MyAgentOutput | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
});
```

### Step 4: Write the Node Function
Create the node implementation under `src/lib/agents/nodes/` (e.g. `src/lib/agents/nodes/my-agent.ts`):
```typescript
import type { GraphStateType } from "@/lib/agents/state";
import { createOllamaClient } from "@/lib/llm/ollama-client";
import { MY_AGENT_PROMPT } from "@/lib/agents/prompts/my-agent.prompt";
import { myAgentSchema } from "@/lib/agents/schemas/my-agent.schema";

export async function myAgentNode(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const llm = createOllamaClient();
  const response = await llm.invoke([
    { role: "system", content: MY_AGENT_PROMPT },
    { role: "user", content: JSON.stringify(state.somePreviousOutput) }, // pass input context
  ]);

  const myAgentOutput = myAgentSchema.parse(JSON.parse(String(response.content)));
  return { myAgentOutput };
}
```

### Step 5: Register Node in the StateGraph
Modify `src/lib/agents/graph.ts` to add the node and configure its edges:
```typescript
import { myAgentNode } from "@/lib/agents/nodes/my-agent";

// ... Inside buildGraph() ...
const graph = new StateGraph(GraphState)
  .addNode("myAgent", myAgentNode)
  // Define edges (e.g. wire it after an existing node)
  .addEdge("seo", "myAgent")
  .addEdge("myAgent", "critic")
  // ...
```

### Step 6: Map Node UI Labels
1. In `src/lib/constants.ts`, add the label prefix for SSE updates:
   ```typescript
   export const AGENT_LABELS = {
     // ...
     myAgent: "Analyzing content style",
   } as const;
   ```
2. In `src/lib/sse/stream.ts`, update `NODE_LABELS` to link the new node to the constant label:
   ```typescript
   const NODE_LABELS: Record<string, string> = {
     // ...
     myAgent: AGENT_LABELS.myAgent,
   };
   ```

### Step 7: Lint and Build
Run the following commands to verify typescript compilation and lint rules:
- `pnpm lint`
- `pnpm build`
