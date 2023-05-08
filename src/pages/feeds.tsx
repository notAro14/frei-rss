import { Fragment } from "react";
import FeedList from "src/components/FeedList/FeedList";
import { heading } from "src/styles/common/heading.css";

export default function FeedsPage() {
  return (
    <Fragment>
      <h2 className={heading()}>All feeds subscribed</h2>
      <FeedList />
    </Fragment>
  );
}
