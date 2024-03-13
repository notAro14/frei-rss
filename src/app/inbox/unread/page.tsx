import { Heading } from "@radix-ui/themes";
import { Mail } from "lucide-react";

import { UnreadArticles } from "src/components/views/Unread";

export default function Page() {
  return (
    <>
      <header>
        <Heading as="h2" className="flex items-center gap-2">
          <Mail size={"1em"} /> Unread articles
        </Heading>
      </header>
      <UnreadArticles />
    </>
  );
}
