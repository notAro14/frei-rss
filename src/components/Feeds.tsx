import { Flex, Text } from "@radix-ui/themes";
import { useSelector } from "src/store";
import { Article } from "src/components/Article";
import styles from "./Feeds.module.css";
import { getAllFeeds } from "src/selectors/getAllFeeds.selector";

export function Feeds() {
  const feeds = useSelector(getAllFeeds);
  if (!feeds) return null;
  return (
    <Flex direction={"column"}>
      {feeds.map((f) => (
        <details className={styles.details} key={f.id}>
          <Text asChild size={"4"}>
            <summary className={styles.summary}>
              <span>{f.name}</span>
              {/* <Badge>{f.articleIds.length}</Badge> */}
            </summary>
          </Text>
          <Flex direction={"column"} gap={"8"} p={"4"}>
            {f.articleIds.map((id) => (
              <Article key={id} id={id} />
            ))}
          </Flex>
        </details>
      ))}
    </Flex>
  );
}
