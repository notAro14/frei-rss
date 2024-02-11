"use client";
import { Avatar, Heading, Text, Link as RxLink } from "@radix-ui/themes";
import { ExternalLink } from "lucide-react";

import { Loader } from "src/components/Loader";
import { useSelector } from "src/store";

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

      <div className="flex flex-col gap-8">
        {articles.map((article) => {
          return <Article key={article} id={article} />;
        })}
      </div>
    </main>
  );
}
