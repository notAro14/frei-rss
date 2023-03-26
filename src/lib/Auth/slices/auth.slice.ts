import { createSlice, createAction, isAnyOf } from "@reduxjs/toolkit";
import type { User } from "src/lib/Auth/models/User.entity";
import {
  signInWithGithub,
  signInWithGoogle,
} from "src/lib/Auth/usecases/signInWithSocial";
import { signOut } from "src/lib/Auth/usecases/signOut";

export interface Auth {
  user: User | null;
  error: string | null;
  status: "idle" | "pending" | "fulfilled" | "error";
}

export const initialState: Auth = {
  user: null,
  error: null,
  status: "idle",
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
      state.status = "fulfilled";
      state.error = null;
    });
    builder.addCase(userUnAuthenticated, (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    });
    builder.addCase(signOut.fulfilled, () => {
      return initialState;
    });
    builder.addMatcher(
      isAnyOf(signInWithGoogle.rejected, signInWithGithub.rejected),
      (state, action) => {
        state.user = null;
        state.status = "error";
        state.error = action.payload ?? "Failed to sign in";
      },
    );
    builder.addMatcher(
      isAnyOf(signInWithGoogle.pending, signInWithGithub.pending),
      (state) => {
        state.user = null;
        state.status = "pending";
        state.error = null;
      },
    );
  },
});
