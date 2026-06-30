import { TopicForm } from "@/components/post-generator/topic-form";
import { ProgressStream } from "@/components/post-generator/progress-stream";
import { PostCard } from "@/components/post-generator/post-card";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Vellam</h1>
        <p className="text-muted-foreground text-zinc-600 dark:text-zinc-400">
          Enter a topic and generate a social-ready post with image, caption, and
          hashtags.
        </p>
      </header>

      <TopicForm />
      <ProgressStream />
      <PostCard />
    </main>
  );
}
