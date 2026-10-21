import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import { Intitule } from "../_composants/Blocs";
import Ticket from "../_composants/Ticket";

export const metadata: Metadata = {
  title: "Ce que je gagne — Ligne par Ligne, site de démonstration",
  description:
    "Ce que gagne un conseiller en gestion de patrimoine imaginaire, ligne par ligne : honoraires, rétrocessions prises sur les frais, et un calcul sur ton épargne.",
  ...adressesDeLaPage("/exemples/ligne-par-ligne/ce-que-je-gagne"),
};

const EXPLICATIONS = [
  {
    titre: "Les honoraires",
    texte:
      "Tu les paies directement : le bilan une fois, le suivi chaque année. Ils sont écrits dans la lettre de mission, avant que je commence. 900 € et 300 € TTC par an, en exemple.",
  },
  {
    titre: "Les rétrocessions",
    texte:
      "Quand tu souscris un contrat ou des fonds sur mon conseil, l'assureur et la société de gestion me reversent une part des frais qu'ils te prélèvent. Elles ne s'ajoutent pas à tes frais : elles en font partie. Je te les montre quand même, parce que c'est toi qui les paies.",
  },
  {
    titre: "Non indépendant, et pourquoi",
    texte:
      "Un conseiller qui se dit indépendant ne garde aucune rémunération versée par un tiers (code monétaire et financier, art. L541-8-1). Je garde ces rétrocessions : mon conseil est donc « non indépendant », et je l'écris en tête du ticket.",
  },
  {
    titre: "Ce que tu reçois par écrit",
    texte:
      "Avant tout conseil, un document qui dit qui je suis, mes statuts et comment je suis payé. Puis la lettre de mission, avec mes honoraires. Puis, pour chaque recommandation, ce qu'elle coûte et ce que je touche.",
  },
];

export default function CeQueJeGagne() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pt-10 pb-20 sm:px-6 sm:pt-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="space-y-8">
          <Intitule niveau={1} libelle="Ce que je gagne" titre={<>Mon ticket, <em>avant le tien.</em></>}>
            <p>
              Fais glisser le curseur : le ticket chiffre ce que me reversent les partenaires sur l&apos;épargne que tu
              me confies. Il ne dit rien de ce que tu gagneras, toi : personne ne peut le promettre.
            </p>
          </Intitule>
          <p className="rounded-[20px] border border-[var(--trait)] bg-[var(--carte)] p-5 text-[14px] leading-relaxed text-[var(--doux)]">
            Taux d&apos;exemple : 0,50 % par an reversé par l&apos;assureur, 0,40 % par an par la société de gestion, appliqués
            ici à toute l&apos;épargne confiée pour faire simple. En vrai, ils varient selon les contrats et les fonds, et ils te
            sont donnés pour chacun avant que tu ne souscrives.
          </p>
        </div>
        <Ticket calcul />
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
          <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {EXPLICATIONS.map((e) => (
              <div key={e.titre} className="space-y-3 border-t-2 border-[var(--accent)] pt-5">
                <dt className="font-[family-name:var(--titres)] text-[28px] leading-tight">{e.titre}</dt>
                <dd className="text-[16px] leading-relaxed text-[var(--doux)]">{e.texte}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-16 sm:px-6">
        <p className="font-[family-name:var(--titres)] text-[34px] leading-tight">45 minutes, <em>tes questions d&apos;abord.</em></p>
        <Link href={`${DOSSIER}#rendez-vous`} className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Prendre rendez-vous</Link>
      </section>
    </div>
  );
}
