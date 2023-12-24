"use client";
import { toast } from "sonner";
import { Flex, Heading, Link, Text, IconButton } from "@radix-ui/themes";
import { useDispatch, useSelector } from "src/store";
import { Article } from "src/components/Article";
import { ExternalLink, RefreshCcw, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import { useSyncFeed } from "src/hooks/useSyncFeed";
import { removeFeed } from "src/lib/Feed/usecases/removeFeed";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const feed = useSelector((state) => state.getFeeds.entities?.feeds[slug]);
  const getFeedsStatus = useSelector((state) => state.getFeeds.status);
  const [syncFeed, syncFeedStatus] = useSyncFeed();
  const dispatch = useDispatch();

  if (!feed && getFeedsStatus === "pending")
    return <Text role="alert">Loading...</Text>;
  if (!feed && getFeedsStatus === "fulfilled") redirect("/inbox");
  if (!feed) redirect("/inbox");

  const feedId = feed.id;
  return (
    <Flex direction={"column"} gap={"8"}>
      <Flex pl={"3"} mb={"-4"} direction="column" gap={"3"}>
        <Flex gap={"3"}>
          <IconButton
            onClick={() => syncFeed({ feedId, feedUrl: feed.website })}
            variant="soft"
            disabled={syncFeedStatus === "pending"}
            title="Sync feed"
            className="self-start"
          >
            <RefreshCcw size={"1em"} />
          </IconButton>
          <IconButton
            onClick={async () => {
              const promise = dispatch(removeFeed({ feedId })).unwrap();
              toast.promise(promise, {
                loading: "Unfollowing feed",
                success(feedName) {
                  return `You no longer follow ${feedName}`;
                },
              });
            }}
            title="Delete feed"
            color="crimson"
            variant="soft"
          >
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
      </Flex>

      {feed.feedItems.map((aId) => {
        return <Article key={aId} id={aId} />;
      })}
    </Flex>
  );
}
