import { RADIUS_MAP } from "../constants";
import type { LayoutInfo, SkeletonNode } from "../types";

function parseGap(gapValue: string): number {
  const parsed = parseFloat(gapValue);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function normalizeRadius(computed: string): string {
  if (!computed || computed === "0px") return "rounded-none";

  const parts = computed.split(" ");
  const first = parts[0] ?? "0px";

  const mapped = RADIUS_MAP[first as keyof typeof RADIUS_MAP];
  if (mapped) return mapped;

  const px = parseFloat(first);
  if (Number.isNaN(px)) return "rounded";

  if (px >= 9999) return "rounded-full";
  if (px >= 24) return "rounded-3xl";
  if (px >= 16) return "rounded-2xl";
  if (px >= 12) return "rounded-xl";
  if (px >= 8) return "rounded-lg";
  if (px >= 6) return "rounded-md";
  if (px >= 4) return "rounded";
  if (px >= 2) return "rounded-sm";
  return "rounded-none";
}

function detectGridCols(style: CSSStyleDeclaration): number | undefined {
  if (style.display !== "grid") return undefined;

  const template = style.gridTemplateColumns;
  if (!template || template === "none") return undefined;

  const cols = template.split(/\s+/).filter((part) => part !== "none" && part.length > 0);
  return cols.length > 0 ? cols.length : undefined;
}

function normalizeDisplay(display: string): SkeletonNode["display"] {
  if (display.includes("flex")) return "flex";
  if (display.includes("grid")) return "grid";
  if (display.includes("inline-block")) return "inline-block";
  if (display.includes("inline")) return "inline";
  return "block";
}

export function detectLayout(element: Element): LayoutInfo {
  const style = window.getComputedStyle(element);
  const display = normalizeDisplay(style.display);

  return {
    display,
    flexDirection:
      display === "flex"
        ? (style.flexDirection as "row" | "column") === "column"
          ? "column"
          : "row"
        : undefined,
    gridCols: detectGridCols(style),
    gap: parseGap(style.gap),
    borderRadius: normalizeRadius(style.borderRadius),
  };
}
