import { createSlice } from "@reduxjs/toolkit";
import { removeFeed } from "./removeFeed";

export interface RemoveFeed {
  status: "pending" | "idle" | "fulfilled" | "rejected";
}

export const initialState: RemoveFeed = {
  status: "idle",
};

export const removeFeedSlice = createSlice({
  name: "removeFeed",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(removeFeed.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(removeFeed.fulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addCase(removeFeed.rejected, (state) => {
      state.status = "rejected";
    });
  },
});
