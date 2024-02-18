"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useSelector } from "src/store";
import { getUnreadArticleIds } from "src/selectors/getUnreadArticleIds.selector";
import { Article } from "src/components/Article";
import { Loader } from "src/components/Loader";

export function UnreadArticles() {
  const unreadFeedItemIds = useSelector(getUnreadArticleIds);

  if (!unreadFeedItemIds) return <Loader />;
  return <UnreadArticlesInner ids={unreadFeedItemIds} />;
}

export function UnreadArticlesInner({ ids }: { ids: string[] }) {
  const { items, virtualizer, div1Props, div2Props, div3Props } = useVirtual({
    count: ids.length,
    estimateSize: () => 175,
  });
  return (
    <div {...div1Props}>
      <div {...div2Props}>
        <div {...div3Props}>
          {items.map((virtualRow) => {
            const id = ids[virtualRow.index];
            return (
              <Article
                key={virtualRow.key}
                dataIndex={virtualRow.index}
                ref={virtualizer.measureElement}
                id={id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function useVirtual({
  count,
  estimateSize = () => 175,
}: {
  count: number;
  estimateSize: () => number;
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
      height: "65lvh",
      contain: "strict",
      scrollbarGutter: "stable",
    },
    className: "max-w-full overflow-y-auto overflow-x-hidden px-2",
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
