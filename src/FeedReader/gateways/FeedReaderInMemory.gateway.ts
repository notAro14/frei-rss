import type { FeedReaderGateway } from "./FeedReader.gateway";
import type { Feed } from "src/FeedReader/models";

export class FeedReaderInMemoryGateway implements FeedReaderGateway {
  _feedList: Feed[] = [];
  constructor(feedList: Feed[]) {
    this._feedList = feedList;
  }
  async retrieveFeedList(): Promise<Feed[]> {
    return this._feedList;
  }
}
