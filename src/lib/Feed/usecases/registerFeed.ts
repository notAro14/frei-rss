import { createAppAsyncThunk } from "src/thunk";
import type { Feed, FeedItem } from "src/lib/Feed/models/Feed.entity";
import { newFeedRegistered } from "src/lib/Feed/slices/getFeeds.slice";

export const registerFeed = createAppAsyncThunk(
  "feed/registerFeed",
  async function (
    feedUrl: string,
    { extra, getState, rejectWithValue, dispatch },
  ) {
    const {
      dependencies: { feedReaderGateway },
    } = extra;
    const feedEntities = getState().getFeeds.entities!.feeds;
    const feedIds = getState().getFeeds.result!;

    const feedAlreadyRegistered = feedIds
      .map((feedId) => feedEntities[feedId].website)
      .includes(feedUrl);
    if (feedAlreadyRegistered)
      return rejectWithValue("This feed is already registered");

    const parsedFeed = await feedReaderGateway.parse(feedUrl);
    if (typeof parsedFeed === "string")
      return rejectWithValue("Failed to parse feed");

    const userId = getState().auth.user!.id;

    const feedItems = parsedFeed.feedItems.map((a) => {
      const articles: FeedItem = {
        ...a,
        content: a.content,
        readStatus: "UNREAD",
        id: crypto.randomUUID(),
      };
      return articles;
    });

    const feed: Feed = {
      id: crypto.randomUUID(),
      feedItems,
      name: parsedFeed.name,
      website: parsedFeed.website,
    };
    dispatch(newFeedRegistered(feed));

    await feedReaderGateway.registerFeed({
      userId,
      feed,
    });
    return { feedId: feed.id, articlesCount: feedItems.length };
    // try {
    //   const res = await feedReaderGateway.registerFeed(feedUrl, userId);
    //   return res;
    // } catch (e) {
    //   return rejectWithValue(
    //     e instanceof Error ? e.message : "Failed to register feed",
    //   );
    // }
  },
);
