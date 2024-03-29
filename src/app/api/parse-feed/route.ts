import { parseFeed } from "src/lib/Feed/utils/parse";

export async function POST(request: Request) {
  try {
    const { url } = (await request.json()) as { url: string };
    const feed = await parseFeed(url);
    return Response.json({ ok: true, data: feed });
  } catch (e) {
    console.error(e);
    return Response.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Failed to parse feed",
      },
      { status: 500 },
    );
  }
}
