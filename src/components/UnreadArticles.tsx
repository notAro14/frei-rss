"use client";
import { useState, useRef, useEffect } from "react";
import { Flex, Heading } from "@radix-ui/themes";
import { Mail } from "lucide-react";

import { useSelector } from "src/store";
import { getUnreadArticleIds } from "src/selectors/getUnreadArticleIds.selector";
import { Article } from "src/components/Article";
import { Loader } from "src/components/Loader";

const STEP = 100;

export function UnreadArticles() {
  const unreadFeedItemIds = useSelector(getUnreadArticleIds);

  const ref = useRef(null);
  const count = useRef(0);
  const [visible, setVisible] = useState<string[]>([]);

  useEffect(() => {
    if (!ref.current) return;
    if (!unreadFeedItemIds) return;

    const observer = new IntersectionObserver(function (entries, instance) {
      if (entries[0].isIntersecting) {
        const next = unreadFeedItemIds.slice(
          count.current,
          count.current + STEP,
        );
        if (!next.length) {
          instance.disconnect();
          return;
        }
        setVisible((prev) => [...prev, ...next]);
        setTimeout(() => {
          count.current += STEP;
        }, 0);
      }
    });
    observer.observe(ref.current);

    return function () {
      observer.disconnect();
    };
  }, [unreadFeedItemIds]);

  if (!unreadFeedItemIds) return <Loader />;
  return (
    <Flex direction={"column"} gap={"8"}>
      <Heading as="h2" mb={"-6"} className="flex items-center gap-2">
        <Mail size={"1em"} /> Unread articles
      </Heading>
      {visible.map((id) => {
        return <Article key={id} id={id} />;
      })}
      <div ref={ref} />
    </Flex>
  );
}
