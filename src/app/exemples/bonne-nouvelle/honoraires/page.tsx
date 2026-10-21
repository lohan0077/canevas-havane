import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, PHRASE_L322_2, photos } from "../_composants/donnees";
import { Intitule, Photo } from "../_composants/Blocs";
import Calcul from "../_composants/Calcul";

export const metadata: Metadata = {
  title: "Honoraires — Bonne Nouvelle, site de démonstration",
  description:
    "Les honoraires d'un courtier en crédit immobilier imaginaire : combien, quand on les paie, et ce que la loi dit pour tous les courtiers.",
  ...adressesDeLaPage("/exemples/bonne-nouvelle/honoraires"),
};

const POINTS = [
  { titre: "Fixés avant de commencer", texte: "Le mandat que tu signes écrit nos honoraires. Ils ne changent pas en cours de route." },
  { titre: "Payés après les fonds", texte: "Une fois les fonds versés, pas avant. C'est la loi pour tous les courtiers (CMF, art. L519-6)." },
  { titre: "Rien si la banque dit non", texte: "Sans prêt, rien n'est versé : tu ne nous dois rien. Et on t'appelle quand même." },
  { titre: "Ce que verse la banque", texte: "Elle peut nous verser une rémunération. Son existence et son montant te sont indiqués avant que tu ne t'engages." },
];

export default function Honoraires() {
  return (
    <div>
      <section className="mx-auto max-w-6xl space-y-12 px-5 pt-10 pb-20 sm:px-6 sm:pt-16">
        <Intitule niveau={1} libelle="Honoraires" titre={<>Ce que tu nous paies. <em>Et quand.</em></>}>
          <p>Pas de frais de dossier, pas d&apos;acompte : non par générosité, mais parce que la loi l&apos;interdit à tous les courtiers avant le versement des fonds.</p>
        </Intitule>
        <div className="max-w-3xl">
          <Calcul />
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <ul className="grid gap-5 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p.titre} className="space-y-2 rounded-[22px] bg-[var(--fond)] p-6">
                <h2 className="text-[24px] font-normal">{p.titre}</h2>
                <p className="text-[15px] leading-relaxed text-[var(--doux)]">{p.texte}</p>
              </li>
            ))}
          </ul>
          <div className="space-y-6">
            <Photo photo={photos.porte} sizes="(min-width: 1024px) 400px, 100vw" className="aspect-[4/5]" />
            <blockquote className="space-y-2">
              <p className="font-[family-name:var(--titres)] text-[20px] leading-snug">« {PHRASE_L322_2} »</p>
              <p className="text-[13px] text-[var(--doux)]">Code de la consommation, art. L322-2 : la phrase que tout courtier en crédit immobilier doit écrire.</p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-16 sm:px-6">
        <p className="font-[family-name:var(--titres)] text-[34px] leading-tight">Une heure, <em>sans engagement.</em></p>
        <Link href={`${DOSSIER}#rendez-vous`} className="rounded-[12px] bg-[var(--encre)] px-6 py-3.5 font-semibold text-[var(--carte)]">Prendre rendez-vous</Link>
      </section>
    </div>
  );
}
