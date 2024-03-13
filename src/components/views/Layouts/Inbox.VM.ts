import { Res } from "src/types/response";
type FeedLink = {
  id: string;
  name: string;
  favicon?: string;
};
export type InboxVM = Res<FeedLink[]>;
