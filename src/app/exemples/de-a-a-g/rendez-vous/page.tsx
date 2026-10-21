import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Barres, Certification, Tuile } from "../_composants/Blocs";
import RendezVous from "../_composants/RendezVous";

// Le rendez-vous se prend en ligne, et le numéro de certification est en vue. Afficher le
// numéro sur le site est un conseil, pas une obligation (les rapports, eux, nomment
// l'organisme certificateur : CCH R271-3, al. 2). Numéros d'exemple.
export const metadata: Metadata = {
  title: "Rendez-vous — De A à G, site de démonstration",
  description: "Prendre rendez-vous en ligne pour ses diagnostics immobiliers, la certification du diagnostiqueur en vue. Exemple d'un cabinet imaginaire.",
  ...adressesDeLaPage("/exemples/de-a-a-g/rendez-vous"),
};

export default function PageRendezVous() {
  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        <div className="space-y-3 px-1 pt-2">
          <p className="inline-flex items-center gap-2 rounded-full bg-[var(--carte)] px-3.5 py-1.5 text-[13px] font-semibold text-[var(--accent-texte)] ring-1 ring-[var(--trait)]">
            <Barres />
            Rendez-vous
          </p>
          <h1 className="text-[44px] font-bold leading-[0.98] tracking-[-0.04em] sm:text-[60px]">
            À toi de <span className="text-[var(--accent-texte)]">choisir.</span>
          </h1>
        </div>
        <Tuile teinte="lilas" className="space-y-3" >
          <div data-film="certification">
            <Certification />
          </div>
        </Tuile>
        <Tuile teinte="menthe" className="hidden space-y-2 lg:block">
          <p className="text-[16px] font-semibold">Le pack vente · le rapport sous 48 h</p>
          <p className="text-[15px] text-[var(--doux)]">Délai et prix d&apos;exemple. Le pack dépend de ton bien : fais les trois questions de l&apos;accueil.</p>
        </Tuile>
      </div>
      <RendezVous />
    </div>
  );
}
