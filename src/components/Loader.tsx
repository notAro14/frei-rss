import styles from "./Loader.module.scss";

export function Loader() {
  return (
    <div role="progress" className="grid grid-cols-2 gap-2">
      <div className={styles.loader} />
      <div className={styles.loader} />
    </div>
  );
}
