import { createSelector } from "@reduxjs/toolkit";
import type { State } from "src/store";
import type { FeedMenuVM } from "./FeedMenu.VM";

export const feedMenuVMSelector = createSelector(
  [
    (state: State) => state.getFeeds.status,
    (state: State) => state.getFeeds.result!,
    (state: State) => state.getFeeds.entities?.feeds,
  ],
  (status, feedIds, normalizedFeeds): FeedMenuVM => {
    switch (status) {
      case "fulfilled": {
        return {
          status: "fulfilled",
          data: feedIds.map((fId) => {
            const feed = normalizedFeeds![fId];
            const favicon =
              feed.website &&
              `https://www.google.com/s2/favicons?domain=${new URL(feed.website).hostname}&sz=128`;
            return {
              id: feed.id,
              name: feed.name,
              favicon,
            };
          }),
          error: null,
        };
      }

      default: {
        return {
          status: "pending",
          data: null,
          error: null,
        };
      }
    }
  },
);
