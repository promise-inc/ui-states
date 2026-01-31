import { type ReactNode } from "react";

export type UIState = "loading" | "error" | "empty" | "success";

export interface SkeletonNode {
  readonly id: string;
  readonly width: number;
  readonly height: number;
  readonly borderRadius: string;
  readonly display: "block" | "flex" | "grid" | "inline" | "inline-block";
  readonly flexDirection?: "row" | "column";
  readonly gridCols?: number;
  readonly gap: number;
  readonly isLeaf: boolean;
  readonly children: readonly SkeletonNode[];
  readonly tagName: string;
}

export interface ElementRect {
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly left: number;
}

export interface LayoutInfo {
  readonly display: SkeletonNode["display"];
  readonly flexDirection?: "row" | "column";
  readonly gridCols?: number;
  readonly gap: number;
  readonly borderRadius: string;
}

export interface QueryLike {
  readonly isLoading?: boolean;
  readonly isPending?: boolean;
  readonly isError?: boolean;
  readonly error?: unknown;
  readonly data?: unknown;
  readonly refetch?: () => void;
}

export interface UIStatesProps {
  readonly children: ReactNode;
  readonly data?: unknown;
  readonly loading?: boolean;
  readonly error?: unknown;
  readonly query?: QueryLike;
  readonly emptyState?: ReactNode;
  readonly errorState?: ReactNode | ((error: unknown, retry?: () => void) => ReactNode);
  readonly emptyCheck?: (data: unknown) => boolean;
  readonly enableCache?: boolean;
  readonly cacheKey?: string;
  readonly className?: string;
  readonly skeletonClassName?: string;
  readonly minLoadingMs?: number;
}

export interface CacheEntry {
  readonly tree: readonly SkeletonNode[];
  readonly viewportWidth: number;
  readonly viewportHeight: number;
  readonly timestamp: number;
}

export interface DomWalkerOptions {
  readonly maxDepth: number;
  readonly minWidth: number;
  readonly minHeight: number;
}
