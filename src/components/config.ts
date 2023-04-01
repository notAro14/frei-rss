import { setupStore } from "src/store";
import { setupRootApi } from "src/store/root.api";
import { FeedReaderGatewayProduction } from "src/feed/FeedGateway.production";
import { setupFeedReaderApi } from "src/FeedReader/FeedReader.api";

const rootApi = setupRootApi();
const feedReaderGateway = new FeedReaderGatewayProduction();
export const store = setupStore({ rootApi, feedReaderGateway });

export const feedReaderApi = setupFeedReaderApi(rootApi);
export const { dispatch } = store;
