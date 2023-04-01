import type { Feed } from "../feed/Feed";

export interface FeedReaderGateway {
  retrieveFeedList(): Promise<Feed[]>;
}
