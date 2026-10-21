import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule, Section } from "../_composants/Blocs";
import { ChiffreDuMois, Courbe } from "../_composants/Delai";
import { HISTORIQUE, heures } from "../_composants/donnees";

// Le délai de réponse : le chiffre du mois, ses six derniers mois, et la façon dont il
// est calculé. Une information utile, sans comparaison (décret n° 2012-432, art. 152) ;
// sur un vrai site, elle n'est conforme qu'avec de vrais chiffres, qu'on peut justifier.
export const metadata: Metadata = {
  title: "Délai de réponse — Heure Claire, site de démonstration",
  description: "Le délai moyen de réponse d'un cabinet d'expertise comptable imaginaire, publié chaque mois, et la façon dont il est calculé. Chiffres d'exemple.",
  ...adressesDeLaPage("/exemples/heure-claire/delai"),
};

const CALCUL = [
  { titre: "Ce qui est compté", texte: "Chaque message reçu d'un client : messagerie du cabinet, courriel, formulaire. Du lundi au vendredi, de 9 h à 18 h." },
  { titre: "Jusqu'à quand", texte: "Jusqu'à la première réponse écrite par une personne du cabinet. Les accusés de réception automatiques ne comptent pas." },
  { titre: "Hors des heures", texte: "Un message reçu le soir ou le week-end commence à compter le jour ouvré suivant, à 9 h." },
  { titre: "Quand", texte: "Le chiffre est calculé et publié le 1er de chaque mois, pour le mois écoulé. Il n'est jamais retouché." },
];

export default function Delai() {
  return (
    <main>
      <Section className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-8">
          <Intitule niveau={1} numero="02" surtitre="Le chiffre du mois" titre={<>Le délai, <em className="font-normal">tel qu&apos;il est.</em></>}>
            Un chiffre qu&apos;on publie rarement : le temps qu&apos;il nous faut, en moyenne, pour
            vous répondre. Mis à jour chaque mois. Et quand il monte, il est affiché quand même.
          </Intitule>
          <ChiffreDuMois />
        </div>
        <div className="lg:pt-[15.5rem]">
          <Courbe />
        </div>
      </Section>

      <Section className="space-y-10">
        <Intitule numero="03" surtitre="La méthode" titre="Comment il est calculé." />
        <ol className="grid border-l border-t border-[var(--trait)] sm:grid-cols-2">
          {CALCUL.map((c, i) => (
            <li key={c.titre} className="space-y-2 border-b border-r border-[var(--trait)] bg-[var(--carte)] p-6">
              <p className="text-[13px] font-semibold tabular-nums text-[var(--doux)]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-[24px] font-semibold">{c.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{c.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="space-y-6">
        <h2 className="text-[32px] font-semibold sm:text-[44px]">Les six derniers mois</h2>
        <div className="overflow-hidden border border-[var(--trait)] bg-[var(--carte)]">
          <table className="w-full text-left text-[15px]">
            <caption className="sr-only">Délai moyen de réponse, par mois, chiffres d&apos;exemple</caption>
            <thead>
              <tr className="border-b border-[var(--trait)] text-[12px] uppercase tracking-[0.12em] text-[var(--doux)]">
                <th scope="col" className="px-5 py-2.5 font-semibold">Mois</th>
                <th scope="col" className="px-5 py-2.5 text-right font-semibold">Délai moyen</th>
                <th scope="col" className="px-5 py-2.5 text-right font-semibold">Messages</th>
              </tr>
            </thead>
            <tbody>
              {HISTORIQUE.map((h) => (
                <tr key={h.mois} className="border-b border-[var(--trait)] last:border-0">
                  <th scope="row" className="px-5 py-3 font-normal capitalize">{h.mois} 2026</th>
                  <td className="px-5 py-3 text-right font-semibold tabular-nums">{heures(h.minutes)}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{h.messages}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[var(--doux)]">Chiffres d&apos;exemple : le cabinet est fictif. Sur un vrai site, chacun se justifie.</p>
      </Section>
    </main>
  );
}
