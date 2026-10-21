import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import { Repere, Titre } from "../_composants/Blocs";
import Planning from "../_composants/Planning";

// « Et les vraies disponibilités, machine par machine. Tu réserves en ligne, comme une
// chambre d'hôtel. » La grille des samedis d'avril 2027 ; les cases prises sont un
// exemple, et la réservation ne part nulle part.
export const metadata: Metadata = {
  title: "Disponibilités · Samedi Chantier — site de démonstration",
  description: "Les samedis libres de chaque machine, réservables en ligne comme une chambre d'hôtel. Site de démonstration : rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/samedi-chantier/disponibilites"),
};

export default function Disponibilites() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-5 pt-8 pb-16 sm:pt-14 sm:pb-24 space-y-8">
      <div className="space-y-4 px-1">
        <Repere numero="04">Les disponibilités</Repere>
        <Titre niveau={1}>Les samedis <span className="text-[var(--accent-texte)]">libres.</span></Titre>
        <p className="text-lg leading-relaxed">Machine par machine. Touche un samedi libre, et réserve-le.</p>
      </div>

      <Planning />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[18px] border border-[var(--encre)] p-5 space-y-2">
          <p className="font-bold uppercase tracking-[0.04em]">Pas de samedi qui te va&nbsp;?</p>
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">La semaine aussi, on livre. Appelle-nous : on regarde ensemble.</p>
        </div>
        <div className="rounded-[18px] border border-[var(--encre)] p-5 space-y-2">
          <p className="font-bold uppercase tracking-[0.04em]">Avant le samedi</p>
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            Ta DT-DICT doit être faite.{" "}
            <Link href={`${DOSSIER}/dt-dict`} className="font-semibold text-[var(--encre)] underline decoration-[var(--accent)] decoration-[3px] underline-offset-4">On t&apos;aide</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
