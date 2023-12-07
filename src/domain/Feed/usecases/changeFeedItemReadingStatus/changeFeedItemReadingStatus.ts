import { createAppAsyncThunk } from "src/thunk";
import { FeedItem } from "src/domain/Feed/entities/Feed";

export const changeFeedItemReadingStatus = createAppAsyncThunk<
  FeedItem,
  { id: string; newStatus: "READ" | "UNREAD" | "READ_LATER" }
>(
  "feedItem/changeReadingStatus",
  async function ({ id, newStatus }, { extra, rejectWithValue }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    if (!feedReaderGateway?.updateFeedItemReadingStatus) {
      throw new Error(
        "FeedReaderGateway.updateFeedItemReadingStatus is not defined",
      );
    }

    try {
      const feedItem = await feedReaderGateway.updateFeedItemReadingStatus(
        id,
        newStatus,
      );
      return feedItem;
    } catch (e) {
      return rejectWithValue("Could not change feed item reading status");
    }
  },
);
