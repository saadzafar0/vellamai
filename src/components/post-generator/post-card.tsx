"use client";

import { CopyButton } from "@/components/post-generator/copy-button";
import { usePostGenerator } from "@/hooks/use-post-generator";
import { PLATFORM_CHAR_LIMITS } from "@/lib/constants";
import Image from "next/image";
import { useState } from "react";

type Platform = "twitter" | "instagram" | "linkedin";

export function PostCard() {
  const { post } = usePostGenerator();
  const [activePlatform, setActivePlatform] = useState<Platform>("twitter");
  const [isDownloading, setIsDownloading] = useState(false);

  if (!post) return null;

  const captionLength = post.caption.length;
  const limit = PLATFORM_CHAR_LIMITS[activePlatform];
  const isOverLimit = captionLength > limit;

  async function handleDownload() {
    if (!post?.imageUrl || isDownloading) return;
    setIsDownloading(true);
    try {
      const response = await fetch(post.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `vellam-${activePlatform}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="space-y-6 w-full pt-4 border-t border-zinc-800/40">
      {/* Platform Switcher Tabs */}
      <div className="flex rounded-xl bg-zinc-950/60 p-1 border border-zinc-800/50 backdrop-blur-sm">
        {(["twitter", "instagram", "linkedin"] as Platform[]).map((platform) => (
          <button
            key={platform}
            type="button"
            onClick={() => setActivePlatform(platform)}
            className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-200 cursor-pointer ${
              activePlatform === platform
                ? "bg-zinc-800 text-white shadow-md border border-zinc-700/50"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {platform === "twitter" ? "X / Twitter" : platform}
          </button>
        ))}
      </div>

      {/* Main Glass Deck Container */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-5 border border-zinc-800/50 relative overflow-hidden bg-zinc-950/20">
        
        {/* Platform Mock Mockup Wrapper */}
        <div className="border border-zinc-800/60 rounded-xl bg-zinc-950/40 p-4 sm:p-5">
          {activePlatform === "twitter" && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                  V
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-zinc-100">
                    Vellam User
                    <span className="inline-block h-3 w-3 rounded-full bg-blue-500 flex items-center justify-center text-[7px] text-white">✓</span>
                  </div>
                  <div className="text-xs text-zinc-500">@vellam_ai • 1m</div>
                </div>
              </div>
              
              <p className="whitespace-pre-wrap text-zinc-200 leading-normal text-[15px]">
                {post.caption}
              </p>

              {post.hashtags.length > 0 && (
                <p className="text-blue-400 font-normal">
                  {post.hashtags.map((tag) => `#${tag.replace(/^#/, "")}`).join(" ")}
                </p>
              )}

              {post.imageUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800/50 mt-3">
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt ?? "Generated post image"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              {/* Twitter Action Icons */}
              <div className="flex justify-between items-center text-zinc-500 pt-3 border-t border-zinc-900/60 text-xs px-2">
                <span>💬 12</span>
                <span>🔁 45</span>
                <span>❤️ 234</span>
                <span>📊 1.2K</span>
              </div>
            </div>
          )}

          {activePlatform === "instagram" && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-[1.5px]">
                    <div className="h-full w-full rounded-full bg-[#030303] flex items-center justify-center text-xs font-bold text-white">
                      V
                    </div>
                  </div>
                  <span className="font-bold text-zinc-200 text-xs">vellam_ai</span>
                </div>
                <span className="text-zinc-500 font-bold tracking-tight">•••</span>
              </div>

              {post.imageUrl && (
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-zinc-800/50">
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt ?? "Generated post image"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              {/* Instagram Icons */}
              <div className="flex justify-between items-center text-base pt-1 px-1">
                <div className="flex gap-4">
                  <span>❤️</span>
                  <span>💬</span>
                  <span>✈️</span>
                </div>
                <span>🔖</span>
              </div>

              <div className="px-1 space-y-1.5 text-xs sm:text-sm">
                <p className="font-semibold text-zinc-200">128 likes</p>
                <p className="text-zinc-300 leading-relaxed">
                  <span className="font-bold text-zinc-100 mr-2">vellam_ai</span>
                  {post.caption}
                </p>
                {post.hashtags.length > 0 && (
                  <p className="text-blue-400 font-normal mr-1 inline-block">
                    {post.hashtags.map((tag) => `#${tag.replace(/^#/, "")}`).join(" ")}
                  </p>
                )}
                <p className="text-[10px] text-zinc-500 uppercase tracking-tight mt-1">1 minute ago</p>
              </div>
            </div>
          )}

          {activePlatform === "linkedin" && (
            <div className="space-y-3.5 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white border border-zinc-700">
                    V
                  </div>
                  <div>
                    <div className="font-bold text-zinc-100 flex items-center gap-1">
                      Vellam Platform
                      <span className="text-[10px] text-zinc-500 font-normal">• 1st</span>
                    </div>
                    <div className="text-[11px] text-zinc-500 leading-none">AI Content Orchestrator | Next.js</div>
                    <div className="text-[11px] text-zinc-500">1m • 🌐</div>
                  </div>
                </div>
                <button type="button" className="text-xs font-bold text-blue-400 hover:text-blue-300 cursor-pointer">
                  + Follow
                </button>
              </div>

              <p className="whitespace-pre-wrap text-zinc-200 leading-relaxed">
                {post.caption}
              </p>

              {post.hashtags.length > 0 && (
                <p className="text-blue-400 font-normal">
                  {post.hashtags.map((tag) => `#${tag.replace(/^#/, "")}`).join(" ")}
                </p>
              )}

              {post.imageUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-800/50 bg-zinc-950/20">
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt ?? "Generated post image"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              {/* LinkedIn Actions */}
              <div className="flex justify-between items-center text-zinc-400 pt-3 border-t border-zinc-900/60 text-xs px-2 sm:px-6">
                <span>👍 Like</span>
                <span>💬 Comment</span>
                <span>🔁 Repost</span>
                <span>📨 Send</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Bar (Character Limit Warning and Copy Button) */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-3 border-t border-zinc-800/40">
          <div className="text-xs flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${isOverLimit ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`} />
            <span className="text-zinc-400">
              Length:{" "}
              <strong className={isOverLimit ? "text-red-400" : "text-zinc-200"}>
                {captionLength}
              </strong>{" "}
              / {limit} chars
              {isOverLimit && " (Exceeds platform limit)"}
            </span>
          </div>

          <div className="flex gap-3 justify-end items-center flex-wrap">
            {post.imageUrl && (
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="shimmer-button bg-transparent border border-zinc-800 text-white rounded-xl py-2 px-4 text-xs font-semibold cursor-pointer disabled:opacity-50"
              >
                {isDownloading ? "⏳ Downloading..." : "💾 Download Image"}
              </button>
            )}
            <CopyButton 
              text={[
                post.caption,
                post.hashtags.length > 0
                  ? post.hashtags.map((tag) => `#${tag.replace(/^#/, "")}`).join(" ")
                  : null,
              ].filter(Boolean).join("\n\n")}
              className="shimmer-button bg-transparent border border-zinc-800 text-white rounded-xl py-2 px-4 text-xs font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
