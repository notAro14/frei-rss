"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  IconButton,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Search, XCircle } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { FoundFeed } from "src/components/FoundFeed";
import { Loader } from "src/components/Loader";

const schema = z.object({
  url: z
    .string()
    .min(1, { message: "Can not be empty" })
    .url("Must be a valid URL"),
});
type FormDataSchema = z.infer<typeof schema>;
type Props = {
  label?: string;
};
interface EventualFeed {
  url: string;
  title: string;
  favicon: string;
}
type State =
  | {
      status: "idle";
      data: null;
    }
  | {
      status: "pending";
      data: null;
    }
  | { status: "fulfilled"; data: EventualFeed[] }
  | { status: "rejected"; data: null };

export function DiscoverFeedForm({ label }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataSchema>({ resolver: zodResolver(schema) });
  const [eventualFeed, setEventualFeed] = useState<State>({
    status: "idle",
    data: null,
  });
  const submit: SubmitHandler<FormDataSchema> = async ({ url }) => {
    setEventualFeed({ status: "pending", data: null });
    const res = await fetch("/api/discover-feed", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    const { ok, data } = (await res.json()) as
      | {
          ok: true;
          data: EventualFeed[];
        }
      | { ok: false; data: null };
    if (ok) setEventualFeed({ status: "fulfilled", data });
    else setEventualFeed({ status: "rejected", data: null });
  };
  return (
    <Flex direction={"column"} gap={"6"}>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit(submit)}>
        <Flex direction={"column"} gap={"2"}>
          {label && (
            <Text htmlFor="url" as="label">
              {label}
            </Text>
          )}
          <TextField.Root>
            <TextField.Slot>
              <IconButton
                onClick={() => reset()}
                type="button"
                variant="ghost"
                radius="full"
              >
                <XCircle size={"1em"} />
              </IconButton>
            </TextField.Slot>
            <TextField.Input
              placeholder="Eg. https://nature.com"
              type="url"
              size={"3"}
              id="url"
              list="feeds"
              {...register("url")}
            />
            <datalist id="feeds">
              <option value={"https://www.nature.com"} />
              <option value={"https://www.geeek.org"} />
              <option value={"https://www.frenchweb.fr"} />
            </datalist>
          </TextField.Root>
          {errors.url && (
            <Text size={"1"} color="red" role="alert">
              {errors.url.message}
            </Text>
          )}
        </Flex>
        <Button type="submit" disabled={eventualFeed.status === "pending"}>
          <Search size={"1em"} />
          Search
        </Button>
      </form>

      {eventualFeed.status === "pending" && <Loader />}
      {eventualFeed.status === "fulfilled" && (
        <>
          <Separator mx={"auto"} size={"3"} />
          <Flex direction={"column"} gap={"4"}>
            <Text>The following feeds have been found</Text>
            <Flex direction={"column"} gap={"8"}>
              {eventualFeed.data.map(({ title, url, favicon }) => {
                return (
                  <FoundFeed
                    key={url}
                    title={title}
                    url={url}
                    favicon={favicon}
                  />
                );
              })}
            </Flex>
          </Flex>
        </>
      )}
      {eventualFeed.status === "rejected" && (
        <Text color="red" role="alert">
          Oh no, this site has no feed url
        </Text>
      )}
    </Flex>
  );
}
