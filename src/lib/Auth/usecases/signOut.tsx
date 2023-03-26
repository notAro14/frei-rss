import { createAppAsyncThunk } from "src/thunk";

export const signOut = createAppAsyncThunk(
  "auth/signOut",
  async function (_, { extra }) {
    const {
      dependencies: { authGateway },
    } = extra;
    await authGateway.signOut();
  },
);
