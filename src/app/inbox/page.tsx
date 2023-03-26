import { Heading } from "@radix-ui/themes";
import { Flag } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <Heading size={"6"} className="flex gap-2">
        <Flag size={"1em"} />
        Choose a feed to read
      </Heading>
      <div className="relative mx-auto aspect-video h-auto w-3/5">
        <Image
          priority
          fill
          src={"/images/choose-feed.svg"}
          alt="A man standing and browsing online on a virtual wall"
        />
      </div>
    </div>
  );
}
