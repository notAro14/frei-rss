import * as styles from "./HomePage.css";
import ThisMonthArticles from "src/FeedReader/components/ThisMonthArticles/ThisMonthArticles";
import ToggleTheme from "src/components/ToggleTheme";
import FeedList from "src/FeedReader/components/FeedList/FeedList";
// import AddFeedForm from "src/feed/components/AddFeedForm";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.flex}>
        <h1 className={styles.header}>RSS</h1> <ToggleTheme />
      </div>
      {/* <AddFeedForm /> */}
      <ThisMonthArticles />
      <h2 className={styles.header}>All Feeds</h2>
      <FeedList />
    </main>
  );
}
