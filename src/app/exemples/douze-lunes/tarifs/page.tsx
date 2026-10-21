import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule, Section } from "../_composants/Blocs";
import ChoixTarif from "../_composants/Tarifs";
import { ACTES, DATE_DES_TARIFS, euros } from "../_composants/donnees";

// Les tarifs : « L'information relative au prix doit être claire, honnête et datée »,
// avec l'ensemble des prestations incluses, et toute offre risquant d'entraîner un
// surcoût doit donner lieu à une information précise (Code rural, R242-35, version du
// 29/07/2026). D'où « Compris / Peut s'ajouter / Tarif au… ». Prix TTC, d'exemple.
export const metadata: Metadata = {
  title: "Tarifs — Douze Lunes, site de démonstration",
  description: "Les tarifs d'un cabinet vétérinaire imaginaire : chaque acte, ce qu'il comprend, ce qui peut s'ajouter, et la date du tarif. Prix d'exemple.",
  ...adressesDeLaPage("/exemples/douze-lunes/tarifs"),
};

export default function Tarifs() {
  return (
    <main>
      <Section className="space-y-12 pb-12">
        <Intitule niveau={1} surtitre={`Tarifs au ${DATE_DES_TARIFS}`} titre={<>Le prix, <span className="text-[var(--accent-texte)]">avant la question.</span></>} pleines={12}>
          Choisissez un acte : sa fiche dit ce qu&apos;il comprend, ce qui peut s&apos;y ajouter,
          et depuis quand ce prix vaut. Prix TTC d&apos;exemple : le cabinet est fictif.
        </Intitule>
        <ChoixTarif />
      </Section>

      <Section className="space-y-8 pt-8">
        <h2 className="text-[34px] sm:text-4xl">Tous les actes, d&apos;un coup d&apos;œil</h2>
        <div className="overflow-hidden rounded-[24px] border border-[var(--trait)] bg-[var(--carte)]">
          <table className="w-full text-left">
            <caption className="sr-only">Tarifs d&apos;exemple au {DATE_DES_TARIFS}, toutes taxes comprises</caption>
            <thead>
              <tr className="border-b border-[var(--trait)] text-sm uppercase tracking-[0.12em]">
                <th scope="col" className="px-5 py-4 font-bold">Acte</th>
                <th scope="col" className="px-5 py-4 text-right font-bold whitespace-nowrap">Prix TTC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--trait)]">
              {ACTES.map((a) => (
                <tr key={a.id}>
                  <th scope="row" className="px-5 py-4 font-semibold">
                    {a.nom}
                    <span className="block text-sm font-normal text-[var(--doux)]">{a.compris.join(" · ")}</span>
                  </th>
                  <td className="px-5 py-4 text-right text-lg font-bold tabular-nums whitespace-nowrap">{euros(a.prix)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="max-w-3xl space-y-3 text-[var(--doux)] leading-relaxed">
          <p>
            Prix d&apos;exemple, toutes taxes comprises, au {DATE_DES_TARIFS}. Les médicaments
            délivrés et les examens complémentaires sont facturés en plus, et toujours annoncés
            avant d&apos;être faits.
          </p>
          <p>
            La nuit, le dimanche et les jours fériés, la garde est assurée par le service de
            garde du secteur, qui a ses propres tarifs et vous les donne au téléphone.
          </p>
        </div>
      </Section>
    </main>
  );
}
