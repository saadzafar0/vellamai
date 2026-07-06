import { z } from "zod";

export const postSchema = z.object({
  caption: z.string(),
  hashtags: z.array(z.string()),
  imageUrl: z.string().url().optional(),
  imageAlt: z.string().optional(),
});

export type Post = z.infer<typeof postSchema>;
