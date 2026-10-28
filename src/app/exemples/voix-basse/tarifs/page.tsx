import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import ChoixTarif from "../_composants/Tarifs";
import { ACTES, DATE_DES_TARIFS, euros } from "../_composants/donnees";

// Les tarifs : « L'information relative au prix doit être claire, honnête et datée »,
// avec l'ensemble des prestations incluses, et toute offre risquant d'entraîner un
// surcoût doit donner lieu à une information précise (Code rural, R242-35). D'où
// « Compris / Peut s'ajouter / Tarif au… ». Prix TTC, d'exemple.
export const metadata: Metadata = {
  title: "Tarifs — Voix Basse, site de démonstration",
  description: "Les tarifs d'un cabinet vétérinaire imaginaire : chaque acte, ce qu'il comprend, ce qui peut s'ajouter, et la date du tarif. Prix d'exemple.",
  ...adressesDeLaPage("/exemples/voix-basse/tarifs"),
};

export default function Tarifs() {
  return (
    <main>
      <EnTetePage surtitre={`Tarifs au ${DATE_DES_TARIFS}`} titre="Le prix, *avant la question.*">
        Choisis un acte : sa fiche dit ce qu&apos;il comprend, ce qui peut s&apos;y ajouter, et depuis
        quand ce prix vaut. Prix TTC d&apos;exemple : le cabinet est fictif.
      </EnTetePage>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 md:pb-28">
        <Apparition de="zoom">
          <ChoixTarif depart="sterilisation-chatte" />
        </Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="rounded-[2.5rem] bg-[#EFE8F7] px-5 py-20 text-[#2F4A3E] sm:px-10 md:py-28">
          <div className="mx-auto max-w-5xl space-y-10">
            <div className="space-y-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#62489A]">D&apos;un coup d&apos;œil</p>
              <TitreRevele
                texte="Tous les actes, *toutes taxes comprises.*"
                className="text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.02em]"
                classeAccent="italic text-[#62489A]"
              />
            </div>
            <div className="overflow-hidden rounded-[1.75rem] bg-white">
              <table className="w-full text-left">
                <caption className="sr-only">Tarifs d&apos;exemple au {DATE_DES_TARIFS}, toutes taxes comprises</caption>
                <thead>
                  <tr className="border-b border-[#E4DDD0] text-sm uppercase tracking-[0.12em]">
                    <th scope="col" className="px-5 py-4 font-bold">Acte</th>
                    <th scope="col" className="whitespace-nowrap px-5 py-4 text-right font-bold">Prix TTC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4DDD0]">
                  {ACTES.map((a) => (
                    <tr key={a.id}>
                      <th scope="row" className="px-5 py-4 font-semibold">
                        {a.nom}
                        <span className="block text-sm font-normal text-[#56695F]">{a.compris.join(" · ")}</span>
                      </th>
                      <td className="whitespace-nowrap px-5 py-4 text-right text-lg font-bold tabular-nums">{euros(a.prix)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="max-w-3xl space-y-3 leading-relaxed">
              <p>
                Prix d&apos;exemple, toutes taxes comprises, au {DATE_DES_TARIFS}. Les médicaments
                délivrés et les examens complémentaires sont facturés en plus, et toujours annoncés
                avant d&apos;être faits.
              </p>
              <p>
                La nuit, le dimanche et les jours fériés, la garde est assurée par le service de
                garde du secteur, qui a ses propres tarifs et te les donne au téléphone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-5 px-5 py-24 sm:px-8">
        <Apparition><Surtitre>Pourquoi tant de détails ?</Surtitre></Apparition>
        <Apparition as="p" delai={100} className="font-[family-name:var(--titres)] text-[clamp(2rem,4vw,3.4rem)] italic leading-[1.1]">
          « Une information claire, honnête et datée. » C&apos;est ce que notre code de
          déontologie demande. Alors on l&apos;écrit.
        </Apparition>
        <p className="text-[var(--doux)]">Code rural et de la pêche maritime, art. R242-35.</p>
      </section>

      <AppelFinal />
    </main>
  );
}
