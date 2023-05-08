import { Fragment } from "react";
import FeedItem from "src/components/FeedItem";
import unreadFeedItemsSelector from "src/selectors/unreadFeedItems.selector";
import { useSelector } from "src/store";
import { flex } from "src/styles/common/flex.css";
import { heading } from "src/styles/common/heading.css";

export default function UnreadPage() {
  const ids = useSelector(unreadFeedItemsSelector);
  if (!ids) return null;
  return (
    <Fragment>
      <h2 className={heading()}>Unread ({ids.length})</h2>
      <ul className={flex({ direction: "column", gap: "md" })}>
        {ids.map((id) => {
          return <FeedItem key={id} id={id} />;
        })}
      </ul>
    </Fragment>
  );
}
