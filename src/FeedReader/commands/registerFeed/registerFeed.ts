import type { FeedReaderApi } from "src/FeedReader/api";
import type { Dispatch } from "src/store";

interface Props {
  feedReaderApi: FeedReaderApi;
  dispatch: Dispatch;
}

export default async function registerFeed(
  url: string,
  { feedReaderApi, dispatch }: Props
) {
  return dispatch(feedReaderApi.endpoints.registerFeed.initiate(url));
}
