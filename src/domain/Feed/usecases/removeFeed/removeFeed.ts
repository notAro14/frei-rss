import { createAppAsyncThunk } from "src/thunk";
import {
  removeFeedInit,
  removeFeedDone,
  removeFeedCancel,
} from "./removeFeed.reducer";

export const removeFeed = createAppAsyncThunk<void, { feedId: string }>(
  "feed/removeFeed",
  async function ({ feedId }, { extra, rejectWithValue, dispatch }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    if (!feedReaderGateway?.deleteFeed)
      throw new Error("FeedReaderGateway.deleteFeed is not defined");

    const timerId = setTimeout(async () => {
      try {
        await feedReaderGateway?.deleteFeed?.(feedId);
        dispatch(removeFeedDone({ feedId }));
      } catch (e) {
        dispatch(removeFeedCancel({ feedId }));
        rejectWithValue("Could not remove feed");
      }
    }, 5000);
    dispatch(removeFeedInit({ feedId, timerId }));

    // try {
    //   const feed = await feedReaderGateway.deleteFeed(feedId);
    //   return feed;
    // } catch (e) {
    //   return rejectWithValue("Could not remove feed");
    // }
  },
);
