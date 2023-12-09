import { type Store } from "src/store";
import { AuthGateway } from "src/lib/Auth/gateways/Auth.gateway";
import {
  userAuthenticated,
  userUnAuthenticated,
} from "src/lib/Auth/auth.slice";

export const onAuthStateChangedListener = ({
  authGateway,
  store,
}: {
  store: Store;
  authGateway: AuthGateway;
}) => {
  return authGateway.onAuthStateChangedListener((user) => {
    if (user) store.dispatch(userAuthenticated(user));
    else store.dispatch(userUnAuthenticated());
  });
};
