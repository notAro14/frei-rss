import type { State } from "src/store";
import { isAfter } from "src/utils/date";

export default function unreadFeedItemsSelector(state: State) {
  const entities = state.getFeeds.entities;
  if (!entities) return null;
  const feedItems = Object.values(entities.feedItems).filter((value) => {
    return value.isRead === false;
  });
  feedItems.sort((a, b) => {
    if (isAfter(a.date, b.date)) return -1;
    if (isAfter(b.date, a.date)) return 1;
    return 0;
  });
  return feedItems.map(({ id }) => id);
}
