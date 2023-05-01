import { setupStore, State, Store } from "src/store";
import type { RootApi } from "src/store/root.api";
import type { FeedReaderGateway } from "src/Feed/gateways/FeedReader.gateway";
import { getFeeds } from "./getFeeds";
import { setupRootApi } from "src/store/root.api";
import { FeedReaderInMemoryGateway } from "src/Feed/gateways/FeedReaderInMemory.gateway";
import type { Feed } from "src/Feed/entities/Feed";
import { normalizeFeed } from "./utils";

const MOCK: Feed[] = [
  {
    id: "1",
    name: "My feed",
    website: "https://example.com/rss",
    feedItems: [
      {
        id: "11",
        url: "https://example.com/article-title",
        title: "Article title",
        date: "2023-03-31",
      },
    ],
  },
];
const NORMALIZED_MOCK = normalizeFeed(MOCK);

describe("Get feeds", () => {
  let gateway: FeedReaderGateway;
  let api: RootApi;
  let store: Store;
  let initialState: State;

  beforeEach(() => {
    gateway = new FeedReaderInMemoryGateway(MOCK);
    api = setupRootApi();
    store = setupStore({ rootApi: api, feedReaderGateway: gateway });
    initialState = store.getState();
  });

  it("should have no feeds initially", function () {
    expect(store.getState()).toEqual<State>({
      ...initialState,
      getFeeds: {
        result: null,
        entities: null,
        isFulfilled: false,
      },
    });
  });

  it("should retrieve feeds", async () => {
    await store.dispatch(getFeeds());
    expect(store.getState().getFeeds).toEqual({
      result: NORMALIZED_MOCK.result,
      entities: NORMALIZED_MOCK.entities,
      isFulfilled: true,
    });
  });
});
