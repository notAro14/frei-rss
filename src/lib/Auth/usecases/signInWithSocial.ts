import { createAppAsyncThunk } from "src/thunk";

export const signInWithGithub = createAppAsyncThunk(
  "auth/signInWithGithub",
  async function (_, { extra, rejectWithValue }) {
    const {
      dependencies: { authGateway },
    } = extra;
    const { error } = await authGateway.signInWithSocial("github");
    if (error) return rejectWithValue(error);
  },
);

export const signInWithGoogle = createAppAsyncThunk(
  "auth/signInWithGoogle",
  async function (_, { extra, rejectWithValue }) {
    const {
      dependencies: { authGateway },
    } = extra;
    const { error } = await authGateway.signInWithSocial("google");
    if (error) return rejectWithValue(error);
  },
);
