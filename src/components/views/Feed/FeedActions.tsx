import { AlertDialog, Button } from "@radix-ui/themes";
import { Trash, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useSyncFeed } from "src/hooks/useSyncFeed";
import { removeFeed } from "src/lib/Feed/usecases/removeFeed";
import { useDispatch } from "src/store";

export function FeedActions({ id, url }: { id: string; url: string }) {
  const [syncFeed, syncFeedStatus] = useSyncFeed();
  const dispatch = useDispatch();
  const onRemoveFeed = async () => {
    const promise = dispatch(removeFeed({ feedId: id })).unwrap();
    toast.promise(promise, {
      loading: "Unfollowing feed",
      success(feedName) {
        return `You no longer follow ${feedName}`;
      },
    });
  };
  return (
    <div className="flex gap-2">
      <Button
        disabled={syncFeedStatus === "pending"}
        onClick={() => syncFeed({ feedId: id, feedUrl: url })}
      >
        <RefreshCw size={"1em"} /> Refresh
      </Button>
      {/* ------------------- */}
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            disabled={syncFeedStatus === "pending"}
            title="Delete feed"
            color="red"
            variant="soft"
          >
            <Trash size={"1em"} /> Unsubscribe
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Unsubscribe from feed</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure ? You will unsubscribe from this feed and remove all
            related articles
          </AlertDialog.Description>
          <div className="mt-4 flex gap-4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={onRemoveFeed} variant="solid" color="red">
                Unsubscribe
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}
