import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Le Journal — Réflexions & Vision",
  description: "Le journal de Canevas Havane : réflexions sur le design de luxe, le SEO sémantique et les stratégies d'acquisition haut de gamme.",
  ...adressesDeLaPage("/blog"),
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
