import { createSelector } from "@reduxjs/toolkit";
import { State } from "src/store";
import { formatToPubDate } from "src/utils/date";
import type { Res } from "src/types/response";
import type { FeedItemPageVM } from "./FeedItemPage.VM";

export const feedItemPageSelector = createSelector(
  [
    (state: State) => state.getFeeds.status,
    (state: State) => state.getFeeds.entities?.feedItems,
    (state: State) => state.getFeeds.entities?.feeds,
    (_state: State, feedItemId: string) => feedItemId,
  ],
  (status, feedItems, feeds, feedItemId): Res<FeedItemPageVM> => {
    if (status === "pending" || status === "idle")
      return { status: "pending", data: null, error: null };

    const feedItem = feedItems?.[feedItemId];
    if (status === "fulfilled" && feedItem) {
      const { website, name, id } = feeds![feedItem.feedId];
      const feed = {
        id,
        name,
        favicon:
          website &&
          `https://www.google.com/s2/favicons?domain=${new URL(website).hostname}&sz=128`,
      };
      return {
        status: "fulfilled",
        error: null,
        data: {
          title: feedItem.title,
          status: feedItem.readStatus,
          feed,
          pubDate: formatToPubDate(feedItem.date),
          url: feedItem.url,
          id: feedItem.id,
          summary: feedItem.content,
        },
      };
    }

    return {
      status: "rejected",
      data: null,
      error: "Failed to get item information",
    };
  },
);
