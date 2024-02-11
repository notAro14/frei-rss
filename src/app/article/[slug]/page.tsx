"use client";
import {
  Text,
  Box,
  Link,
  Flex,
  Heading,
  Badge,
  Button,
  Separator,
  Tabs,
  Avatar,
} from "@radix-ui/themes";
import { useEffect } from "react";
import NextLink from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ExternalLink, Check, Glasses, MoveLeft, Bookmark } from "lucide-react";
import { useSelector, useDispatch } from "src/store";
import { feedItemPageSelector } from "./FeedItemPage.selector";
import { ReaderView, Summary } from "src/components/ReaderView";
import { Loader } from "src/components/Loader";
import { getReaderView } from "src/lib/Feed/usecases/getReaderView";
import { changeFeedItemReadingStatus } from "src/lib/Feed/usecases/changeFeedItemReadingStatus";

export default function Page({ params }: { params: { slug: string } }) {
  const { status, data: article } = useSelector((state) =>
    feedItemPageSelector(state, params.slug),
  );
  const router = useRouter();

  const dispatch = useDispatch();
  useEffect(() => {
    status === "fulfilled" && dispatch(getReaderView(params.slug));
  }, [params.slug, dispatch, status]);

  if (status === "pending") return <Loader />;
  if (status === "fulfilled") {
    return (
      <Box>
        <Flex mb={"6"} direction={"column"} gap={"4"}>
          <Button
            className="mb-4 self-start"
            variant="ghost"
            onClick={router.back}
          >
            <MoveLeft size={"1em"} /> Go back
          </Button>
          <Flex gap={"2"}>
            <Avatar
              size={"1"}
              radius="full"
              src={article.feed.favicon}
              fallback={article.feed.name.charAt(0)}
            />
            <Link size={"4"} asChild className="line-clamp-1">
              <NextLink href={`/inbox/feed/${article.feed.id}`}>
                {article.feed.name}
              </NextLink>
            </Link>
          </Flex>
          <Heading
            dangerouslySetInnerHTML={{ __html: article.title }}
            as="h2"
          />
          <Text mt={"-2"} color="gray" size={"1"}>
            {article.pubDate}
          </Text>
          <ArticleActions article={{ id: article.id, url: article.url }} />
        </Flex>

        <Tabs.Root defaultValue="summary">
          <Tabs.List>
            <Tabs.Trigger value="summary">Excerpt</Tabs.Trigger>
            <Tabs.Trigger value="full-content">Full content</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content className="py-4" value="summary">
            <Summary content={article.summary} />
          </Tabs.Content>

          <Tabs.Content className="py-4" value="full-content">
            <ReaderView feedItemId={article.id} />
          </Tabs.Content>
        </Tabs.Root>

        <Separator my={"5"} />
        <ArticleActions article={{ id: article.id, url: article.url }} />
      </Box>
    );
  }

  notFound();
}

function ArticleActions({ article }: { article: { id: string; url: string } }) {
  const status = useSelector(
    (state) => state.getFeeds.entities?.feedItems[article.id].readStatus,
  );
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {status === "READ" && (
          <Badge color="grass">
            <Check size={"1em"} />
            Read
          </Badge>
        )}
        {status === "READ_LATER" && (
          <Badge color="yellow">
            <Bookmark size={"1em"} /> Saved
          </Badge>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {(status === "UNREAD" || status === "READ_LATER") && (
          <Button
            variant="outline"
            color="grass"
            onClick={() =>
              dispatch(
                changeFeedItemReadingStatus({
                  id: article.id,
                  newStatus: "READ",
                }),
              )
            }
          >
            <Glasses size={"1em"} />
            Mark as read
          </Button>
        )}
        {status === "UNREAD" && (
          <Button
            variant="outline"
            color="yellow"
            onClick={() => {
              dispatch(
                changeFeedItemReadingStatus({
                  id: article.id,
                  newStatus: "READ_LATER",
                }),
              );
            }}
          >
            <Bookmark size={"1em"} /> Read later
          </Button>
        )}

        <Link
          target="_blank"
          rel="noopener"
          className="flex w-max items-center gap-rx-2"
          href={article.url}
        >
          See original
          <ExternalLink size={"1em"} />
        </Link>
      </div>
    </div>
  );
}
