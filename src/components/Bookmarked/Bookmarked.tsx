"use client";
import { Text } from "@radix-ui/themes";
import { useSelector } from "src/store";
import { Loader } from "src/components/Loader";
import { Article } from "src/components/Article";
import { useInfiniteScrollItemsLoad } from "src/hooks/useInfiniteScrollItemsLoad";
import { bookmarkedSelector } from "./Bookmarked.selector";

export function Bookmarked() {
  const { status, data, error } = useSelector(bookmarkedSelector);

  if (status === "pending") return <Loader />;
  if (status === "rejected")
    return (
      <Text color="red" role="alert">
        {error}
      </Text>
    );

  const { articleIds } = data;
  if (articleIds.length === 0)
    return <Text>You have no bookmarked articles</Text>;

  return <BookmarkedInner ids={articleIds} />;
}

function BookmarkedInner({ ids }: { ids: string[] }) {
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
