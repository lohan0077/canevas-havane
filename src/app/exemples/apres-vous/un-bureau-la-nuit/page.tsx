import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { AppelFinal, Section, Surtitre } from "../_composants/Blocs";
import AvantApres from "../_composants/AvantApres";

export const metadata: Metadata = {
  title: "Un bureau, la nuit · Après Vous — site de démonstration",
  description: "Notre série : un bureau, la nuit, du sale au propre en trente secondes. Tournée dans nos propres locaux, sans document, écran ni nom visible.",
  ...adressesDeLaPage("/exemples/apres-vous/un-bureau-la-nuit"),
};

const EPISODES = [
  ["Épisode 12", "Le bureau du vendredi soir", "21:02 → 21:32"],
  ["Épisode 11", "La salle de réunion après l'atelier", "20:15 → 20:41"],
  ["Épisode 10", "La cuisine du lundi", "19:50 → 20:12"],
];

export default function UnBureauLaNuit() {
  return (
    <>
      <Section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Surtitre>Notre série</Surtitre>
          <h1 className="text-[56px] sm:text-8xl leading-[0.98]">Un bureau, <span className="italic text-[var(--accent-texte)]">la nuit.</span></h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Du sale au propre, en trente secondes. Glissez le volet&nbsp;: c'est ce qu'on fait chaque soir,
            quand vous n'êtes plus là.
          </p>
          <p className="text-sm leading-relaxed text-[var(--doux)]">
            Tournée dans nos propres locaux, jamais chez un client&nbsp;: un bureau la nuit est plein
            d'informations qui ne nous regardent pas. Ici, ni document, ni écran allumé, ni nom.
          </p>
        </div>
        <AvantApres />
      </Section>

      <div className="bg-[var(--carte)]">
        <Section className="space-y-6">
          <h2 className="text-[40px] sm:text-6xl leading-[1]">Les derniers épisodes.</h2>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {EPISODES.map(([n, t, h]) => (
              <li key={n} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">{n}</span>
                <span className="flex-1 font-[family-name:var(--titres)] text-2xl">{t}</span>
                <span className="tabular-nums text-[var(--doux)]">{h}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--doux)]">Épisodes d'exemple : l'entreprise est fictive.</p>
        </Section>
      </div>

      <AppelFinal />
    </>
  );
}
