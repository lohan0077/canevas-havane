import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { CRENEAUX, TARIFS, entreprise } from "../_composants/donnees";
import { Pastille } from "../_composants/Blocs";

// La réservation. La vidéo : « Le client sait exactement ce qu'il achète. Alors il
// réserve son premier appel. » Le format et le prix d'abord, puis les créneaux.
export const metadata: Metadata = {
  title: "Premier appel · Franchement — site de démonstration",
  description: "Réserver un premier appel de 20 minutes avec un coach imaginaire, puis, si on continue, une séance d'une heure à 90 € TTC (prix d'exemple). Site de démonstration.",
  ...adressesDeLaPage("/exemples/franchement/premier-appel"),
};

export default function PremierAppel() {
  return (
    <main className="px-3 pt-2 pb-16">
      <div className="max-w-6xl mx-auto grid gap-3 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <section className="rounded-[36px] bg-[var(--carte)] px-6 py-8 sm:px-10 sm:py-12 space-y-5">
          <Pastille>{TARIFS.appel.nom} · {TARIFS.appel.duree}</Pastille>
          <h1 className="text-[46px] sm:text-7xl font-extrabold tracking-[-0.05em]">
            On regarde <span className="text-[var(--accent-texte)]">ta question.</span>
          </h1>
          <p className="text-lg leading-relaxed">
            Vingt minutes au téléphone, {TARIFS.appel.prix.toLowerCase()}. Puis, si on
            continue&nbsp;: séance d&apos;une heure, {TARIFS.seance.prix} TTC (prix d&apos;exemple).
            Rien à payer d&apos;avance, rien à acheter en paquet.
          </p>
        </section>
        <section id="creneaux" data-film="creneaux" aria-label="Choisir un créneau" className="rounded-[36px] bg-[var(--carte)] p-5 sm:p-8 space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.14em]">Cette semaine et la suivante</p>
          <Creneaux
            creneaux={CRENEAUX}
            colonnes={2}
            titreCarte="Ton appel"
            bouton="Réserver l'appel"
            confirmation="Appel réservé. Je t'appelle à l'heure dite."
            note="Créneaux pris : exemple, l'entreprise est fictive."
          />
          <p className="text-sm text-[var(--doux)]">
            Tu préfères appeler&nbsp;? {entreprise.telephone} (numéro fictif, réservé par l&apos;ARCEP
            aux œuvres de fiction).
          </p>
        </section>
      </div>
    </main>
  );
}
