"use client";

import { Drawer } from "vaul";
import {
  Flex,
  IconButton,
  Avatar,
  Button,
  Text,
  Strong,
} from "@radix-ui/themes";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "src/store";
import { signOut } from "src/lib/Auth/usecases/signOut";
import { useDrawerPortalContainerRef } from "src/components/DrawerPortalContainerProvider";

export function ProfileMenu() {
  const container = useDrawerPortalContainerRef();
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const avatarName = user?.fullName ?? user?.email ?? "Unknown";
  const dispatch = useDispatch();
  if (!user) return null;
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <IconButton variant="soft" radius="full">
          <Avatar
            src={user.avatarUrl}
            radius="full"
            fallback={`${avatarName.charAt(0)}`}
          />
        </IconButton>
      </Drawer.Trigger>

      <Drawer.Portal container={container}>
        <Drawer.Overlay
          className="fixed inset-0 z-40"
          style={{
            backgroundColor: "var(--color-overlay)",
          }}
        />
        <Drawer.Content asChild>
          <Flex
            direction={"column"}
            position={"fixed"}
            bottom={"0"}
            left={"0"}
            right={"0"}
            p={"4"}
            pt={"6"}
            gap={"6"}
            className="z-50 h-5/6"
            style={{
              backgroundColor: "var(--color-page-background)",
            }}
          >
            <Flex direction={"column"} gap={"8"} align={"center"}>
              <Flex direction={"column"} gap={"3"} align={"center"}>
                <Avatar
                  src={user.avatarUrl}
                  radius="full"
                  fallback={`${avatarName.charAt(0)}`}
                />
                <Strong>{avatarName}</Strong>
                {user.email && <Text>{user.email}</Text>}
              </Flex>
              <Button
                size={"3"}
                color="red"
                onClick={() => dispatch(signOut())}
                className="w-full"
              >
                <LogOut size={"1em"} />
                Sign out
              </Button>
            </Flex>
          </Flex>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
