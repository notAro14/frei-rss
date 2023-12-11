import { Box, Flex, Text } from "@radix-ui/themes";
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
    <Flex direction={"column"} gap={"4"}>
      {feeds.map((f) => (
        <Box asChild key={f.id}>
          <details>
            <Text size={"4"} asChild>
              <summary>{f.name}</summary>
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
