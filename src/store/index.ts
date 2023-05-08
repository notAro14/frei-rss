import {
  TypedUseSelectorHook,
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import type { FeedReaderGateway } from "src/domain/Feed/gateways/FeedReader.gateway";
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

export function setupStore(dependencies: Dependencies, preloadedState?: State) {
  if (typeof dependencies.feedReaderGateway === "undefined")
    throw new Error("feedReaderGateway has not been injected");

  return configureStore({
    reducer: {
      [getFeedsSlice.name]: getFeedsSlice.reducer,
      [registerFeedSlice.name]: registerFeedSlice.reducer,
      [removeFeedSlice.name]: removeFeedSlice.reducer,
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
export type Dependencies = Partial<{
  feedReaderGateway: FeedReaderGateway;
}>;
export type Store = ReturnType<typeof setupStore>;
// export type State = ReturnType<Store["getState"]>;
export interface State {
  getFeeds: GetFeeds;
  registerFeed: RegisterFeed;
  removeFeed: RemoveFeed;
}
export type Dispatch = Store["dispatch"];

export const useSelector: TypedUseSelectorHook<State> = _useSelector;
export const useDispatch: () => Dispatch = _useDispatch;

export const INITIAL_STATE: State = {
  getFeeds: getFeedsState,
  registerFeed: registerFeedState,
  removeFeed: removeFeedState,
};
