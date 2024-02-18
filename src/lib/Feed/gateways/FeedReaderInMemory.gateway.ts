import type {
  FeedReaderGateway,
  RegisterFeedRes,
  GatewayRes,
} from "src/lib/Feed/models/FeedReader.gateway";
import type {
  Feed,
  FeedFreshlyParsed,
  FeedItem,
} from "src/lib/Feed/models/Feed.entity";

export class FeedReaderInMemoryGateway implements FeedReaderGateway {
  _feeds: Feed[] = [];
  _registeredFeed: Feed;
  _registeredUrls: string[];

  constructor(feedList: Feed[]) {
    this._feeds = feedList;
    this._registeredFeed = feedList[0];
    this._registeredUrls = [];
  }
  async retrieveFeedList(): Promise<Feed[]> {
    return this._feeds;
  }

  async registerFeed({
    feed,
  }: {
    feed: Feed;
    userId: string;
  }): Promise<RegisterFeedRes> {
    if (this._registeredUrls.includes(feed.url)) {
      throw new Error("Url already registered");
    }
    this._registeredUrls.push(feed.url);
    return { ok: true, data: this._registeredFeed };
  }

  async updateFeedItemReadingStatus(
    _feedItemId: string,
    status: "READ" | "UNREAD",
  ): Promise<FeedItem> {
    this._registeredFeed.feedItems[0].readStatus = status;
    return this._registeredFeed.feedItems[0];
  }
  async deleteFeed({
    id,
  }: {
    id: string;
    userId: string;
  }): Promise<{ feedId: string; feedName: string }> {
    return { feedId: id, feedName: "" };
  }
  async parse(): Promise<string | FeedFreshlyParsed> {
    return "";
  }
  async saveArticles(): Promise<{ ok: boolean }> {
    return { ok: true };
  }
  async getReaderView(): GatewayRes<string> {
    return { ok: true, error: null, data: "<p>Fake reader view</p>" };
  }
  async likeArticle(id: string): Promise<{ id: string }> {
    return { id };
  }
  async unlikeArticle(id: string): Promise<{ id: string }> {
    return { id };
  }
}
