import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Coin, CORAIL, EnTetePage, TITRE } from "../_composants/Blocs";
import ReserverSamedi from "../_composants/ReserverSamedi";
import { SOIREE_MARIAGE } from "../_composants/donnees";

// « Le client se demande plus s'il a besoin d'un DJ. Il bloque son samedi, direct sur le
// site. » La grille des samedis, les vrais ; on en touche un, et « Bloquer ma date ».
export const metadata: Metadata = {
  title: "Samedis libres — Lundi d'Après, site de démonstration",
  description: "Les samedis encore libres, les vrais, mis à jour à chaque réservation : on bloque sa date directement sur le site. Site de démonstration.",
  ...adressesDeLaPage("/exemples/lundi-d-apres/samedis-libres"),
};

export default function SamedisLibresPage() {
  return (
    <main>
      <EnTetePage coin="mis à jour à chaque réservation" titre="Les samedis *encore libres.*">
        Les vrais. Touchez un samedi libre, et bloquez votre date directement sur le site. L&apos;heure de fin, c&apos;est la salle qui
        la fixe.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Coin>juin et juillet 2027</Coin></Apparition>
          <TitreRevele texte="Votre samedi, *bloqué.*" className={`text-[clamp(3rem,6vw,5.2rem)] ${TITRE}`} classeAccent={CORAIL} />
          <Apparition as="ol" delai={150} className="space-y-3">
            {SOIREE_MARIAGE.map((m) => (
              <li key={m.heure} className="flex gap-4 border-b border-[var(--trait)] pb-3">
                <span className="w-14 shrink-0 font-[family-name:var(--titres)] text-2xl font-extrabold text-[var(--accent-texte)]">{m.heure}</span>
                <span className="font-semibold">{m.titre}</span>
              </li>
            ))}
          </Apparition>
        </div>
        <Apparition de="zoom"><ReserverSamedi /></Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
