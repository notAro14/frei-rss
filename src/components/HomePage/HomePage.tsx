import { useEffect } from "react";

import ThisMonthArticles from "src/components/ThisMonthArticles/ThisMonthArticles";
import FeedList from "src/components/FeedList/FeedList";
import AddFeedForm from "src/components/AddFeedForm";
import { useDispatch } from "src/store";
import { getFeeds } from "src/Feed/usecases/getFeeds";

import * as styles from "./HomePage.css";

export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

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
