"use client";

import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useSelector } from "src/store";
import { getUnreadArticleIds } from "src/selectors/getUnreadArticleIds.selector";
import { Article } from "src/components/Article";
import { Loader } from "src/components/Loader";
import { useRef } from "react";

export function UnreadArticles() {
  const unreadFeedItemIds = useSelector(getUnreadArticleIds);

  if (!unreadFeedItemIds) return <Loader />;
  return <UnreadArticlesInner ids={unreadFeedItemIds} />;
}

export function UnreadArticlesInner({ ids }: { ids: string[] }) {
  const count = ids.length;
  const listRef = useRef<HTMLDivElement>(null);
  const virtualizer = useWindowVirtualizer({
    count,
    estimateSize: () => 175,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  return (
    <div className="max-x-full" ref={listRef}>
      <div
        className="relative w-full"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const id = ids[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              className="absolute left-0 top-0 mb-4 w-full"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${
                  virtualRow.start - virtualizer.options.scrollMargin
                }px)`,
              }}
            >
              <Article id={id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
