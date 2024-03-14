import { isAfter } from "src/utils/date";
import type { State } from "src/store";
import { createSelector } from "@reduxjs/toolkit";
import type { LikedVM, LikedCountVM } from "./Liked.VM";

export const likedSelector = createSelector(
  [
    (state: State) => state.getFeeds.status,
    (state: State) => state.getFeeds.entities?.feeds,
    (state: State) => state.getFeeds.entities?.feedItems,
    (state: State) => state.getFeeds.result!,
  ],
  function (status, feedsNoramlised, feedItemsNormalised, feedIds): LikedVM {
    if (status === "rejected") {
      return { status, data: null, error: "Failed to bookmarked articles" };
    }
    if (status === "pending" || status === "idle") {
      return { status: "pending", data: null, error: null };
    }

    const feeds = feedIds.map((key) => feedsNoramlised![key]);
    const articleIds = feeds
      .flatMap(({ feedItems }) =>
        feedItems.map((key) => feedItemsNormalised![key]),
      )
      .filter((item) => item.favorite)
      .sort((articleA, articleB) => {
        if (isAfter(articleA.date, articleB.date)) return -1;
        if (isAfter(articleB.date, articleA.date)) return 1;
        return 0;
      })
      .map(({ id }) => id);
    return { status: "fulfilled", data: { articleIds }, error: null };
  },
);

export const likedCountSelector = createSelector(
  [
    (state: State) => state.getFeeds.status,
    (state: State) => state.getFeeds.entities?.feeds,
    (state: State) => state.getFeeds.entities?.feedItems,
    (state: State) => state.getFeeds.result!,
  ],
  function (
    status,
    feedsNoramlised,
    feedItemsNormalised,
    feedIds,
  ): LikedCountVM {
    if (status === "rejected") {
      return { status, data: null, error: "Failed to bookmarked articles" };
    }
    if (status === "pending" || status === "idle") {
      return { status: "pending", data: null, error: null };
    }

    const feeds = feedIds.map((key) => feedsNoramlised![key]);
    const count = feeds
      .flatMap(({ feedItems }) =>
        feedItems.map((key) => feedItemsNormalised![key]),
      )
      .filter((item) => item.favorite).length;
    return { status: "fulfilled", data: { count }, error: null };
  },
);
