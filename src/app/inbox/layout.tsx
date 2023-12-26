"use client";
import {
  Box,
  Card,
  Flex,
  ScrollArea,
  Link,
  Separator,
  Heading,
} from "@radix-ui/themes";
import { createSelector } from "@reduxjs/toolkit";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { getUnreadArticlesCount } from "src/selectors/getUnreadArticleIds.selector";
import { useSelector, type State } from "src/store";

const allFeedsSelector = createSelector(
  [
    (state: State) => state.getFeeds.status,
    (state: State) => state.getFeeds.result!,
    (state: State) => state.getFeeds.entities?.feeds!,
  ],
  (status, feedIds, normalizedFeeds) => {
    if (status === "fulfilled") {
      const res = feedIds.map((fId) => {
        return normalizedFeeds[fId];
      });
      return res;
    }

    return null;
  },
);

export default function Layout({ children }: { children: ReactNode }) {
  const feeds = useSelector(allFeedsSelector);

  const router = useRouter();
  if (!feeds) return null;
  if (!feeds.length) return router.push("/");
  return (
    <Flex
      direction={{ initial: "column", xs: "row" }}
      position={"relative"}
      gap={{ initial: "6", xs: "4" }}
    >
      <Card
        style={{
          height: "max-content",
          // position: "sticky",
          // top: "var(--space-4)",
        }}
      >
        <ScrollArea
          style={{ maxHeight: 300 }}
          className="flex flex-col gap-rx-4"
          scrollbars="vertical"
          type="auto"
        >
          <Flex
            style={{ maxWidth: 200 }}
            p={"2"}
            direction={"column"}
            gap={"4"}
          >
            <Heading size="1" as="h6">
              Inbox
            </Heading>
            <UnreadLink />
            <Separator size={"4"} />
            <Heading size="1" as="h6">
              All feeds
            </Heading>
            {feeds.map((f) => {
              return (
                <Link asChild key={f.id}>
                  <NextLink
                    href={`/inbox/feed/${f.id}`}
                    dangerouslySetInnerHTML={{ __html: f.name }}
                  />
                </Link>
              );
            })}
          </Flex>
        </ScrollArea>
      </Card>
      <Box className="flex-1">{children}</Box>
    </Flex>
  );
}

function UnreadLink() {
  const count = useSelector(getUnreadArticlesCount);
  if (count === null) return null;
  return (
    <Link asChild>
      <NextLink href={`/inbox/unread`}>Unread ({count})</NextLink>
    </Link>
  );
}
