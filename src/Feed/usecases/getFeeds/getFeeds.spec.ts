import { setupStore, State, Store } from "src/store";
import type { RootApi } from "src/store/root.api";
import type { FeedReaderGateway } from "src/Feed/gateways/FeedReader.gateway";
import { getFeeds } from "./getFeeds";
import { setupRootApi } from "src/store/root.api";
import { FeedReaderInMemoryGateway } from "src/Feed/gateways/FeedReaderInMemory.gateway";

const MOCK = [
  {
    title: "My feed",
    url: "https://example.com/rss",
    items: [
      {
        url: "https://example.com/article-title",
        title: "Article title",
        pubDate: "2023-03-31",
      },
    ],
  },
];

describe("Get feeds", () => {
  let gateway: FeedReaderGateway;
  let api: RootApi;
  let store: Store;

  beforeEach(() => {
    gateway = new FeedReaderInMemoryGateway(MOCK);
    api = setupRootApi();
    store = setupStore({ rootApi: api, feedReaderGateway: gateway });
  });

  it("should have no feeds initially", function () {
    expect(store.getState().getFeeds.feeds).toEqual(null);
  });

  it("should retrieve feeds", async () => {
    await store.dispatch(getFeeds());
    expect(store.getState().getFeeds).toEqual<State["getFeeds"]>({
      feeds: MOCK,
    });
  });
});
