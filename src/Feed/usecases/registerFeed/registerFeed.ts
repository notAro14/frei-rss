import { createAppAsyncThunk } from "src/store/thunk";

export const registerFeed = createAppAsyncThunk(
  "feed/registerFeed",
  async function (feedUrl: string, { extra }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    if (!feedReaderGateway?.registerFeed)
      throw new Error("FeedReaderGateway.registerFeed is not defined");

    return await feedReaderGateway.registerFeed(feedUrl);
  }
);
