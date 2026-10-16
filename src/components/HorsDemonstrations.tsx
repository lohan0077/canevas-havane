"use client";

import { usePathname } from "next/navigation";

/**
 * Masque ce qu'il enveloppe sur les sites de démonstration (`/exemples/<site>`).
 *
 * Un site de démonstration montre le site d'un client imaginaire, filmé dans les
 * vidéos TikTok : l'en-tête, le pied de page et le grain de Canevas Havane n'ont
 * rien à y faire. La page d'index `/exemples`, elle, reste une page de Canevas
 * Havane et garde tout.
 */
export default function HorsDemonstrations({ children }: { children: React.ReactNode }) {
  const chemin = usePathname();
  return chemin.startsWith("/exemples/") ? null : children;
}
