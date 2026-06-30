import { z } from "zod";

export const strategySchema = z.object({
  angle: z.string(),
  keyPoints: z.array(z.string()),
  targetAudience: z.string(),
  tone: z.string(),
});

export type Strategy = z.infer<typeof strategySchema>;
