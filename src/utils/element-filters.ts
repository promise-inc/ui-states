import { IGNORED_TAGS, MIN_WIDTH, MIN_HEIGHT } from "../constants";
import type { ElementRect } from "../types";

export function shouldIgnoreElement(element: Element): boolean {
  if (IGNORED_TAGS.has(element.tagName)) {
    return true;
  }

  if (element instanceof HTMLElement && element.hidden) {
    return true;
  }

  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
    return true;
  }

  return false;
}

export function isElementTooSmall(rect: ElementRect): boolean {
  return rect.width < MIN_WIDTH || rect.height < MIN_HEIGHT;
}

export function getElementRect(element: Element): ElementRect {
  const domRect = element.getBoundingClientRect();
  return {
    width: domRect.width,
    height: domRect.height,
    top: domRect.top,
    left: domRect.left,
  };
}
