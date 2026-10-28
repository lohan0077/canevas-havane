import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Calculateur from "../_composants/Calculateur";
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
    <main>
    <EnTetePage
      surtitre="Barème d'honoraires"
      titre="Nos prix maximums, *toutes taxes comprises.*"
      aCote={<Apparition de="zoom" delai={250}><div className="mx-auto max-w-[440px]"><Calculateur /></div></Apparition>}
    >
      Honoraires de transaction, calculés sur le prix de vente hors honoraires, à la charge de
      l&apos;acquéreur. Le montant exact est fixé dans le mandat, sans jamais dépasser ce barème.
    </EnTetePage>
    <div className="mx-auto max-w-4xl space-y-14 px-5 py-16 sm:px-8 md:py-24">

      <div className="overflow-hidden rounded-[1.75rem] border border-[var(--trait)] bg-[var(--carte)]">
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
        <h2 className="text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-tight">Ce que ça <em className="text-[var(--accent-texte)]">donne</em></h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {EXEMPLES.map((p) => {
            const t = tauxMax(p);
            const h = (p * t) / 100;
            return (
              <li key={p} className="space-y-1 rounded-t-[999px] border border-[var(--trait)] bg-[var(--carte)] px-5 pb-6 pt-14 text-center">
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
    <AppelFinal />
    </main>
  );
}
