import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { EnTetePage, Section, Surtitre, Titre } from "../_composants/Blocs";
import ReserverSamedi from "../_composants/ReserverSamedi";
import { SOIREE_MARIAGE, photos } from "../_composants/donnees";

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
      <EnTetePage titre="les samedis encore libres." photo={photos.bouleRose}>
        Les vrais, mis à jour à chaque réservation. Touchez un samedi libre, et bloquez votre date directement sur le site. L&apos;heure de fin, c&apos;est la salle qui
        la fixe.
      </EnTetePage>

      <Section className="grid grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Surtitre>Juin et juillet 2027</Surtitre>
          <Titre texte="votre samedi, bloqué." />
          <Apparition as="ol" delai={150} className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {SOIREE_MARIAGE.map((m) => (
              <li key={m.heure} className="flex gap-4 py-3">
                <span className="w-14 shrink-0 font-[family-name:var(--titres)] font-semibold text-2xl text-[var(--accent-texte)]">{m.heure}</span>
                <span className="font-medium">{m.titre}</span>
              </li>
            ))}
          </Apparition>
        </div>
        <Apparition delai={150}><ReserverSamedi /></Apparition>
      </Section>
    </main>
  );
}
