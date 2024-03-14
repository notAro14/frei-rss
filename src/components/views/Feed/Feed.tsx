"use client";
import { useRef } from "react";
import { Avatar, Heading, Text, Link as RxLink } from "@radix-ui/themes";
import { ExternalLink } from "lucide-react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import { Loader } from "src/components/Loader";
import { useSelector } from "src/store";

import { ArticleCard } from "src/components/ArticleCard";
import { FeedActions } from "./FeedActions";
import { feedSelector } from "./Feed.selector";

export function Feed({ id }: { id: string }) {
  const { status, data, error } = useSelector((state) =>
    feedSelector(state, id),
  );

  if (status === "pending") return <Loader />;
  if (status === "rejected")
    return (
      <Text color="red" role="alert">
        {error}
      </Text>
    );

  const {
    name,
    website,
    url,
    favicon: { src, fallback },
    articles,
  } = data;
  return (
    <main className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <div className="flex gap-1">
          <Avatar radius="full" size={"2"} src={src} fallback={fallback} />
          <Heading as="h2" dangerouslySetInnerHTML={{ __html: name }} />
        </div>
        {website && (
          <RxLink href={website} target="_blank" rel="noopener">
            {website} <ExternalLink size={"1em"} />
          </RxLink>
        )}
        <FeedActions id={id} url={url} />
      </header>

      <FeedInner ids={articles} />
    </main>
  );
}

function FeedInner({ ids }: { ids: string[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const virtualizer = useWindowVirtualizer({
    count: ids.length,
    estimateSize: () => 175,
    overscan: 50,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  return (
    <div ref={listRef} className="max-w-full">
      <div
        className="relative w-full"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const id = ids[virtualRow.index];
          if (!id) return null;
          return (
            <div
              key={virtualRow.key}
              className="absolute left-0 top-0 w-full"
              style={{
                height: `${virtualRow.size}px`,
                // transform: `translateY(${
                //   virtiualRow.start - virtualizer.options.scrollMargin
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
