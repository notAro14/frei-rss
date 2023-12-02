import { Drawer } from "vaul";
import {
  Flex,
  Heading,
  IconButton,
  Box,
  Avatar,
  Button,
  Text,
  Theme,
} from "@radix-ui/themes";
import { Rss, Menu } from "lucide-react";
import { useSelector } from "src/store";
import { supabase } from "src/utils/supabaseClient";

export function Header() {
  const user = useSelector((state) => state.auth.user);
  if (!user) return null;
  return (
    <Drawer.Root>
      <Flex justify={"between"} mt={"4"}>
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

        <Drawer.Trigger asChild>
          <IconButton variant="ghost">
            <Menu />
          </IconButton>
        </Drawer.Trigger>
      </Flex>
      <Drawer.Portal>
        <Theme>
          <Drawer.Overlay
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "var(--gray-a10)",
            }}
          />
          <Drawer.Content asChild>
            <Flex
              direction={"column"}
              position={"fixed"}
              justify={"between"}
              bottom={"0"}
              left={"0"}
              right={"0"}
              p={"4"}
              gap={"6"}
              style={{
                backgroundColor: "var(--color-page-background)",
              }}
            >
              <Box
                width={"8"}
                height={"1"}
                mx={"auto"}
                style={{
                  backgroundColor: "var(--gray-a10)",
                  borderRadius: 9999,
                }}
              />
              <Flex direction={"column"} gap={"8"}>
                <Flex direction={"column"} gap={"4"} align={"center"}>
                  <Avatar
                    fallback={`${user.email.charAt(0)}${user.email.charAt(1)}`}
                  />
                  <Text size={"4"}>{user.email}</Text>
                </Flex>
                <Button
                  size={"3"}
                  color="crimson"
                  onClick={async () => {
                    await supabase.auth.signOut();
                  }}
                >
                  Sign out
                </Button>
              </Flex>
            </Flex>
          </Drawer.Content>
        </Theme>
      </Drawer.Portal>
    </Drawer.Root>
  );
}