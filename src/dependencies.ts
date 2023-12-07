import { FeedReaderProductionGateway as FeedReaderGateway } from "./domain/Feed/gateways/FeedReaderProduction.gateway";

export const dependencies = {
  feedReaderGateway: new FeedReaderGateway(),
};
