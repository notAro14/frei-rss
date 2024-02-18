"use client";
import { Avatar, Heading, Text, Link as RxLink } from "@radix-ui/themes";
import { ExternalLink } from "lucide-react";

import { Loader } from "src/components/Loader";
import { useSelector } from "src/store";

import { useVirtual } from "src/hooks/useVirtual";
import { Article } from "src/components/Article";
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
  const { items, virtualizer, div1Props, div2Props, div3Props } = useVirtual({
    count: 10,
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
