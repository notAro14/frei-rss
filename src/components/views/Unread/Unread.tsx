"use client";

import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useSelector } from "src/store";
import { unreadVMSelector } from "./Unread.VM.selector";
import { ArticleCard } from "src/components/ArticleCard";
import { Loader } from "src/components/Loader";
import { useRef } from "react";

export function UnreadArticles() {
  const { status, data: ids } = useSelector(unreadVMSelector);

  if (status === "pending") return <Loader />;
  if (status === "rejected") return <div>Failed to load unread articles</div>;
  return <UnreadArticlesInner ids={ids} />;
}

export function UnreadArticlesInner({ ids }: { ids: string[] }) {
  const count = ids.length;
  const listRef = useRef<HTMLDivElement>(null);
  const virtualizer = useWindowVirtualizer({
    count,
    estimateSize: () => 175,
    overscan: 50,
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
              className="absolute left-0 top-0 w-full"
              style={{
                height: `${virtualRow.size}px`,
                // transform: `translateY(${
                //   virtualRow.start - virtualizer.options.scrollMargin
                // }px)`,
                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin + virtualRow.index * 16}px)`,
              }}
            >
              <ArticleCard id={id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
