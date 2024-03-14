import { CalendarFold } from "lucide-react";
import { Heading } from "@radix-ui/themes";
import { ThisMonthArticles } from "src/components/views/ThisMonthArticles";

export default function Page() {
  return (
    <>
      <header>
        <Heading as="h2" className="flex items-center gap-2">
          <CalendarFold size={"1em"} /> This month articles
        </Heading>
      </header>
      <ThisMonthArticles />
    </>
  );
}
