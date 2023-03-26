import { Feed } from "./Feed";
import type { FeedGateway } from "./FeedGateway";

export class FeedGatewayProduction implements FeedGateway {
  async retrieve(): Promise<Feed[]> {
    const res = await fetch("/api/feed");
    if (!res.ok) throw new Error("Failed to get feed");
    return res.json();
  }
}
