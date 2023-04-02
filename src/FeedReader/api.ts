import { Feed } from "src/FeedReader/models";
import type { Dependencies } from "src/store";
import type { RootApi } from "src/store/root.api";

export function setupFeedReaderApi(rootApi: RootApi) {
  return rootApi.injectEndpoints({
    endpoints(build) {
      return {
        retrieveFeedList: build.query<Feed[], void>({
          providesTags: ["Feeds"],
          async queryFn(_, api) {
            try {
              const { dependencies } = api.extra as {
                dependencies: Dependencies;
              };
              const feedList =
                await dependencies.feedReaderGateway?.retrieveFeedList?.();
              if (!feedList) return { error: "Failed to retrieve feeds" };
              return {
                data: feedList,
              };
            } catch (error) {
              console.error(error);
              return { error: "Failed to retrieve feeds" };
            }
          },
        }),
        registerFeed: build.mutation<Feed, string>({
          async queryFn(url, api) {
            try {
              const { dependencies } = api.extra as {
                dependencies: Dependencies;
              };
              const feed = await dependencies.feedReaderGateway?.registerFeed?.(
                url
              );
              if (!feed) return { error: "Failed to register feed" };
              return { data: feed };
            } catch (error) {
              console.error(error);
              return { error: "Failed to register feed" };
            }
          },
        }),
      };
    },
  });
}

export type FeedReaderApi = ReturnType<typeof setupFeedReaderApi>;
