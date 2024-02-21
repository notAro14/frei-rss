"use client";
import { useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { Text } from "@radix-ui/themes";
import { useSelector } from "src/store";
import { Loader } from "src/components/Loader";
import { Article } from "src/components/Article";
import { thisMonthArticlesSelector } from "./ThisMonthArticles.selector";

export function ThisMonthArticles() {
  const { status, data, error } = useSelector(thisMonthArticlesSelector);

  if (status === "pending") return <Loader />;
  if (status === "rejected")
    return (
      <Text color="red" role="alert">
        {error}
      </Text>
    );

  const { articleIds } = data;
  if (articleIds.length === 0)
    return <Text>There are no articles this month</Text>;

  return <ThisMonthArticlesInner ids={articleIds} />;
}

function ThisMonthArticlesInner({ ids }: { ids: string[] }) {
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
              className="absolute left-0 top-0 mb-4 w-full"
              style={{
                height: `${virtualRow.size}px`,
                // transform: `translateY(${
                //   virtualRow.start - virtualizer.options.scrollMargin
                // }px)`,
                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin + virtualRow.index * 16}px)`,
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
