import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule, Section } from "../_composants/Blocs";
import Simulateur from "../_composants/Simulateur";
import { STATUTS, euros } from "../_composants/donnees";

// Les honoraires, statut par statut. Prix hors taxes (clientèle professionnelle), avec le
// TTC à côté ; indications d'exemple : les honoraires sont convenus par écrit, librement
// et préalablement à la mission (ordonnance n° 45-2138 du 19 septembre 1945, art. 24).
export const metadata: Metadata = {
  title: "Honoraires — Heure Claire, site de démonstration",
  description: "Les honoraires d'un cabinet d'expertise comptable imaginaire, par mois, selon le statut et le chiffre d'affaires. Prix d'exemple, hors taxes.",
  ...adressesDeLaPage("/exemples/heure-claire/honoraires"),
};

const tranche = (de: number, a: number) => (de === 0 ? `Jusqu'à ${euros(a)}` : `De ${euros(de + 1)} à ${euros(a)}`);

export default function Honoraires() {
  return (
    <main>
      <Section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Intitule niveau={1} numero="01" surtitre="Honoraires" titre={<>Combien, <em className="font-normal">par mois.</em></>}>
          Choisissez votre statut, puis votre chiffre d&apos;affaires annuel. Le prix affiché
          est une indication d&apos;exemple : vos honoraires sont fixés par écrit, dans la
          lettre de mission, avant le début de la mission.
        </Intitule>
        <Simulateur />
      </Section>

      <Section className="space-y-10">
        <Intitule numero="02" surtitre="Le détail" titre="Statut par statut." />
        <div className="grid gap-6 lg:grid-cols-2">
          {STATUTS.map((s) => (
            <article key={s.id} className="border border-[var(--trait)] bg-[var(--carte)]">
              <h3 className="border-b border-[var(--trait)] px-5 py-4 text-[28px] font-semibold">{s.long}</h3>
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">Honoraires mensuels d&apos;exemple, {s.long}</caption>
                <thead>
                  <tr className="border-b border-[var(--trait)] text-[12px] uppercase tracking-[0.12em] text-[var(--doux)]">
                    <th scope="col" className="px-5 py-2.5 font-semibold">Chiffre d&apos;affaires annuel</th>
                    <th scope="col" className="px-5 py-2.5 text-right font-semibold">HT / mois</th>
                    <th scope="col" className="px-5 py-2.5 text-right font-semibold">TTC</th>
                  </tr>
                </thead>
                <tbody>
                  {s.paliers.map(([jusqua, prix], i) => (
                    <tr key={jusqua} className="border-b border-[var(--trait)] last:border-0">
                      <th scope="row" className="px-5 py-3 font-normal">{tranche(i === 0 ? 0 : s.paliers[i - 1][0], jusqua)}</th>
                      <td className="px-5 py-3 text-right font-semibold tabular-nums whitespace-nowrap">{euros(prix)}</td>
                      <td className="px-5 py-3 text-right tabular-nums whitespace-nowrap text-[var(--doux)]">{euros(Math.round(prix * 120) / 100)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="space-y-1 border-t border-[var(--trait)] px-5 py-4 text-[15px]">
                {s.compris.map((c) => <li key={c}>✓ {c}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="max-w-3xl space-y-3 leading-relaxed text-[var(--doux)]">
          <p>
            Prix hors taxes, pour une clientèle professionnelle ; TVA de 20 % en sus, montant
            TTC indiqué à côté. Honoraires d&apos;exemple : le cabinet est fictif.
          </p>
          <p>
            Ce qui n&apos;est pas dans le prix mensuel (bulletins de paie, formalités juridiques
            exceptionnelles, création de société) est chiffré à part, dans la lettre de mission,
            avant d&apos;être fait.
          </p>
        </div>
      </Section>
    </main>
  );
}
