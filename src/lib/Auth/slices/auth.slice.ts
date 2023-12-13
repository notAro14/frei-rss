import { createSlice, createAction } from "@reduxjs/toolkit";
import type { User } from "src/lib/Auth/models/User.entity";
import { signInWithGithub } from "src/lib/Auth/usecases/signInWithSocial";
import { signOut } from "src/lib/Auth/usecases/signOut";

export interface Auth {
  user: User | null;
  error: string | null;
}

export const initialState: Auth = {
  user: null,
  error: null,
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
      state.error = null;
    });
    builder.addCase(userUnAuthenticated, (state) => {
      state.user = null;
      state.error = null;
    });
    builder.addCase(signInWithGithub.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload ?? "Failed to sign in";
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state = initialState;
    });
  },
});
