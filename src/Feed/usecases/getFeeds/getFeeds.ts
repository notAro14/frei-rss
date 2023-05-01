import { createAppAsyncThunk } from "src/store/thunk";
import { normalizeFeed } from "./utils";

export const getFeeds = createAppAsyncThunk(
  "feed/getFeeds",
  async function (_, { extra }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    if (!feedReaderGateway?.retrieveFeedList)
      throw new Error("FeedReaderGateway.retrieveFeedList is not defined");

    const data = await feedReaderGateway.retrieveFeedList();
    return normalizeFeed(data);
  }
);
