import type { Res } from "src/types/response";

export type FeedVMUnwrapped = {
  id: string;
  name: string;
  website?: string;
  url: string;
  favicon: {
    src?: string;
    fallback: string;
  };
  articles: string[];
};
export type FeedVM = Res<FeedVMUnwrapped>;
