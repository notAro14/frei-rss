"use client";
import { toast } from "sonner";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Button, Text, TextFieldInput } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Rss } from "lucide-react";

import { useSelector, useDispatch } from "src/store";
import { registerFeed } from "src/lib/Feed/usecases/registerFeed";

const addFeedFormInSchema = z.object({
  feed: z
    .string()
    .min(1, { message: "Can not be empty" })
    .url("Must be a valid URL"),
});

type AddFeedFormIn = z.infer<typeof addFeedFormInSchema>;

export function AddFeedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddFeedFormIn>({
    resolver: zodResolver(addFeedFormInSchema),
  });
  const router = useRouter();

  const registerFeedPending = useSelector(
    (state) => state.registerFeed.status === "pending",
  );
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<AddFeedFormIn> = async (data) => {
    const promise = dispatch(registerFeed(data.feed)).unwrap();
    toast.promise(promise, {
      loading: "Fetching articles...",
      success: (data) => {
        reset();
        setTimeout(() => {
          router.push(`/inbox/feed/${data.feedId}`);
        }, 0);
        return `${data.articlesCount} articles synced`;
      },
      error(error) {
        reset();
        return error ?? "Failed to register feed";
      },
    });
  };
  return (
    <Flex py={"4"} direction={"column"} gap={"4"}>
      <Flex direction={"column"} gap={"4"} asChild>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={"column"} gap={"2"}>
            <Text as="label" htmlFor="feed">
              Add your favorite blog or news feed
            </Text>
            <TextFieldInput
              type="url"
              placeholder={"Example https://nature.com/nature.rss"}
              size={"3"}
              id="feed"
              {...register("feed")}
            />
            {errors.feed && (
              <Text size={"1"} color="red" role="alert">
                {errors.feed.message}
              </Text>
            )}
          </Flex>
          <Button type="submit" disabled={registerFeedPending}>
            <Rss size={"1em"} />
            Follow
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}
