import { Feed } from "src/feed/Feed";
import type { Dependencies } from "src/store";
import type { RootApi } from "src/store/root.api";

export function setupFeedReaderApi(rootApi: RootApi) {
  return rootApi.injectEndpoints({
    endpoints(build) {
      return {
        retrieveFeedList: build.query<Feed[], void>({
          providesTags: ["Feeds"],
          async queryFn(_, api) {
            const { dependencies } = api.extra as {
              dependencies: Dependencies;
            };
            const data =
              await dependencies.feedReaderGateway?.retrieveFeedList();
            if (typeof data === "undefined")
              return { error: "No feed retrieved" };
            return {
              data,
            };
          },
        }),
      };
    },
  });
}

export type FeedReaderApi = ReturnType<typeof setupFeedReaderApi>;
