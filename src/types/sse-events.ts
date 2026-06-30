export type GeneratedPost = {
  caption: string;
  hashtags: string[];
  imageUrl?: string;
  imageAlt?: string;
};

export type SSEStepEvent = {
  type: "step";
  agent: string;
  label: string;
};

export type SSECompleteEvent = {
  type: "complete";
  post: GeneratedPost;
};

export type SSEErrorEvent = {
  type: "error";
  message: string;
};

export type SSEEvent = SSEStepEvent | SSECompleteEvent | SSEErrorEvent;
