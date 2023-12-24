import { State, Store, configureStore } from "src/store";
import { FeedReaderInMemoryGateway } from "src/lib/Feed/gateways/FeedReaderInMemory.gateway";
import { AuthInMemoryGateway } from "src/lib/Auth/gateways/AuthInMemory.gateway";
import { MOCK, FEED_ID, PRELOADED_STATE } from "src/lib/Feed/mocks";
import { removeFeed } from "src/lib/Feed/usecases/removeFeed";

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

  it("should remove a feed optimistically", async () => {
    store.dispatch(removeFeed({ feedId: FEED_ID }));
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
        status: "pending",
      },
    });
  });
});
