import { Store, setupStore } from "src/store";
import { RootApi, setupRootApi } from "src/store/root.api";
import { FeedReaderApi, setupFeedReaderApi } from "src/FeedReader/api";
import { FeedReaderInMemoryGateway } from "../../../Feed/gateways/FeedReaderInMemory.gateway";
import { Feed } from "src/Feed/entities/Feed";

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

describe("register feed", () => {
  let rootApi: RootApi;
  let feedReaderGateway: FeedReaderInMemoryGateway;
  let store: Store;
  let feedReaderApi: FeedReaderApi;

  beforeEach(() => {
    rootApi = setupRootApi();
    feedReaderGateway = new FeedReaderInMemoryGateway(MOCK);
    store = setupStore({ rootApi, feedReaderGateway });
    feedReaderApi = setupFeedReaderApi(rootApi);
  });

  test("a new url feed can be registered", async () => {
    const URL = "https://example.com/rss";

    await store.dispatch(
      feedReaderApi.endpoints.registerFeed.initiate(URL, { fixedCacheKey: URL })
    );

    const selector = feedReaderApi.endpoints.registerFeed.select(URL);
    expect(selector(store.getState()).data).toEqual(MOCK[0]);
  });
});
