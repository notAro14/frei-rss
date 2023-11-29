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
} from "@radix-ui/themes";
import { MoveUp, Rss, Signpost } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import ThisMonthArticles from "src/components/ThisMonthArticles";
import useGetFeeds from "src/hooks/useGetFeeds";
import { useSelector, useDispatch } from "src/store";
import { supabase } from "src/utils/supabaseClient";
import { registerFeed } from "src/domain/Feed/usecases/registerFeed/registerFeed";

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
          color="crimson"
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          Sign out
        </Button>
      </Flex>
      <AddFeedForm />
      <Heading as="h2" mb={"4"}>
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

interface AddFeedFormInputs {
  feed: string;
}

function AddFeedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddFeedFormInputs>();

  const { status } = useSelector((state) => state.registerFeed);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<AddFeedFormInputs> = async (data) => {
    try {
      await dispatch(registerFeed(data.feed)).unwrap();
      reset();
      alert("Feed added successfully");
    } catch (e) {
      alert("Unable to register feed");
    }
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
              {...register("feed", { required: "Fedd URL is required" })}
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
