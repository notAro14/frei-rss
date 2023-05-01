import { format, isAfter } from "src/utils/date";
import { isThisMonth } from "src/utils/date";
import type { State } from "src/store";

export function selectThisMonthArticles(state: State) {
  const feeds = state.getFeeds.feeds;
  if (!feeds) return null;
  return feeds
    .map(({ feedItems }) => feedItems)
    .flatMap((item) => item)
    .filter((item) => isThisMonth(new Date(item.date)))
    .sort((articleA, articleB) => {
      if (isAfter(articleA.date, articleB.date)) return -1;
      if (isAfter(articleB.date, articleA.date)) return 1;
      return 0;
    })
    .map(({ date, ...rest }) => {
      const formattedDate = format(new Date(date), "dd/MM/yyyy");
      return { pubDate: formattedDate, ...rest };
    });
}
