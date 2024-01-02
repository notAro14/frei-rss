"use client";
import {
  Text,
  Box,
  Card,
  Link,
  Flex,
  Heading,
  Badge,
  Button,
  Separator,
} from "@radix-ui/themes";
import NextLink from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Rss, Check, Glasses, Frown } from "lucide-react";
import { useSelector, useDispatch, State } from "src/store";
import { markFeedItemAsRead } from "src/lib/Feed/usecases/markFeedItemAsRead";
import { singleArticleSelector } from "src/selectors/singleArticle.selector";
import styles from "./styles.module.scss";
import { useWithSound } from "src/hooks/useWithSound";
import { createSelector } from "@reduxjs/toolkit";

const feedNameSelector = createSelector(
  [
    (state: State) => state.getFeeds.entities?.feeds,
    (_state: State, feedId?: string) => feedId,
  ],
  (feeds, feedId) => {
    if (feeds && feedId) return feeds[feedId].name;
    return null;
  },
);

export default function Page({ params }: { params: { slug: string } }) {
  const selector = useCallback(
    (state: State) => singleArticleSelector(state, params.slug),
    [params.slug],
  );
  const data = useSelector(selector);
  const feedNameSelectorMemoized = useCallback(
    (state: State) => feedNameSelector(state, data?.article?.feedId),
    [data?.article?.feedId],
  );
  const feedName = useSelector(feedNameSelectorMemoized);
  const router = useRouter();
  if (data === null) return <Text role="alert">Loading...</Text>;
  if (data.ok) {
    const article = data.article;
    return (
      <Card>
        <Flex mb={"5"} direction={"column"} gap={"4"}>
          <Flex wrap={"wrap"} align={"center"} gap={"4"}>
            <MarkAsRead id={article.id} />
            <Link
              target="_blank"
              rel="noopener"
              className="flex w-max items-center gap-rx-2"
              href={article.url}
            >
              Go to original article
              <ExternalLink size={"1em"} />
            </Link>
          </Flex>
          <Separator />
          <Link asChild className="flex items-center gap-1">
            <NextLink href={`/inbox/feed/${article.feedId}`}>
              <Rss size={"1em"} /> {feedName}
            </NextLink>
          </Link>
        </Flex>
        <Separator my={"4"} size={"4"} />
        <Heading
          dangerouslySetInnerHTML={{ __html: article.title }}
          mb={"6"}
          as="h2"
        />
        {article.content ? (
          <Box
            className={styles.preview}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <Text color="red" role="alert">
            Oh no, this article does not have a preview <Frown size={"1em"} />
          </Text>
        )}
      </Card>
    );
  }

  return router.push("/");
}

function MarkAsRead({ id }: { id: string }) {
  const { playSound } = useWithSound("/sounds/success.mp3");
  const isRead = useSelector(
    (state) => state.getFeeds.entities?.feedItems[id].readStatus === "READ",
  );
  const dispatch = useDispatch();

  return (
    <>
      {isRead ? (
        <Badge size={"2"} color="grass">
          <Check size={"1em"} />
          Read
        </Badge>
      ) : (
        <Button
          variant="soft"
          onClick={async () => {
            await dispatch(markFeedItemAsRead({ feedItemId: id }));
            playSound();
          }}
        >
          <Glasses size={"1em"} />
          Mark as read
        </Button>
      )}
    </>
  );
}
