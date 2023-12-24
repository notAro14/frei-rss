import { createAppAsyncThunk } from "src/thunk";
import { removeFeedInit } from "../slices/removeFeed.slice";

export const removeFeed = createAppAsyncThunk<string, { feedId: string }>(
  "feed/removeFeed",
  async function (
    { feedId: id },
    { extra, rejectWithValue, getState, dispatch },
  ) {
    const { dependencies } = extra;
    const userId = getState().auth.user!.id;

    try {
      dispatch(removeFeedInit({ feedId: id }));
      const feed = await dependencies.feedReaderGateway.deleteFeed({
        id,
        userId,
      });
      return feed.feedName;
    } catch (e) {
      return rejectWithValue("Could not remove feed");
    }
  },
);
