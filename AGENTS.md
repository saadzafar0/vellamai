# Vellam — Agent Guide

## Project Summary
Vellam is an AI-powered social media post generator that helps content creators and marketers compile optimized social posts (including text captions, image prompts, and hashtags) for Twitter, Instagram, and LinkedIn from a single input topic using a multi-agent LangGraph orchestration pipeline.

## Tech Stack & Architecture
- **Language**: TypeScript (strict type safety across front-end and agents).
- **Framework**: Next.js 16 (App Router for routes/streaming API, React 19).
- **Styling**: Tailwind CSS v4 via `@import "tailwindcss"` with native PostCSS.
- **Agent Framework**: LangGraph (`@langchain/langgraph`) using a 6-node pipeline.
- **LLM**: Local or cloud Ollama (`ChatOllama` calling `llama3.2`).
- **Validation**: Zod (for validation and direct type safety of structured LLM outputs).
- **Infrastructure/DB**: None. Completely stateless, using SSE for streaming responses directly to the client.

## Commands (pnpm only)
- `pnpm dev` — Run local Next.js development server on port 3000
- `pnpm build` — Create the production build
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint (no code formatter is configured)

*Note: No test framework is installed. No CI or pre-commit hooks exist.*

## Folder Structure Map
- `src/app/` — Routing and page files only (e.g., `page.tsx`, `api/generate/route.ts`).
- `src/components/` — UI components and interactive forms (e.g., `ui/`, `post-generator/`).
- `src/hooks/` — Client-side React hooks (e.g., `use-post-generator.ts`).
- `src/lib/` — Shared utilities, LLM configuration, and agent logic.
  - `src/lib/agents/` — LangGraph pipeline logic, nodes, prompts, schemas, and state.
  - `src/lib/llm/` — Ollama client initialization.
  - `src/lib/sse/` — SSE streaming logic for updates.
- `src/types/` — Shared TypeScript type declarations.

## Key Conventions
- **Components**: Use arrow functions for component definitions; use `forwardRef` for custom UI primitives.
- **Interactivity**: Add `"use client"` directive on interactive components.
- **Styling**: Use the `cn()` helper in `src/lib/utils.ts` for conditional classes (note: it is a simple filter/join, not a full `tailwind-merge` class merger).
- **Validation**: Zod schemas must reside in `src/lib/agents/schemas/` and be used to parse LLM JSON responses directly.
- **Agent Prompts**: Stored in `src/lib/agents/prompts/` as single-sentence system messages.
- **Client State**: Global mutable module state coupled with `useSyncExternalStore` (not React state).
- **Commit Messages**: Follow Conventional Commits format (e.g., `feat: ...`, `fix: ...`, `chore: ...`).

## Known Gotchas & Things to Avoid
1. **Infinite Retry Loop**: The `critic` returns `{ critic }` but the state's `retryCount` is never incremented. If the critic rejects the output, it causes an infinite retry loop.
2. **Silent Client Errors**: The hook `use-post-generator.ts` populates an `error` state, but `src/app/page.tsx` never displays it. Always verify API errors during debugging.
3. **Redundant Agent Execution**: `createGraphStream` iterates over `graph.stream()` for updates and then calls `graph.invoke()` for the final result, running the pipeline twice.
4. **Environment Configuration**: `OLLAMA_BASE_URL` must be set to `http://localhost:11434` for local Ollama runtimes. Do not rely on the default `https://ollama.com`.
5. **JSON Parse Sensitivity**: Agent node implementations parse LLM outputs using `JSON.parse` directly; if the model fails to return standard JSON, it throws an unhandled crash.
