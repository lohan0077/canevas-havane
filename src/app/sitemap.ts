import type { MetadataRoute } from "next";
import { articles } from "./blog/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canevas-havane.com";

/**
 * Date de dernière révision de fond des pages fixes — **à mettre à jour à la main**
 * quand le contenu d'une page change réellement.
 *
 * Elle était calculée par `new Date()`, ce qui faisait dire au sitemap que les treize
 * pages venaient d'être modifiées à chaque lecture. Un `lastmod` qui ment finit par
 * être ignoré par les moteurs, et on perd le seul signal qui sert vraiment : celui
 * qui dit « cette page-là a bougé ».
 */
const derniereRevision = "2026-08-10";

/** Les articles portent leur propre date de publication : on l'utilise. */
const dateArticle = (slug: string) =>
  articles.find((article) => article.slug === slug)?.isoDate ?? derniereRevision;

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
    lastModified: route.startsWith("/blog/")
      ? dateArticle(route.slice("/blog/".length))
      : derniereRevision,
    changeFrequency: route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
