import { createAppAsyncThunk } from "src/thunk";
import { FeedItem } from "src/lib/Feed/models/Feed.entity";

export const syncFeed = createAppAsyncThunk<
  | void
  | { feedId: string; newArticles: FeedItem[]; newArticleIds: string[] }
  | string,
  { feedId: string; feedUrl: string }
>(
  "feed/sync",
  async function ({ feedId, feedUrl }, { extra, getState, rejectWithValue }) {
    const feedFreshlyParsed =
      await extra.dependencies.feedReaderGateway.parse(feedUrl);

    if (typeof feedFreshlyParsed === "string") return;
    const feed = getState().getFeeds.entities!.feeds[feedId];
    const articles = feed.feedItems.map(
      (fId) => getState().getFeeds.entities!.feedItems[fId].url,
    );

    const newArticles = feedFreshlyParsed.feedItems.reduce((acc, i) => {
      if (!articles.includes(i.url)) {
        const feedItem: FeedItem = {
          ...i,
          readStatus: "UNREAD",
          id: crypto.randomUUID(),
        };
        acc.push(feedItem);
      }
      return acc;
    }, [] as FeedItem[]);

    if (!newArticles.length) return "Already up to date";

    const userId = getState().auth.user!.id;
    const { ok: savingArticlesSuccessful } =
      await extra.dependencies.feedReaderGateway.saveArticles({
        articles: newArticles,
        userId,
        feedId,
      });
    if (!savingArticlesSuccessful) {
      return rejectWithValue("Failed to sync new articles");
    }

    return {
      feedId,
      newArticles,
      newArticleIds: newArticles.map((a) => a.id),
    };
  },
);
