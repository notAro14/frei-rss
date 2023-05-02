import { setupStore } from "src/store";
import { setupRootApi } from "src/store/root.api";
import { FeedReaderProductionGateway } from "src/Feed/gateways/FeedReaderProduction.gateway";
import { FeedReaderInMemoryGateway } from "src/Feed/gateways/FeedReaderInMemory.gateway";
import { setupFeedReaderApi } from "src/FeedReader/api";

const OFFLINE = process.env.NEXT_PUBLIC_OFFLINE === "true";

const rootApi = setupRootApi();
const feedReaderGateway = OFFLINE
  ? new FeedReaderInMemoryGateway([
      {
        id: "1",
        website: "https://example.com/",
        name: "Example Dot Com",
        feedItems: [
          {
            id: "11",
            title: "Hello World Article",
            url: "https://example.com/hello-world/",
            date: "2023-01-01",
          },
        ],
      },
    ])
  : new FeedReaderProductionGateway();
export const store = setupStore({ rootApi, feedReaderGateway });

export const feedReaderApi = setupFeedReaderApi(rootApi);
export const { dispatch } = store;
