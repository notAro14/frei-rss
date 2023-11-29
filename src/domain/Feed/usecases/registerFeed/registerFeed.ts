import { createAppAsyncThunk } from "src/store/thunk";

export const registerFeed = createAppAsyncThunk(
  "feed/registerFeed",
  async function (feedUrl: string, { extra, getState }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    if (!feedReaderGateway?.registerFeed)
      throw new Error("FeedReaderGateway.registerFeed is not defined");

    const userId = getState().auth.user?.id;
    if (!userId) throw new Error("Unauthorised");

    return feedReaderGateway.registerFeed(feedUrl, userId);
  }
);
