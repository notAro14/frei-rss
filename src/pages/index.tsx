import { Box, Tabs } from "@radix-ui/themes";

import { AddFeedForm } from "src/components/AddFeedForm";
import { ThisMonthArticles } from "src/components/ThisMonthArticles";
import { UnreadArticles } from "src/components/UnreadArticles";
import { Layout } from "src/components/Layout";

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
