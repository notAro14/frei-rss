import { useCallback } from "react";
import { State, useSelector } from "src/store";
import { selectFeedItem } from "./selectors";
import * as styles from "./FeedItem.css";

interface Props {
  id: string;
}
export default function FeedItem({ id }: Props) {
  const selectFeedItemCb = useCallback(
    (state: State) => selectFeedItem(id)(state),
    [id]
  );
  const feedItem = useSelector(selectFeedItemCb);
  if (!feedItem) return null;
  const { date, title, url } = feedItem;
  return (
    <li className={styles.feedItem}>
      {date && <span className={styles.date}>{date}</span>}
      <a className={styles.link} href={url} target="_blank" rel="noopener">
        {title}
      </a>
    </li>
  );
}
