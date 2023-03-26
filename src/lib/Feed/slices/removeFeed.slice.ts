import { createSlice, createAction } from "@reduxjs/toolkit";
import { signOut } from "src/lib/Auth/usecases/signOut";
import { removeFeed } from "src/lib/Feed/usecases/removeFeed";

export const initialState: RemoveFeed = {
  status: "idle",
};

export const removeFeedSlice = createSlice({
  name: "removeFeed",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(removeFeed.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(removeFeed.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(removeFeed.fulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addCase(signOut.fulfilled, () => {
      return initialState;
    });
  },
});

export interface RemoveFeed {
  status: "pending" | "idle" | "fulfilled" | "rejected";
}
export const removeFeedInit = createAction<{
  feedId: string;
}>("feed/removeFeed/init");
export const removeFeedCancel = createAction<{ feedId: string }>(
  "feed/removeFeed/cancel",
);
export const removeFeedDone = createAction<{ feedId: string }>(
  "feed/removeFeed/done",
);

export const { reset } = removeFeedSlice.actions;
