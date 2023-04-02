import FeedItem from "../FeedItem";
import * as styles from "./ThisMonthArticle.css";
import { useRetrieveFeedList } from "src/FeedReader/hooks";
import { thisMonthArticlesSelector } from "src/FeedReader/selectors";

export default function ThisMonthArticles() {
  const {
    isLoading,
    isError,
    selectorResult: feedItems,
  } = useRetrieveFeedList(thisMonthArticlesSelector);

  if (isError) return <p role="alert">Failed to get feeds</p>;
  if (isLoading || typeof feedItems === "undefined")
    return <p role="progressbar">Loading...</p>;

  return (
    <aside>
      <h2 className={styles.header}>This Month</h2>
      <ul className={styles.ul}>
        {feedItems.map(({ title, url, pubDate }) => {
          return <FeedItem key={url} date={pubDate} title={title} link={url} />;
        })}
      </ul>
    </aside>
  );
}
