import { isAfter } from "src/utils/date";
import { isThisMonth } from "src/utils/date";
import type { State } from "src/store";
import { createSelector } from "@reduxjs/toolkit";
import type {
  ThisMonthArticlesVM,
  ThisMonthArticlesCountVM,
} from "./ThisMonthArticles.VM";

export const thisMonthArticlesSelector = createSelector(
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
  ): ThisMonthArticlesVM {
    if (status === "rejected") {
      return { status, data: null, error: "Failed to get this month articles" };
    }
    if (status === "pending" || status === "idle") {
      return { status: "pending", data: null, error: null };
    }

    const feeds = feedIds.map((key) => feedsNoramlised![key]);
    const articleIds = feeds
      .flatMap(({ feedItems }) =>
        feedItems.map((key) => feedItemsNormalised![key]),
      )
      .filter((item) => isThisMonth(new Date(item.date)))
      .sort((articleA, articleB) => {
        if (isAfter(articleA.date, articleB.date)) return -1;
        if (isAfter(articleB.date, articleA.date)) return 1;
        return 0;
      })
      .map(({ id }) => id);
    return { status: "fulfilled", data: { articleIds }, error: null };
  },
);

export const thisMonthArticlesCountSelector = createSelector(
  [
    (state: State) => state.getFeeds.status,
    (state: State) => state.getFeeds.entities!.feeds,
    (state: State) => state.getFeeds.entities!.feedItems,
    (state: State) => state.getFeeds.result!,
  ],
  function (
    status,
    feedsNoramlised,
    feedItemsNormalised,
    feedIds,
  ): ThisMonthArticlesCountVM {
    if (status === "rejected") {
      return {
        status,
        data: null,
        error: "Failed to get this month articles count",
      };
    }
    if (status === "pending" || status === "idle") {
      return { status: "pending", data: null, error: null };
    }

    const feeds = feedIds.map((key) => feedsNoramlised[key]);
    const count = feeds
      .flatMap(({ feedItems }) =>
        feedItems.map((key) => feedItemsNormalised[key]),
      )
      .filter((item) => isThisMonth(new Date(item.date))).length;

    return { status, data: { count }, error: null };
  },
);
