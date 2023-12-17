import type { FeedReaderGateway } from "src/lib/Feed/models/FeedReader.gateway";
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

  async registerFeed(_url: string): Promise<Feed> {
    if (this._registeredUrls.includes(_url)) {
      throw new Error("Url already registered");
    }
    this._registeredUrls.push(_url);
    return this._registeredFeed;
  }

  async updateFeedItemReadingStatus(
    _feedItemId: string,
    status: "READ" | "UNREAD",
  ): Promise<FeedItem> {
    this._registeredFeed.feedItems[0].readStatus = status;
    return this._registeredFeed.feedItems[0];
  }
  async deleteFeed(id: string): Promise<{ feedId: string }> {
    return { feedId: id };
  }
  async parse(_url: string): Promise<string | FeedFreshlyParsed> {
    return "";
  }
}
