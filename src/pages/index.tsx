import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Link as RxLink,
  Separator,
  Text,
  TextField,
  Tabs,
  Strong,
} from "@radix-ui/themes";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveUp, Rss, Signpost } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import ThisMonthArticles from "src/components/ThisMonthArticles";
import useGetFeeds from "src/hooks/useGetFeeds";
import { useSelector, useDispatch } from "src/store";
import { supabase } from "src/utils/supabaseClient";
import { registerFeed } from "src/domain/Feed/usecases/registerFeed/registerFeed";
import toast from "react-hot-toast";
import { useEffect } from "react";
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
      <Separator size={"3"} mx={"auto"} my={"8"} />
      <Footer />
    </Container>
  );
}

/* ---------- UnreadArticles ---------- */
function UnreadArticles() {
  const unreadFeedItemIds = useSelector(unreadFeedItemsSelector);
  if (!unreadFeedItemIds) return null;

  return (
    <Flex direction={"column"} gap={"8"}>
      <Text>
        You have <Strong>{unreadFeedItemIds.length}</Strong> unread article(s)
      </Text>
      {unreadFeedItemIds.map((feedItemId) => {
        return <FeedItem key={feedItemId} id={feedItemId} />;
      })}
    </Flex>
  );
}

/* ---------- Header ---------- */
function Header() {
  return (
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
        color="crimson"
        variant="outline"
        onClick={async () => {
          await supabase.auth.signOut();
        }}
      >
        Sign out
      </Button>
    </Flex>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
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
