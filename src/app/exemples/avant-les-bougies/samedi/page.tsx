import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Samedi from "../_composants/Samedi";
import { Pastille } from "../_composants/Blocs";
import { SAMEDI } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le samedi — Avant les Bougies — site de démonstration",
  description: "Commander un gâteau pour samedi auprès d'une pâtisserie imaginaire : douze gâteaux, la vraie capacité du labo, et les allergènes avant de commander.",
  ...adressesDeLaPage("/exemples/avant-les-bougies/samedi"),
};

export default function LeSamedi() {
  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-10 sm:px-6 sm:pt-16 md:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-5">
        <Pastille>Le samedi</Pastille>
        <h1 className="text-[56px] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] sm:text-[88px]">
          Douze gâteaux, <span className="text-[var(--accent-texte)]">{SAMEDI.date}.</span>
        </h1>
        <p className="text-lg leading-relaxed">
          C&apos;est ce que le labo sort, bien, un samedi. Le site en vend douze, pas un de plus.
          Quand c&apos;est complet, le samedi suivant est ouvert.
        </p>
        <ul className="space-y-2 text-lg">
          <li>· Commande jusqu&apos;au jeudi soir.</li>
          <li>· Retrait en boutique, à l&apos;heure choisie.</li>
          <li>· Paiement au retrait : rien n&apos;est payé en ligne.</li>
        </ul>
      </div>
      <Samedi complet />
    </main>
  );
}
