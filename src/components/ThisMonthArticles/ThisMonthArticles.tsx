import { useEffect } from "react";

import { useDispatch, useSelector } from "src/store";
import { selectThisMonthArticles } from "./selectors";
import { getFeeds } from "src/Feed/usecases/getFeeds";

import * as styles from "./ThisMonthArticle.css";
import FeedItem from "src/components/FeedItem";

export default function ThisMonthArticles() {
  const dispatch = useDispatch();
  const feedItems = useSelector(selectThisMonthArticles);
  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

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
