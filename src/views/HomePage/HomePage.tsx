import type { Feed as FeedType } from "src/feed/Feed";
import Feed from "src/feed/components/Feed";
import * as styles from "./HomePage.css";
import AddFeedForm from "src/feed/components/AddFeedForm";

interface Props {
  feeds: FeedType[];
}

export default function HomePage(props: Props) {
  const { feeds } = props;
  return (
    <main className={styles.main}>
      <h1 className={styles.header}>RSS reader - Feed</h1>
      <AddFeedForm />
      <div className={styles.feeds}>
        {feeds.map(({ url, items, title }) => {
          return <Feed name={title} key={url} items={items} />;
        })}
      </div>
    </main>
  );
}
