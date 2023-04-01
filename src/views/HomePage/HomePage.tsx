import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import Feed from "src/feed/components/Feed";
import * as styles from "./HomePage.css";
// import AddFeedForm from "src/feed/components/AddFeedForm";
import ThisMonthArticles from "src/feed/components/ThisMonthArticles/ThisMonthArticles";
import { useTheme } from "next-themes";
import { useCallback } from "react";

import { feedsSelector } from "src/feed/components/Feed/Feeds.selector";
import { useSelector } from "src/store";
import { retrieveFeedList } from "src/FeedReader/retrieveFeedList/retrieveFeedList";
import { feedReaderApi, dispatch } from "src/components/config";
import { useIsBrowser } from "src/hooks";

function Feeds() {
  const { data: feeds, isLoading, isError } = useSelector(feedsSelector);

  useEffect(() => {
    const { unsubscribe } = retrieveFeedList({ dispatch, feedReaderApi });
    return unsubscribe;
  }, []);

  if (isError) return <p role="alert">Failed to get feeds</p>;
  if (isLoading || typeof feeds === "undefined")
    return <p role="progressbar">Loading...</p>;

  return (
    <div className={styles.feeds}>
      {feeds.map(({ url, items, title }) => {
        return <Feed name={title} key={url} items={items} />;
      })}
    </div>
  );
}

function ToggleTheme() {
  const { setTheme, resolvedTheme } = useTheme();
  const toggleTheme = useCallback(() => {
    resolvedTheme === "light" && setTheme("dark");
    resolvedTheme === "dark" && setTheme("light");
  }, [resolvedTheme, setTheme]);
  const isBrowser = useIsBrowser();
  if (!isBrowser) return null;
  return (
    <button className={styles.toggleTheme} onClick={toggleTheme}>
      {resolvedTheme === "light" && (
        <SunIcon fill="currentColor" width={30} height={30} />
      )}
      {resolvedTheme === "dark" && (
        <MoonIcon fill="currentColor" width={30} height={30} />
      )}
    </button>
  );
}

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.flex}>
        <h1 className={styles.header}>RSS</h1> <ToggleTheme />
      </div>
      {/* <AddFeedForm /> */}
      <ThisMonthArticles />
      <h2 className={styles.header}>All Feeds</h2>
      <Feeds />
    </main>
  );
}
