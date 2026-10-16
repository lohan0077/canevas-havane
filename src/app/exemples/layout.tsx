import type { Metadata } from "next";

// Les sites de démonstration présentent des entreprises imaginaires : aucun ne doit
// apparaître dans Google, où il passerait pour un vrai pisciniste. La règle vaut pour
// tout le segment. Le layout racine déclare `robots` : Next remplace la clé en entier
// au lieu de la fusionner, d'où `googleBot` répété ici.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function ExemplesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
