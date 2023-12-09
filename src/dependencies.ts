import { AuthSupabase } from "src/domain/Auth/gateways/AuthSupabase.gateway";
import { FeedReaderProductionGateway as FeedReaderGateway } from "src/domain/Feed/gateways/FeedReaderProduction.gateway";
import { Store, type Dependencies } from "src/store";
import { onAuthStateChangedListener } from "src/domain/Auth/usecases/onAuthStateChangeListener";

const authGateway = new AuthSupabase();
const feedReaderGateway = new FeedReaderGateway();

export const dependencies: Dependencies = {
  feedReaderGateway,
  authGateway,
};

export const registerOnAuthStateChangedListener = (store: Store) =>
  onAuthStateChangedListener({ store, authGateway });
