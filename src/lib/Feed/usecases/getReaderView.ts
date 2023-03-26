import { createAppAsyncThunk } from "src/thunk";

export const getReaderView = createAppAsyncThunk(
  "feedItem/getReaderView",
  async function (id: string, { extra, rejectWithValue, getState }) {
    const { url, fullContent, content } =
      getState().getFeeds.entities!.feedItems[id];
    const { dependencies } = extra;
    if (fullContent) return { id, fullContent };

    try {
      const { ok, data } =
        await dependencies.feedReaderGateway.getReaderView(url);
      if (ok) return { id, fullContent: data };
      return { id, fullContent: content };
    } catch (e) {
      return rejectWithValue("Failed to get reader view");
    }
  },
);
