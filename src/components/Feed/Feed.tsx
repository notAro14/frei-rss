import { format } from "date-fns";

import FeedItem from "src/components/FeedItem";
import { useSelector } from "src/store";

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
        return entities.feedItems[key];
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
          {feedItems.map(({ title, url, date }) => {
            const formattedDate = format(new Date(date), "dd/MM/yyyy");
            return (
              <FeedItem
                key={url}
                date={formattedDate}
                title={title}
                link={url}
              />
            );
          })}
        </ul>
      </details>
    </li>
  );
}
