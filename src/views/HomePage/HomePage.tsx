import type { Feed as FeedType } from "src/feed/Feed";
import Feed from "src/feed/components/Feed";
import * as styles from "./HomePage.css";

interface Props {
  feeds: FeedType[];
}

export default function HomePage(props: Props) {
  const { feeds } = props;
  return (
    <main className={styles.main}>
      <h1>RSS reader - Feed</h1>
      <div className={styles.feeds}>
        {feeds.map(({ link, items, title }) => {
          return <Feed name={title} key={link} items={items} />;
        })}
      </div>
    </main>
  );
}
