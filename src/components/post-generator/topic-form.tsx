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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic…"
        disabled={isGenerating}
      />
      <Button type="submit" disabled={!topic.trim() || isGenerating}>
        Generate
      </Button>
    </form>
  );
}
