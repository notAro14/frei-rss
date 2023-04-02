import { feedReaderApi } from "src/store/config";
import { format, isAfter } from "src/utils/date";
import type { Feed } from "src/FeedReader/models";
import { isThisMonth } from "src/utils/date";

export const feedsSelector = feedReaderApi.endpoints.retrieveFeedList.select();

export function thisMonthArticlesSelector(feeds?: Feed[]) {
  return (feeds ? [...feeds] : [])
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
