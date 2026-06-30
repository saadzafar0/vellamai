import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "size-5 animate-spin rounded-full border-2 border-zinc-300 border-t-foreground",
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
