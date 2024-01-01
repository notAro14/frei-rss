"use client";
import { toast } from "sonner";
import {
  Flex,
  Heading,
  Link,
  Text,
  IconButton,
  AlertDialog,
  Button,
} from "@radix-ui/themes";
import { useDispatch, useSelector } from "src/store";
import { Article } from "src/components/Article";
import { ExternalLink, RefreshCcw, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSyncFeed } from "src/hooks/useSyncFeed";
import { removeFeed } from "src/lib/Feed/usecases/removeFeed";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const feed = useSelector((state) => state.getFeeds.entities?.feeds[slug]);
  const getFeedsStatus = useSelector((state) => state.getFeeds.status);
  const [syncFeed, syncFeedStatus] = useSyncFeed();
  const dispatch = useDispatch();
  const router = useRouter();

  if (!feed && getFeedsStatus === "pending")
    return <Text role="alert">Loading...</Text>;
  if (!feed && getFeedsStatus === "fulfilled") return router.push("/inbox");
  if (!feed) return router.push("/inbox");

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
      <Flex pl={"3"} mb={"-4"} direction="column" gap={"3"}>
        <Flex gap={"3"}>
          <IconButton
            onClick={() => syncFeed({ feedId, feedUrl: feed.url })}
            variant="soft"
            disabled={syncFeedStatus === "pending"}
            title="Sync feed"
            className="self-start"
          >
            <RefreshCcw size={"1em"} />
          </IconButton>
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <IconButton title="Delete feed" color="red" variant="soft">
                <Trash size={"1em"} />
              </IconButton>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Title>Unfollow feed</AlertDialog.Title>
              <AlertDialog.Description>
                Are you sure ? You will unfollow this feed and remove all
                related articles
              </AlertDialog.Description>
              <Flex gap={"4"} mt={"4"}>
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button onClick={onRemoveFeed} variant="solid" color="red">
                    Unfollow
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </Flex>
        <Heading as="h2" dangerouslySetInnerHTML={{ __html: feed.name }} />
        <Text>
          Source:{" "}
          <Link href={feed.url} target="_blank" rel="noopener">
            {feed.url} <ExternalLink size={"1em"} />
          </Link>
        </Text>
      </Flex>

      {feed.feedItems.map((aId) => {
        return <Article key={aId} id={aId} />;
      })}
    </Flex>
  );
}
