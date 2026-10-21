import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { COLIS, DECOUPE, DOSSIER, PRIX_KILO, euros, kilos } from "../_composants/donnees";
import DetailColis from "../_composants/DetailColis";
import { HautDePage, Surtitre } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Le colis — Le Pré du Vendredi — site de démonstration",
  description: "Ce qu'il y a dans un colis de viande d'une ferme imaginaire : chaque morceau, son poids, le prix au kilo.",
  ...adressesDeLaPage("/exemples/le-pre-du-vendredi/colis"),
};

// Ce que les gens tapent : « colis de viande à la ferme », « prix colis viande de
// bœuf ». La page y répond morceau par morceau, poids et prix compris.
export default function LeColis() {
  return (
    <main className="pb-20">
      <HautDePage surtitre="Le colis" titre={<>Ce qu&apos;il y a <span className="italic text-[var(--accent-texte)]">dedans.</span></>}>
        Le même colis pour tout le monde : un peu de chaque morceau, pour que la bête soit
        partagée en entier. Choisis la taille, tout est écrit.
      </HautDePage>

      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 md:grid-cols-[1.2fr_0.8fr]">
        <DetailColis />
        <aside className="space-y-8">
          <div className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-6 space-y-4">
            <Surtitre>Les deux colis</Surtitre>
            <table className="w-full text-left">
              <caption className="sr-only">Poids et prix des deux colis, TTC, exemple</caption>
              <thead className="text-xs uppercase tracking-[0.16em] text-[var(--doux)]">
                <tr><th className="pb-2 font-semibold">Colis</th><th className="pb-2 font-semibold">Morceaux</th><th className="pb-2 text-right font-semibold">Prix TTC</th></tr>
              </thead>
              <tbody className="divide-y divide-[var(--trait)]">
                {COLIS.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 font-semibold">{kilos(c.poids)}</td>
                    <td className="py-3 tabular-nums">{c.morceaux.length}</td>
                    <td className="py-3 text-right tabular-nums">{euros(c.poids * PRIX_KILO)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-[var(--doux)]">Prix d&apos;exemple, au kilo : {euros(PRIX_KILO)} TTC.</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl">Pour combien de repas&nbsp;?</h2>
            <p className="leading-relaxed text-[var(--doux)]">
              Compte environ 150 à 200 g de viande par personne et par repas. Le colis de
              10 kg fait donc une quinzaine de repas pour une famille de quatre. Un repère,
              pas une règle : chacun son appétit.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl">Et ensuite&nbsp;?</h2>
            <p className="leading-relaxed text-[var(--doux)]">
              Tu mets un colis de côté sur l&apos;accueil, pour la découpe du {DECOUPE.date}.
              Tu passes le chercher le {DECOUPE.retrait}, et tu paies sur place.
            </p>
            <Link href={`${DOSSIER}#decoupe`} className="inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">
              Voir les colis qui restent
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
