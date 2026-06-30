"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button type="button" onClick={handleCopy} className="w-fit">
      {copied ? "Copied!" : "Copy caption"}
    </Button>
  );
}
