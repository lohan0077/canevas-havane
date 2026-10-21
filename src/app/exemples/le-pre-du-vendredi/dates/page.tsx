import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { DATES, DECOUPE, DOSSIER } from "../_composants/donnees";
import Prevenir from "../_composants/Prevenir";
import { HautDePage } from "../_composants/Blocs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Les dates — Le Pré du Vendredi — site de démonstration",
  description: "Les prochaines découpes d'une ferme imaginaire, une par mois, le vendredi : la date, et ce qui reste.",
  ...adressesDeLaPage("/exemples/le-pre-du-vendredi/dates"),
};

const ETAT = {
  ouverte: { libelle: "Ouverte", classe: "bg-[var(--accent)] text-[var(--sur-accent)]" },
  bientot: { libelle: "Bientôt", classe: "border border-[var(--accent)] text-[var(--encre)]" },
  "plus-tard": { libelle: "Plus tard", classe: "border border-[var(--trait)] text-[var(--doux)]" },
};

export default function LesDates() {
  return (
    <main className="pb-20">
      <HautDePage surtitre="Les dates" titre={<>Une découpe par mois. <span className="italic text-[var(--accent-texte)]">Le vendredi.</span></>}>
        Les réservations de chaque découpe ouvrent un mois avant. Quand tout est parti,
        c&apos;est la suivante.
      </HautDePage>

      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <ol className="space-y-4">
          {DATES.map((d) => (
            <li key={d.libelle} className="grid grid-cols-[auto_1fr] gap-5 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-6">
              <p className="w-20 text-center font-[family-name:var(--titres)] leading-none">
                <span className="block text-6xl tabular-nums">{d.jour}</span>
                <span className="text-sm text-[var(--doux)]">{d.mois} {d.annee}</span>
              </p>
              <div className="space-y-2">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${ETAT[d.etat].classe}`}>{ETAT[d.etat].libelle}</span>
                <h2 className="text-3xl">{d.libelle}</h2>
                <p className="text-[var(--doux)]">{d.detail}</p>
                {d.etat === "ouverte" && (
                  <Link href={`${DOSSIER}#decoupe`} className="inline-block border-b border-[var(--accent)] pb-0.5 font-semibold">Mettre un colis de côté</Link>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="space-y-4 md:sticky md:top-24">
          <Prevenir
            titre={<>Être prévenu <span className="italic text-[var(--accent-texte)]">le jour J.</span></>}
            detail={`Après la découpe du ${DECOUPE.date}`}
          />
          <p className="text-xs text-[var(--doux)]">Dates d&apos;exemple : de vrais vendredis, mais la ferme est fictive.</p>
        </div>
      </div>
    </main>
  );
}
