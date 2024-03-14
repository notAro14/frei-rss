import { Res } from "src/types/response";
export type ThisMonthArticlesVM = Res<{ articleIds: string[] }>;
export type ThisMonthArticlesCountVM = Res<{ count: number }>;
