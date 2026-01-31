import { MAX_DEPTH, LEAF_TAGS } from "../constants";
import type { DomWalkerOptions, SkeletonNode } from "../types";
import { shouldIgnoreElement, isElementTooSmall, getElementRect } from "../utils/element-filters";
import { detectLayout } from "./layout-detector";

let nodeCounter = 0;

function generateId(): string {
  nodeCounter += 1;
  return `sk-${nodeCounter}`;
}

function isLeafElement(element: Element): boolean {
  if (LEAF_TAGS.has(element.tagName)) return true;

  const hasTextOnly =
    element.childNodes.length > 0 &&
    Array.from(element.childNodes).every((node) => node.nodeType === Node.TEXT_NODE);

  if (hasTextOnly) {
    const text = element.textContent?.trim() ?? "";
    return text.length > 0;
  }

  return element.children.length === 0;
}

function walkElement(
  element: Element,
  depth: number,
  options: DomWalkerOptions,
): SkeletonNode | null {
  if (depth > options.maxDepth) return null;
  if (shouldIgnoreElement(element)) return null;

  const rect = getElementRect(element);
  if (isElementTooSmall(rect)) return null;

  const layout = detectLayout(element);
  const isLeaf = isLeafElement(element);

  if (isLeaf) {
    return {
      id: generateId(),
      width: rect.width,
      height: rect.height,
      borderRadius: layout.borderRadius,
      display: layout.display,
      gap: 0,
      isLeaf: true,
      children: [],
      tagName: element.tagName,
    };
  }

  const children: SkeletonNode[] = [];
  for (const child of Array.from(element.children)) {
    const childNode = walkElement(child, depth + 1, options);
    if (childNode) {
      children.push(childNode);
    }
  }

  if (children.length === 0) {
    return {
      id: generateId(),
      width: rect.width,
      height: rect.height,
      borderRadius: layout.borderRadius,
      display: layout.display,
      gap: 0,
      isLeaf: true,
      children: [],
      tagName: element.tagName,
    };
  }

  return {
    id: generateId(),
    width: rect.width,
    height: rect.height,
    borderRadius: layout.borderRadius,
    display: layout.display,
    flexDirection: layout.flexDirection,
    gridCols: layout.gridCols,
    gap: layout.gap,
    isLeaf: false,
    children,
    tagName: element.tagName,
  };
}

export function walkDom(root: Element): readonly SkeletonNode[] {
  nodeCounter = 0;

  const options: DomWalkerOptions = {
    maxDepth: MAX_DEPTH,
    minWidth: 8,
    minHeight: 8,
  };

  const results: SkeletonNode[] = [];

  for (const child of Array.from(root.children)) {
    const node = walkElement(child, 0, options);
    if (node) {
      results.push(node);
    }
  }

  if (results.length === 0) {
    const rect = getElementRect(root);
    const layout = detectLayout(root);
    return [
      {
        id: generateId(),
        width: rect.width,
        height: rect.height,
        borderRadius: layout.borderRadius,
        display: layout.display,
        gap: 0,
        isLeaf: true,
        children: [],
        tagName: root.tagName,
      },
    ];
  }

  return results;
}
