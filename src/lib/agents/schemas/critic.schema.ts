import { z } from "zod";

export const criticSchema = z.object({
  approved: z.boolean(),
  score: z.number().min(0).max(10),
  feedback: z.string(),
  revisionNotes: z.string().optional(),
});

export type CriticOutput = z.infer<typeof criticSchema>;
