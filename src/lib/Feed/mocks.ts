import { type Dependencies, INITIAL_STATE, type State } from "src/store";
import type { Feed, FeedItem } from "src/lib/Feed/models/Feed.entity";
import { normalize } from "src/lib/Feed/utils/normalize";
import { FeedReaderInMemoryGateway } from "./gateways/FeedReaderInMemory.gateway";
import { AuthInMemoryGateway } from "src/lib/Auth/gateways/AuthInMemory.gateway";

export const FEED_URL = "https://example.com/rss";
export const FEED_ID = "1";
export const FEED_ITEM_ID = "11";
export const FEED_ITEM_URL = "https://example.com/article-title";
export const FEED_ITEM: FeedItem = {
  id: FEED_ITEM_ID,
  url: FEED_ITEM_URL,
  title: "Article title",
  date: "2023-03-31",
  readStatus: "UNREAD",
  content: "Fake content",
  favorite: false,
} as const;
export const FEED_NAME = "My feed";
export const FEED_ITEM_PUB_DATE = "Mar 31, 2023";
export const MOCK: Feed[] = [
  {
    id: FEED_ID,
    name: FEED_NAME,
    url: FEED_URL,
    feedItems: [FEED_ITEM],
  },
];

export const NORMALIZED_MOCK = normalize(MOCK);
export const PRELOADED_STATE: State = {
  registerFeed: INITIAL_STATE.registerFeed,
  getFeeds: {
    status: "fulfilled",
    entities: NORMALIZED_MOCK.entities,
    result: NORMALIZED_MOCK.result,
  },
  removeFeed: INITIAL_STATE.removeFeed,
  auth: INITIAL_STATE.auth,
  syncFeed: INITIAL_STATE.syncFeed,
  getReaderView: INITIAL_STATE.getReaderView,
};

export function createInMemoryDependencies(mock = MOCK): Dependencies {
  return {
    feedReaderGateway: new FeedReaderInMemoryGateway(mock),
    authGateway: new AuthInMemoryGateway(),
  };
}
