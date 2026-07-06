import type { GraphStateType } from "@/app/api/agents/state";
import { fetchPollinationsImage } from "@/app/api/image/pollinations";
import { postSchema } from "@/app/api/agents/schemas/post.schema";

export async function postAssembler(
  state: GraphStateType,
): Promise<Partial<GraphStateType>> {
  let imageUrl: string | undefined;

  if (state.imagePrompt) {
    try {
      imageUrl = await fetchPollinationsImage(state.imagePrompt);
    } catch (err) {
      console.warn("[postAssembler] Image generation failed, proceeding without image:", err);
    }
  }

  const post = postSchema.parse({
    caption: state.seo?.caption ?? "",
    hashtags: state.seo?.hashtags ?? [],
    imageUrl,
    imageAlt: state.imagePrompt ?? undefined,
  });

  return { post };
}
