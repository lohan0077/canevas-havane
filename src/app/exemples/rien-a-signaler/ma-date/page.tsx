import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Creneaux from "../../_kit/Creneaux";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT_CLAIR, AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Historique from "../_composants/Historique";
import { CRENEAUX_POSE, DELAI } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ma date de pose — Rien à Signaler, site de démonstration",
  description:
    "Le vrai délai de pose, mis à jour chaque lundi, et la date de pose qu'on réserve sur le site, pour une alarme ou une clim. Installateur imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/rien-a-signaler/ma-date"),
};

// La page de la date de pose : la grille `data-film="dates"` est filmée par la vidéo
// « Remplir l'agenda » (« Il réserve sa pose, directement sur le site »).
export default function MaDate() {
  return (
    <main>
      <EnTetePage surtitre="Avant l'été" titre="Ta date *de pose.*">
        Alarme ou clim : choisis le jour. La date est pré-réservée, puis confirmée après la visite technique.
        Délai de pose cette semaine : {DELAI.valeur}, mis à jour le {DELAI.majLe} (exemple).
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <Apparition as="ul" className="space-y-4 font-[family-name:var(--titres)] text-lg lg:pt-6">
          {[
            `Premier jour libre : au bout du délai de ${DELAI.valeur}`,
            "Une demi-journée pour une alarme",
            "Une journée pour une ou deux unités de clim",
            "Confirmée après la visite technique",
          ].map((t) => (
            <li key={t} className="flex gap-3 border-b border-[var(--trait)] pb-4">
              <span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>
              {t}
            </li>
          ))}
        </Apparition>
        <Apparition de="zoom" className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8" data-film="dates">
          <p className="mb-5 font-[family-name:var(--titres)] text-3xl font-semibold tracking-[-0.04em]">Ta pose</p>
          <Creneaux
            creneaux={CRENEAUX_POSE}
            colonnes={3}
            titreCarte="Ta pose"
            bouton="Réserver ma pose"
            confirmation="Pose pré-réservée : {creneau}"
            note={"Les jours marqués « Pris » le sont pour l'exemple. Sur le vrai site, ce sont de vraies poses."}
          />
        </Apparition>
      </section>

      <section id="delai" className="scroll-mt-24 px-3 pb-24 sm:px-5 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[2rem] bg-[var(--sombre)] px-6 py-16 text-[var(--sur-sombre)] sm:px-12 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-24">
          <div className="space-y-6">
            <Apparition><Surtitre clair>Le vrai délai</Surtitre></Apparition>
            <TitreRevele
              texte="Pourquoi ce délai *change.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.8vw,4.4rem)] font-semibold leading-[1] tracking-[-0.05em]"
              classeAccent="font-[family-name:var(--f-instrument)] italic font-normal tracking-[-0.01em] text-[#A9D3AE]"
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Tout le monde appelle le jour de la canicule. Alors en juin, le délai grimpe. On l&apos;écrit tel qu&apos;il
              est, chaque lundi, tout en haut du site : ni gonflé pour te presser, ni réduit pour te rassurer.
            </Apparition>
          </div>
          <Historique sombre />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24 text-center sm:px-8 md:pb-32">
        <TitreRevele
          texte="Tu n'attends plus la canicule. *Tu signes au printemps.*"
          className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.05em]"
          classeAccent={ACCENT_CLAIR}
        />
      </section>

      <AppelFinal />
    </main>
  );
}
