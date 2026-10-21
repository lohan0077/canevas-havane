import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { CRENEAUX_POSE, DELAI } from "../_composants/donnees";
import Historique from "../_composants/Historique";

export const metadata: Metadata = {
  title: "Ma date de pose · Nuit d'Août — site de démonstration",
  description: "Le vrai délai de pose, mis à jour chaque lundi, et la date de pose qu'on réserve sur le site. Installateur de climatisation imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/nuit-d-aout/ma-date"),
};

export default function MaDate() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Avant l&apos;été</p>
          <h1 className="text-[2.9rem] sm:text-7xl font-light tracking-[-0.03em] leading-[1]">Ta date de pose.</h1>
          <p className="text-xl leading-relaxed text-[var(--doux)]">
            Chambre et salon, deux unités : choisis le jour. La date est pré-réservée, puis confirmée
            après la visite technique.
          </p>
          <p className="rounded-[18px] bg-[#F2B6A0] text-[var(--encre)] px-4 py-3">
            Délai de pose cette semaine : <strong>{DELAI.valeur}</strong> · mis à jour le {DELAI.majLe} · exemple
          </p>
        </div>
        <div className="min-w-0" data-film="dates">
          <Creneaux
            creneaux={CRENEAUX_POSE}
            colonnes={3}
            titreCarte="Ta pose"
            bouton="Réserver ma pose"
            confirmation="Pose pré-réservée : {creneau}"
            note={"Les jours marqués « Pris » le sont pour l'exemple. Sur le vrai site, ce sont de vraies poses."}
          />
        </div>
      </section>

      <section id="delai" className="scroll-mt-20 border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-light tracking-[-0.02em]">Pourquoi ce délai change.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Tout le monde appelle le jour de la canicule. Alors en juin, le délai grimpe. On l&apos;écrit
              tel qu&apos;il est, chaque lundi : ni gonflé pour te presser, ni réduit pour te rassurer.
            </p>
          </div>
          <Historique />
        </div>
      </section>
    </div>
  );
}
