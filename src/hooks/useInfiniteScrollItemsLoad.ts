import { useState, useRef, useCallback } from "react";
import { useIntersectionObserver } from "src/hooks/useIntersectionObserver";

const STEP = 100;

export function useInfiniteScrollItemsLoad(items?: string[] | null) {
  const count = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<string[]>([]);
  const callback = useCallback(
    (instance?: IntersectionObserver) => {
      if (!items) return;
      const next = items.slice(count.current, count.current + STEP);
      if (!next.length) {
        instance?.disconnect();
        return;
      }
      setVisible((prev) => [...prev, ...next]);
      setTimeout(() => {
        count.current += STEP;
      }, 0);
    },
    [items],
  );
  useIntersectionObserver(ref, callback);

  return { visible, ref };
}
