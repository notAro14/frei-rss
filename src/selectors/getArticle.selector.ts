import { format } from "src/utils/date";
import type { State } from "src/store";
import { createSelector } from "@reduxjs/toolkit";

export const getArticle = createSelector(
  [
    (state: State) => state.getFeeds.entities,
    (_state: State, id: string) => id,
  ],
  (entities, id) => {
    const feedItems = entities?.feedItems;
    if (!feedItems) return null;

    return {
      ...feedItems[id],
      date: format(new Date(feedItems[id].date), "dd/MM/yyyy"),
    };
  },
);
