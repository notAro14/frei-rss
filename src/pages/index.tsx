import { Fragment } from "react";
import AddFeedForm from "src/components/AddFeedForm";
import FeedList from "src/components/FeedList";
import ThisMonthArticles from "src/components/ThisMonthArticles";

import { heading } from "src/styles/common/heading.css";

export default function HomePage() {
  return (
    <Fragment>
      <AddFeedForm />
      <h2 className={heading()}>This month</h2>
      <ThisMonthArticles />
    </Fragment>
  );
}
