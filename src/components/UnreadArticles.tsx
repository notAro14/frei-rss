"use client";

import { useSelector } from "src/store";
import { getUnreadArticleIds } from "src/selectors/getUnreadArticleIds.selector";
import { Article } from "src/components/Article";
import { Loader } from "src/components/Loader";
import { useVirtual } from "src/hooks/useVirtual";

export function UnreadArticles() {
  const unreadFeedItemIds = useSelector(getUnreadArticleIds);

  if (!unreadFeedItemIds) return <Loader />;
  return <UnreadArticlesInner ids={unreadFeedItemIds} />;
}

export function UnreadArticlesInner({ ids }: { ids: string[] }) {
  const { items, virtualizer, div1Props, div2Props, div3Props } = useVirtual({
    count: ids.length,
    estimateSize: () => 175,
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
