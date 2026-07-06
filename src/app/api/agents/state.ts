import { Annotation } from "@langchain/langgraph";
import type { Content } from "@/app/api/agents/schemas/content.schema";
import type { Post } from "@/app/api/agents/schemas/post.schema";
import type { SeoOutput } from "@/app/api/agents/schemas/seo.schema";
import type { Strategy } from "@/app/api/agents/schemas/strategy.schema";

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
  post: Annotation<Post | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
});

export type GraphStateType = typeof GraphState.State;
