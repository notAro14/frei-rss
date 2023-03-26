import styles from "./Loader.module.scss";

export function Loader() {
  return (
    <div role="progress" className="grid h-80 place-items-center">
      <div className={styles.loader} />
    </div>
  );
}
