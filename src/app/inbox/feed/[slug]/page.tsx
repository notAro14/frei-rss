"use client";
import { Flex, Heading, Link, Text, IconButton } from "@radix-ui/themes";
import { useSelector } from "src/store";
import { Article } from "src/components/Article";
import { ExternalLink, RefreshCcw, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import { useSyncFeed } from "src/hooks/useSyncFeed";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const feed = useSelector((state) => state.getFeeds.entities?.feeds[slug]);
  const getFeedsStatus = useSelector((state) => state.getFeeds.status);
  const [syncFeed, syncFeedStatus] = useSyncFeed();

  if (!feed && getFeedsStatus === "pending")
    return <Text role="alert">Loading...</Text>;
  if (!feed && getFeedsStatus === "fulfilled") redirect("/");
  if (!feed) redirect("/");

  return (
    <Flex direction={"column"} gap={"8"}>
      <Flex pl={"3"} mb={"-4"} direction="column" gap={"3"}>
        <Flex gap={"3"}>
          <IconButton
            onClick={() => syncFeed({ feedId: feed.id, feedUrl: feed.website })}
            variant="soft"
            disabled={syncFeedStatus === "pending"}
            title="Sync feed"
            className="self-start"
          >
            <RefreshCcw size={"1em"} />
          </IconButton>
          <IconButton title="Delete feed" color="crimson" variant="soft">
            <Trash size={"1em"} />
          </IconButton>
        </Flex>
        <Heading as="h2" dangerouslySetInnerHTML={{ __html: feed.name }} />
        <Text>
          Source:{" "}
          <Link href={feed.website} target="_blank" rel="noopener">
            {feed.website} <ExternalLink size={"1em"} />
          </Link>
        </Text>
        B
      </Flex>

      {feed.feedItems.map((aId) => {
        return <Article key={aId} id={aId} />;
      })}
    </Flex>
  );
}
