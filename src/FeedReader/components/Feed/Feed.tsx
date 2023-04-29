import { format } from "date-fns";

import type { FeedItem as FeedItemType } from "src/FeedReader/models";
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
          {items.map(({ title, url, pubDate }) => {
            const date = format(new Date(pubDate), "dd/MM/yyyy");
            return <FeedItem key={url} date={date} title={title} link={url} />;
          })}
        </ul>
      </details>
    </li>
  );
}
