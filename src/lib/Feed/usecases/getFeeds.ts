import { createAppAsyncThunk } from "src/thunk";
import { isAfter } from "src/utils/date";
import { normalize } from "src/lib/Feed/utils/normalize";
import { feedCompFn } from "src/lib/Feed/utils/feedCompFn";

export const getFeeds = createAppAsyncThunk(
  "feed/getFeeds",
  async function (_, { extra }) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    if (!feedReaderGateway?.retrieveFeedList)
      throw new Error("FeedReaderGateway.retrieveFeedList is not defined");

    const data = await feedReaderGateway.retrieveFeedList();
    data.sort(feedCompFn);
    data.forEach(({ feedItems }) => {
      feedItems.sort((a, b) => {
        if (isAfter(a.date, b.date)) return -1;
        if (isAfter(b.date, a.date)) return 1;
        return 0;
      });
    });
    return normalize(data);
  },
);
