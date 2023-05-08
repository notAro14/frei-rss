import { createAppAsyncThunk } from "src/store/thunk";
import { Feed } from "src/domain/Feed/entities/Feed";

export const removeFeed = createAppAsyncThunk<Feed, { feedId: string }>(
  "feed/removeFeed",
  async function ({ feedId }, { extra, rejectWithValue }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    if (!feedReaderGateway?.deleteFeed)
      throw new Error("FeedReaderGateway.deleteFeed is not defined");

    try {
      const feed = await feedReaderGateway.deleteFeed(feedId);
      return feed;
    } catch (e) {
      return rejectWithValue("Could not remove feed");
    }
  }
);
