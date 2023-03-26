import { createAppAsyncThunk } from "src/thunk";
import { FeedItem } from "src/lib/Feed/models/Feed.entity";

export const changeFeedItemReadingStatus = createAppAsyncThunk<
  FeedItem,
  { id: string; newStatus: "READ" | "UNREAD" | "READ_LATER" }
>(
  "feedItem/changeReadingStatus",
  async function ({ id, newStatus }, { extra, rejectWithValue }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;

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
