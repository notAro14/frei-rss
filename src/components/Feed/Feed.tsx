import { TrashIcon } from "@radix-ui/react-icons";
import FeedItem from "src/components/FeedItem";

import * as styles from "./Feed.css";
import { useDispatch, useSelector } from "src/store";
import { useCallback } from "react";
import { removeFeed } from "src/domain/Feed/usecases/removeFeed/removeFeed";

interface Props {
  name: string;
  id: string;
  feedItemsKeys: string[];
}

export default function Feed(props: Props) {
  const { name, feedItemsKeys, id } = props;
  const dispatch = useDispatch();
  const status = useSelector((state) => state.removeFeed.status);
  const feedRemovalPending = status === "pending";
  const removeFeedCb = useCallback(() => {
    const yes = confirm("Are you sure ?");
    yes && dispatch(removeFeed({ feedId: id }));
  }, [dispatch, id]);

  return (
    <li>
      <details>
        <summary className={styles.summary}>
          <button
            className={styles.remove}
            disabled={feedRemovalPending}
            onClick={removeFeedCb}
            title="Remove feed"
          >
            <TrashIcon />
          </button>
          <span>{name}</span>
        </summary>
        <ul className={styles.ul}>
          {feedItemsKeys.map((feedItemId) => {
            return <FeedItem key={feedItemId} id={feedItemId} />;
          })}
        </ul>
      </details>
    </li>
  );
}
