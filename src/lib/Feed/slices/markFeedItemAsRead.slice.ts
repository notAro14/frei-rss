import { createSlice } from "@reduxjs/toolkit";
import { markFeedItemAsRead } from "../usecases/markFeedItemAsRead";

export interface MarkFeedItemAsRead {
  status: "idle" | "pending" | "rejected" | "fulfilled";
}

export const initialState: MarkFeedItemAsRead = {
  status: "idle",
};

export const markFeedItemAsReadSlice = createSlice({
  name: "markFeedItemAsRead",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(markFeedItemAsRead.pending, function (state) {
      state.status = "pending";
    });
    builder.addCase(markFeedItemAsRead.fulfilled, function (state) {
      state.status = "fulfilled";
    });
  },
});
