import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Agenda from "../_composants/Agenda";
import { Intitule, Serif } from "../_composants/Blocs";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Réserver — Sans Détour, site de démonstration",
  description:
    "L'agenda en ligne d'un ostéopathe imaginaire : des créneaux à 7 h et à 20 h, un nom et un téléphone, et jamais de motif de consultation à écrire.",
  ...adressesDeLaPage("/exemples/sans-detour/reserver"),
};

export default function Reserver() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-8">
        <Intitule niveau={1} surtitre="Agenda en ligne" titre={<>Votre créneau, <Serif>en trois gestes.</Serif></>}>
          Le jour, l&apos;heure, un nom et un téléphone. On ne vous demande pas pourquoi vous
          venez : vous le direz au cabinet.
        </Intitule>
        <ul className="hidden lg:block space-y-3 text-[17px]">
          <li className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)] font-extrabold">→</span> Créneaux dès 7 h, et jusqu&apos;à 20 h</li>
          <li className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)] font-extrabold">→</span> Annulation en ligne jusqu&apos;à 24 h avant</li>
          <li className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)] font-extrabold">→</span> Ou par téléphone : <span className="font-bold tabular-nums">{cabinet.telephone}</span></li>
        </ul>
      </div>
      <div id="agenda" className="scroll-mt-20">
        <Agenda />
        <p className="mt-5 text-sm text-[var(--doux)]">
          En cas d&apos;urgence, ne réservez pas : appelez le 15.
        </p>
      </div>
    </main>
  );
}
