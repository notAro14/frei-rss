import type { Feed } from "./Feed";

export interface FeedGateway {
  retrieve(): Promise<Feed[]>;
}
