import { createAppAsyncThunk } from "src/thunk";

export const registerFeed = createAppAsyncThunk(
  "feed/registerFeed",
  async function (feedUrl: string, { extra, getState, rejectWithValue }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    const feedEntities = getState().getFeeds.entities!.feeds;
    const feedIds = getState().getFeeds.result!;

    const feedAlreadyRegistered = feedIds
      .map((feedId) => feedEntities[feedId].website)
      .includes(feedUrl);
    if (feedAlreadyRegistered)
      return rejectWithValue("This feed is already registered");

    const userId = getState().auth.user!.id;
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
