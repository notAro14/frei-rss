import {
  TypedUseSelectorHook,
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from "react-redux";
import { configureStore as _configureStore } from "@reduxjs/toolkit";
import type { FeedReaderGateway } from "src/domain/Feed/gateways/FeedReader.gateway";
import type { AuthGateway } from "src/domain/Auth/gateways/Auth.gateway";
import {
  getFeedsSlice,
  GetFeeds,
  initialState as getFeedsState,
} from "src/domain/Feed/usecases/getFeeds/getFeeds.reducer";
import {
  RegisterFeed,
  registerFeedSlice,
  initialState as registerFeedState,
} from "src/domain/Feed/usecases/registerFeed/registerFeed.reducer";
import {
  RemoveFeed,
  removeFeedSlice,
  initialState as removeFeedState,
} from "src/domain/Feed/usecases/removeFeed/removeFeed.reducer";
import {
  authSlice,
  type Auth,
  initialState as authSliceState,
} from "src/domain/Auth/auth.slice";

export function configureStore(
  dependencies: Dependencies,
  preloadedState?: State,
) {
  if (typeof dependencies.feedReaderGateway === "undefined")
    throw new Error("feedReaderGateway has not been injected");

  return _configureStore({
    reducer: {
      [getFeedsSlice.name]: getFeedsSlice.reducer,
      [registerFeedSlice.name]: registerFeedSlice.reducer,
      [removeFeedSlice.name]: removeFeedSlice.reducer,
      [authSlice.name]: authSlice.reducer,
    },
    preloadedState,
    middleware(gdm) {
      return gdm({
        thunk: {
          extraArgument: {
            dependencies,
          },
        },
      });
    },
  });
}
export type Dependencies = {
  feedReaderGateway: FeedReaderGateway;
  authGateway: AuthGateway;
};
export type Store = ReturnType<typeof configureStore>;
// export type State = ReturnType<Store["getState"]>;
export interface State {
  getFeeds: GetFeeds;
  registerFeed: RegisterFeed;
  removeFeed: RemoveFeed;
  auth: Auth;
}
export type Dispatch = Store["dispatch"];

export const useSelector: TypedUseSelectorHook<State> = _useSelector;
export const useDispatch: () => Dispatch = _useDispatch;

export const INITIAL_STATE: State = {
  getFeeds: getFeedsState,
  registerFeed: registerFeedState,
  removeFeed: removeFeedState,
  auth: authSliceState,
};
