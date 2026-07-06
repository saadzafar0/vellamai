"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostGenerator } from "@/hooks/use-post-generator";
import { FormEvent, useState } from "react";

export function TopicForm() {
  const [topic, setTopic] = useState("");
  const { generate, isGenerating } = usePostGenerator();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!topic.trim() || isGenerating) return;
    generate(topic.trim());
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-3 w-full">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic to generate content for..."
          disabled={isGenerating}
          className="glass-input h-12 px-4 rounded-xl text-zinc-100 placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-700 border border-zinc-800/80 w-full"
        />
        <Button 
          type="submit" 
          disabled={!topic.trim() || isGenerating}
          className="shimmer-button h-12 px-6 rounded-xl text-white font-medium bg-transparent border border-zinc-800 shrink-0"
        >
          {isGenerating ? "Analyzing..." : "Generate"}
        </Button>
      </form>
    </div>
  );
}
