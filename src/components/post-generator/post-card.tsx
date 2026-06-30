"use client";

import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/post-generator/copy-button";
import { usePostGenerator } from "@/hooks/use-post-generator";
import Image from "next/image";

export function PostCard() {
  const { post } = usePostGenerator();

  if (!post) return null;

  return (
    <Card className="space-y-4">
      {post.imageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-md">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt ?? "Generated post image"}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <p className="whitespace-pre-wrap text-sm leading-relaxed">{post.caption}</p>

      {post.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.hashtags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs dark:bg-zinc-900"
            >
              #{tag.replace(/^#/, "")}
            </span>
          ))}
        </div>
      )}

      <CopyButton text={post.caption} />
    </Card>
  );
}
