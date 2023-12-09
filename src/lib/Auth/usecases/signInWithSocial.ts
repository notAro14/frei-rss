import { createAppAsyncThunk } from "src/thunk";

export const signInWithGithub = createAppAsyncThunk(
  "auth/signInWithGithub",
  async function (_, { extra }) {
    const {
      dependencies: { authGateway },
    } = extra;
    await authGateway.signInWithSocial("github");
  },
);
