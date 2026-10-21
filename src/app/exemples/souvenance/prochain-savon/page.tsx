import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Surtitre } from "../_composants/Elements";
import { Proposition } from "../_composants/Interactifs";

export const metadata: Metadata = {
  title: "Souvenance — site de démonstration",
  description: "Ça sentait quoi, chez ta grand-mère ? L'odeur la plus citée deviendra le prochain savon d'une marque imaginaire.",
  ...adressesDeLaPage("/exemples/souvenance/prochain-savon"),
};

const ETAPES = [
  ["Vous répondez", "En commentaire sous l'affiche, ou ici. Une odeur, pas besoin de plus."],
  ["On compte", "Les réponses telles qu'elles ont été écrites. L'odeur la plus citée l'emporte, et on publie le décompte."],
  ["On formule", "Une recette pour retrouver cette odeur. Puis l'évaluation de sa sécurité et sa déclaration, comme pour tout cosmétique : quelques mois."],
  ["Il sort", "Avec le nom de ce souvenir sur sa bande."],
];

export default function ProchainSavon() {
  return (
    <main>
      <section className="bg-[var(--encre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
          <Surtitre clair>Le prochain savon</Surtitre>
          <h1 className="mt-6 text-[50px] font-normal leading-[1.04] sm:text-7xl">
            Chez ta grand-mère, ça sentait <span className="italic text-[#E8C4BC]">quoi</span>&nbsp;?
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-[18px] leading-relaxed">L&apos;odeur la plus citée deviendra le prochain savon.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-start">
        <Proposition />
        <ol className="space-y-6">
          {ETAPES.map(([t, d], i) => (
            <li key={t} className="flex gap-5">
              <span className="font-[family-name:var(--titres)] text-[44px] italic leading-none text-[var(--accent-texte)]">{i + 1}</span>
              <span className="space-y-1">
                <span className="block font-[family-name:var(--titres)] text-[26px] leading-tight">{t}</span>
                <span className="block text-[17px] leading-relaxed text-[var(--doux)]">{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8">
          <p className="font-[family-name:var(--titres)] text-[30px] italic leading-snug">Le décompte n&apos;a pas commencé.</p>
          <p className="mt-3 text-[17px] leading-relaxed text-[var(--doux)]">
            Il s&apos;ouvrira avec l&apos;affiche. On n&apos;affichera que les réponses réellement écrites, jamais un
            chiffre arrangé.
          </p>
        </div>
      </section>
    </main>
  );
}
