"use client";

import { useSelector } from "src/store";
import { getUnreadArticleIds } from "src/selectors/getUnreadArticleIds.selector";
import { Article } from "src/components/Article";
import { Loader } from "src/components/Loader";
import { useVirtual } from "src/hooks/useVirtual";
import { Button } from "@radix-ui/themes";
import { ArrowDown, ArrowUp } from "lucide-react";

export function UnreadArticles() {
  const unreadFeedItemIds = useSelector(getUnreadArticleIds);

  if (!unreadFeedItemIds) return <Loader />;
  return <UnreadArticlesInner ids={unreadFeedItemIds} />;
}

export function UnreadArticlesInner({ ids }: { ids: string[] }) {
  const count = ids.length;
  const { items, virtualizer, div1Props, div2Props, div3Props } = useVirtual({
    count,
  });

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-center gap-4">
        <Button
          variant="ghost"
          size={"1"}
          onClick={() => {
            virtualizer.scrollToIndex(0);
          }}
        >
          <ArrowUp size={"1em"} />
          Scroll to top
        </Button>
        <Button
          variant="ghost"
          size={"1"}
          onClick={() => {
            virtualizer.scrollToIndex(count - 1);
          }}
        >
          <ArrowDown size={"1em"} />
          Scroll to bottom
        </Button>
      </header>
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
    </div>
  );
}
