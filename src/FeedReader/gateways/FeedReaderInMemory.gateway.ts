import type { FeedReaderGateway } from "./FeedReader.gateway";
import type { Feed } from "src/FeedReader/models";

export class FeedReaderInMemoryGateway implements FeedReaderGateway {
  _feedList: Feed[] = [];
  _registeredFeed: Feed;

  constructor(feedList: Feed[]) {
    this._feedList = feedList;
    this._registeredFeed = feedList[0];
  }
  async retrieveFeedList(): Promise<Feed[]> {
    return this._feedList;
  }

  async registerFeed(_url: string): Promise<Feed> {
    return this._registeredFeed;
  }
}
