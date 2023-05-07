import type { Feed, FeedItem } from "src/Feed/entities/Feed";

export interface FeedReaderGateway {
  retrieveFeedList?(): Promise<Feed[]>;
  registerFeed?(url: string): Promise<Feed>;
  updateFeedItemReadingStatus?(
    feedItemId: string,
    status: "READ" | "UNREAD"
  ): Promise<FeedItem>;
}
