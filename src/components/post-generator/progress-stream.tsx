"use client";

import { Spinner } from "@/components/ui/spinner";
import { usePostGenerator } from "@/hooks/use-post-generator";

export function ProgressStream() {
  const { steps, isGenerating, error } = usePostGenerator();

  if (!isGenerating && steps.length === 0 && !error) return null;

  return (
    <div className="space-y-6 w-full border-t border-zinc-800/40 pt-4">
      {steps.length > 0 && (
        <div className="relative space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
          {steps.map((step, index) => {
            const isActive = index === steps.length - 1 && isGenerating;
            return (
              <div
                key={`${step.agent}-${index}`}
                className="flex items-center gap-4 text-sm relative"
              >
                {/* Node indicator dot */}
                <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#030303] border-none">
                  {isActive ? (
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                    </span>
                  ) : (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-[10px] text-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                      ✓
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <p className={`font-medium transition-colors ${isActive ? "text-zinc-100" : "text-zinc-400"}`}>
                      {step.label}
                    </p>
                    {isActive && (
                      <span className="text-xs text-zinc-500 font-mono animate-pulse flex items-center gap-1.5 shrink-0">
                        <Spinner className="size-3 border-t-emerald-500 border-zinc-800" />
                        Running Node
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-950/30 bg-red-950/20 p-4 text-sm text-red-200 backdrop-blur-md shadow-[0_0_30px_rgba(239,68,68,0.05)]">
          <div className="flex gap-3">
            <span className="text-red-400 font-semibold text-base mt-0.5">⚠️</span>
            <div>
              <p className="font-semibold text-red-300">Pipeline Generation Error</p>
              <p className="mt-1 text-xs text-red-400/90 leading-relaxed">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
