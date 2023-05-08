import { createAppAsyncThunk } from "src/store/thunk";

export const removeFeed = createAppAsyncThunk<
  { feedId: string },
  { feedId: string }
>("feed/removeFeed", async function ({ feedId }, { extra, rejectWithValue }) {
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
});
