import { State, Store, configureStore } from "src/store";
import { FeedReaderInMemoryGateway } from "src/lib/Feed/gateways/FeedReaderInMemory.gateway";
import { AuthInMemoryGateway } from "src/lib/Auth/gateways/AuthInMemory.gateway";
import { getFeeds } from "src/lib/Feed/usecases/getFeeds";
import {
  MOCK,
  FEED_ID,
  NORMALIZED_MOCK,
  PRELOADED_STATE,
} from "src/lib/Feed/mocks";
import { removeFeed } from "src/lib/Feed/usecases/removeFeed";
import { removeFeedCancel } from "src/lib/Feed/slices/removeFeed.slice";

describe("Remove Feed", () => {
  let initialState: State;
  let store: Store;

  beforeEach(() => {
    jest.useFakeTimers();
    const feedReaderGateway = new FeedReaderInMemoryGateway(MOCK);
    const authGateway = new AuthInMemoryGateway();
    const dep = { feedReaderGateway, authGateway };
    store = configureStore(dep, {
      ...PRELOADED_STATE,
      auth: { user: { email: "john@doe.com", id: "1" }, error: null },
    });
    initialState = store.getState();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should remove a feed and its related feed items", async () => {
    store.dispatch(removeFeed({ feedId: FEED_ID }));
    // ----------
    // see https://stackoverflow.com/a/52196951
    jest.runAllTimers();
    await Promise.resolve();
    // ----------

    expect(store.getState()).toEqual<State>({
      ...initialState,
      getFeeds: {
        entities: {
          feeds: {},
          feedItems: {},
        },
        result: [],
        status: "fulfilled",
      },
      removeFeed: {
        status: "fulfilled",
        feedToRemove: {},
      },
    });
  });

  it("should try to remove a feed and undo the removal", async () => {
    store.dispatch(removeFeed({ feedId: FEED_ID }));
    store.dispatch(removeFeedCancel({ feedId: FEED_ID }));
    expect(store.getState()).toEqual<State>({
      ...initialState,
      getFeeds: {
        entities: NORMALIZED_MOCK.entities,
        result: NORMALIZED_MOCK.result,
        status: "fulfilled",
      },
      removeFeed: {
        status: "idle",
        feedToRemove: {},
      },
    });
  });
});
