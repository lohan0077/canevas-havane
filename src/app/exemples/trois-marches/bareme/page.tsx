import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule } from "../_composants/Blocs";
import { AUTRES_PRESTATIONS, BAREME_DATE, TRANCHES, euros, pourcent, tauxMax } from "../_composants/donnees";

// Le barème d'honoraires, à un clic de chaque annonce (arrêté du 10/01/2017, art. 2, IV) :
// prix maximums, toutes taxes comprises (II), qui paie (I), et les tranches quand le prix
// dépend de la valeur du bien (III). Barème d'exemple.
export const metadata: Metadata = {
  title: "Barème d'honoraires — Trois Marches, site de démonstration",
  description: "Le barème d'honoraires d'une agence immobilière imaginaire : prix maximums TTC, par tranche, et qui les paie. Exemple.",
  ...adressesDeLaPage("/exemples/trois-marches/bareme"),
};

const EXEMPLES = [150_000, 300_000, 500_000];

export default function PageBareme() {
  return (
    <div className="mx-auto max-w-4xl space-y-14 px-5 py-14 sm:px-8">
      <Intitule niveau={1} surtitre="Barème d'honoraires" titre={<>Nos prix maximums, <span className="italic">toutes taxes comprises.</span></>}>
        Honoraires de transaction, calculés sur le prix de vente hors honoraires, à la charge de
        l&apos;acquéreur. Le montant exact est fixé dans le mandat, sans jamais dépasser ce barème.
      </Intitule>

      <div className="overflow-hidden border border-[var(--trait)] bg-[var(--carte)]">
        <table className="w-full text-left text-[15px]">
          <caption className="sr-only">Barème des honoraires de vente, prix maximums TTC</caption>
          <thead className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">Prix de vente hors honoraires</th>
              <th scope="col" className="px-5 py-3 font-semibold">Maximum TTC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--trait)]">
            {TRANCHES.map((t) => (
              <tr key={t.libelle}>
                <th scope="row" className="px-5 py-4 font-normal">
                  {t.libelle}
                  <span className="mt-1 block text-[13px] font-semibold text-[var(--accent-texte)]">À la charge de l&apos;acquéreur</span>
                </th>
                <td className="px-5 py-4 font-[family-name:var(--titres)] text-[24px]">{pourcent(t.taux)}</td>
              </tr>
            ))}
            {AUTRES_PRESTATIONS.map((a) => (
              <tr key={a.prestation}>
                <th scope="row" className="px-5 py-4 font-normal">
                  {a.prestation}
                  <span className="mt-1 block text-[13px] font-semibold text-[var(--accent-texte)]">Qui paie : {a.payeur.toLowerCase()}</span>
                </th>
                <td className="px-5 py-4 font-semibold">{a.prix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="space-y-5">
        <h2 className="text-[32px] font-normal">Ce que ça donne</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {EXEMPLES.map((p) => {
            const t = tauxMax(p);
            const h = (p * t) / 100;
            return (
              <li key={p} className="space-y-1 border border-[var(--trait)] bg-[var(--carte)] p-5">
                <p className="text-[14px] text-[var(--doux)]">Prix de vente : {euros(p)} hors honoraires</p>
                <p className="font-[family-name:var(--titres)] text-[30px] tabular-nums">{euros(h)}</p>
                <p className="text-[14px]">au plus, soit {pourcent(t)} TTC, payés par l&apos;acquéreur</p>
              </li>
            );
          })}
        </ul>
        <p className="text-[14px] text-[var(--doux)]">
          Barème d&apos;exemple, en vigueur au {BAREME_DATE}. TVA à 20 % comprise. Affiché aussi en vitrine
          et à l&apos;entrée de l&apos;agence (arrêté du 10 janvier 2017, art. 2).
        </p>
      </section>

    </div>
  );
}
