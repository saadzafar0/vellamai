"use client";

import { Spinner } from "@/components/ui/spinner";
import { usePostGenerator } from "@/hooks/use-post-generator";

export function ProgressStream() {
  const { steps, isGenerating } = usePostGenerator();

  if (!isGenerating && steps.length === 0) return null;

  return (
    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
      {steps.map((step, index) => (
        <li key={`${step.agent}-${index}`} className="flex items-center gap-2">
          {index === steps.length - 1 && isGenerating ? (
            <Spinner className="size-4" />
          ) : (
            <span aria-hidden>✓</span>
          )}
          <span>{step.label}</span>
        </li>
      ))}
    </ul>
  );
}
