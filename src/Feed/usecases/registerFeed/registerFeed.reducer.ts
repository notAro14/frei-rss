import { createSlice } from "@reduxjs/toolkit";
import { registerFeed } from "./registerFeed";

interface RegisterFeed {
  status: "success" | "pending" | "idle" | "error";
}

const initialState: RegisterFeed = {
  status: "idle",
};

export const registerFeedSlice = createSlice({
  name: "registerFeed",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerFeed.pending, function (state) {
      state.status = "pending";
    });

    builder.addCase(registerFeed.fulfilled, function (state) {
      state.status = "success";
    });

    builder.addCase(registerFeed.rejected, function (state) {
      state.status = "error";
    });
  },
});
