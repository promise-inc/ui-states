export const MIN_WIDTH = 8;
export const MIN_HEIGHT = 8;
export const MAX_DEPTH = 10;
export const CACHE_TTL = 5 * 60 * 1000;
export const RESIZE_DEBOUNCE_MS = 200;
export const VIEWPORT_TOLERANCE = 50;
export const STORAGE_PREFIX = "ui-states:";

export const RADIUS_MAP = {
  "0px": "rounded-none",
  "2px": "rounded-sm",
  "4px": "rounded",
  "6px": "rounded-md",
  "8px": "rounded-lg",
  "12px": "rounded-xl",
  "16px": "rounded-2xl",
  "24px": "rounded-3xl",
  "9999px": "rounded-full",
} as const;

export const IGNORED_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "LINK",
  "META",
  "NOSCRIPT",
  "BR",
  "HR",
  "WBR",
]);

export const LEAF_TAGS = new Set([
  "IMG",
  "VIDEO",
  "CANVAS",
  "SVG",
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "BUTTON",
  "A",
  "SPAN",
  "P",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "LABEL",
]);
