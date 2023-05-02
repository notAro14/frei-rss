import type { FeedReaderGateway } from "./FeedReader.gateway";
import type { Feed } from "src/Feed/entities/Feed";

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
}
