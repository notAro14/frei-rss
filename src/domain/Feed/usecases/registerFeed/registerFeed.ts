import { createAppAsyncThunk } from "src/thunk";

export const registerFeed = createAppAsyncThunk(
  "feed/registerFeed",
  async function (feedUrl: string, { extra, getState, rejectWithValue }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    if (!feedReaderGateway?.registerFeed)
      throw new Error("FeedReaderGateway.registerFeed is not defined");

    const userId = getState().auth.user?.id;
    if (!userId) throw new Error("Unauthorised");

    try {
      const res = await feedReaderGateway.registerFeed(feedUrl, userId);
      return res;
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : "Failed to register feed",
      );
    }
  },
);
