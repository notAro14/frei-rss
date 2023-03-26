import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "src/lib/Auth/usecases/signOut";
import { registerFeed } from "src/lib/Feed/usecases/registerFeed";

export interface RegisterFeed {
  status: "success" | "pending" | "idle" | "error";
  message: string | null;
}

export const initialState: RegisterFeed = {
  status: "idle",
  message: null,
};

export const registerFeedSlice = createSlice({
  name: "registerFeed",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerFeed.pending, function (state) {
      state.status = "pending";
      state.message = null;
    });

    builder.addCase(registerFeed.fulfilled, function (state) {
      state.status = "success";
      state.message = null;
    });

    builder.addCase(registerFeed.rejected, function (state, action) {
      state.status = "error";
      if (action.payload) state.message = action.payload;
    });

    builder.addCase(signOut.fulfilled, () => {
      return initialState;
    });
  },
});
