import { useSyncExternalStore } from "react";
import type { GeneratedPost, SSEEvent } from "@/types/sse-events";

export type GraphStep = {
  agent: string;
  label: string;
};

export type PostGeneratorState = {
  isGenerating: boolean;
  steps: GraphStep[];
  post: GeneratedPost | null;
  error: string | null;
};

type Listener = () => void;

let state: PostGeneratorState = {
  isGenerating: false,
  steps: [],
  post: null,
  error: null,
};

const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

function setState(partial: Partial<PostGeneratorState>) {
  state = { ...state, ...partial };
  emit();
}

function handleEvent(event: SSEEvent) {
  switch (event.type) {
    case "step":
      setState({
        steps: [...state.steps, { agent: event.agent, label: event.label }],
      });
      break;
    case "complete":
      setState({ isGenerating: false, post: event.post });
      break;
    case "error":
      setState({ isGenerating: false, error: event.message });
      break;
  }
}

export function usePostGenerator() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  async function generate(topic: string) {
    setState({ isGenerating: true, steps: [], post: null, error: null });

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok || !response.body) {
      setState({ isGenerating: false, error: "Failed to start generation" });
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n\n");
      buffer = lines.pop() ?? "";

      for (const chunk of lines) {
        const dataLine = chunk.replace(/^data: /, "").trim();
        if (!dataLine) continue;
        handleEvent(JSON.parse(dataLine) as SSEEvent);
      }
    }
  }

  return { ...snapshot, generate };
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export type { GeneratedPost };
