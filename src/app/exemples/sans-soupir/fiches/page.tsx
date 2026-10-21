import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Bibliotheque from "../_composants/Bibliotheque";

// « Sur le site, toutes les fiches, gratuites, à imprimer. Parce que les gens tapent
// exactement ça » (suggestions Google « comment faire un appel vidéo … », relevées le
// 15/10/2026, voir la vidéo marque-depannage-info).
export const metadata: Metadata = {
  title: "Les fiches gratuites · Sans Soupir — site de démonstration",
  description: "Toutes les fiches de Sans Soupir, gratuites, en gros caractères, à imprimer : appeler en vidéo, écrire plus gros, reconnaître un faux message…",
  ...adressesDeLaPage("/exemples/sans-soupir/fiches"),
};

export default function Fiches() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-20 sm:pb-28 space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Gratuites · à imprimer</p>
        <h1 className="text-[44px] sm:text-7xl font-bold leading-[1.0] tracking-[-0.035em]">Toutes les fiches.</h1>
        <p className="max-w-2xl text-xl leading-relaxed text-[var(--doux)]">Les mêmes que sur le frigo. En gros caractères, trois étapes, sans compte et sans adresse e-mail.</p>
      </div>
      <Bibliotheque />
    </div>
  );
}
