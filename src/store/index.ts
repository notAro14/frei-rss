import {
  TypedUseSelectorHook,
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import type { FeedReaderGateway } from "src/Feed/gateways/FeedReader.gateway";
import { getFeedsSlice } from "src/Feed/usecases/getFeeds";
import { registerFeedSlice } from "src/Feed/usecases/registerFeed/registerFeed.reducer";

export function setupStore(dependencies: Dependencies) {
  if (typeof dependencies.feedReaderGateway === "undefined")
    throw new Error("feedReaderGateway has not been injected");

  return configureStore({
    reducer: {
      [getFeedsSlice.name]: getFeedsSlice.reducer,
      [registerFeedSlice.name]: registerFeedSlice.reducer,
    },
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
export type State = ReturnType<Store["getState"]>;
export type Dispatch = Store["dispatch"];

export const useSelector: TypedUseSelectorHook<State> = _useSelector;
export const useDispatch: () => Dispatch = _useDispatch;
