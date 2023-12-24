"use client";
import { toast } from "sonner";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Flex, Button, Text, TextFieldInput } from "@radix-ui/themes";

import { useSelector, useDispatch } from "src/store";
import { registerFeed } from "src/lib/Feed/usecases/registerFeed";
import { useWithSound } from "src/hooks/useWithSound";

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
  const { playSound } = useWithSound("/sounds/woo-hoo.mp3");

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
        playSound();
        return `${data} articles synced`;
      },
      error(error) {
        reset();
        return error ?? "Failed to register feed";
      },
    });
  };
  return (
    <Card my={"8"}>
      <Flex direction={"column"} gap={"4"} asChild>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={"column"} gap={"2"}>
            <Text as="label" htmlFor="feed">
              Add your favorite blog
            </Text>
            <TextFieldInput
              type="url"
              placeholder={"https://www.nature.com/nature.rss"}
              size={"3"}
              {...register("feed")}
            />
            {errors.feed && (
              <Text size={"1"} color="crimson" role="alert">
                {errors.feed.message}
              </Text>
            )}
          </Flex>
          <Button type="submit" disabled={registerFeedPending}>
            Add
          </Button>
        </form>
      </Flex>
    </Card>
  );
}
