"use client";
import { Text } from "@radix-ui/themes";
import { useSelector } from "src/store";
import { Loader } from "src/components/Loader";
import { Article } from "src/components/Article";
import { thisMonthArticlesSelector } from "./ThisMonthArticles.selector";
import { useVirtual } from "src/hooks/useVirtual";

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
  const { items, virtualizer, div1Props, div2Props, div3Props } = useVirtual({
    count: ids.length,
  });
  return (
    <div {...div1Props}>
      <div {...div2Props}>
        <div {...div3Props}>
          {items.map((virtualRow) => {
            const id = ids[virtualRow.index];
            return (
              <Article
                key={virtualRow.key}
                dataIndex={virtualRow.index}
                ref={virtualizer.measureElement}
                id={id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
