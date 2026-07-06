"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button type="button" onClick={handleCopy} className={className}>
      {copied ? "✓ Copied" : "📋 Copy Content"}
    </Button>
  );
}
