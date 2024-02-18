import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export function useVirtual({
  count,
  estimateSize = () => 175,
}: {
  count: number;
  estimateSize?: () => number;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize,
  });
  const items = virtualizer.getVirtualItems();

  const div1Props = {
    style: {
      height: "60dvh",
      contain: "strict",
      scrollbarGutter: "stable",
    },
    className: "max-w-full overflow-y-auto overflow-x-hidden",
    ref: parentRef,
  } as const;
  const div2Props = {
    style: {
      height: virtualizer.getTotalSize(),
      position: "relative",
    },
  } as const;
  const div3Props = {
    style: {
      transform: `translateY(${items[0]?.start ?? 0}px)`,
    },
    className: "absolute left-0 top-0",
  } as const;
  return { virtualizer, items, div1Props, div2Props, div3Props };
}
