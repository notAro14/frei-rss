import { createAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "src/thunk";
import { FeedItem } from "src/lib/Feed/models/Feed.entity";

type FeedItemStatusUpdatedArgs = {
  id: string;
  newStatus: FeedItem["readStatus"];
};

export const feedItemStatusUpdated = createAction<FeedItemStatusUpdatedArgs>(
  "feedItem/statusUpdated",
);

export const changeFeedItemReadingStatus = createAppAsyncThunk<
  FeedItemStatusUpdatedArgs,
  FeedItemStatusUpdatedArgs
>(
  "feedItem/changeReadingStatus",
  async function ({ id, newStatus }, { extra, rejectWithValue, dispatch }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    dispatch(feedItemStatusUpdated({ id, newStatus }));
    try {
      const feedItem = await feedReaderGateway.updateFeedItemReadingStatus(
        id,
        newStatus,
      );

      return { id, newStatus: feedItem.readStatus };
    } catch (e) {
      return rejectWithValue("Could not change feed item reading status");
    }
  },
);
