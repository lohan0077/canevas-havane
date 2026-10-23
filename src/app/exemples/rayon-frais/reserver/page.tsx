import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Soirs from "../_composants/Soirs";
import { EnTetePage, Surtitre } from "../_composants/Blocs";
import { aApporter, cabinet } from "../_composants/donnees";

// La page que la vidéo « Remplir l'agenda » filme : le patient réserve son mardi soir,
// directement sur le site. Ni poids, ni objectif, ni motif : un nom et un téléphone.
export const metadata: Metadata = {
  title: "Réserver un soir — Rayon Frais, site de démonstration",
  description:
    "Réserver un soir chez une diététicienne imaginaire, jusqu'à 20 h 30 : une séance, un soir, une heure, un nom et un téléphone. Rien d'autre.",
  ...adressesDeLaPage("/exemples/rayon-frais/reserver"),
};

export default function Reserver() {
  return (
    <main>
      <EnTetePage ton="vert" surtitre="Réserver un soir" titre={"Votre soir, *jusqu'à 20 h 30.*"}>
        La séance, le soir, l&apos;heure. Puis un nom et un téléphone : ni poids, ni objectif,
        ni motif à écrire.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <Apparition de="zoom">
          <Soirs />
        </Apparition>
        <div className="space-y-6 px-1 lg:sticky lg:top-28">
          <Apparition><Surtitre>À apporter mardi</Surtitre></Apparition>
          <ul className="space-y-3">
            {aApporter.map((a, i) => (
              <Apparition as="li" key={a.id} delai={i * 100} className="rounded-[1.25rem] border-2 border-[var(--encre)] bg-white p-5">
                <p className="font-[family-name:var(--titres)] text-xl font-bold">{a.libelle}</p>
                <p className="mt-1 text-[var(--doux)]">{a.detail}</p>
              </Apparition>
            ))}
          </ul>
          <Apparition as="p" delai={350} className="text-[var(--doux)]">
            Annulation jusqu&apos;à 24 h avant. Ou par téléphone : <span className="whitespace-nowrap font-semibold tabular-nums text-[var(--encre)]">{cabinet.telephone}</span>.
          </Apparition>
        </div>
      </section>
    </main>
  );
}
