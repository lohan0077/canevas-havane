import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { EnTetePage } from "../_composants/Blocs";
import { AgendaSemaine } from "../_composants/Outils";
import { PRIX, entreprise } from "../_composants/donnees";

// L'agenda, en vrai. La vidéo « Remplir l'agenda » : « Et l'agenda, en vrai, sur le
// site. Mercredi, quatorze heures, un clic : c'est réservé. »
export const metadata: Metadata = {
  title: "Réserver — Clair de Salon, site de démonstration",
  description: "Les créneaux de la semaine pour un cours de piano ou de maths à domicile, réservables en un clic. Site de démonstration : rien n'est envoyé ni enregistré.",
  ...adressesDeLaPage("/exemples/clair-de-salon/reserver"),
};

export default function Reserver() {
  return (
    <main>
      <EnTetePage surtitre="Semaine du 2 novembre" titre="L'agenda, *en vrai.*">
        Piano le soir, maths le mercredi. Un clic, et le créneau est à vous ; la professeure
        vous rappelle pour le morceau ou le chapitre.
      </EnTetePage>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:py-24 lg:grid-cols-[0.7fr_1.3fr]">
        <Apparition as="ul" className="order-2 space-y-4 text-lg lg:order-1 lg:pt-6">
          {[
            `${PRIX.heure} € TTC l'heure, piano ou maths (exemple)`,
            "Chez vous, déplacement compris",
            "Annulation sans frais jusqu'à la veille",
            `Ou par téléphone : ${entreprise.telephone}`,
          ].map((t) => (
            <li key={t} className="flex gap-3 border-b border-[var(--trait)] pb-4">
              <span aria-hidden="true" className="text-[var(--accent-texte)]">☾</span>
              {t}
            </li>
          ))}
          <li className="text-sm text-[var(--doux)]">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</li>
        </Apparition>
        <div id="agenda" className="order-1 scroll-mt-24 lg:order-2">
          <Apparition de="zoom">
            <AgendaSemaine />
          </Apparition>
          <p className="mt-4 text-sm text-[var(--doux)]">Créneaux pris : exemple, l&apos;entreprise est fictive.</p>
        </div>
      </section>
    </main>
  );
}
