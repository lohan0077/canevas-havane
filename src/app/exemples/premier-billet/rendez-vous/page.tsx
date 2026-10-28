import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Creneaux from "../../_kit/Creneaux";
import { EnTetePage } from "../_composants/Blocs";
import { CRENEAUX, DELAI_DU_MOIS, cabinet, heures } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Rendez-vous — Premier Billet, site de démonstration",
  description: "Le premier rendez-vous avec un cabinet d'expertise comptable imaginaire : une heure, au cabinet ou par téléphone, réservée en ligne. Rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/premier-billet/rendez-vous"),
};

const REPERES = [
  "Une heure, au cabinet ou par téléphone",
  "Votre statut, votre activité, vos questions",
  "Sans engagement : la lettre de mission vient après",
  `Notre délai de réponse ce mois-ci : ${heures(DELAI_DU_MOIS)} (exemple)`,
  `Ou par téléphone : ${cabinet.telephone}`,
];

export default function RendezVous() {
  return (
    <main>
      <EnTetePage vert surtitre="Premier rendez-vous" titre="Une heure, *pour votre projet.*">
        Choisissez un créneau. Nous vous appelons, ou nous vous recevons au cabinet, à l&apos;heure dite.
      </EnTetePage>
      <section className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.75fr_1.25fr]">
        <Apparition as="ul" className="space-y-4 text-[18px] lg:pt-4">
          {REPERES.map((t) => (
            <li key={t} className="flex gap-3 border-b border-[var(--trait)] pb-4">
              <span aria-hidden="true" className="text-[var(--accent-texte)]">→</span>
              {t}
            </li>
          ))}
        </Apparition>
        <Apparition de="zoom" className="order-first border border-[var(--trait)] bg-[var(--carte)] p-5 lg:order-none shadow-[0_40px_80px_-50px_rgba(10,25,20,0.6)] sm:p-8">
          <Creneaux
            creneaux={CRENEAUX}
            colonnes={3}
            titreCarte="Votre premier rendez-vous"
            bouton="Réserver ce créneau"
            confirmation="Rendez-vous réservé : {creneau}. Nous vous attendons."
            note="Créneaux d'exemple. Sur un vrai site, ils suivent l'agenda réel du cabinet."
          />
        </Apparition>
      </section>
    </main>
  );
}
