import Feed from "src/FeedReader/components/Feed";
import { useRetrieveFeedList } from "src/FeedReader/hooks";
import * as styles from "./FeedList.css";

export default function FeedList() {
  const { data: feeds, isLoading, isError } = useRetrieveFeedList();

  if (isError) return <p role="alert">Failed to get feeds</p>;
  if (isLoading || typeof feeds === "undefined")
    return <p role="progressbar">Loading...</p>;

  return (
    <div className={styles.feeds}>
      {feeds.map(({ url, items, title }) => {
        return <Feed name={title} key={url} items={items} />;
      })}
    </div>
  );
}
