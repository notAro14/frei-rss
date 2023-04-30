import { useEffect } from "react";

import { useDispatch, useSelector } from "src/store";
import Feed from "src/components/Feed";
import { getFeeds } from "src/Feed/usecases/getFeeds";

import * as styles from "./FeedList.css";

export default function FeedList() {
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.getFeeds.feeds);
  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (!feeds) return <p role="progressbar">Loading...</p>;

  return (
    <ul className={styles.feeds}>
      {feeds.map(({ url, items, title }) => {
        return <Feed name={title} key={url} items={items} />;
      })}
    </ul>
  );
}
