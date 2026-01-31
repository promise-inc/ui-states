import { useCallback, useEffect, useRef, useState } from "react";
import type { SkeletonNode } from "../types";
import { walkDom } from "../core/dom-walker";
import { getCachedTree, setCachedTree } from "../utils/storage";
import { useResizeObserver } from "./use-resize-observer";

interface UseSkeletonTreeOptions {
  readonly isLoading: boolean;
  readonly enableCache: boolean;
  readonly cacheKey?: string;
}

interface UseSkeletonTreeResult {
  readonly tree: readonly SkeletonNode[] | null;
  readonly measureRef: React.RefObject<HTMLDivElement>;
  readonly hasMeasured: boolean;
}

export function useSkeletonTree(options: UseSkeletonTreeOptions): UseSkeletonTreeResult {
  const { isLoading, enableCache, cacheKey } = options;
  const measureRef = useRef<HTMLDivElement>(null);
  const [tree, setTree] = useState<readonly SkeletonNode[] | null>(() => {
    if (enableCache && cacheKey) {
      return getCachedTree(cacheKey);
    }
    return null;
  });
  const [hasMeasured, setHasMeasured] = useState(tree !== null);

  const size = useResizeObserver(measureRef);

  const measure = useCallback(() => {
    const element = measureRef.current;
    if (!element) return;

    const newTree = walkDom(element);
    setTree(newTree);
    setHasMeasured(true);

    if (enableCache && cacheKey) {
      setCachedTree(cacheKey, newTree);
    }
  }, [enableCache, cacheKey]);

  useEffect(() => {
    if (!isLoading || hasMeasured) return;

    const frame = requestAnimationFrame(() => {
      measure();
    });

    return () => cancelAnimationFrame(frame);
  }, [isLoading, hasMeasured, measure]);

  useEffect(() => {
    if (isLoading && size) {
      measure();
    }
  }, [isLoading, size, measure]);

  useEffect(() => {
    if (!isLoading) {
      setHasMeasured(false);
    }
  }, [isLoading]);

  return { tree, measureRef, hasMeasured };
}
