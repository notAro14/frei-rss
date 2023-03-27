import * as styles from "./Footer.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        Made by{" "}
        <a
          className={styles.link}
          href="https://github.com/notAro1'"
          target="_blank"
          rel="noopener"
        >
          Aro Andriamaro
        </a>
      </span>
    </footer>
  );
}
