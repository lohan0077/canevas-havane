import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, AppelFinal, EnTetePage, Surtitre, TITRE } from "../_composants/Blocs";
import Simulateur from "../_composants/Simulateur";
import { A_PART, STATUTS, euros } from "../_composants/donnees";

// Les honoraires, statut par statut (idée de la vidéo « Remplir l'agenda »). Prix hors
// taxes (clientèle professionnelle), avec le TTC à côté ; indications d'exemple : les
// honoraires sont convenus par écrit, préalablement à la mission (ordonnance n° 45-2138
// du 19 septembre 1945, art. 24).
export const metadata: Metadata = {
  title: "Honoraires — Premier Billet, site de démonstration",
  description: "Les honoraires d'un cabinet d'expertise comptable imaginaire, par mois, selon le statut et le chiffre d'affaires. Prix d'exemple, hors taxes.",
  ...adressesDeLaPage("/exemples/premier-billet/honoraires"),
};

const tranche = (de: number, a: number) => (de === 0 ? `Jusqu'à ${euros(a)}` : `De ${euros(de + 1)} à ${euros(a)}`);

export default function Honoraires() {
  return (
    <main>
      <EnTetePage surtitre="Honoraires" titre="Le prix, *avant le premier appel.*" aCote={<Simulateur titre="h2" />}>
        Choisissez votre statut, puis votre chiffre d&apos;affaires annuel. Le prix affiché est
        une indication d&apos;exemple : vos honoraires sont fixés par écrit, dans la lettre de
        mission, avant le début de la mission.
      </EnTetePage>

      <section className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Le détail</Surtitre></Apparition>
          <TitreRevele texte="Statut *par statut.*" className={`text-[clamp(2.6rem,5.5vw,5rem)] ${TITRE}`} classeAccent={ACCENT} />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {STATUTS.map((s, k) => (
            <Apparition as="article" key={s.id} delai={k * 90} className="border border-[var(--trait)] bg-[var(--carte)]">
              <h3 className="border-b border-[var(--trait)] px-6 py-5 text-[32px] font-semibold">{s.long}</h3>
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">Honoraires mensuels d&apos;exemple, {s.long}</caption>
                <thead>
                  <tr className="border-b border-[var(--trait)] text-[12px] uppercase tracking-[0.12em] text-[var(--doux)]">
                    <th scope="col" className="px-6 py-2.5 font-semibold">Chiffre d&apos;affaires annuel</th>
                    <th scope="col" className="px-6 py-2.5 text-right font-semibold">HT / mois</th>
                    <th scope="col" className="px-6 py-2.5 text-right font-semibold">TTC</th>
                  </tr>
                </thead>
                <tbody>
                  {s.paliers.map(([jusqua, prix], i) => (
                    <tr key={jusqua} className="border-b border-[var(--trait)] last:border-0">
                      <th scope="row" className="px-6 py-3 font-normal">{tranche(i === 0 ? 0 : s.paliers[i - 1][0], jusqua)}</th>
                      <td className="whitespace-nowrap px-6 py-3 text-right font-semibold tabular-nums">{euros(prix)}</td>
                      <td className="whitespace-nowrap px-6 py-3 text-right tabular-nums text-[var(--doux)]">{euros(Math.round(prix * 120) / 100)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="space-y-1 border-t border-[var(--trait)] px-6 py-4 text-[15px]">
                {s.compris.map((c) => <li key={c}>✓ {c}</li>)}
              </ul>
            </Apparition>
          ))}
        </div>
      </section>

      <section className="border-y-[3px] border-double border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <Surtitre>À part</Surtitre>
            <h2 className={`text-[clamp(2.4rem,4.6vw,4rem)] ${TITRE}`}>Ce qui n&apos;est pas dans le prix mensuel.</h2>
            <p className="text-[17px] leading-relaxed text-[var(--doux)]">
              Chiffré à part, dans la lettre de mission, avant d&apos;être fait. Prix hors taxes, pour
              une clientèle professionnelle ; TVA de 20 % en sus. Honoraires d&apos;exemple : le
              cabinet est fictif.
            </p>
          </div>
          <ul className="border-t-[3px] border-double border-[var(--trait)]">
            {A_PART.map((h) => (
              <li key={h.offre} className="flex items-baseline justify-between gap-6 border-b border-[var(--trait)] py-6">
                <span>
                  <span className="block font-[family-name:var(--titres)] text-[24px] font-semibold">{h.offre}</span>
                  <span className="block text-[15px] text-[var(--doux)]">{h.detail}</span>
                </span>
                <span className="shrink-0 text-right font-semibold">
                  {h.prix}
                  {h.prix.includes("€") && <span className="block text-[12px] font-normal text-[var(--doux)]">exemple</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
