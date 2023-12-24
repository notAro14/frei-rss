import { createAppAsyncThunk } from "src/thunk";
import {
  removeFeedInit,
  removeFeedDone,
  removeFeedCancel,
} from "src/lib/Feed/slices/removeFeed.slice";

export const removeFeed = createAppAsyncThunk<void, { feedId: string }>(
  "feed/removeFeed",
  async function ({ feedId }, { extra, rejectWithValue, dispatch, getState }) {
    const { dependencies } = extra;
    const userId = getState().auth.user!.id;
    const timerId = setTimeout(async () => {
      try {
        await dependencies.feedReaderGateway.deleteFeed({ id: feedId, userId });
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
