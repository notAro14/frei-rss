import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  TextField,
  Tabs,
  Strong,
  IconButton,
  Theme,
  Separator,
  TextFieldInput,
  Avatar,
} from "@radix-ui/themes";
import { Drawer } from "vaul";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveUp, Rss, Signpost, Menu } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import ThisMonthArticles from "src/components/ThisMonthArticles";
import useGetFeeds from "src/hooks/useGetFeeds";
import { useSelector, useDispatch } from "src/store";
import { supabase } from "src/utils/supabaseClient";
import { registerFeed } from "src/domain/Feed/usecases/registerFeed/registerFeed";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import unreadFeedItemsSelector from "src/selectors/unreadFeedItems.selector";
import FeedItem from "src/components/FeedItem";

export default function HomePage() {
  useGetFeeds();
  return (
    <Container size={"2"} p={"4"}>
      <Header />
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
    </Container>
  );
}

const STEP = 100;
/* ---------- UnreadArticles ---------- */
function UnreadArticles() {
  const unreadFeedItemIds = useSelector(unreadFeedItemsSelector);

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
          count.current + STEP
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

  if (!unreadFeedItemIds) return <Text role="alert">Loading...</Text>;
  return (
    <Flex direction={"column"} gap={"8"}>
      <Text>
        You have <Strong>{unreadFeedItemIds.length}</Strong> unread article(s)
      </Text>
      {visible.map((id) => {
        return <FeedItem key={id} id={id} />;
      })}
      <div ref={ref} />
    </Flex>
  );
}

/* ---------- Header ---------- */
function Header() {
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

/* ---------- AddFeedForm ---------- */
const addFeedFormInSchema = z.object({
  feed: z
    .string()
    .min(1, { message: "Can not be empty" })
    .url("Must be a valid URL"),
});

type AddFeedFormIn = z.infer<typeof addFeedFormInSchema>;

function AddFeedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddFeedFormIn>({
    resolver: zodResolver(addFeedFormInSchema),
  });

  const { status, message } = useSelector((state) => state.registerFeed);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "success") {
      toast.success("Feed added successfully");
      reset();
    }
    if (status === "error") toast.error(message ?? "Unable to register feed");
  }, [message, status, reset]);

  const onSubmit: SubmitHandler<AddFeedFormIn> = (data) => {
    dispatch(registerFeed(data.feed));
  };
  return (
    <Card my={"8"}>
      <Flex direction={"column"} gap={"4"} asChild>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={"column"} gap={"2"}>
            <Text as="label" htmlFor="feed">
              Add feed URL
            </Text>
            <TextField.Input
              type="url"
              placeholder={"https://lorem-rss.herokuapp.com/feed"}
              size={"3"}
              {...register("feed")}
            />
            {errors.feed && (
              <Text size={"1"} color="crimson">
                {errors.feed.message}
              </Text>
            )}
          </Flex>
          <Button type="submit" disabled={status === "pending"}>
            Add
          </Button>
        </form>
      </Flex>
    </Card>
  );
}
