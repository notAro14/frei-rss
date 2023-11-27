import { Button, Container, Flex, Heading } from "@radix-ui/themes";
import ThisMonthArticles from "src/components/ThisMonthArticles";
import useGetFeeds from "src/hooks/useGetFeeds";
import { supabase } from "src/utils/supabaseClient";

export default function HomePage() {
  useGetFeeds();
  return (
    <Container size={"2"} p={"4"}>
      <Flex justify={"between"} mt={"4"}>
        <Heading>FreiRSS</Heading>
        <Button
          color="red"
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          Sign out
        </Button>
      </Flex>
      <ThisMonthArticles />
    </Container>
  );
}
