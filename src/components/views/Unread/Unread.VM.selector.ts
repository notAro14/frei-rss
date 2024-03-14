import { createSelector } from "@reduxjs/toolkit";
import type { State } from "src/store";
import type { UnreadVM, UnreadLinkVM } from "./Unread.VM";
import { isAfter } from "src/utils/date";

export const unreadVMSelector = createSelector(
  [
    (state: State) => state.getFeeds.entities,
    (state: State) => state.getFeeds.status,
  ],
  (entities, status): UnreadVM => {
    switch (status) {
      case "idle":
      case "pending":
        return { status: "pending", data: null, error: null };
      case "fulfilled": {
        const feedItems = Object.values(entities!.feedItems).filter((value) => {
          return value.readStatus === "UNREAD";
        });
        feedItems.sort((a, b) => {
          if (isAfter(a.date, b.date)) return -1;
          if (isAfter(b.date, a.date)) return 1;
          return 0;
        });
        const data = feedItems.map(({ id }) => id);
        return { status: "fulfilled", data, error: null };
      }
      default:
        return {
          status: "rejected",
          data: null,
          error: "Failed to retrieve unread feed items",
        };
    }
  },
);

export const unreadLinkVMSelector = createSelector(
  [
    (state: State) => state.getFeeds.entities,
    (state: State) => state.getFeeds.status,
  ],
  (entities, status): UnreadLinkVM => {
    switch (status) {
      case "idle":
      case "pending":
        return { status: "pending", data: null, error: null };
      case "fulfilled": {
        const data = Object.values(entities!.feedItems).filter((value) => {
          return value.readStatus === "UNREAD";
        }).length;
        return { status: "fulfilled", data, error: null };
      }
      default:
        return {
          status: "rejected",
          data: null,
          error: "Failed to retrieve unread feed items count",
        };
    }
  },
);
