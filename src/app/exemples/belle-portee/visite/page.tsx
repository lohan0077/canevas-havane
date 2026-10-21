import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { DateDeVisite, Verifications } from "../_composants/Blocs";

// « Et le site ne te dit jamais oui à distance. Il te dit quoi vérifier, et te propose
// une date de visite. » Les trois vérifications, puis les créneaux du kit (filmés).
export const metadata: Metadata = {
  title: "Belle Portée — site de démonstration",
  description: "Avant de dire oui, on vient voir ton mur : ce que la visite vérifie, et les créneaux de la semaine. Démonstration d'un bureau d'études structure imaginaire.",
  ...adressesDeLaPage("/exemples/belle-portee/visite"),
};

export default function LaVisite() {
  return (
    <>
      <section className="mx-auto max-w-6xl space-y-8 px-5 pb-12 pt-8 sm:pt-14">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Avant de dire oui</p>
          <h1 className="text-5xl font-bold uppercase leading-[0.95] sm:text-7xl">On vient voir ton mur.</h1>
          <p className="text-lg leading-relaxed">Jamais de oui à distance. Voilà ce qu&apos;on vérifie sur place, en une heure.</p>
        </div>
        <Verifications />
      </section>
      <section id="creneaux" className="scroll-mt-20 border-t-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold uppercase leading-[0.95]">Choisis ta date.</h2>
            <p className="leading-relaxed text-[var(--doux)]">La visite : 180 € TTC, exemple. On te dit ce qu&apos;on a vu avant de partir.</p>
          </div>
          <DateDeVisite />
        </div>
      </section>
    </>
  );
}
