"use client";
import { Text } from "@radix-ui/themes";
import { useSelector } from "src/store";
import { Loader } from "src/components/Loader";
import { Article } from "src/components/Article";
import { useInfiniteScrollItemsLoad } from "src/hooks/useInfiniteScrollItemsLoad";
import { likedSelector } from "./Liked.selector";

export function Liked() {
  const { status, data, error } = useSelector(likedSelector);

  if (status === "pending") return <Loader />;
  if (status === "rejected")
    return (
      <Text color="red" role="alert">
        {error}
      </Text>
    );

  const { articleIds } = data;
  if (articleIds.length === 0) return <Text>You have no liked articles</Text>;

  return <LikedInner ids={articleIds} />;
}

function LikedInner({ ids }: { ids: string[] }) {
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
