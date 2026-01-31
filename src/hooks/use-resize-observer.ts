import { useEffect, useRef, useCallback, useState } from "react";
import { RESIZE_DEBOUNCE_MS } from "../constants";

interface Size {
  readonly width: number;
  readonly height: number;
}

export function useResizeObserver(
  ref: React.RefObject<Element>,
): Size | null {
  const [size, setSize] = useState<Size | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const entry = entries[0];
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    }, RESIZE_DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(handleResize);
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [ref, handleResize]);

  return size;
}
