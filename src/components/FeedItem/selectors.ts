import { format } from "src/utils/date";
import type { State } from "src/store";

export function selectFeedItem(id: string) {
  return (state: State) => {
    const feedItems = state.getFeeds.entities?.feedItems;
    if (!feedItems) return null;
    return {
      ...feedItems[id],
      date: format(new Date(feedItems[id].date), "dd/MM/yyyy"),
    };
  };
}
