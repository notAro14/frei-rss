import { type Store } from "src/store";
import { AuthGateway } from "src/domain/Auth/gateways/Auth.gateway";
import {
  userAuthenticated,
  userUnAuthenticated,
} from "src/domain/Auth/auth.slice";

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
