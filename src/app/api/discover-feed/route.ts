import { JSDOM } from "jsdom";
import urlModule from "url";

type FoundFeed = {
  url: string;
  title: string;
  favicon: string;
};

const XML_FEED_TYPES = [
  "application/rss+xml",
  "application/atom+xml",
  "application/rdf+xml",
] as const;
const XML_FEED_SELECTORS = XML_FEED_TYPES.map(
  (type) => `link[type="${type}"]`,
).join(", ");

export async function POST(request: Request) {
  const { url: inputUrl } = (await request.json()) as { url: string };
  try {
    const response = await fetch(inputUrl);
    const contentType = response.headers.get("content-type") || "";
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    if (
      [...XML_FEED_TYPES, "text/xml"].some((type) => contentType.includes(type))
    ) {
      const feedTitle = document.title || inputUrl;
      return Response.json({
        ok: true,
        data: [
          {
            url: inputUrl,
            title: feedTitle,
            favicon: `https://www.google.com/s2/favicons?domain=${new URL(inputUrl).hostname}&sz=128`,
          },
        ],
      });
    }
    const uniqueFeedUrls: Set<string> = new Set();
    const foundFeeds: FoundFeed[] = [];

    const feedLinks = document.querySelectorAll(XML_FEED_SELECTORS);
    feedLinks.forEach((feedLink) => {
      const feedUrl = feedLink.getAttribute("href");
      const feedTitle = feedLink.getAttribute("title") || document.title;
      if (feedUrl) {
        const fullFeedUrl = urlModule.resolve(inputUrl, feedUrl);
        if (!uniqueFeedUrls.has(fullFeedUrl)) {
          uniqueFeedUrls.add(fullFeedUrl);
          foundFeeds.push({
            url: fullFeedUrl,
            title: feedTitle,
            favicon: `https://www.google.com/s2/favicons?domain=${new URL(inputUrl).hostname}&sz=128`,
          });
        }
      }
    });

    foundFeeds.sort((a, b) => a.title.localeCompare(b.title));

    if (foundFeeds.length > 0)
      return Response.json({ ok: true, data: foundFeeds });
    else return Response.json({ ok: false, data: null });
  } catch (error) {
    console.error(error);
    const errorMsg =
      error instanceof Error ? error.message : "Failed to search feeds";
    return Response.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}
