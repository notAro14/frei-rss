import { createSelector } from "@reduxjs/toolkit";
import { type State } from "src/store";

export const getAllFeeds = createSelector(
  [
    (state: State) => state.getFeeds.entities?.feeds,
    (state: State) => state.getFeeds.result,
  ],
  (feeds, feedIds) => {
    if (!feeds) return null;
    if (!feedIds) return null;

    const res = feedIds.map((id) => {
      const feed = feeds[id];
      return {
        id: feed.id,
        name: feed.name,
        articleIds: feed.feedItems,
      };
    });
    return res;
  },
);
