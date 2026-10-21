import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, HONORAIRES, PHRASE_L322_2 } from "../_composants/donnees";
import { Intitule } from "../_composants/Blocs";
import Frise from "../_composants/Frise";

export const metadata: Metadata = {
  title: "Quand je paie — Mot pour Mot, site de démonstration",
  description:
    "Les honoraires d'un courtier en crédit immobilier imaginaire : quand on les paie, combien, et ce que la loi dit pour tous les courtiers.",
  ...adressesDeLaPage("/exemples/mot-pour-mot/honoraires"),
};

const LIGNES = [
  { titre: "Nos honoraires", valeur: HONORAIRES, detail: "Exemple. Fixés dans le mandat, avant de commencer, quel que soit le nombre de banques consultées." },
  { titre: "Quand", valeur: "Fonds versés", detail: "Une fois les fonds versés par la banque. Rien avant : c'est la loi pour tous (CMF, art. L519-6)." },
  { titre: "Si aucune banque ne prête", valeur: "0 €", detail: "Les fonds ne sont jamais versés : rien n'est dû. Même loi." },
  { titre: "La banque", valeur: "À part", detail: "Elle peut nous verser une rémunération. Son existence et son montant te sont indiqués avant que tu ne t'engages." },
];

export default function Honoraires() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="space-y-8">
          <Intitule niveau={1} libelle="Quand je paie" titre={<>Zéro euro <span className="text-[var(--accent-texte)]">avant les fonds.</span></>}>
            <p>Pas parce que nous sommes généreux : parce que c&apos;est la loi, pour tous les courtiers. Nous préférons simplement l&apos;écrire en grand.</p>
          </Intitule>
          <blockquote className="border-l-4 border-[var(--accent)] pl-5">
            <p className="text-[20px] leading-snug font-semibold">« {PHRASE_L322_2} »</p>
            <footer className="mt-2 text-[14px] text-[var(--doux)]">Code de la consommation, art. L322-2, mot pour mot.</footer>
          </blockquote>
        </div>
        <Frise />
      </section>

      <section className="border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
          <dl className="grid gap-px overflow-hidden rounded-[24px] border-2 border-[var(--encre)] bg-[var(--encre)] sm:grid-cols-2">
            {LIGNES.map((l) => (
              <div key={l.titre} className="space-y-2 bg-[var(--fond)] p-6">
                <dt className="text-[13px] font-semibold tracking-[0.14em] text-[var(--accent-texte)] uppercase">{l.titre}</dt>
                <dd className="font-[family-name:var(--titres)] text-[36px] leading-none font-black tracking-[-0.03em] uppercase">{l.valeur}</dd>
                <dd className="text-[15px] leading-relaxed text-[var(--doux)]">{l.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[14px] text-[var(--doux)]">Montants d&apos;exemple, toutes taxes comprises : l&apos;entreprise est fictive. Aucun taux n&apos;est affiché sur ce site.</p>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-16 sm:px-6">
        <p className="font-[family-name:var(--titres)] text-[34px] leading-[0.95] font-black tracking-[-0.04em] uppercase">Une heure, sans engagement.</p>
        <Link href={`${DOSSIER}#rendez-vous`} className="rounded-full bg-[var(--encre)] px-6 py-3.5 font-semibold text-[var(--fond)]">Choisir mon créneau</Link>
      </section>
    </div>
  );
}
