import { base } from "../data/site";
export function GET() {
  const preview = import.meta.env.PUBLIC_PREVIEW !== "false";
  return new Response(
    preview
      ? "User-agent: *\nDisallow: /\n"
      : `User-agent: *\nAllow: /\nSitemap: ${process.env.SITE_URL || "https://physio-verbier.com"}${base}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain" } },
  );
}
