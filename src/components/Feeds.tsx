import { Button, Flex, Text, Badge } from "@radix-ui/themes";
import { RefreshCcw } from "lucide-react";
import { useSelector } from "src/store";
import { Article } from "src/components/Article";
import { getAllFeeds } from "src/selectors/getAllFeeds.selector";
import styles from "./Feeds.module.css";

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
              <Badge>{f.articleIds.length}</Badge>
            </summary>
          </Text>
          <Button variant="soft" mt={"5"} mb={"4"}>
            <RefreshCcw size={"1em"} />
            Sync
          </Button>
          <Flex direction={"column"} gap={"8"}>
            {f.articleIds.map((id) => (
              <Article key={id} id={id} />
            ))}
          </Flex>
        </details>
      ))}
    </Flex>
  );
}
