import { z } from "zod";

export const contentSchema = z.object({
  hook: z.string(),
  body: z.string(),
  callToAction: z.string(),
});

export type Content = z.infer<typeof contentSchema>;
