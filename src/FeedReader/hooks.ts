import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "src/store";
import { retrieveFeedList } from "src/FeedReader/queries/retrieveFeedList";
import { dispatch, feedReaderApi } from "src/store/config";
import { feedsSelector } from "src/FeedReader/selectors";
import type { Feed } from "src/FeedReader/models";

export function useRetrieveFeedList<T>(selectCallback?: (state?: Feed[]) => T) {
  useEffect(() => {
    const { unsubscribe } = retrieveFeedList({ dispatch, feedReaderApi });
    return unsubscribe;
  }, []);

  return useSelector((state) => {
    const raw = feedsSelector(state);
    const data = selectCallback?.(raw.data);
    return { ...raw, selectorResult: data };
  });
}

export function useRegisterFeed() {
  const requestIdRef = useRef("");
  const mutationState = useSelector(
    feedReaderApi.endpoints.registerFeed.select(requestIdRef.current)
  );
  const mutate = useCallback(function (url: string) {
    requestIdRef.current = url;
    return dispatch(feedReaderApi.endpoints.registerFeed.initiate(url));
  }, []);
  return [mutate, mutationState] as const;
}
