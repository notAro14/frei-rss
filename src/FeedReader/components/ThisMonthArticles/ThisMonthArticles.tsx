import { FeedItem } from "src/FeedReader/models";
import FeedItemComp from "../FeedItem";
import * as styles from "./ThisMonthArticle.css";
import { useRetrieveFeedList } from "src/FeedReader/hooks";
import { thisMonthArticlesSelector } from "src/FeedReader/selectors";

export default function ThisMonthArticles() {
  const {
    isLoading,
    isError,
    selectorResult: feedItems,
  } = useRetrieveFeedList(thisMonthArticlesSelector);

  if (isError) return <Failed />;
  if (isLoading || typeof feedItems === "undefined") return <Loading />;
  return <Success data={feedItems} />;
}

function Success({ data }: { data: FeedItem[] }) {
  return (
    <aside>
      <h2 className={styles.header}>This Month</h2>
      <ul className={styles.ul}>
        {data.map(({ title, url, pubDate }) => {
          return (
            <FeedItemComp key={url} date={pubDate} title={title} link={url} />
          );
        })}
      </ul>
    </aside>
  );
}

function Failed({ cause }: { cause?: string }) {
  return <p role="alert">{cause ?? "An error happened"}</p>;
}

function Loading() {
  return <p role="progressbar">Loading...</p>;
}
