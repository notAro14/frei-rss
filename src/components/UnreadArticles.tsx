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
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: ids.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 175,
  });
  const items = virtualizer.getVirtualItems();
  return (
    <div
      style={{
        height: "65lvh",
        contain: "strict",
        scrollbarGutter: "stable",
      }}
      className="max-w-full overflow-y-auto overflow-x-hidden px-2"
      ref={parentRef}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        <div
          style={{
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
          className="absolute left-0 top-0"
        >
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
