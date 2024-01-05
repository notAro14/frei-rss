"use client";
import { Card, Flex, Heading, IconButton, Text, Link } from "@radix-ui/themes";
import { Copy, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "src/store";

const RECO: { rss: string; url: string; name: string }[] = [
  {
    url: "https://indiegamesplus.com/",
    rss: "https://indiegamesplus.com/feed/",
    name: "Indie Game Plus",
  },
  {
    url: "https://joshwcomeau.com",
    name: "Josh Comeau's blog",
    rss: "https://joshwcomeau.com/rss.xml",
  },
  {
    url: "https://kentcdodds.com/blog",
    name: "Kent C. Dodds Blog",
    rss: "https://kentcdodds.com/blog/rss.xml",
  },
];

export default function Page() {
  const firstFeedId = useSelector((state) => state.getFeeds.result?.[0]);
  const router = useRouter();
  const getFeedsPending = useSelector(
    (state) =>
      state.getFeeds.status === "pending" || state.getFeeds.status === "idle",
  );

  useEffect(() => {
    if (firstFeedId) router.push(`/inbox/feed/${firstFeedId}`);
  }, [firstFeedId, router]);

  async function copyToClipboard(rss: string) {
    try {
      await navigator.clipboard.writeText(rss);
      toast.success("Copied");
    } catch (e) {
      toast.error("Sadly your browser does not support clipboard");
    }
  }

  if (getFeedsPending) return null;

  return (
    <Flex gap={"3"} direction={"column"}>
      <Heading>How d&apos;ya ? Aro here 👋🏽</Heading>
      <Text as="p">Welcome and thanks for using my app 😎</Text>
      <Text>
        Don&apos;t have inspiration ? Don&apos;t worry, i got you. Here are some
        of my favorite blogs 🫡
      </Text>
      <Flex p={"0"} asChild direction={"column"} gap={"6"}>
        <ul className="list-none">
          {RECO.map(({ name, url, rss }) => {
            return (
              <li key={name}>
                <Card>
                  <Flex direction={"column"} gap={"4"}>
                    <Link
                      className="flex items-center gap-rx-2"
                      underline="hover"
                      target="_blank"
                      rel="noopener"
                      href={url}
                    >
                      {name} <ExternalLink size={"1em"} />
                    </Link>
                    <Flex align={"center"} gap={"2"} wrap={"wrap"}>
                      <IconButton
                        variant="soft"
                        onClick={() => copyToClipboard(rss)}
                      >
                        <Copy size={"1em"} />
                      </IconButton>
                      <Text>or copy</Text>
                      <Link
                        underline="hover"
                        target="_blank"
                        rel="noopener"
                        href={rss}
                      >
                        {rss}
                      </Link>
                    </Flex>
                  </Flex>
                </Card>
              </li>
            );
          })}
        </ul>
      </Flex>
    </Flex>
  );
}
