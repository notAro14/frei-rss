import { toast } from "sonner";
import { useDispatch, useSelector } from "src/store";
import { useCallback } from "react";
import { syncFeed } from "src/lib/Feed/usecases/syncFeed";

export function useSyncFeed() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.syncFeed.status);
  const cb = useCallback(
    async function (args: { feedId: string; feedUrl: string }) {
      const promise = dispatch(syncFeed(args)).unwrap();
      toast.promise(promise, {
        loading: "Fetching new articles...",
        success(data) {
          if (typeof data === "string") return data;
          if (data)
            return data > 1 ? `${data} new articles` : `${data} new article`;
          return "Synced";
        },
        error() {
          return '"Failed to sync new articles"';
        },
      });
    },
    [dispatch],
  );
  return [cb, status] as const;
}
