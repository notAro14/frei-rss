import { setupStore } from "src/store";
import { setupRootApi } from "src/store/root.api";
import { FeedReaderProductionGateway } from "src/Feed/gateways/FeedReaderProduction.gateway";
import { setupFeedReaderApi } from "src/FeedReader/api";

const rootApi = setupRootApi();
const feedReaderGateway = new FeedReaderProductionGateway();
export const store = setupStore({ rootApi, feedReaderGateway });

export const feedReaderApi = setupFeedReaderApi(rootApi);
export const { dispatch } = store;
