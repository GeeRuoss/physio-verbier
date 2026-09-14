import { routes, href, type Lang } from "../data/site";
export function GET({ site }) {
  const urls = Object.entries(routes).flatMap(([lang, pages]) =>
    Object.keys(pages).map(
      (page) =>
        `<url><loc>${new URL(href(lang as Lang, page as any), site)}</loc></url>`,
    ),
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
