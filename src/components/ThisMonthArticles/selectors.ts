import { format, isAfter } from "src/utils/date";
import { isThisMonth } from "src/utils/date";
import type { State } from "src/store";

export function selectThisMonthArticles(state: State) {
  const feeds = state.getFeeds.feeds;
  if (!feeds) return null;
  return feeds
    .map(({ items }) => items)
    .flatMap((item) => item)
    .filter((item) => isThisMonth(new Date(item.pubDate)))
    .sort((articleA, articleB) => {
      if (isAfter(articleA.pubDate, articleB.pubDate)) return -1;
      if (isAfter(articleB.pubDate, articleA.pubDate)) return 1;
      return 0;
    })
    .map(({ pubDate, ...rest }) => {
      const date = format(new Date(pubDate), "dd/MM/yyyy");
      return { pubDate: date, ...rest };
    });
}
