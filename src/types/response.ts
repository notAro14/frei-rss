export type Res<T> =
  | { status: "fulfilled"; data: T; error: null }
  | { status: "pending"; data: null; error: null }
  | { status: "rejected"; data: null; error: string };
