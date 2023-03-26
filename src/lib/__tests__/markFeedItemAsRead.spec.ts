import { describe, beforeEach, it, expect } from "vitest";
import { configureStore, State, Store, INITIAL_STATE } from "src/store";
import type { Feed } from "src/lib/Feed/models/Feed.entity";
import { normalize } from "src/lib/Feed/utils/normalize";
import { FeedReaderInMemoryGateway } from "src/lib/Feed/gateways/FeedReaderInMemory.gateway";
import { AuthInMemoryGateway } from "src/lib/Auth/gateways/AuthInMemory.gateway";

import { markFeedItemAsRead } from "src/lib/Feed/usecases/markFeedItemAsRead";

describe("Mark feed item as read", () => {
  let store: Store;
  let initialState: State;

  beforeEach(() => {
    const feedReaderGateway = new FeedReaderInMemoryGateway(MOCK);
    const authGateway = new AuthInMemoryGateway();
    const dep = { feedReaderGateway, authGateway };
    store = configureStore(dep, PRELOADED_STATE);
    initialState = store.getState();
  });

  it("should mark feed item as read", async function () {
    await whenMarkingFeedItemAsRead({ store });
    thenFeedItemShouldBeMarkedAsRead({ initialState, store });
  });
});

async function whenMarkingFeedItemAsRead({ store }: { store: Store }) {
  return store.dispatch(markFeedItemAsRead({ feedItemId: FEED_ITEM_ID }));
}
function thenFeedItemShouldBeMarkedAsRead({
  initialState,
  store,
}: {
  initialState: State;
  store: Store;
}) {
  expect(store.getState()).toEqual<State>({
    ...initialState,
    getFeeds: {
      ...initialState.getFeeds,
      entities: {
        ...NORMALIZED_MOCK.entities,
        feedItems: {
          [FEED_ITEM_ID]: {
            ...NORMALIZED_MOCK.entities.feedItems[FEED_ITEM_ID],
            readStatus: "READ",
          },
        },
      },
    },
  });
}

const FEED_ITEM_ID = "11";
const MOCK: Feed[] = [
  {
    id: "1",
    name: "My feed",
    url: "https://example.com/rss",
    feedItems: [
      {
        id: FEED_ITEM_ID,
        url: "https://example.com/article-title",
        title: "Article title",
        date: "2023-03-31",
        readStatus: "UNREAD",
        content: "",
      },
    ],
  },
];
const NORMALIZED_MOCK = normalize(MOCK);
const PRELOADED_STATE: State = {
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
