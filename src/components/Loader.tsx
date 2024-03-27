import styles from "./Loader.module.scss";
import clsx from "clsx";

export function Loader() {
  return (
    <div role="progress" className={clsx("grid h-[200px] gap-2", styles.root)}>
      <div className={clsx(styles.loader, styles["loader-1"])} />
      <div className={clsx(styles.loader, styles["loader-2"])} />
      <div className={clsx(styles.loader, styles["loader-3"])} />
    </div>
  );
}
