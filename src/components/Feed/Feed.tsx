import FeedItem from "src/components/FeedItem";
import { useSelector } from "src/store";
import { format } from "src/utils/date";

import * as styles from "./Feed.css";

interface Props {
  name: string;
  feedItemsKeys: string[];
}

export default function Feed(props: Props) {
  const { name, feedItemsKeys } = props;
  const feedItems = useSelector((state) => {
    const { entities } = state.getFeeds;
    if (entities) {
      return feedItemsKeys.map((key) => {
        const feedItem = entities.feedItems[key];
        return {
          ...feedItem,
          date: format(new Date(feedItem.date), "dd/MM/yyyy"),
        };
      });
    }
    return null;
  });

  if (!feedItems) return null;

  return (
    <li>
      <details>
        <summary className={styles.summary}>{name}</summary>
        <ul className={styles.ul}>
          {feedItems.map(({ title, url, date, isRead }) => {
            return (
              <FeedItem
                key={url}
                date={date}
                title={title}
                link={url}
                isRead={isRead}
              />
            );
          })}
        </ul>
      </details>
    </li>
  );
}
