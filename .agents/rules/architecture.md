# Architecture Rules

This document governs the layering rules, folder structure, and architecture patterns used in Vellam.

## Application Architecture
- **Next.js App Router**: `src/app` should only house routing entrypoints (e.g. `page.tsx` for layout, `api/generate/route.ts` for endpoints). No business logic, agent logic, or components should reside directly here.
- **Components**: Reusable presentation components belong in `src/components/ui/` while features live in subfolders like `src/components/post-generator/`.

## LangGraph pipeline (`src/lib/agents/`)
- **Nodes**: Create self-contained node functions in `src/lib/agents/nodes/`.
- **Graph Compilation**: Compile the StateGraph in `src/lib/agents/graph.ts` as a module-level singleton:
  ```typescript
  export const graph = buildGraph();
  ```
- **State Management**: Node states are controlled through annotation schemas inside `src/lib/agents/state.ts`.
- **LLM Clients**: LLM client initialization occurs per-node using `createOllamaClient()` inside the node execution. Do not reuse a single static instance.
- **Output Parsing**:
  - LLM outputs must be parsed with Zod schema verification.
  - Define schemas under `src/lib/agents/schemas/`.
  - Perform validation directly:
    ```typescript
    const validatedData = mySchema.parse(JSON.parse(String(response.content)));
    ```
    *(Note: The pipeline does not support automatic error recovery if non-JSON is returned.)*

## SSE Streaming (`src/lib/sse/`)
- SSE events are written as chunk streams: `data: <json>\n\n`.
- Supported events include:
  - `step`: updates on the current agent state node.
  - `complete`: returns the final assembled post structure.
  - `error`: logs errors.

## Client State (`src/hooks/`)
- **Store Hook**: The custom hook `use-post-generator.ts` uses `useSyncExternalStore` tied to a module-level global mutable variable.
- **Multiple Instances**: Because the state is global and shared, placing multiple `TopicForm` components on a single page will cause state conflicts. Ensure only one generator interface is rendered.
