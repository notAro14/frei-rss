"use client";
import { Box, Card, Flex, ScrollArea, Link } from "@radix-ui/themes";
import { createSelector } from "@reduxjs/toolkit";
import NextLink from "next/link";
import { ReactNode } from "react";
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
  if (!feeds) return null;
  return (
    <Flex
      direction={{ initial: "column", xs: "row" }}
      position={"relative"}
      gap={"4"}
    >
      <Card
        style={{
          height: "max-content",
          // position: "sticky",
          // top: "var(--space-4)",
        }}
      >
        <ScrollArea
          style={{ height: 250 }}
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
