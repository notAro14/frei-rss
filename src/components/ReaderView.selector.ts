import { createSelector } from "@reduxjs/toolkit";
import { State } from "src/store";
import type { Res } from "src/types/response";
import type { ReaderViewVM } from "../app/article/[slug]/FeedItemPage.VM";

export const readerViewSelector = createSelector(
  [
    (state: State) => state.getReaderView,
    (_state: State, feedItemId: string) => feedItemId,
  ],
  (getReaderViewState, feedItemId): Res<ReaderViewVM> => {
    const readerView = getReaderViewState[feedItemId];
    if (!readerView)
      return {
        status: "pending",
        error: null,
        data: null,
      };

    switch (readerView.status) {
      case "fulfilled": {
        return {
          status: "fulfilled",
          error: null,
          data: {
            fullContent: readerView.data.fullContent,
          },
        };
      }

      case "pending": {
        return {
          status: "pending",
          error: null,
          data: null,
        };
      }

      case "rejected": {
        return {
          status: "rejected",
          error: readerView.error,
          data: null,
        };
      }
    }
  },
);
