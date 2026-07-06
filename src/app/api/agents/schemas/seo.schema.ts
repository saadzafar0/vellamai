import { z } from "zod";

export const seoSchema = z.object({
  caption: z.string(),
  hashtags: z.array(z.string()),
  keywords: z.array(z.string()),
});

export type SeoOutput = z.infer<typeof seoSchema>;
