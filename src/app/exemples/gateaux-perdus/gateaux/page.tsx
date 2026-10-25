import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import { ALLERGENES, DOSSIER, GATEAUX, PHOTOS, TAILLES, euros, prix } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les gâteaux — Gâteaux Perdus, site de démonstration",
  description: "Les gâteaux à partager d'une pâtisserie imaginaire, tous des recettes de famille retrouvées : prix de 6 à 30 parts, recette, et les 14 allergènes, gâteau par gâteau.",
  ...adressesDeLaPage("/exemples/gateaux-perdus/gateaux"),
};

// Ce que les gens tapent : « combien coûte un gâteau d'anniversaire pour 20 personnes »
// (suggestions Google relevées le 15/10/2026). La page donne le prix par taille, et les
// allergènes avant toute commande.
export default function LesGateaux() {
  return (
    <main>
      <EnTetePage surtitre="Les gâteaux" titre={"Combien pour *combien ?*"} photo={PHOTOS.couronneIngredients} origine="50% 40%">
        Chaque gâteau, son prix de 6 à 30 parts, sa recette, ses allergènes. Avant de commander,
        pas après. Et chacun est une recette de famille, retrouvée avec l&apos;accord de la famille.
      </EnTetePage>

      <section className="mx-auto max-w-7xl space-y-8 px-5 pb-24 sm:px-8 md:pb-32">
        {GATEAUX.map((g, i) => (
          <Apparition as="article" key={g.id} id={g.id} className="scroll-mt-24 grid overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] md:grid-cols-[0.85fr_1.15fr]">
            <div className={`relative aspect-[4/3] bg-[var(--sombre)] md:aspect-auto ${i % 2 ? "md:order-2" : ""}`}>
              <Image src={g.photo.src} alt={g.photo.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="space-y-5 p-6 sm:p-9">
              <p className="font-[family-name:var(--f-caveat)] text-2xl text-[var(--accent-texte)]">{g.famille}</p>
              <h2 className="text-[clamp(2.2rem,4vw,3.4rem)] leading-none">{g.nom}</h2>
              <p className="text-lg leading-relaxed">{g.recette}</p>
              <div className="rounded-2xl bg-[#E9B7C0] p-4">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em]">Allergènes</p>
                <p className="text-lg font-bold">{g.allergenes.join(", ")}.</p>
                {g.precision && <p className="text-sm">{g.precision}</p>}
              </div>
              <ul className="grid grid-cols-4 gap-2 text-center sm:grid-cols-8">
                {TAILLES.map((t) => (
                  <li key={t} className="rounded-xl border border-[var(--trait)] bg-[var(--fond)] px-1 py-2">
                    <span className="block text-[12px] text-[var(--doux)]">{t} parts</span>
                    <span className="block font-[family-name:var(--titres)] text-lg tabular-nums">{euros(prix(g, t))}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Apparition>
        ))}
        <p className="text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple : la pâtisserie est fictive.</p>
      </section>

      <section className="bg-[#F7E6CC]">
        <div className="mx-auto max-w-7xl space-y-10 px-5 py-24 sm:px-8 md:py-32">
          <div className="space-y-6">
            <Apparition><Surtitre>La liste officielle</Surtitre></Apparition>
            <TitreRevele
              texte="Les 14 allergènes, *gâteau par gâteau.*"
              className="max-w-4xl text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="max-w-2xl text-lg leading-relaxed text-[var(--doux)]">
              La liste du règlement européen, et ce que chaque gâteau contient. Les gâteaux sont faits
              dans le même atelier : en cas d&apos;allergie sévère, appelle-nous avant de commander.
            </Apparition>
          </div>
          <Apparition className="overflow-x-auto rounded-[1.5rem] border border-[var(--trait)] bg-[var(--carte)]">
            <table className="w-full min-w-[640px] text-left text-[15px]">
              <thead>
                <tr className="border-b border-[var(--trait)]">
                  <th scope="col" className="p-3 font-bold">Allergène</th>
                  {GATEAUX.map((g) => <th key={g.id} scope="col" className="p-3 font-bold">{g.court}</th>)}
                </tr>
              </thead>
              <tbody>
                {ALLERGENES.map((a) => (
                  <tr key={a} className="border-b border-[var(--trait)] last:border-0">
                    <th scope="row" className="p-3 font-normal">{a}</th>
                    {GATEAUX.map((g) => (
                      <td key={g.id} className="p-3 font-bold">{g.allergenes.includes(a) ? "Oui" : <span className="font-normal text-[var(--doux)]">—</span>}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Apparition>
          <Apparition><Bouton href={`${DOSSIER}/samedi`}>Commander pour samedi</Bouton></Apparition>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
