import {
  TypedUseSelectorHook,
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from "react-redux";
import { configureStore as _configureStore } from "@reduxjs/toolkit";
import type { FeedReaderGateway } from "src/lib/Feed/models/FeedReader.gateway";
import type { AuthGateway } from "src/lib/Auth/models/Auth.gateway";
import {
  getFeedsSlice,
  GetFeeds,
  initialState as getFeedsState,
} from "src/lib/Feed/slices/getFeeds.slice";
import {
  RegisterFeed,
  registerFeedSlice,
  initialState as registerFeedState,
} from "src/lib/Feed/slices/registerFeed.slice";
import {
  RemoveFeed,
  removeFeedSlice,
  initialState as removeFeedState,
} from "src/lib/Feed/slices/removeFeed.slice";
import {
  authSlice,
  type Auth,
  initialState as authSliceState,
} from "src/lib/Auth/slices/auth.slice";
import {
  syncFeedSlice,
  type SyncFeed,
  initialState as syncFeedState,
} from "src/lib/Feed/slices/syncFeed.slice";
import {
  getReaderViewSlice,
  initialState as getReaderViewState,
} from "src/lib/Feed/slices/getReaderView.slice";

export function configureStore(
  dependencies: Dependencies,
  preloadedState?: State,
) {
  return _configureStore({
    reducer: {
      [getFeedsSlice.name]: getFeedsSlice.reducer,
      [registerFeedSlice.name]: registerFeedSlice.reducer,
      [removeFeedSlice.name]: removeFeedSlice.reducer,
      [authSlice.name]: authSlice.reducer,
      [syncFeedSlice.name]: syncFeedSlice.reducer,
      [getReaderViewSlice.name]: getReaderViewSlice.reducer,
    },
    preloadedState,
    devTools: process.env.NODE_ENV === "development",
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

export interface State {
  getFeeds: GetFeeds;
  registerFeed: RegisterFeed;
  removeFeed: RemoveFeed;
  auth: Auth;
  syncFeed: SyncFeed;
  getReaderView: typeof getReaderViewState;
}
export type Dispatch = Store["dispatch"];

export const useSelector: TypedUseSelectorHook<State> = _useSelector;
export const useDispatch: () => Dispatch = _useDispatch;

export const INITIAL_STATE: State = {
  getFeeds: getFeedsState,
  registerFeed: registerFeedState,
  removeFeed: removeFeedState,
  auth: authSliceState,
  syncFeed: syncFeedState,
  getReaderView: getReaderViewState,
};
