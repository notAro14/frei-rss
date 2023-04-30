import { createAppAsyncThunk } from "src/store/thunk";
import type { Feed } from "src/Feed/entities/Feed";

export const getFeeds = createAppAsyncThunk<Feed[], void>(
  "feed/getFeeds",
  async function (_, { extra }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    if (!feedReaderGateway?.retrieveFeedList)
      throw new Error("FeedReaderGateway.retrieveFeedList is not defined");

    return feedReaderGateway.retrieveFeedList();
  }
);
