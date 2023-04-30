import type { Feed } from "src/Feed/entities/Feed";

export interface FeedReaderGateway {
  retrieveFeedList?(): Promise<Feed[]>;
  registerFeed?(url: string): Promise<Feed>;
}
