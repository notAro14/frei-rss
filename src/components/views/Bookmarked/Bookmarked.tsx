"use client";
import { Text } from "@radix-ui/themes";
import { useSelector } from "src/store";
import { Loader } from "src/components/Loader";
import { ArticleCard } from "src/components/ArticleCard";
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
  return (
    <>
      {ids.map((id) => {
        return <ArticleCard id={id} key={id} />;
      })}
    </>
  );
}
