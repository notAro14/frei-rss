const STATUS = {
  read: "READ",
  unread: "UNREAD",
  read_later: "READ_LATER",
} as const;

type Key = keyof typeof STATUS | null;

export function mapFeedItemStatusFromRemote(key: Key) {
  if (!key) return "UNREAD";
  return STATUS[key];
}
