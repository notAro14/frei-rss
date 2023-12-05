import { isAfter } from "src/utils/date";
import { isThisMonth } from "src/utils/date";
import type { State } from "src/store";
import { createSelector } from "@reduxjs/toolkit";

export const getThisMonthArticleIds = createSelector(
  [
    function (state: State) {
      return state.getFeeds;
    },
  ],
  function (getFeeds) {
    const { entities, result } = getFeeds;

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
  },
);
