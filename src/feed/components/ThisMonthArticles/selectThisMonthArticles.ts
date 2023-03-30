import type { Feed } from "src/feed/Feed";
import { isThisMonth } from "src/utils/date";

export default function selectThisMonthArticles(feeds: Feed[]) {
  return feeds
    .map(({ items }) => items)
    .flatMap((item) => item)
    .filter((item) => isThisMonth(new Date(item.pubDate)));
}
