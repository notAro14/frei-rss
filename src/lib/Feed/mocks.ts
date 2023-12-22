import { INITIAL_STATE, State } from "src/store";
import type { Feed } from "./models/Feed.entity";
import { normalize } from "./utils/normalize";

export const FEED_URL = "https://example.com/rss";
export const FEED_ID = "1";
export const FEED_ITEM_ID = "11";
export const FEED_ITEM_URL = "https://example.com/article-title";
export const MOCK: Feed[] = [
  {
    id: FEED_ID,
    name: "My feed",
    website: FEED_URL,
    feedItems: [
      {
        id: FEED_ITEM_ID,
        url: FEED_ITEM_URL,
        title: "Article title",
        date: "2023-03-31",
        readStatus: "UNREAD",
        content: "",
      },
    ],
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
};
