// Vérifie le résultat réellement publié : pages, ressources, ancres et garde-fous du formulaire.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import assert from "node:assert/strict";
const dist = resolve("dist");
const base = (process.env.BASE_PATH || "/physio-verbier").replace(/\/$/, "");
const htmlFiles = readdirSync(dist, { recursive: true }).filter((f) =>
  f.endsWith(".html"),
);
assert.equal(htmlFiles.length, 15, "14 pages bilingues et une page 404");
let links = 0;
for (const file of htmlFiles) {
  const html = readFileSync(join(dist, file), "utf8");
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${file}: un seul h1`,
  );
  assert.match(html, /<html lang="(?:fr|en)"/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /<link rel="canonical"/);
  assert.doesNotMatch(
    html,
    /<iframe|googletagmanager|google-analytics|formsubmit/i,
  );
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    const [path, hash] = url.split("#");
    let target;
    if (path) {
      assert.ok(
        path.startsWith(base + "/"),
        `${file}: préfixe invalide ${path}`,
      );
      target = join(dist, path.slice(base.length));
      if (existsSync(target) && statSync(target).isDirectory())
        target = join(target, "index.html");
    } else target = join(dist, file);
    assert.ok(existsSync(target), `${file}: ressource absente ${url}`);
    if (hash) {
      const page = readFileSync(target, "utf8");
      assert.ok(page.includes(`id="${hash}"`), `${file}: ancre absente ${url}`);
    }
    links++;
  }
  if (file.includes("contact")) {
    assert.match(html, /<form[^>]+method="dialog"/);
    assert.doesNotMatch(html, /<form[^>]+action=/);
    assert.match(html, /data-booking-form/);
    assert.match(html, /id="booking-message"/);
  }
}
const fr = readFileSync(join(dist, "tarifs/index.html"), "utf8");
for (const price of ["75", "150", "140", "225"]) assert.ok(fr.includes(price));
assert.ok(
  readFileSync(join(dist, "robots.txt"), "utf8").includes("Disallow: /"),
);
console.log(
  `OK : ${htmlFiles.length} pages, ${links} liens et ressources, FR/EN, formulaire sans envoi, prévisualisation noindex.`,
);
