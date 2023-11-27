import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link as RxLink,
  Separator,
} from "@radix-ui/themes";
import { MoveUp, Rss, Signpost } from "lucide-react";
import Link from "next/link";
import ThisMonthArticles from "src/components/ThisMonthArticles";
import useGetFeeds from "src/hooks/useGetFeeds";
import { supabase } from "src/utils/supabaseClient";

export default function HomePage() {
  useGetFeeds();
  return (
    <Container size={"2"} p={"4"}>
      <Flex justify={"between"} mt={"4"}>
        <Flex gap={"4"} align={"baseline"}>
          <Heading
            as="h1"
            id="logo"
            size={{ initial: "6", xs: "8" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
            }}
          >
            <Rss size={"1em"} /> FreiRSS
          </Heading>
          <Separator orientation="vertical" />
          <RxLink asChild>
            <Link href={"#navigation"}>Menu</Link>
          </RxLink>
        </Flex>

        <Button
          color="ruby"
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          Sign out
        </Button>
      </Flex>
      <Heading as="h2" mt={"8"} mb={"4"}>
        This Month articles
      </Heading>
      <ThisMonthArticles />
      <Separator size={"3"} mx={"auto"} my={"8"} />
      <Box asChild>
        <footer>
          <Heading
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
            }}
            as="h2"
            id="navigation"
          >
            <Signpost size={"1em"} /> Menu
          </Heading>
          <Flex direction={"column"} mt={"4"} asChild gap={"2"}>
            <nav>
              <RxLink asChild>
                <Link href={"#"}>All feeds</Link>
              </RxLink>
              <RxLink asChild>
                <Link href={"/"}>This Month articles</Link>
              </RxLink>
              <RxLink asChild>
                <Link href={"#"}>Unread articles</Link>
              </RxLink>
              <Separator size={"4"} my={"4"} />
              <RxLink
                underline="always"
                style={{ alignSelf: "flex-end" }}
                asChild
              >
                <Link href={"#logo"}>
                  <MoveUp size={"1em"} />
                  Top
                </Link>
              </RxLink>
            </nav>
          </Flex>
        </footer>
      </Box>
    </Container>
  );
}
