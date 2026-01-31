import { cn } from "./cn";

interface FallbackSkeletonProps {
  readonly className?: string;
}

export function FallbackSkeleton({ className }: FallbackSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-4 w-full animate-pulse", className)}>
      <div className="h-6 w-3/4 rounded-md bg-neutral-200/60 dark:bg-neutral-700/60" />
      <div className="h-4 w-full rounded-md bg-neutral-200/60 dark:bg-neutral-700/60" />
      <div className="h-4 w-5/6 rounded-md bg-neutral-200/60 dark:bg-neutral-700/60" />
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full bg-neutral-200/60 dark:bg-neutral-700/60" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-1/2 rounded-md bg-neutral-200/60 dark:bg-neutral-700/60" />
          <div className="h-4 w-1/3 rounded-md bg-neutral-200/60 dark:bg-neutral-700/60" />
        </div>
      </div>
      <div className="h-4 w-2/3 rounded-md bg-neutral-200/60 dark:bg-neutral-700/60" />
    </div>
  );
}
