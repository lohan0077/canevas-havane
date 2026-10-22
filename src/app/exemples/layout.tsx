import type { Metadata } from "next";
import "./_kit/mouvement.css";

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
  return (
    <>
      {/* Sans JavaScript, rien ne déclencherait les apparitions : tout est montré d'emblée. */}
      <noscript>
        <style>{".kit-apparait,.kit-mot{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}"}</style>
      </noscript>
      {children}
    </>
  );
}
