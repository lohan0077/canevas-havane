import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Agenda from "../_composants/Agenda";
import { EnTetePage, Surtitre } from "../_composants/Blocs";
import { cabinet } from "../_composants/donnees";

// La page que la vidéo « Remplir l'agenda » filme : l'agenda ([data-film=agenda]),
// les créneaux de 7 h et de 20 h, puis le nom et le téléphone ([data-film=formulaire]).
export const metadata: Metadata = {
  title: "Rendez-vous — Le Pourquoi, site de démonstration",
  description:
    "L'agenda en ligne d'un cabinet d'ostéopathie imaginaire : des créneaux à 7 h et à 20 h, un nom et un téléphone, et jamais de motif de consultation à écrire.",
  ...adressesDeLaPage("/exemples/le-pourquoi/rendez-vous"),
};

const A_SAVOIR = ["Créneaux dès 7 h, et jusqu'à 20 h 45", "Le même prix à toute heure", "Annulation en ligne jusqu'à 24 h avant", `Ou par téléphone : ${cabinet.telephone}`];

export default function RendezVous() {
  return (
    <main>
      <EnTetePage surtitre="Agenda en ligne" titre="Votre créneau, *en trois gestes.*">
        Le jour, l&apos;heure, un nom et un téléphone. On ne vous demande pas pourquoi vous venez :
        vous le direz au cabinet.
      </EnTetePage>
      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:py-28 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div className="space-y-6 lg:pt-6">
          <Apparition><Surtitre>À savoir</Surtitre></Apparition>
          <Apparition as="ul" delai={100} className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-lg">
            {A_SAVOIR.map((t) => (
              <li key={t} className="py-4">{t}</li>
            ))}
          </Apparition>
        </div>
        <div id="agenda" className="scroll-mt-24">
          <Apparition>
            <Agenda />
          </Apparition>
          <p className="mt-5 text-sm text-[var(--doux)]">En cas d&apos;urgence, ne réservez pas : appelez le 15.</p>
        </div>
      </section>
    </main>
  );
}
