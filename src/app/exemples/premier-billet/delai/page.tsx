import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, AppelFinal, EnTetePage, Surtitre, TITRE } from "../_composants/Blocs";
import { ChiffreDuMois, Courbe } from "../_composants/Delai";
import { CALCUL, HISTORIQUE, heures } from "../_composants/donnees";

// Le délai de réponse (idée de la vidéo « Remplir l'agenda ») : le chiffre du mois, ses
// six derniers mois, et la façon dont il est calculé. Une information utile, sans
// comparaison (décret n° 2012-432, art. 152) ; sur un vrai site, elle n'est conforme
// qu'avec de vrais chiffres, qu'on peut justifier.
export const metadata: Metadata = {
  title: "Délai de réponse — Premier Billet, site de démonstration",
  description: "Le délai moyen de réponse d'un cabinet d'expertise comptable imaginaire, publié chaque mois, et la façon dont il est calculé. Chiffres d'exemple.",
  ...adressesDeLaPage("/exemples/premier-billet/delai"),
};

export default function Delai() {
  return (
    <main>
      <EnTetePage vert surtitre="Le chiffre du mois" titre="Le délai, *tel qu'il est.*" aCote={<ChiffreDuMois />}>
        Le temps qu&apos;il nous faut, en moyenne, pour vous répondre. Publié le 1er de chaque mois.
        Et quand il monte, il est affiché quand même.
      </EnTetePage>

      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Surtitre>Six mois</Surtitre></Apparition>
          <TitreRevele texte="S'il monte, *il monte.*" className={`text-[clamp(2.6rem,5.5vw,5rem)] ${TITRE}`} classeAccent={ACCENT} />
          <Apparition as="p" delai={150} className="text-[19px] leading-relaxed text-[var(--doux)]">
            Touchez un mois pour voir son détail. En août, l&apos;équipe était réduite : le chiffre
            est monté, et il est resté affiché.
          </Apparition>
        </div>
        <Apparition de="zoom"><Courbe /></Apparition>
      </section>

      <section className="border-y-[3px] border-double border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-28">
          <div className="space-y-6">
            <Apparition><Surtitre>La méthode</Surtitre></Apparition>
            <TitreRevele texte="Comment il est *calculé.*" className={`text-[clamp(2.6rem,5.5vw,5rem)] ${TITRE}`} classeAccent={ACCENT} />
          </div>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CALCUL.map((c, i) => (
              <Apparition as="li" key={c.titre} delai={i * 100} className="space-y-3 border-t-2 border-[var(--accent)] pt-5">
                <p className="font-[family-name:var(--titres)] text-[48px] font-semibold leading-none tabular-nums text-[var(--accent-texte)]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-[26px] font-semibold">{c.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{c.texte}</p>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-5 py-24 sm:px-8 md:py-28">
        <h2 className={`text-[clamp(2.2rem,4.4vw,3.6rem)] ${TITRE}`}>Les six derniers mois</h2>
        <div className="overflow-hidden border border-[var(--trait)] bg-[var(--carte)]">
          <table className="w-full text-left text-[16px]">
            <caption className="sr-only">Délai moyen de réponse, par mois, chiffres d&apos;exemple</caption>
            <thead>
              <tr className="border-b border-[var(--trait)] text-[12px] uppercase tracking-[0.12em] text-[var(--doux)]">
                <th scope="col" className="px-5 py-3 font-semibold">Mois</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">Délai moyen</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">Messages</th>
              </tr>
            </thead>
            <tbody>
              {HISTORIQUE.map((h) => (
                <tr key={h.mois} className="border-b border-[var(--trait)] last:border-0">
                  <th scope="row" className="px-5 py-3.5 font-normal capitalize">{h.mois} 2026</th>
                  <td className="px-5 py-3.5 text-right font-semibold tabular-nums">{heures(h.minutes)}</td>
                  <td className="px-5 py-3.5 text-right tabular-nums">{h.messages}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[var(--doux)]">Chiffres d&apos;exemple : le cabinet est fictif. Sur un vrai site, chacun se justifie.</p>
      </section>

      <AppelFinal />
    </main>
  );
}
