import { CACHE_TTL, STORAGE_PREFIX, VIEWPORT_TOLERANCE } from "../constants";
import type { CacheEntry, SkeletonNode } from "../types";

function getStorageKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

export function getCachedTree(key: string): readonly SkeletonNode[] | null {
  try {
    const raw = sessionStorage.getItem(getStorageKey(key));
    if (!raw) return null;

    const entry: CacheEntry = JSON.parse(raw);
    const now = Date.now();

    if (now - entry.timestamp > CACHE_TTL) {
      sessionStorage.removeItem(getStorageKey(key));
      return null;
    }

    const widthDiff = Math.abs(window.innerWidth - entry.viewportWidth);
    const heightDiff = Math.abs(window.innerHeight - entry.viewportHeight);
    if (widthDiff > VIEWPORT_TOLERANCE || heightDiff > VIEWPORT_TOLERANCE) {
      sessionStorage.removeItem(getStorageKey(key));
      return null;
    }

    return entry.tree;
  } catch {
    return null;
  }
}

export function setCachedTree(key: string, tree: readonly SkeletonNode[]): void {
  try {
    const entry: CacheEntry = {
      tree,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(getStorageKey(key), JSON.stringify(entry));
  } catch {
    /* empty */
  }
}
