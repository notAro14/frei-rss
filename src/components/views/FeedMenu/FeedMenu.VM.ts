import { Res } from "src/types/response";
type FeedMenuLink = {
  id: string;
  name: string;
  favicon?: string;
};
export type FeedMenuVM = Res<FeedMenuLink[]>;
