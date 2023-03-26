"use client";
import { useEffect } from "react";
import { Text, Box } from "@radix-ui/themes";
import { useDispatch, useSelector } from "src/store";
import { Loader } from "src/components/Loader";
import { getReaderView } from "src/lib/Feed/usecases/getReaderView";
import { readerViewSelector } from "./ReaderView.selector";

import styles from "./ReaderView.module.scss";

export function ReaderView(props: { feedItemId: string }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReaderView(props.feedItemId));
  }, [props.feedItemId, dispatch]);

  const { status, data } = useSelector((state) =>
    readerViewSelector(state, props.feedItemId),
  );
  if (status === "pending") return <Loader />;

  if (status === "fulfilled")
    return (
      <Box
        asChild
        className={styles.preview + " prose max-w-none dark:prose-invert"}
      >
        {data.fullContent ? (
          <article dangerouslySetInnerHTML={{ __html: data.fullContent }} />
        ) : (
          <Box className="not-prose">
            <Text color="red" role="alert">
              Full content unavailable
            </Text>
          </Box>
        )}
      </Box>
    );
  return (
    <Box className="not-prose">
      <Text color="red" role="alert">
        Full content unavailable
      </Text>
    </Box>
  );
}

export function Summary(props: { content: string }) {
  return (
    <Box
      asChild
      className={styles.preview + " prose max-w-none dark:prose-invert"}
    >
      {props.content ? (
        <article dangerouslySetInnerHTML={{ __html: props.content }} />
      ) : (
        <Box className="not-prose">
          <Text color="red" role="alert">
            Excerpt unavailable
          </Text>
        </Box>
      )}
    </Box>
  );
}
