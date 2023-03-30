import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import type { Feed as FeedType } from "src/feed/Feed";
import Feed from "src/feed/components/Feed";
import * as styles from "./HomePage.css";
import AddFeedForm from "src/feed/components/AddFeedForm";
import ThisMonthArticles from "src/feed/components/ThisMonthArticles/ThisMonthArticles";
import { useTheme } from "next-themes";
import { useCallback } from "react";

interface Props {
  feeds: FeedType[];
}

export default function HomePage(props: Props) {
  const { feeds } = props;
  const { setTheme, resolvedTheme } = useTheme();
  const toggleTheme = useCallback(() => {
    resolvedTheme === "light" && setTheme("dark");
    resolvedTheme === "dark" && setTheme("light");
  }, [resolvedTheme, setTheme]);
  return (
    <main className={styles.main}>
      <div className={styles.flex}>
        <h1 className={styles.header}>RSS</h1>{" "}
        <button className={styles.toggleTheme} onClick={toggleTheme}>
          {resolvedTheme === "light" && (
            <SunIcon fill="currentColor" width={30} height={30} />
          )}
          {resolvedTheme === "dark" && (
            <MoonIcon fill="currentColor" width={30} height={30} />
          )}
        </button>
      </div>
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
