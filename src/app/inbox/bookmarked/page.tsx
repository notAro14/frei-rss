import { Bookmark } from "lucide-react";
import { Heading } from "@radix-ui/themes";
import { Bookmarked } from "src/components/Bookmarked";

export default function Page() {
  return (
    <>
      <header>
        <Heading as="h2" className="flex items-center gap-2">
          <Bookmark size={"1em"} /> Read later
        </Heading>
      </header>
      <Bookmarked />
    </>
  );
}
