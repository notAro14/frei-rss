import { createSlice } from "@reduxjs/toolkit";
import type {
  NormalizedFeedItem,
  NormalizedFeed,
} from "src/lib/Feed/models/Feed.entity";
import { getFeeds } from "../usecases/getFeeds";
import {
  updateFeedItemAsRead,
  markFeedItemAsRead,
} from "src/lib/Feed/usecases/markFeedItemAsRead";
// import { removeFeed } from "src/domain/Feed/usecases/removeFeed/removeFeed";
import { removeFeedDone } from "src/lib/Feed/slices/removeFeed.slice";
import { changeFeedItemReadingStatus } from "src/lib/Feed/usecases/changeFeedItemReadingStatus";
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
        state.entities.feedItems[feedItemId].readStatus = "READ";
      }
    });
    builder.addCase(markFeedItemAsRead.rejected, function (state, action) {
      const { feedItemId } = action.meta.arg;
      if (state.entities?.feedItems) {
        state.entities.feedItems[feedItemId].readStatus = "UNREAD";
      }
    });
    builder.addCase(removeFeedDone, function (state, action) {
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
