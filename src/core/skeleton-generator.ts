import type { SkeletonNode } from "../types";
import { cn } from "../utils/cn";

function getLayoutClasses(node: SkeletonNode): string {
  if (node.isLeaf) return "";

  const classes: string[] = [];

  if (node.display === "flex") {
    classes.push("flex");
    if (node.flexDirection === "column") {
      classes.push("flex-col");
    }
  } else if (node.display === "grid" && node.gridCols) {
    classes.push("grid");
    classes.push(`grid-cols-${node.gridCols}`);
  } else if (node.display === "inline" || node.display === "inline-block") {
    classes.push("inline-flex");
  } else {
    classes.push("flex flex-col");
  }

  return cn(...classes);
}

function getSkeletonClasses(node: SkeletonNode): string {
  if (!node.isLeaf) return "";
  return cn(
    "animate-pulse",
    "bg-neutral-200/60 dark:bg-neutral-700/60",
    node.borderRadius,
  );
}

export interface GeneratedSkeleton {
  readonly node: SkeletonNode;
  readonly className: string;
  readonly style: Record<string, string | number>;
  readonly children: readonly GeneratedSkeleton[];
}

function generateNode(node: SkeletonNode): GeneratedSkeleton {
  const style: Record<string, string | number> = {
    width: node.width,
    height: node.isLeaf ? node.height : "auto",
  };

  if (node.gap > 0 && !node.isLeaf) {
    style.gap = node.gap;
  }

  const layoutClass = getLayoutClasses(node);
  const skeletonClass = getSkeletonClasses(node);
  const className = cn(layoutClass, skeletonClass);

  const children = node.isLeaf
    ? []
    : node.children.map((child) => generateNode(child));

  return { node, className, style, children };
}

export function generateSkeletonTree(
  nodes: readonly SkeletonNode[],
): readonly GeneratedSkeleton[] {
  return nodes.map((node) => generateNode(node));
}
