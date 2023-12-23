import { createSelector } from "@reduxjs/toolkit";
import { State } from "src/store";
export const singleArticleSelector = createSelector(
  [
    function (state: State) {
      return state.getFeeds.entities?.feedItems;
    },
    function (state: State) {
      return state.getFeeds.status;
    },
    function (_state: State, articleId: string) {
      return articleId;
    },
  ],
  function (articles, status, articleId) {
    if (status === "fulfilled") {
      const article = articles![articleId];
      if (article) return { ok: true, article } as const;
      return { ok: false } as const;
    }
    return null;
  },
);
