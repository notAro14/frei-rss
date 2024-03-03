"use client";
import { Heading, Separator, Text, Link as RxLink } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

import { useSelector } from "src/store";
import { DiscoverFeedForm } from "src/components/DiscoverFeedForm";
import { homeVMSelector } from "./Home.VM.selector";

export function Home() {
  const { getFeedsStatus, isEmpty } = useSelector(homeVMSelector);

  return (
    <main className="flex flex-col gap-8">
      <div className="relative mx-auto aspect-video h-auto w-3/5">
        <Image
          priority
          fill
          src={"/images/home.svg"}
          alt="The moon shining in the night near a campfire"
        />
      </div>
      <div className="flex flex-col gap-3">
        <header className="flex flex-col gap-2">
          <Heading align={"center"} size={"8"}>
            Welcome 👋🏽
          </Heading>
          {getFeedsStatus === "fulfilled" && isEmpty && (
            <Text align={"center"}>
              Start exploring the web and add a feed to get started.
            </Text>
          )}
          {getFeedsStatus === "fulfilled" && !isEmpty && (
            <>
              <Text align={"center"}>
                Explore{" "}
                <RxLink asChild>
                  <Link href={"/inbox"}>your feeds</Link>
                </RxLink>{" "}
                and stay up-to-date with the latest articles.
              </Text>
              <div className="mx-auto flex items-center gap-2">
                <Separator />
                <Text size={"1"} color="gray">
                  or
                </Text>
                <Separator />
              </div>
              <Text align={"center"}>
                Add your favorite sources and never miss a story.
              </Text>
            </>
          )}
        </header>
        {getFeedsStatus === "fulfilled" && <DiscoverFeedForm />}
      </div>
    </main>
  );
}
