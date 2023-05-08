import { useSelector } from "src/store";
import Feed from "src/components/Feed";
import { selectFeeds } from "./selectors";
import * as styles from "./FeedList.css";

export default function FeedList() {
  const feeds = useSelector(selectFeeds);

  if (!feeds) return <p role="progressbar">Loading...</p>;

  return (
    <ul className={styles.feeds}>
      {feeds.map(({ name, feedItems, id }) => {
        return <Feed id={id} name={name} key={id} feedItemsKeys={feedItems} />;
      })}
    </ul>
  );
}
