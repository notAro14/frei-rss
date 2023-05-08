import { TrashIcon, ResetIcon } from "@radix-ui/react-icons";
import FeedItem from "src/components/FeedItem";

import * as styles from "./Feed.css";
import { useDispatch, useSelector } from "src/store";
import { useCallback } from "react";
import { removeFeed } from "src/domain/Feed/usecases/removeFeed/removeFeed";
import { removeFeedCancel } from "src/domain/Feed/usecases/removeFeed/removeFeed.reducer";

interface Props {
  name: string;
  id: string;
  feedItemsKeys: string[];
}

export default function Feed(props: Props) {
  const { name, feedItemsKeys, id } = props;
  const dispatch = useDispatch();
  const feedToRemove = useSelector(
    (state) => state.removeFeed.feedToRemove[id]
  );
  const feedRemovalPending = Boolean(feedToRemove);
  const removeFeedCb = useCallback(() => {
    // const yes = confirm("Are you sure ?");
    // yes && dispatch(removeFeed({ feedId: id }));
    dispatch(removeFeed({ feedId: id }));
  }, [dispatch, id]);
  const removeFeedCancelCb = useCallback(() => {
    dispatch(removeFeedCancel({ feedId: id }));
  }, [dispatch, id]);

  return (
    <li>
      <details>
        <summary className={styles.summary}>
          <span>{name}</span>
        </summary>
        <ul className={styles.ul}>
          <button
            className={styles.remove}
            // disabled={feedRemovalPending}
            onClick={feedRemovalPending ? removeFeedCancelCb : removeFeedCb}
            title={feedRemovalPending ? "Undo removal" : "Remove feed"}
          >
            {feedRemovalPending ? (
              <>
                <span>Undo</span>
                <ResetIcon />
              </>
            ) : (
              <>
                <span>Remove</span>
                <TrashIcon />
              </>
            )}
          </button>
          {feedItemsKeys.map((feedItemId) => {
            return <FeedItem key={feedItemId} id={feedItemId} />;
          })}
        </ul>
      </details>
    </li>
  );
}
