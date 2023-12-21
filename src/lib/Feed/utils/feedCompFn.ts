import { type Feed } from "src/lib/Feed/models/Feed.entity";

export function feedCompFn(a: Feed, b: Feed) {
  const nameA = a.name.trim().toUpperCase();
  const nameB = b.name.trim().toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}
