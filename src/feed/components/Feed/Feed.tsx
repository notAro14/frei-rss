import { format } from "date-fns";

import type { FeedItem as FeedItemType } from "src/feed/Feed";
import FeedItem from "../FeedItem";
import * as styles from "./Feed.css";

interface Props {
  name: string;
  items: FeedItemType[];
}

export default function Feed(props: Props) {
  const { name, items } = props;
  return (
    <details>
      <summary className={styles.summary}>{name}</summary>
      <ul className={styles.ul}>
        {items.map(({ title, link, isoDate }) => {
          const date = isoDate && format(new Date(isoDate), "dd/MM/yyyy");
          return <FeedItem key={link} date={date} title={title} link={link} />;
        })}
      </ul>
    </details>
  );
}
