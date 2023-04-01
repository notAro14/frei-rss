import { useEffect } from "react";
import FeedItem from "src/feed/components/FeedItem";
import selectThisMonthArticles from "./selectThisMonthArticles";
import * as styles from "./ThisMonthArticle.css";
import { format, isAfter } from "src/utils/date";

import { feedsSelector } from "src/feed/components/Feed/Feeds.selector";
import { useSelector } from "src/store";
import { retrieveFeedList } from "src/FeedReader/retrieveFeedList/retrieveFeedList";
import { feedReaderApi, dispatch } from "src/components/config";

export default function ThisMonthArticles() {
  const { data: feeds, isLoading, isError } = useSelector(feedsSelector);

  useEffect(() => {
    const { unsubscribe } = retrieveFeedList({ dispatch, feedReaderApi });
    return unsubscribe;
  }, []);

  if (isError) return <p role="alert">Failed to get feeds</p>;
  if (isLoading || typeof feeds === "undefined")
    return <p role="progressbar">Loading...</p>;

  return (
    <aside>
      <h2 className={styles.header}>This Month</h2>
      <ul className={styles.ul}>
        {selectThisMonthArticles(feeds)
          .sort((articleA, articleB) => {
            if (isAfter(articleA.pubDate, articleB.pubDate)) return -1;
            if (isAfter(articleB.pubDate, articleA.pubDate)) return 1;
            return 0;
          })
          .map(({ title, url, pubDate }) => {
            const date = format(new Date(pubDate), "dd/MM/yyyy");
            return <FeedItem key={url} date={date} title={title} link={url} />;
          })}
      </ul>
    </aside>
  );
}
