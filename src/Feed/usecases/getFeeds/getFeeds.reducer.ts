import { createReducer } from "@reduxjs/toolkit";
import type { Feed } from "src/Feed/entities/Feed";
import { getFeeds } from "./getFeeds";

export interface GetFeeds {
  feeds: Feed[] | null;
}
const initialState: GetFeeds = {
  feeds: null,
};

export const getFeedsReducer = createReducer(initialState, function (builder) {
  builder.addCase(getFeeds.fulfilled, function (state, action) {
    state.feeds = action.payload;
  });
});
