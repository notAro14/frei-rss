import { format } from "date-fns";

import type { FeedItem as FeedItemType } from "src/Feed/entities/Feed";
import FeedItem from "../FeedItem";
import * as styles from "./Feed.css";

interface Props {
  name: string;
  items: FeedItemType[];
}

export default function Feed(props: Props) {
  const { name, items } = props;
  return (
    <li>
      <details>
        <summary className={styles.summary}>{name}</summary>
        <ul className={styles.ul}>
          {items.map(({ title, url, date }) => {
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
