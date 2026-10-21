import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import Gravure from "../_composants/Gravure";

export const metadata: Metadata = {
  title: "Graver mon outil · Reviens. — site de démonstration",
  description: "Site de démonstration d'une marque d'outillage imaginaire : choisis l'outil, tape ton prénom, et vois la gravure en direct.",
  ...adressesDeLaPage("/exemples/reviens/graver"),
};

const ETAPES = [
  ["Tu commandes", "L'outil, sa couleur, ton prénom tel que tu l'as vu à l'écran."],
  ["On grave", "Au laser, sur le côté du corps, en lettres de 12 mm. Le lendemain ouvré."],
  ["Tu le reçois", "Sous trois à cinq jours ouvrés, ou à l'atelier si tu passes le chercher."],
];

export default function Graver() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 pb-16 pt-6 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-3">
          <nav aria-label="Fil d'Ariane" className="text-sm">
            <Link href={DOSSIER} className="underline underline-offset-4">Accueil</Link> / Graver mon outil
          </nav>
          <h1 className="font-[family-name:var(--titres)] text-[44px] font-extrabold leading-[1] tracking-tight sm:text-6xl">
            À <span className="italic text-[var(--accent-texte)]">ton prénom.</span>
          </h1>
          <p className="text-lg text-[var(--doux)]">Choisis l&apos;outil, tape ton prénom : tu vois la gravure en direct.</p>
        </div>
        <div id="atelier" className="scroll-mt-20">
          <Gravure />
        </div>
      </section>

      <section className="bg-[var(--sombre)] px-5 py-16 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <h2 className="font-[family-name:var(--titres)] text-4xl font-extrabold tracking-tight">Après le bouton.</h2>
          <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ETAPES.map(([t, d], i) => (
              <li key={t} className="space-y-2 rounded-[24px] border-2 border-[#E9D8B4]/60 p-5">
                <p className="font-[family-name:var(--titres)] text-4xl font-extrabold text-[#E9D8B4]">{i + 1}</p>
                <h3 className="text-xl font-bold">{t}</h3>
                <p className="text-[#C9D0D6]">{d}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-[#C9D0D6]">Délais d&apos;exemple : la marque est fictive.</p>
        </div>
      </section>
    </>
  );
}
