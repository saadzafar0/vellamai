import { TopicForm } from "@/components/post-generator/topic-form";
import { ProgressStream } from "@/components/post-generator/progress-stream";
import { PostCard } from "@/components/post-generator/post-card";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-zinc-100 flex flex-col justify-center items-center py-20 px-4">
      {/* Background Decorative Glow Blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px] animate-float" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[120px] animate-float-slow" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[150px]" />

      <main className="relative z-10 w-full max-w-2xl flex flex-col gap-8">
        {/* Header Block with Premium Typography */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/40 px-3 py-1 text-xs text-zinc-400 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Next-Gen Multi-Agent Pipeline
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500 py-1">
            Vellam
          </h1>
          <p className="mx-auto max-w-md text-sm sm:text-base text-zinc-400">
            Crystallize a single topic into structured, optimized social media posts with custom visuals.
          </p>
        </header>

        {/* Unified Glass Interface */}
        <div className="glass-panel w-full rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
          <TopicForm />
          <ProgressStream />
          <PostCard />
        </div>
      </main>
    </div>
  );
}
