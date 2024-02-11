import { Feed } from "src/components/Feed";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  return <Feed id={slug} />;
}
