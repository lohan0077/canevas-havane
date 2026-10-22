import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Agenda from "../_composants/Agenda";
import { EnTetePage } from "../_composants/Blocs";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Rendez-vous — Le Pourquoi, site de démonstration",
  description:
    "L'agenda en ligne d'un cabinet d'ostéopathie imaginaire : des créneaux à 7 h et à 20 h, un nom et un téléphone, et jamais de motif de consultation à écrire.",
  ...adressesDeLaPage("/exemples/le-pourquoi/rendez-vous"),
};

export default function RendezVous() {
  return (
    <main>
      <EnTetePage surtitre="Agenda en ligne" titre="Votre créneau, *en trois gestes.*">
        Le jour, l&apos;heure, un nom et un téléphone. On ne vous demande pas pourquoi vous venez :
        vous le direz au cabinet.
      </EnTetePage>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.7fr_1.3fr]">
        <Apparition as="ul" className="space-y-4 font-[family-name:var(--titres)] text-lg lg:pt-8">
          {["Créneaux dès 7 h, et jusqu'à 20 h 45", "Le même prix à toute heure", "Annulation en ligne jusqu'à 24 h avant", `Ou par téléphone : ${cabinet.telephone}`].map((t) => (
            <li key={t} className="flex gap-3 border-b border-[var(--trait)] pb-4">
              <span aria-hidden="true" className="text-[var(--accent-texte)]">→</span>
              {t}
            </li>
          ))}
        </Apparition>
        <div id="agenda" className="scroll-mt-24">
          <Apparition de="zoom">
            <Agenda />
          </Apparition>
          <p className="mt-5 text-sm text-[var(--doux)]">En cas d&apos;urgence, ne réservez pas : appelez le 15.</p>
        </div>
      </section>
    </main>
  );
}
