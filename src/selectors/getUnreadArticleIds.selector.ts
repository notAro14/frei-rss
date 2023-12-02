import type { State } from "src/store";
import { isAfter } from "src/utils/date";

export function getUnreadArticleIds(state: State) {
  const entities = state.getFeeds.entities;
  if (!entities) return null;
  const feedItems = Object.values(entities.feedItems).filter((value) => {
    return value.readStatus === "UNREAD";
  });
  feedItems.sort((a, b) => {
    if (isAfter(a.date, b.date)) return -1;
    if (isAfter(b.date, a.date)) return 1;
    return 0;
  });
  return feedItems.map(({ id }) => id);
}
