export const PLATFORM_CHAR_LIMITS = {
  twitter: 280,
  instagram: 2200,
  linkedin: 3000,
} as const;

export const MAX_RETRIES = 2;

export const AGENT_LABELS = {
  research: "Researching topic",
  writer: "Writing content",
  seo: "Optimizing for SEO",
  imagePrompt: "Crafting image prompt",
  critic: "Reviewing quality",
  assembler: "Assembling final post",
} as const;
