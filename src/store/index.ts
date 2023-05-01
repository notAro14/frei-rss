import {
  TypedUseSelectorHook,
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import type { FeedReaderGateway } from "src/Feed/gateways/FeedReader.gateway";
import type { RootApi } from "./root.api";
import { getFeedsReducer } from "src/Feed/usecases/getFeeds";

export function setupStore(dependencies: Dependencies) {
  if (typeof dependencies.rootApi === "undefined")
    throw new Error("rootApi has not been injected");
  if (typeof dependencies.feedReaderGateway === "undefined")
    throw new Error("feedReaderGateway has not been injected");

  const apiMiddleware = dependencies.rootApi.middleware;
  const apiReducerPath = dependencies.rootApi.reducerPath;
  const apiReducer = dependencies.rootApi.reducer;
  return configureStore({
    reducer: {
      [apiReducerPath]: apiReducer,
      getFeeds: getFeedsReducer,
    },
    middleware(gdm) {
      return gdm({
        thunk: {
          extraArgument: {
            dependencies,
          },
        },
      }).concat(apiMiddleware);
    },
  });
}
export type Dependencies = Partial<{
  rootApi: RootApi;
  feedReaderGateway: FeedReaderGateway;
}>;
export type Store = ReturnType<typeof setupStore>;
export type State = ReturnType<Store["getState"]>;
export type Dispatch = Store["dispatch"];

export const useSelector: TypedUseSelectorHook<State> = _useSelector;
export const useDispatch: () => Dispatch = _useDispatch;