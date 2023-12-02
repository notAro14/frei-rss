import { type ReactNode } from "react";
import { Box, Container, Tabs } from "@radix-ui/themes";

import useGetFeeds from "src/hooks/useGetFeeds";

import { AddFeedForm } from "src/components/AddFeedForm";
import { Header } from "src/components/Header";
import ThisMonthArticles from "src/components/ThisMonthArticles";
import { UnreadArticles } from "src/components/UnreadArticles";

function Layout(props: { children: ReactNode }) {
  useGetFeeds();
  const { children } = props;
  return (
    <Container size={"2"} p={"4"}>
      <Header />
      {children}
    </Container>
  );
}

export default function HomePage() {
  return (
    <Layout>
      <AddFeedForm />
      <Tabs.Root defaultValue="this-month">
        <Tabs.List>
          <Tabs.Trigger value="this-month">This Month</Tabs.Trigger>
          <Tabs.Trigger value="unread">Unread</Tabs.Trigger>
        </Tabs.List>

        <Box py={"4"}>
          <Tabs.Content value="this-month">
            <ThisMonthArticles />
          </Tabs.Content>

          <Tabs.Content value="unread">
            <UnreadArticles />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Layout>
  );
}
