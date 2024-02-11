import { Heading } from "@radix-ui/themes";
import { Mail } from "lucide-react";

import { UnreadArticles } from "src/components/UnreadArticles";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <Heading as="h2" className="flex items-center gap-2">
          <Mail size={"1em"} /> Unread articles
        </Heading>
      </header>
      <UnreadArticles />
    </div>
  );
}
