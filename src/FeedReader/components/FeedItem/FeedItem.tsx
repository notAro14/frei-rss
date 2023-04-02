import * as styles from "./FeedItem.css";

interface Props {
  date?: string;
  link: string;
  title: string;
}
export default function FeedItem({ date, link, title }: Props) {
  return (
    <li className={styles.feedItem}>
      {date && <span className={styles.date}>{date}</span>}
      <a className={styles.link} href={link} target="_blank" rel="noopener">
        {title}
      </a>
    </li>
  );
}
