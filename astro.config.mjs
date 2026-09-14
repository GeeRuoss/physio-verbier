import { defineConfig } from "astro/config";

// La même sortie statique se déploie sur GitHub Pages et sur Infomaniak.
export default defineConfig({
  site: process.env.SITE_URL || "https://geeruoss.github.io",
  base: process.env.BASE_PATH || "/physio-verbier",
  trailingSlash: "always",
  output: "static",
  build: { format: "directory" },
});
