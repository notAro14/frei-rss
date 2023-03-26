import { Heading } from "@radix-ui/themes";
import { Rocket } from "lucide-react";
import Image from "next/image";
import { DiscoverFeedForm } from "src/components/DiscoverFeedForm";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <Heading size={"6"} className="flex gap-2" mb={"4"}>
        <Rocket size={"1em"} /> Discover even more with new feeds
      </Heading>
      <div className="relative mx-auto aspect-video h-auto w-3/5">
        <Image
          priority
          fill
          src={"/images/discover.svg"}
          alt="An astronaut with a flag besides the moon"
        />
      </div>
      <DiscoverFeedForm />
    </div>
  );
}
