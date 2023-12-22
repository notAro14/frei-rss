"use client";
import { Flex, Heading, Link, Text } from "@radix-ui/themes";
import { useSelector } from "src/store";
import { Article } from "src/components/Article";
import { ExternalLink } from "lucide-react";
import { redirect } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const feed = useSelector((state) => state.getFeeds.entities?.feeds[slug]);
  const getFeedsStatus = useSelector((state) => state.getFeeds.status);
  if (!feed && getFeedsStatus === "pending")
    return <Text role="alert">Loading...</Text>;
  if (!feed && getFeedsStatus === "fulfilled") redirect("/");
  if (!feed) redirect("/");
  return (
    <Flex mt={"8"} direction={"column"} gap={"8"}>
      <Flex direction="column" gap={"2"}>
        <Heading as="h2" dangerouslySetInnerHTML={{ __html: feed.name }} />
        <Text>
          Source:{" "}
          <Link href={feed.website} target="_blank" rel="noopener">
            {feed.website} <ExternalLink size={"1em"} />
          </Link>
        </Text>
      </Flex>
      {feed.feedItems.map((aId) => {
        return <Article key={aId} id={aId} />;
      })}
    </Flex>
  );
}
