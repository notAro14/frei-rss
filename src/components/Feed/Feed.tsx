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

  return (
    <li>
      <details>
        <summary className={styles.summary}>{name}</summary>
        <ul className={styles.ul}>
          {feedItemsKeys.map((feedItemId) => {
            return <FeedItem key={feedItemId} id={feedItemId} />;
          })}
        </ul>
      </details>
    </li>
  );
}
