import { useSelector } from "src/store";
import { Box, Flex, Text, Heading } from "@radix-ui/themes";
import { selectThisMonthArticles } from "./selectors";

import FeedItem from "src/components/FeedItem";

function Loading() {
  return <p role="progressbar">Loading...</p>;
}

export default function ThisMonthArticles() {
  const feedItems = useSelector(selectThisMonthArticles);

  if (!feedItems) return <Loading />;

  return (
    <>
      <Heading as="h2" mb={"4"}>
        This Month articles
      </Heading>
      <Box>
        {feedItems.length ? (
          <Flex direction={"column"} gap={"8"}>
            {feedItems.map((id) => {
              return <FeedItem key={id} id={id} />;
            })}
          </Flex>
        ) : (
          <Text>There aren&apos;t articles this month yet</Text>
        )}
      </Box>
    </>
  );
}
