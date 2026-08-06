import type { MetadataRoute } from "next";
import { articles } from "./blog/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canevas-havane.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/expertise",
    "/tarifs",
    "/realisations",
    "/realisations/keo",
    "/realisations/edificia",
    "/blog",
    ...articles.map((article) => `/blog/${article.slug}`),
    "/a-propos",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
