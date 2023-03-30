import type { Feed } from "src/feed/Feed";
import FeedItem from "src/feed/components/FeedItem";
import selectThisMonthArticles from "./selectThisMonthArticles";
import * as styles from "./ThisMonthArticle.css";
import { format, isAfter } from "src/utils/date";

interface Props {
  feeds: Feed[];
}

export default function ThisMonthArticles(props: Props) {
  return (
    <aside>
      <h2 className={styles.header}>This Month</h2>
      <ul className={styles.ul}>
        {selectThisMonthArticles(props.feeds)
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
