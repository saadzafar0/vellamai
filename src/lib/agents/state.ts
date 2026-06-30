import { Annotation } from "@langchain/langgraph";
import type { Content } from "@/lib/agents/schemas/content.schema";
import type { CriticOutput } from "@/lib/agents/schemas/critic.schema";
import type { Post } from "@/lib/agents/schemas/post.schema";
import type { SeoOutput } from "@/lib/agents/schemas/seo.schema";
import type { Strategy } from "@/lib/agents/schemas/strategy.schema";

export const GraphState = Annotation.Root({
  topic: Annotation<string>(),
  strategy: Annotation<Strategy | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  content: Annotation<Content | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  seo: Annotation<SeoOutput | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  imagePrompt: Annotation<string | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  critic: Annotation<CriticOutput | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  post: Annotation<Post | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  retryCount: Annotation<number>({
    reducer: (_, next) => next,
    default: () => 0,
  }),
});

export type GraphStateType = typeof GraphState.State;
