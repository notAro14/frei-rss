import { Fragment } from "react";
import ThisMonthArticles from "src/components/ThisMonthArticles";

import { heading } from "src/styles/common/heading.css";

export default function HomePage() {
  return (
    <Fragment>
      <h2 className={heading()}>This month</h2>
      <ThisMonthArticles />
    </Fragment>
  );
}
