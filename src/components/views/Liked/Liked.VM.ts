import type { Res } from "src/types/response";

export type LikedVM = Res<{
  articleIds: string[];
}>;
export type LikedCountVM = Res<{
  count: number;
}>;
