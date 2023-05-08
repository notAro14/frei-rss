import { createSlice } from "@reduxjs/toolkit";
import type {
  NormalizedFeedItem,
  NormalizedFeed,
} from "src/domain/Feed/entities/Feed";
import { getFeeds } from "./getFeeds";
import {
  updateFeedItemAsRead,
  markFeedItemAsRead,
} from "src/domain/Feed/usecases/markFeedItemAsRead";

export const initialState: GetFeeds = {
  result: null,
  entities: null,
  isFulfilled: false,
};
export const getFeedsSlice = createSlice({
  name: "getFeeds",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getFeeds.fulfilled, function (state, action) {
      state.isFulfilled = true;
      state.entities = action.payload.entities;
      state.result = action.payload.result;
    });
    builder.addCase(updateFeedItemAsRead, function (state, action) {
      const { feedItemId } = action.payload;
      if (state.entities?.feedItems) {
        state.entities.feedItems[feedItemId].isRead = true;
      }
    });
    builder.addCase(markFeedItemAsRead.rejected, function (state, action) {
      const { feedItemId } = action.meta.arg;
      if (state.entities?.feedItems) {
        state.entities.feedItems[feedItemId].isRead = false;
      }
    });
  },
});

export interface GetFeeds {
  result: string[] | null;
  entities: {
    feeds: NormalizedFeed;
    feedItems: NormalizedFeedItem;
  } | null;
  isFulfilled: boolean;
}
