"use client";
import {
  Button,
  Card,
  Flex,
  Link,
  Heading,
  Badge,
  Avatar,
} from "@radix-ui/themes";
import { createSelector } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { ArrowUpRightFromSquare, PartyPopper, Rss } from "lucide-react";
import { useDispatch, useSelector, State as AppState } from "src/store";
import { registerFeed } from "src/lib/Feed/usecases/registerFeed";
import NextLink from "next/link";

const foundFeedSelector = createSelector(
  [
    (state: AppState) => state.getFeeds.entities?.feeds,
    (state: AppState) => state.getFeeds.result,
    (state: AppState) => state.getFeeds.status,
    (_state: AppState, url: string) => url,
  ],
  (feeds, result, status, url) => {
    if (status === "fulfilled" && feeds && result) {
      const feedId = result.find((id) => {
        return feeds[id].url === url;
      });
      if (!feedId) return null;
      return {
        id: feedId,
      };
    }
    return null;
  },
);

type Props = {
  title: string;
  url: string;
  favicon: string;
};
export function FoundFeed(props: Props) {
  const feed = useSelector((state) => foundFeedSelector(state, props.url));
  const isRegisteringFeed = useSelector(
    (state) => state.registerFeed.status === "pending",
  );
  const dispatch = useDispatch();

  async function follow() {
    const promise = dispatch(registerFeed(props.url)).unwrap();
    toast.promise(promise, {
      loading: "Fetching articles...",
      success: (data) => {
        return `${data.articlesCount} articles synced`;
      },
      error(error) {
        return error ?? "Failed to register feed";
      },
    });
  }
  return (
    <Card>
      <Flex className="max-w-full" direction={"column"} gap={"5"}>
        <Heading className="flex gap-3" as="h2" mb={"-4"}>
          <Avatar
            size={"1"}
            radius="full"
            src={props.favicon}
            fallback={props.title.charAt(0)}
          />
          {props.title}
        </Heading>
        <Link
          className="line-clamp-1"
          href={props.url}
          target="_blank"
          rel="noopener"
        >
          {props.url}
        </Link>
        {feed?.id ? (
          <Flex direction={"column"} gap={"4"}>
            <Badge size={"2"} color="grass">
              <PartyPopper size={"1em"} /> You are subscribed
            </Badge>
            <Button asChild>
              <NextLink href={`/inbox/feed/${feed.id}`}>
                <ArrowUpRightFromSquare size={"1em"} /> Go to feed
              </NextLink>
            </Button>
          </Flex>
        ) : (
          <Button disabled={isRegisteringFeed} onClick={follow} variant="soft">
            <Rss size={"1em"} />
            Subscribe
          </Button>
        )}
      </Flex>
    </Card>
  );
}
