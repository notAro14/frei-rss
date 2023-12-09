import { createSlice, createAction } from "@reduxjs/toolkit";
import type { User } from "../models/User.entity";

export interface Auth {
  user: User | null;
}

export const initialState: Auth = {
  user: null,
};

export const userAuthenticated = createAction<User>("auth/userAuthenticated");
export const userUnAuthenticated = createAction("auth/userUnAuthenticated");

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(userAuthenticated, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(userUnAuthenticated, (state) => {
      state.user = null;
    });
  },
});
