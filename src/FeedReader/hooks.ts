import { useCallback, useRef } from "react";
import { useSelector } from "src/store";
import { dispatch, feedReaderApi } from "src/store/config";

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
