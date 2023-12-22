"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Flex, Button, Text, TextFieldInput } from "@radix-ui/themes";

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

  const { status, message } = useSelector((state) => state.registerFeed);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<AddFeedFormIn> = async (data) => {
    try {
      await dispatch(registerFeed(data.feed)).unwrap();
      toast.success("Feed registered and synced");
    } catch (e) {
      setTimeout(() => {
        toast.error(message ?? "Unable to register feed");
      }, 0);
    } finally {
      reset();
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
            <TextFieldInput
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
