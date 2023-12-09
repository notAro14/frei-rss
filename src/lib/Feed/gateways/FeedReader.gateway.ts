import type { Feed, FeedItem } from "src/lib/Feed/entities/Feed";

export interface FeedReaderGateway {
  retrieveFeedList(): Promise<Feed[]>;
  registerFeed(url: string, userId: string): Promise<Feed>;
  updateFeedItemReadingStatus(
    feedItemId: string,
    status: "READ" | "UNREAD" | "READ_LATER",
  ): Promise<FeedItem>;
  deleteFeed(id: string): Promise<{ feedId: string }>;
}
