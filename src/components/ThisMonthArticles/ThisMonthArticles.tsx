import { useSelector } from "src/store";
import { selectThisMonthArticles } from "./selectors";

import * as styles from "./ThisMonthArticle.css";
import FeedItem from "src/components/FeedItem";

function Loading() {
  return <p role="progressbar">Loading...</p>;
}

export default function ThisMonthArticles() {
  const feedItems = useSelector(selectThisMonthArticles);

  if (!feedItems) return <Loading />;

  return (
    <aside>
      {feedItems.length ? (
        <ul className={styles.ul}>
          {feedItems.map((id) => {
            return <FeedItem key={id} id={id} />;
          })}
        </ul>
      ) : (
        <p className={styles.text}>There aren&apos;t articles this month yet</p>
      )}
    </aside>
  );
}
