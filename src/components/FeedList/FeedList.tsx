import { useSelector } from "src/store";
import Feed from "src/components/Feed";

import * as styles from "./FeedList.css";

export default function FeedList() {
  const feeds = useSelector((state) => {
    const { entities, result } = state.getFeeds;
    if (entities && result)
      return result.map((key) => {
        return entities.feeds[key];
      });

    return null;
  });

  if (!feeds) return <p role="progressbar">Loading...</p>;

  return (
    <ul className={styles.feeds}>
      {feeds.map(({ website, name, feedItems }) => {
        return <Feed name={name} key={website} feedItemsKeys={feedItems} />;
      })}
    </ul>
  );
}
