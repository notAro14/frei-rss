import { useSelector } from "src/store";
import { Box, Flex, Text, Strong } from "@radix-ui/themes";
import { getThisMonthArticleIds } from "src/selectors/getThisMonthArticleIds.selector";

import { Article } from "src/components/Article";

function Loading() {
  return <p role="progressbar">Loading...</p>;
}

export function ThisMonthArticles() {
  const feedItems = useSelector(getThisMonthArticleIds);

  if (!feedItems) return <Loading />;

  return (
    <Box>
      {feedItems.length ? (
        <Flex direction={"column"} gap={"8"}>
          <Text>
            You have <Strong>{feedItems.length}</Strong> article(s) this month
          </Text>
          {feedItems.map((id) => {
            return <Article key={id} id={id} />;
          })}
        </Flex>
      ) : (
        <Text>There aren&apos;t articles this month yet</Text>
      )}
    </Box>
  );
}
