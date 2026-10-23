"use client";

import { useState } from "react";
import ChansonInterdite from "./ChansonInterdite";
import PhraseLundi from "./PhraseLundi";

type Onglet = "entreprise" | "mariage";

/**
 * Une seule question, selon ce que vous fêtez. Une entreprise : « Lundi, vos équipes
 * diront quoi ? », et la soirée se construit à l'envers. Un mariage : « Quelle chanson
 * est interdite à votre mariage ? », et le site répond « Noté ». Les deux panneaux restent
 * dans la page (le tournage les vise par leurs ancres) ; un seul se voit à la fois.
 */
export default function Question() {
  const [onglet, setOnglet] = useState<Onglet>("entreprise");
  const bouton = (o: Onglet, libelle: string) => (
    <button
      type="button"
      role="tab"
      data-onglet={o}
      aria-selected={onglet === o}
      aria-controls={`panneau-${o}`}
      onClick={() => setOnglet(o)}
      className={`min-h-12 flex-1 rounded-full px-4 font-[family-name:var(--titres)] text-[16px] font-bold lowercase transition-colors ${
        onglet === o ? "bg-[#2A190F] text-[#FFF4E6]" : "text-[#2A190F] hover:bg-[#2A190F]/10"
      }`}
    >
      {libelle}
    </button>
  );

  return (
    <div className="space-y-6">
      <div role="tablist" aria-label="Vous fêtez quoi ?" className="flex gap-1 rounded-full bg-[#FFF4E6] p-1.5 shadow-[0_18px_40px_-28px_rgba(42,25,15,.7)]">
        {bouton("entreprise", "une entreprise")}
        {bouton("mariage", "un mariage")}
      </div>

      <div id="panneau-entreprise" role="tabpanel" hidden={onglet !== "entreprise"} className="space-y-5">
        <h2 id="question-titre" className="scroll-mt-24 font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold lowercase leading-[0.92] tracking-[-0.05em] text-[#2A190F]">
          lundi, vos équipes <span className="text-[#8F2A14]">diront quoi&nbsp;?</span>
        </h2>
        <PhraseLundi />
      </div>

      <div id="interdite" role="tabpanel" hidden={onglet !== "mariage"} className="space-y-5">
        <h2 id="interdite-titre" className="scroll-mt-24 font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold lowercase leading-[0.92] tracking-[-0.05em] text-[#2A190F]">
          quelle chanson est <span className="text-[#8F2A14]">interdite</span> à votre mariage&nbsp;?
        </h2>
        <ChansonInterdite />
      </div>
    </div>
  );
}
