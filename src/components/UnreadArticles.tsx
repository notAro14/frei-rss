"use client";

import { useSelector } from "src/store";
import { getUnreadArticleIds } from "src/selectors/getUnreadArticleIds.selector";
import { Article } from "src/components/Article";
import { Loader } from "src/components/Loader";
import { useInfiniteScrollItemsLoad } from "src/hooks/useInfiniteScrollItemsLoad";

export function UnreadArticles() {
  const unreadFeedItemIds = useSelector(getUnreadArticleIds);
  const { visible, ref } = useInfiniteScrollItemsLoad(unreadFeedItemIds);

  if (!unreadFeedItemIds) return <Loader />;
  return (
    <>
      {visible.map((id) => {
        return <Article key={id} id={id} />;
      })}
      <div ref={ref} />
    </>
  );
}
