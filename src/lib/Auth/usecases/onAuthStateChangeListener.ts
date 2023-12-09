import { type Store } from "src/store";
import { AuthGateway } from "src/lib/Auth/models/Auth.gateway";
import {
  userAuthenticated,
  userUnAuthenticated,
} from "src/lib/Auth/slices/auth.slice";

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
