import { createAction } from "@reduxjs/toolkit";
import { FeedItem } from "src/domain/Feed/entities/Feed";
import { createAppAsyncThunk } from "src/store/thunk";

interface MarkFeedItemAsReadArg {
  feedItemId: string;
}
export const updateFeedItemAsRead = createAction<MarkFeedItemAsReadArg>(
  "feedItem/updateFeedItemAsRead"
);
export const markFeedItemAsRead = createAppAsyncThunk<
  FeedItem,
  MarkFeedItemAsReadArg
>(
  "feedItem/markFeedItemAsRead",
  async function ({ feedItemId }, { extra, dispatch, rejectWithValue }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    if (!feedReaderGateway?.updateFeedItemReadingStatus) {
      throw new Error(
        "FeedReaderGateway.updateFeedItemReadingStatus is not defined"
      );
    }

    dispatch(updateFeedItemAsRead({ feedItemId }));
    try {
      const feedItem = await feedReaderGateway.updateFeedItemReadingStatus(
        feedItemId,
        "READ"
      );
      return feedItem;
    } catch (e) {
      return rejectWithValue("Could not mark feed item as read");
    }
  }
);
