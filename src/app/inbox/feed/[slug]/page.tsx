"use client";
import { toast } from "sonner";
import {
  Flex,
  Heading,
  Link,
  Button,
  AlertDialog,
  Avatar,
} from "@radix-ui/themes";
import { State, useDispatch, useSelector } from "src/store";
import { Article } from "src/components/Article";
import { ExternalLink, RefreshCcw, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSyncFeed } from "src/hooks/useSyncFeed";
import { removeFeed } from "src/lib/Feed/usecases/removeFeed";
import { useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { Loader } from "src/components/Loader";

const getFeedsSelector = createSelector(
  [
    (state: State) => state.getFeeds.entities?.feeds,
    (state: State) => state.getFeeds.status,
    (_state: State, slug: string) => slug,
  ],
  (feeds, status, slug) => {
    if (status === "pending") return { status, data: null, error: null };
    if (status === "fulfilled") {
      const feed = feeds![slug];
      if (!feed) return { status, data: null, error: null };
      const { website } = feed;
      const favicon = website
        ? `https://www.google.com/s2/favicons?domain=${new URL(website).hostname}&sz=128`
        : undefined;
      const data = { ...feeds![slug], favicon };
      return { status, data, error: null };
    }
    if (status === "idle") return { status, data: null, error: null };
    return { status, data: null, error: "Could not retrieve feeds" };
  },
);

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { status: getFeedsStatus, data: feed } = useSelector((state: State) =>
    getFeedsSelector(state, slug),
  );
  const [syncFeed, syncFeedStatus] = useSyncFeed();
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (getFeedsStatus === "fulfilled" && !feed) router.push("/inbox");
  }, [feed, getFeedsStatus, router]);

  if (!feed && getFeedsStatus === "pending") return <Loader />;

  if (feed) {
    const onRemoveFeed = async () => {
      const promise = dispatch(removeFeed({ feedId })).unwrap();
      toast.promise(promise, {
        loading: "Unfollowing feed",
        success(feedName) {
          return `You no longer follow ${feedName}`;
        },
      });
    };

    const feedId = feed.id;
    return (
      <Flex direction={"column"} gap={"8"}>
        <Flex mb={"-4"} direction="column" gap={"3"}>
          <Flex gap={"2"}>
            <Avatar
              radius="full"
              size={"2"}
              src={feed.favicon}
              fallback={feed.name.charAt(0)}
            />
            <Heading
              mb={"-2"}
              as="h2"
              dangerouslySetInnerHTML={{ __html: feed.name }}
            />
          </Flex>

          {feed.website && (
            <Link href={feed.website} target="_blank" rel="noopener">
              {feed.website} <ExternalLink size={"1em"} />
            </Link>
          )}

          <Flex mt={"4"} gap={"3"}>
            <Button
              onClick={() => syncFeed({ feedId, feedUrl: feed.url })}
              variant="soft"
              disabled={syncFeedStatus === "pending"}
              title="Sync feed"
              className="self-start"
            >
              <RefreshCcw size={"1em"} />
              Refresh
            </Button>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button title="Delete feed" color="red" variant="soft">
                  <Trash size={"1em"} /> Unsubscribe
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content>
                <AlertDialog.Title>Unsubscribe from feed</AlertDialog.Title>
                <AlertDialog.Description>
                  Are you sure ? You will unsubscribe from this feed and remove
                  all related articles
                </AlertDialog.Description>
                <Flex gap={"4"} mt={"4"}>
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button onClick={onRemoveFeed} variant="solid" color="red">
                      Unsubscribe
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </Flex>
        </Flex>

        {feed.feedItems.map((aId) => {
          return <Article key={aId} id={aId} />;
        })}
      </Flex>
    );
  }

  return null;
}
