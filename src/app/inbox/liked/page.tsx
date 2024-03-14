import { Bookmark } from "lucide-react";
import { Heading } from "@radix-ui/themes";
import { Liked } from "src/components/views/Liked";

export default function Page() {
  return (
    <>
      <header>
        <Heading as="h2" className="flex items-center gap-2">
          <Bookmark size={"1em"} /> Favorites
        </Heading>
      </header>
      <Liked />
    </>
  );
}
