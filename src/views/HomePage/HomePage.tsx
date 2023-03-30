import type { Feed as FeedType } from "src/feed/Feed";
import Feed from "src/feed/components/Feed";
import * as styles from "./HomePage.css";
import AddFeedForm from "src/feed/components/AddFeedForm";
import ThisMonthArticles from "src/feed/components/ThisMonthArticles/ThisMonthArticles";

interface Props {
  feeds: FeedType[];
}

export default function HomePage(props: Props) {
  const { feeds } = props;
  return (
    <main className={styles.main}>
      <h1 className={styles.header}>RSS</h1>
      <AddFeedForm />
      <ThisMonthArticles feeds={feeds} />
      <h2 className={styles.header}>All Feeds</h2>
      <div className={styles.feeds}>
        {feeds.map(({ url, items, title }) => {
          return <Feed name={title} key={url} items={items} />;
        })}
      </div>
    </main>
  );
}
