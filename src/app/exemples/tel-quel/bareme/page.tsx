import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import { Intitule, Surtitre, TableBareme } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Barème — Tel Quel, site de démonstration",
  description:
    "Le barème d'une conciergerie imaginaire : prix maximums TTC, qui paie chaque prestation, et la base de calcul de la gestion des séjours.",
  ...adressesDeLaPage("/exemples/tel-quel/bareme"),
};

export default function PageBareme() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-10 pb-20 sm:px-6 sm:pt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div className="space-y-6 px-1">
        <Intitule niveau={1} surtitre="Le barème" titre={<>Tout ce qu&apos;on prend, <em className="text-[var(--accent-texte)]">et qui le paie.</em></>}>
          <p>
            Prix maximums, toutes taxes comprises. Pour chaque ligne : qui la paie, le propriétaire ou
            le voyageur, et sur quelle base quand c&apos;est un pourcentage.
          </p>
        </Intitule>
        <p className="rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-4 text-[14px] leading-relaxed text-[var(--doux)]">
          Quand on loue pour un propriétaire, ces informations doivent être « aisément accessibles sur
          tout service de communication au public en ligne » (arrêté du 10 janvier 2017, art. 2). Le
          même barème est recopié dans le mandat de gestion.
        </p>
        <Surtitre>Prix d&apos;exemple : l&apos;entreprise est fictive</Surtitre>
        <Link href={`${DOSSIER}#contact`} className="inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">
          Parler de mon logement
        </Link>
      </div>
      <TableBareme />
    </div>
  );
}
