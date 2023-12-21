import type {
  Feed,
  FeedFreshlyParsed,
  FeedItem,
} from "src/lib/Feed/models/Feed.entity";

export type RegisterFeedRes =
  | { ok: true; data: Feed }
  | { ok: false; error: string };

export interface FeedReaderGateway {
  retrieveFeedList(): Promise<Feed[]>;
  registerFeed(args: { feed: Feed; userId: string }): Promise<RegisterFeedRes>;
  updateFeedItemReadingStatus(
    feedItemId: string,
    status: "READ" | "UNREAD" | "READ_LATER",
  ): Promise<FeedItem>;
  deleteFeed(id: string): Promise<{ feedId: string }>;
  parse(url: string): Promise<FeedFreshlyParsed | string>;
  saveArticles(args: {
    articles: FeedItem[];
    userId: string;
    feedId: string;
  }): Promise<{ ok: boolean }>;
}