"use client";
import { Text } from "@radix-ui/themes";
import { useSelector } from "src/store";
import { Loader } from "src/components/Loader";
import { Article } from "src/components/Article";
import { useInfiniteScrollItemsLoad } from "src/hooks/useInfiniteScrollItemsLoad";
import { thisMonthArticlesSelector } from "./ThisMonthArticles.selector";

export function ThisMonthArticles() {
  const { status, data, error } = useSelector(thisMonthArticlesSelector);

  if (status === "pending") return <Loader />;
  if (status === "rejected")
    return (
      <Text color="red" role="alert">
        {error}
      </Text>
    );

  const { articleIds } = data;
  if (articleIds.length === 0)
    return <Text>There are no articles this month</Text>;

  return <ThisMonthArticlesInner ids={articleIds} />;
}

function ThisMonthArticlesInner({ ids }: { ids: string[] }) {
  const { ref, visible } = useInfiniteScrollItemsLoad(ids);
  return (
    <>
      {visible.map((id) => {
        return <Article id={id} key={id} />;
      })}
      <div ref={ref} />
    </>
  );
}
