import { createAction, createSlice } from "@reduxjs/toolkit";
import type {
  NormalizedFeedItem,
  NormalizedFeed,
  Feed,
} from "src/lib/Feed/models/Feed.entity";
import { getFeeds } from "../usecases/getFeeds";
import {
  updateFeedItemAsRead,
  markFeedItemAsRead,
} from "src/lib/Feed/usecases/markFeedItemAsRead";
import { removeFeedInit } from "src/lib/Feed/slices/removeFeed.slice";
import { changeFeedItemReadingStatus } from "src/lib/Feed/usecases/changeFeedItemReadingStatus";
import { signOut } from "src/lib/Auth/usecases/signOut";
import type { FeedItem } from "src/lib/Feed/models/Feed.entity";
import { isAfter } from "src/utils/date";

export const newFeedRegistered = createAction<Feed>("newFeedRegistered");

export const newArticlesFetched = createAction<{
  feedId: string;
  newArticles: FeedItem[];
  newArticleIds: string[];
}>("newArticlesFetched");

export const initialState: GetFeeds = {
  result: null,
  entities: null,
  status: "idle",
};
export const getFeedsSlice = createSlice({
  name: "getFeeds",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getFeeds.fulfilled, function (state, action) {
      state.entities = action.payload.entities;
      state.result = action.payload.result;
      state.status = "fulfilled";
    });
    builder.addCase(getFeeds.pending, function (state) {
      state.entities = null;
      state.result = null;
      state.status = "pending";
    });
    builder.addCase(newArticlesFetched, function (state, action) {
      const { feedId, newArticleIds, newArticles } = action.payload;
      const prevArticles = state.entities!.feeds[feedId].feedItems;
      state.entities!.feeds[feedId].feedItems = [
        ...newArticleIds,
        ...prevArticles,
      ];
      newArticles.forEach((a) => {
        state.entities!.feedItems[a.id] = {
          ...a,
          feedId,
        };
      });
    });
    builder.addCase(newFeedRegistered, function (state, action) {
      const { feedItems, ...feed } = action.payload;

      feedItems.sort((a, b) => {
        if (isAfter(a.date, b.date)) return -1;
        if (isAfter(b.date, a.date)) return 1;
        return 0;
      });
      feedItems.forEach((a) => {
        state.entities!.feedItems[a.id] = {
          ...a,
          feedId: feed.id,
        };
      });
      const feedItemIds = feedItems.map((a) => a.id);

      const newFeed = {
        ...feed,
        feedItems: feedItemIds,
      };
      state.entities!.feeds[newFeed.id] = newFeed;
      const allFeeds = Object.values(state.entities!.feeds);
      allFeeds.sort((a, b) => {
        const nameA = a.name.trim().toUpperCase();
        const nameB = b.name.trim().toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      const allFeedIds = allFeeds.map((f) => f.id);
      state.result = allFeedIds;
    });
    builder.addCase(updateFeedItemAsRead, function (state, action) {
      const { feedItemId } = action.payload;
      if (state.entities?.feedItems) {
        state.entities.feedItems[feedItemId].readStatus = "READ";
      }
    });
    builder.addCase(markFeedItemAsRead.rejected, function (state, action) {
      const { feedItemId } = action.meta.arg;
      if (state.entities?.feedItems) {
        state.entities.feedItems[feedItemId].readStatus = "UNREAD";
      }
    });
    builder.addCase(removeFeedInit, function (state, action) {
      const feedId = action.payload.feedId;
      if (!state.entities || !state.result) return;

      const feed = state.entities.feeds[feedId];
      delete state.entities.feeds[feedId];

      state.result = state.result.filter((id) => id !== feedId);

      for (const feedItemId of feed.feedItems) {
        delete state.entities.feedItems[feedItemId];
      }
    });
    builder.addCase(
      changeFeedItemReadingStatus.fulfilled,
      function (state, action) {
        const { id, readStatus } = action.payload;
        if (state.entities?.feedItems) {
          state.entities.feedItems[id].readStatus = readStatus;
        }
      },
    );
    builder.addCase(signOut.fulfilled, (state) => {
      state = initialState;
    });
  },
});

export interface GetFeeds {
  result: string[] | null;
  entities: {
    feeds: NormalizedFeed;
    feedItems: NormalizedFeedItem;
  } | null;
  status: "idle" | "pending" | "fulfilled" | "rejected";
}
