import { useSelector } from "src/store";
import { selectThisMonthArticles } from "./selectors";

import * as styles from "./ThisMonthArticle.css";
import FeedItem from "src/components/FeedItem";

export default function ThisMonthArticles() {
  const feedItems = useSelector(selectThisMonthArticles);

  if (!feedItems) return <Loading />;
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

function Loading() {
  return <p role="progressbar">Loading...</p>;
}
