import type { Feed, FeedItem } from "src/domain/Feed/entities/Feed";

export interface FeedReaderGateway {
  retrieveFeedList?(): Promise<Feed[]>;
  registerFeed?(url: string): Promise<Feed>;
  updateFeedItemReadingStatus?(
    feedItemId: string,
    status: "READ" | "UNREAD"
  ): Promise<FeedItem>;
  deleteFeed?(id: string): Promise<Feed>;
}
