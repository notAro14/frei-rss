import { FeedReaderGateway } from "src/FeedReader/gateways/FeedReader.gateway";
import { Store, setupStore } from "src/store";
import { RootApi, setupRootApi } from "src/store/root.api";
import { FeedReaderApi, setupFeedReaderApi } from "src/FeedReader/api";
import { FeedReaderInMemoryGateway } from "../../gateways/FeedReaderInMemory.gateway";

const MOCK = [
  {
    title: "My feed",
    url: "https://example.com/feed.xml",
    items: [
      {
        url: "https://example.com/article-title",
        title: "Article title",
        pubDate: "2023-03-31",
      },
    ],
  },
];

describe("retrieve feed list", () => {
  let rootApi: RootApi;
  let feedReaderGateway: FeedReaderGateway;
  let store: Store;
  let feedReaderApi: FeedReaderApi;

  beforeEach(() => {
    rootApi = setupRootApi();
    feedReaderGateway = new FeedReaderInMemoryGateway(MOCK);
    store = setupStore({ rootApi, feedReaderGateway });
    feedReaderApi = setupFeedReaderApi(rootApi);
  });

  test("feed list can be retrieved", async () => {
    await whenRetrievingFeedList({ store, feedReaderApi });
    thenExpectAListOfFeed({ store, feedReaderApi });
  });
});

async function whenRetrievingFeedList({
  store,
  feedReaderApi,
}: {
  store: Store;
  feedReaderApi: FeedReaderApi;
}) {
  await store.dispatch(feedReaderApi.endpoints.retrieveFeedList.initiate());
}

function thenExpectAListOfFeed({
  feedReaderApi,
  store,
}: {
  store: Store;
  feedReaderApi: FeedReaderApi;
}) {
  expect(
    feedReaderApi.endpoints.retrieveFeedList.select()(store.getState()).data
  ).toEqual(MOCK);
}
