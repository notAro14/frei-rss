import { isAfter } from "src/utils/date";
import { isThisMonth } from "src/utils/date";
import type { State } from "src/store";

export function getThisMonthArticleIds(state: State) {
  const { entities, result } = state.getFeeds;

  if (entities && result) {
    const feeds = result.map((key) => entities?.feeds[key]);

    return feeds
      .map(({ feedItems }) => feedItems.map((key) => entities.feedItems[key]))
      .flatMap((item) => item)
      .filter((item) => isThisMonth(new Date(item.date)))
      .sort((articleA, articleB) => {
        if (isAfter(articleA.date, articleB.date)) return -1;
        if (isAfter(articleB.date, articleA.date)) return 1;
        return 0;
      })
      .map(({ id }) => id);
  }
  return null;
}
