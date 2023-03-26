import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

function sanitize(html: string) {
  const jsDom = new JSDOM("");
  const purify = DOMPurify(jsDom.window);
  return purify.sanitize(html);
}

export async function POST(request: Request) {
  try {
    const { url } = (await request.json()) as { url: string };
    const res = await fetch(url);

    if (!res.ok) {
      return Response.json(
        { ok: false, error: "Request to external site failed" },
        { status: 500 },
      );
    }

    const contentType = res.headers.get("Content-Type");

    if (!contentType || !contentType.includes("text/html")) {
      return Response.json(
        {
          ok: false,
          error: "Failed to get reader view, can not fetch non-html response",
        },
        { status: 400 },
      );
    }

    const html = await res.text();
    const jsDom = new JSDOM(html, { url });
    const doc = jsDom.window.document;

    const reader = new Readability(doc);
    const article = reader.parse();

    const data = sanitize(article?.content ?? "");
    return Response.json({ ok: true, data });
  } catch (e) {
    console.error(e);
    return Response.json(
      { ok: false, error: "Failed to get reader view" },
      { status: 500 },
    );
  }
}
