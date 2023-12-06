import { State, Store, configureStore } from "src/store";
import type { FeedReaderGateway } from "src/domain/Feed/gateways/FeedReader.gateway";
import { FeedReaderInMemoryGateway } from "src/domain/Feed/gateways/FeedReaderInMemory.gateway";
import { getFeeds } from "src/domain/Feed/usecases/getFeeds";
import { MOCK, FEED_ID, NORMALIZED_MOCK } from "src/domain/Feed/mocks";
import { removeFeed } from "./removeFeed";
import { removeFeedCancel } from "./removeFeed.reducer";

describe("Remove Feed", () => {
  let initialState: State;
  let store: Store;
  let gateway: FeedReaderGateway;

  beforeEach(() => {
    jest.useFakeTimers();
    gateway = new FeedReaderInMemoryGateway(MOCK);
    store = configureStore({ feedReaderGateway: gateway });
    initialState = store.getState();
  });
  afterEach(() => {
    // jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should remove a feed and its related feed items", async () => {
    await store.dispatch(getFeeds());
    store.dispatch(removeFeed({ feedId: FEED_ID }));
    await jest.runAllTimers();
    expect(store.getState()).toEqual<State>({
      ...initialState,
      getFeeds: {
        entities: {
          feeds: {},
          feedItems: {},
        },
        result: [],
        isFulfilled: true,
      },
      removeFeed: {
        status: "fulfilled",
        feedToRemove: {},
      },
    });
  });

  it("should try to remove a feed and undo the removal", async () => {
    await store.dispatch(getFeeds());
    store.dispatch(removeFeed({ feedId: FEED_ID }));
    store.dispatch(removeFeedCancel({ feedId: FEED_ID }));
    expect(store.getState()).toEqual<State>({
      ...initialState,
      getFeeds: {
        entities: NORMALIZED_MOCK.entities,
        result: NORMALIZED_MOCK.result,
        isFulfilled: true,
      },
      removeFeed: {
        status: "idle",
        feedToRemove: {},
      },
    });
  });
});
