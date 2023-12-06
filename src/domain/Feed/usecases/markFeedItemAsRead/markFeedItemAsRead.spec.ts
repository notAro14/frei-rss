import { configureStore, State, Store, INITIAL_STATE } from "src/store";
import type { FeedReaderGateway } from "src/domain/Feed/gateways/FeedReader.gateway";
import type { Feed } from "src/domain/Feed/entities/Feed";
import { normalize } from "src/domain/Feed/usecases/getFeeds/utils";
import { FeedReaderInMemoryGateway } from "src/domain/Feed/gateways/FeedReaderInMemory.gateway";

import { markFeedItemAsRead } from "./markFeedItemAsRead";

describe("Mark feed item as read", () => {
  let feedReaderGateway: FeedReaderGateway;
  let store: Store;
  let initialState: State;

  beforeEach(() => {
    feedReaderGateway = new FeedReaderInMemoryGateway(MOCK);
    store = configureStore({ feedReaderGateway }, PRELOADED_STATE);
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
    website: "https://example.com/rss",
    feedItems: [
      {
        id: FEED_ITEM_ID,
        url: "https://example.com/article-title",
        title: "Article title",
        date: "2023-03-31",
        readStatus: "UNREAD",
      },
    ],
  },
];
const NORMALIZED_MOCK = normalize(MOCK);
const PRELOADED_STATE: State = {
  registerFeed: INITIAL_STATE.registerFeed,
  getFeeds: {
    isFulfilled: true,
    entities: NORMALIZED_MOCK.entities,
    result: NORMALIZED_MOCK.result,
  },
  removeFeed: INITIAL_STATE.removeFeed,
  auth: INITIAL_STATE.auth,
};
