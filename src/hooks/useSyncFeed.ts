import toast from "react-hot-toast";
import { useDispatch, useSelector } from "src/store";
import { useCallback } from "react";
import { syncFeed } from "src/lib/Feed/usecases/syncFeed";

export function useSyncFeed() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.syncFeed.status);
  const cb = useCallback(
    async function (args: { feedId: string; feedUrl: string }) {
      let res: string | void;
      try {
        res = await dispatch(syncFeed(args)).unwrap();
        setTimeout(() => {
          toast.success(res || "Synced");
        }, 0);
      } catch (e) {
        setTimeout(() => {
          res && toast.error(res);
        }, 0);
      }
    },
    [dispatch],
  );
  return [cb, status] as const;
}
