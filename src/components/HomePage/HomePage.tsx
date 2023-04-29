import * as styles from "./HomePage.css";
import ThisMonthArticles from "src/FeedReader/components/ThisMonthArticles/ThisMonthArticles";
import FeedList from "src/FeedReader/components/FeedList/FeedList";
import AddFeedForm from "src/FeedReader/components/AddFeedForm";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <AddFeedForm />
      <ThisMonthArticles />
      <div>
        <h2 className={styles.header}>All Feeds</h2>
        <FeedList />
      </div>
    </main>
  );
}
