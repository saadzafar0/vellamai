import type { GraphStateType } from "@/lib/agents/state";
import { fetchPollinationsImage } from "@/lib/image/pollinations";
import { postSchema } from "@/lib/agents/schemas/post.schema";

export async function postAssembler(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  const imageUrl = state.imagePrompt
    ? await fetchPollinationsImage(state.imagePrompt)
    : undefined;

  const post = postSchema.parse({
    caption: state.seo?.caption ?? "",
    hashtags: state.seo?.hashtags ?? [],
    imageUrl,
    imageAlt: state.imagePrompt ?? undefined,
  });

  return { post };
}
