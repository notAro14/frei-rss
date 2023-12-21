import { parseFeed } from "src/lib/Feed/utils/parse";

export async function POST(request: Request) {
  try {
    const { url } = (await request.json()) as { url: string };
    const feed = await parseFeed(url);
    return Response.json({ ok: true, data: feed });
  } catch (e) {
    return Response.json(
      { ok: false, error: "Failed to parse feed" },
      { status: 500 },
    );
  }
}
