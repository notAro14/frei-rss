import { State, Store, setupStore } from "src/store";
import type { FeedReaderGateway } from "src/domain/Feed/gateways/FeedReader.gateway";
import { FeedReaderInMemoryGateway } from "src/domain/Feed/gateways/FeedReaderInMemory.gateway";
import { getFeeds } from "src/domain/Feed/usecases/getFeeds";
import { MOCK, FEED_ID } from "src/domain/Feed/mocks";
import { removeFeed } from "./removeFeed";

describe("Remove Feed", () => {
  let initialState: State;
  let store: Store;
  let gateway: FeedReaderGateway;

  beforeEach(() => {
    gateway = new FeedReaderInMemoryGateway(MOCK);
    store = setupStore({ feedReaderGateway: gateway });
    initialState = store.getState();
  });

  it("should remove a feed and its related feed items", async () => {
    await store.dispatch(getFeeds());
    await store.dispatch(removeFeed({ feedId: FEED_ID }));
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
      },
    });
  });
});
