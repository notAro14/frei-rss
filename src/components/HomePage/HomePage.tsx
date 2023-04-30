import * as styles from "./HomePage.css";
import ThisMonthArticles from "src/components/ThisMonthArticles/ThisMonthArticles";
import FeedList from "src/components/FeedList/FeedList";
import AddFeedForm from "src/components/AddFeedForm";

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
