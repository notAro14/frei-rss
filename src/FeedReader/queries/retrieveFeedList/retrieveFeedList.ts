import type { FeedReaderApi } from "src/FeedReader/api";
import type { Dispatch } from "src/store";

export function retrieveFeedList({
  feedReaderApi,
  dispatch,
}: {
  feedReaderApi: FeedReaderApi;
  dispatch: Dispatch;
}) {
  return dispatch(feedReaderApi.endpoints.retrieveFeedList.initiate());
}
