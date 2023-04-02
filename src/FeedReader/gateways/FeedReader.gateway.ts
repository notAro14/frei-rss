import type { Feed } from "src/FeedReader/models";

export interface FeedReaderGateway {
  retrieveFeedList?(): Promise<Feed[]>;
  registerFeed?(url: string): Promise<Feed>;
}
