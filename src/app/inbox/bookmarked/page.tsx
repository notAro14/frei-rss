import { Bookmark } from "lucide-react";
import { Heading } from "@radix-ui/themes";
import { Bookmarked } from "src/components/Bookmarked";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <Heading as="h2" className="flex items-center gap-2">
          <Bookmark size={"1em"} /> Bookmarked
        </Heading>
      </header>
      <Bookmarked />
    </div>
  );
}
