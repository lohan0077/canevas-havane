import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Billet from "../_composants/Billet";
import { AppelFinal, Bouton, EnTetePage } from "../_composants/Blocs";
import { DOSSIER, VOYAGES, euros, photos } from "../_composants/donnees";

// Les six voyages qu'on promet le plus (« Créer une marque » : « On ira au Japon, un
// jour. »), avec le bon mois pour partir et un budget d'exemple pour deux.
export const metadata: Metadata = {
  title: "Les voyages promis — Parole Tenue, site de démonstration",
  description: "Les six voyages qu'on promet le plus, avec le bon mois pour partir et un budget d'exemple. Agence fictive, site de démonstration.",
  ...adressesDeLaPage("/exemples/parole-tenue/voyages"),
};

export default function Voyages() {
  return (
    <main>
      <EnTetePage surtitre="Les voyages promis" titre="Six promesses, *et leur bon mois.*" photo={photos.venise}>
        Les voyages qu&apos;on promet le plus, et ceux qu&apos;on repousse le plus longtemps. Pour chacun : quand
        partir, combien de temps, et un budget d&apos;exemple pour deux.
      </EnTetePage>

      <ul className="mx-auto max-w-7xl space-y-6 px-4 py-20 sm:px-8 md:py-28">
        {VOYAGES.map((v, i) => {
          const p = v.photo ? photos[v.photo] : null;
          return (
            <Apparition as="li" key={v.id} className="grid gap-6 overflow-hidden rounded-[2.5rem] bg-[var(--carte)] p-4 shadow-[0_30px_60px_-50px_rgba(22,48,42,0.8)] sm:p-6 md:grid-cols-2 md:items-center">
              <div className={`relative aspect-[3/2] overflow-hidden rounded-[1.8rem] ${i % 2 ? "md:order-2" : ""}`}>
                {p ? (
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
                ) : (
                  <div className="grid h-full place-items-center bg-[#F3EAD8] p-8">
                    <div className="w-full max-w-[280px]"><Billet ou={v.nom} pour="un jour" angle={-3} /></div>
                  </div>
                )}
              </div>
              <div className="space-y-4 p-2 sm:p-4">
                <p className="font-[family-name:var(--titres)] text-[1.7rem] italic leading-tight text-[var(--accent-texte)]">«&nbsp;{v.phrase}&nbsp;»</p>
                <h2 className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4rem)] font-normal leading-none">{v.nom}</h2>
                <dl className="grid grid-cols-2 gap-4 text-[15px]">
                  <div><dt className="text-[var(--doux)]">Le bon mois</dt><dd className="font-semibold">{v.pourquoi}</dd></div>
                  <div><dt className="text-[var(--doux)]">Durée</dt><dd className="font-semibold">{v.duree}</dd></div>
                  <div className="col-span-2"><dt className="text-[var(--doux)]">Budget exemple, pour deux, TTC</dt><dd className="font-[family-name:var(--titres)] text-[2.4rem] leading-none tabular-nums">{euros(v.budget)}</dd></div>
                </dl>
              </div>
            </Apparition>
          );
        })}
      </ul>

      <section className="mx-auto max-w-7xl space-y-6 px-5 pb-20 sm:px-8">
        <p className="max-w-3xl text-[15px] text-[var(--doux)]">
          Budgets d&apos;exemple : ce ne sont pas des offres. Le prix réel est écrit dans le formulaire
          d&apos;information remis avant tout contrat de voyage (Code du tourisme, art. L.211-8).
        </p>
        <Bouton href={`${DOSSIER}/ta-promesse`}>Écrire ma promesse</Bouton>
      </section>

      <AppelFinal />
    </main>
  );
}
