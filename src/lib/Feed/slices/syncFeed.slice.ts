import { createSlice } from "@reduxjs/toolkit";
import { syncFeed } from "src/lib/Feed/usecases/syncFeed";

export interface SyncFeed {
  status: "success" | "pending" | "idle" | "error";
  message: string | null;
}

export const initialState: SyncFeed = {
  status: "idle",
  message: null,
};

export const syncFeedSlice = createSlice({
  name: "syncFeed",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(syncFeed.pending, function (state) {
      state.status = "pending";
      state.message = null;
    });

    builder.addCase(syncFeed.fulfilled, function (state, action) {
      state.status = "success";
      state.message = action.payload ?? "Synced";
    });

    builder.addCase(syncFeed.rejected, function (state, action) {
      state.status = "error";
      if (action.payload) state.message = action.payload;
    });
  },
});
