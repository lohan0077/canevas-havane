import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact — Démarrons votre Projet",
  description: "Contactez Canevas Havane pour votre projet web, SEO ou acquisition. Réponse sous 24h ouvrées.",
  ...adressesDeLaPage("/contact"),
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
