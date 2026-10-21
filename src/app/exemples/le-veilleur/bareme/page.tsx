import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import { Intitule, Surtitre } from "../_composants/Blocs";
import Bareme from "../_composants/Bareme";
import Calculateur from "../_composants/Calculateur";

export const metadata: Metadata = {
  title: "Barème — Le Veilleur, site de démonstration",
  description:
    "Le barème d'une conciergerie imaginaire : prix maximums TTC, qui paie quoi, la base de calcul, et un mois de location calculé pour exemple.",
  ...adressesDeLaPage("/exemples/le-veilleur/bareme"),
};

const LECTURE = [
  {
    titre: "Des prix maximums",
    texte: "Le barème dit ce que nous prenons au plus. Le mandat peut prévoir moins, jamais plus.",
  },
  {
    titre: "Toutes taxes comprises",
    texte: "Les montants s'entendent TTC. Aucune ligne ne s'ajoute en bas d'une facture.",
  },
  {
    titre: "Qui paie quoi",
    texte: "Chaque ligne dit qui la paie : le propriétaire, le voyageur, ou personne, parce qu'elle est comprise ailleurs.",
  },
  {
    titre: "De quoi calculer",
    texte: "Quand un prix est un pourcentage, la base est écrite : les loyers encaissés, hors ménage et hors taxe de séjour.",
  },
];

export default function PageBareme() {
  return (
    <div>
      <section className="mx-auto max-w-6xl space-y-10 px-5 pt-12 pb-16 sm:px-6 lg:pt-20">
        <Intitule niveau={1} surtitre="Le barème" titre={<>En entier, <em className="text-[var(--accent-texte)]">avant de signer.</em></>}>
          <p>
            Ce qu&apos;on prend par séjour, le ménage, et qui paie quoi. Le même barème est recopié dans
            le mandat de gestion.
          </p>
        </Intitule>
        <div className="max-w-3xl">
          <Bareme />
        </div>
      </section>

      <section id="calcul" className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
          <Intitule surtitre="Un mois, calculé" titre={<>Ce que tu paies, <em className="text-[var(--accent-texte)]">ce que tu reçois.</em></>}>
            <p>Glisse le prix de la nuit et le nombre de nuits : le barème s&apos;applique sous tes yeux.</p>
          </Intitule>
          <Calculateur />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-6">
        <Intitule surtitre="Comment le lire" titre={<>Quatre règles, <em className="text-[var(--accent-texte)]">celles de la loi.</em></>}>
          <p>
            Quand on loue pour un propriétaire, l&apos;arrêté du 10 janvier 2017 (art. 2) impose
            d&apos;afficher ses prix, y compris sur son site, de cette façon-là.
          </p>
        </Intitule>
        <ol className="grid gap-5 sm:grid-cols-2">
          {LECTURE.map((l, i) => (
            <li key={l.titre} className="space-y-2 rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <p className="font-[family-name:var(--titres)] text-[34px] leading-none text-[var(--accent-texte)]">{i + 1}</p>
              <h2 className="text-[26px] font-normal">{l.titre}</h2>
              <p className="text-[15px] leading-relaxed text-[var(--doux)]">{l.texte}</p>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href={`${DOSSIER}/proprietaires#estimation`} className="rounded-full bg-[var(--encre)] px-6 py-3.5 font-bold text-[var(--fond)]">
            Demander la visite
          </Link>
          <Surtitre>Prix d&apos;exemple : l&apos;entreprise est fictive</Surtitre>
        </div>
      </section>
    </div>
  );
}
