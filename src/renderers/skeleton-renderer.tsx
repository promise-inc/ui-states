import type { SkeletonNode } from "../types";
import { generateSkeletonTree, type GeneratedSkeleton } from "../core/skeleton-generator";
import { cn } from "../utils/cn";

interface SkeletonRendererProps {
  readonly tree: readonly SkeletonNode[];
  readonly className?: string;
}

function SkeletonNodeView({ skeleton }: { readonly skeleton: GeneratedSkeleton }) {
  return (
    <div
      className={skeleton.className}
      style={skeleton.style}
      aria-hidden="true"
    >
      {skeleton.children.map((child) => (
        <SkeletonNodeView key={child.node.id} skeleton={child} />
      ))}
    </div>
  );
}

export function SkeletonRenderer({ tree, className }: SkeletonRendererProps) {
  const generated = generateSkeletonTree(tree);

  return (
    <div
      className={cn("relative", className)}
      role="status"
      aria-busy="true"
      aria-label="Loading content"
    >
      {generated.map((skeleton) => (
        <SkeletonNodeView key={skeleton.node.id} skeleton={skeleton} />
      ))}
    </div>
  );
}
