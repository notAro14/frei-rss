import { createAppAsyncThunk } from "src/store/thunk";
import { normalize } from "./utils";
import { isAfter } from "src/utils/date";

export const getFeeds = createAppAsyncThunk(
  "feed/getFeeds",
  async function (_, { extra }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    if (!feedReaderGateway?.retrieveFeedList)
      throw new Error("FeedReaderGateway.retrieveFeedList is not defined");

    const data = await feedReaderGateway.retrieveFeedList();
    data.forEach(({ feedItems }) => {
      feedItems.sort((a, b) => {
        if (isAfter(a.date, b.date)) return -1;
        if (isAfter(b.date, a.date)) return 1;
        return 0;
      });
    });
    return normalize(data);
  }
);
