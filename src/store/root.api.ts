import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query";

export function setupRootApi() {
  return createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Feeds"],
    endpoints() {
      return {};
    },
  });
}

export type RootApi = ReturnType<typeof setupRootApi>;
