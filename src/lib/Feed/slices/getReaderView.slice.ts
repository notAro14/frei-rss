import { createSlice } from "@reduxjs/toolkit";
import { getReaderView } from "src/lib/Feed/usecases/getReaderView";

type Res<T> =
  | {
      status: "pending";
      data: null;
      error: null;
    }
  | {
      status: "fulfilled";
      data: T;
      error: null;
    }
  | {
      status: "rejected";
      data: null;
      error: string;
    };

export const initialState: Record<string, Res<{ fullContent: string }>> = {};

export const getReaderViewSlice = createSlice({
  name: "getReaderView",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getReaderView.pending, function (state, action) {
      const feedItemId = action.meta.arg;
      state[feedItemId] = {
        status: "pending",
        data: null,
        error: null,
      };
    });
    builder.addCase(getReaderView.fulfilled, function (state, action) {
      const feedItemId = action.meta.arg;
      state[feedItemId] = {
        status: "fulfilled",
        data: {
          fullContent: action.payload.fullContent,
        },
        error: null,
      };
    });
  },
});
