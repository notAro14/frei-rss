import { useSelector } from "src/store";
import { Box, Flex, Text, Strong } from "@radix-ui/themes";
import { selectThisMonthArticles } from "./selectors";

import FeedItem from "src/components/FeedItem";

function Loading() {
  return <p role="progressbar">Loading...</p>;
}

export default function ThisMonthArticles() {
  const feedItems = useSelector(selectThisMonthArticles);

  if (!feedItems) return <Loading />;

  return (
    <Box>
      {feedItems.length ? (
        <Flex direction={"column"} gap={"8"}>
          <Text>
            You have <Strong>{feedItems.length}</Strong> article(s) this month
          </Text>
          {feedItems.map((id) => {
            return <FeedItem key={id} id={id} />;
          })}
        </Flex>
      ) : (
        <Text>There aren&apos;t articles this month yet</Text>
      )}
    </Box>
  );
}
