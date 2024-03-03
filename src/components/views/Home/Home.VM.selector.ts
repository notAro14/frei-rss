import { createSelector } from "@reduxjs/toolkit";
import { State } from "src/store";
import type { HomeVM } from "./Home.VM";

export const homeVMSelector = createSelector(
  [
    (state: State) => state.getFeeds.status,
    (state: State) => state.getFeeds.result?.length,
  ],
  (status, feedsCount): HomeVM => {
    switch (status) {
      case "idle":
      case "pending": {
        return { getFeedsStatus: "pending", isEmpty: false };
      }
      case "fulfilled": {
        return { getFeedsStatus: "fulfilled", isEmpty: feedsCount === 0 };
      }
      default: {
        return { getFeedsStatus: "rejected", isEmpty: false };
      }
    }
  },
);
