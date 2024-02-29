import { createSelector } from "@reduxjs/toolkit";
import { State } from "src/store";
import type { HomePageVM } from "./HomePage.VM";

export const homePageVMSelector = createSelector(
  [
    (state: State) => state.getFeeds.status,
    (state: State) => state.getFeeds.result?.length,
  ],
  (status, feedsCount): HomePageVM => {
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
