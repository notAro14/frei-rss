import { createSlice, createAction } from "@reduxjs/toolkit";
import { signOut } from "src/lib/Auth/usecases/signOut";

export const initialState: RemoveFeed = {
  status: "idle",
  feedToRemove: {},
};

export const removeFeedSlice = createSlice({
  name: "removeFeed",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(removeFeedInit, (state, action) => {
      const { feedId, timerId } = action.payload;
      state.feedToRemove = {
        ...state.feedToRemove,
        [feedId]: {
          id: feedId,
          timerId,
        },
      };
      state.status = "pending";
    });
    builder.addCase(removeFeedCancel, (state, action) => {
      const { feedId } = action.payload;
      clearTimeout(state.feedToRemove[feedId].timerId);
      delete state.feedToRemove[feedId];
      state.status = "idle";
    });
    builder.addCase(removeFeedDone, (state, action) => {
      delete state.feedToRemove[action.payload.feedId];
      state.status = "fulfilled";
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state = initialState;
    });
  },
});

export interface RemoveFeed {
  status: "pending" | "idle" | "fulfilled" | "rejected";
  feedToRemove: {
    [key: string]: {
      id: string;
      timerId: NodeJS.Timeout;
    };
  };
}
export const removeFeedInit = createAction<{
  feedId: string;
  timerId: NodeJS.Timeout;
}>("feed/removeFeed/init");
export const removeFeedCancel = createAction<{ feedId: string }>(
  "feed/removeFeed/cancel",
);
export const removeFeedDone = createAction<{ feedId: string }>(
  "feed/removeFeed/done",
);
