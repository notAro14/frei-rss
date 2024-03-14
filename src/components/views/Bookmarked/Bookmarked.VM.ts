import type { Res } from "src/types/response";

export type BookmarkedVM = Res<{
  articleIds: string[];
}>;
export type BookmarkedCountVM = Res<{
  count: number;
}>;
