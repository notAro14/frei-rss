import styles from "./Loader.module.scss";

export function Loader() {
  return (
    <div role="progress" className="mt-4 grid place-items-center">
      <div className={styles.loader} />
    </div>
  );
}
