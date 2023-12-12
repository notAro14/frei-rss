import { Badge, Box, Flex, Text } from "@radix-ui/themes";
import { createSelector } from "@reduxjs/toolkit";
import { State, useSelector } from "src/store";
import { Article } from "src/components/Article";

const getAllFeeds = createSelector(
  [
    (state: State) => state.getFeeds.entities?.feeds,
    (state: State) => state.getFeeds.result,
  ],
  (feeds, feedIds) => {
    if (!feeds) return null;
    if (!feedIds) return null;

    const res = feedIds.map((id) => {
      const feed = feeds[id];
      return {
        id: feed.id,
        name: feed.name,
        articleIds: feed.feedItems,
      };
    });
    return res;
  },
);

export function Feeds() {
  const feeds = useSelector(getAllFeeds);
  if (!feeds) return null;
  return (
    <Flex direction={"column"} gap={"2"}>
      {feeds.map((f) => (
        <Box
          p={"2"}
          className="rounded-4 border-solid"
          style={{
            borderColor: "var(--gray-surface)",
          }}
          asChild
          key={f.id}
        >
          <details key={f.id}>
            <Text
              asChild
              className="flex cursor-pointer items-center justify-between gap-rx-2"
              size={"4"}
            >
              <summary>
                <span>{f.name}</span>
                <Badge>{f.articleIds.length}</Badge>
              </summary>
            </Text>
            <Flex direction={"column"} gap={"8"} p={"4"}>
              {f.articleIds.map((id) => (
                <Article key={id} id={id} />
              ))}
            </Flex>
          </details>
        </Box>
      ))}
    </Flex>
  );
}
