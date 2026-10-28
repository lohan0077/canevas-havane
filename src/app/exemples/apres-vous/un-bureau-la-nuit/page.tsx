import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, Affiche, AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import AvantApres from "../_composants/AvantApres";
import { photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Un bureau, la nuit — Après Vous, site de démonstration",
  description: "Notre série : un bureau, la nuit, du sale au propre en trente secondes. Tournée dans nos propres locaux, sans document, écran ni nom visible.",
  ...adressesDeLaPage("/exemples/apres-vous/un-bureau-la-nuit"),
};

const EPISODES = [
  ["Épisode 12", "Le bureau du vendredi soir", "21:02 → 21:32"],
  ["Épisode 11", "La salle de réunion après l'atelier", "20:15 → 20:41"],
  ["Épisode 10", "La cuisine du lundi", "19:50 → 20:12"],
  ["Épisode 9", "L'accueil, un soir de pluie", "19:40 → 20:05"],
];

export default function UnBureauLaNuit() {
  return (
    <main>
      <EnTetePage surtitre="Notre série" titre="Un bureau, *la nuit.*" photo={photos.interrupteur} origine="75% 50%">
        Du sale au propre, en trente secondes. Tournée dans nos propres locaux, jamais chez un client&nbsp;: un bureau la nuit
        est plein d&apos;informations qui ne nous regardent pas.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="space-y-6">
          <Apparition><Surtitre>Glissez le volet</Surtitre></Apparition>
          <TitreRevele texte="Du sale *au propre.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,6vw,5.2rem)] font-normal leading-[0.95]" classeAccent={ACCENT} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            C&apos;est ce qu&apos;on fait chaque soir, quand vous n&apos;êtes plus là. Ici, ni document, ni écran allumé, ni nom&nbsp;: le
            bureau est dessiné.
          </Apparition>
        </div>
        <Apparition de="zoom"><AvantApres /></Apparition>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--sombre)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <TitreRevele texte="Les derniers *épisodes.*" className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] font-normal leading-[0.95]" classeAccent={ACCENT} />
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {EPISODES.map(([n, t, h], i) => (
                <Apparition as="li" key={n} delai={i * 90} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">{n}</span>
                  <span className="flex-1 font-[family-name:var(--titres)] text-[28px] leading-tight">{t}</span>
                  <span className="tabular-nums text-[var(--doux)]">{h}</span>
                </Apparition>
              ))}
            </ul>
            <p className="text-sm text-[var(--doux)]">Épisodes d&apos;exemple&nbsp;: l&apos;entreprise est fictive.</p>
          </div>
          <Apparition de="bas" className="[clip-path:none]"><Affiche /></Apparition>
        </div>
      </section>

      <div className="pt-24 md:pt-32">
        <AppelFinal />
      </div>
    </main>
  );
}
