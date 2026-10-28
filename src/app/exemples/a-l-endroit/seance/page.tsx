import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { DEROULE } from "../_composants/donnees";
import ChoixMontures from "../_composants/ChoixMontures";

export const metadata: Metadata = {
  title: "Réserver une séance · À l'Endroit — site de démonstration",
  description: "Mets cinq montures de côté, choisis ton créneau : trente minutes devant un écran qui ne t'inverse pas. Démonstration, rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/a-l-endroit/seance"),
};

export default function PageSeance() {
  return (
    <main className="mx-auto max-w-6xl space-y-16 px-5 py-12 sm:py-20">
      <header className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Séance d&apos;essayage · 30 minutes</p>
          <h1 className="text-6xl sm:text-8xl">Toi, <em>à l&apos;endroit.</em></h1>
          <p className="max-w-lg text-lg leading-relaxed">
            Mets de côté jusqu&apos;à cinq montures, choisis ton créneau. Elles t&apos;attendront
            devant l&apos;écran.
          </p>
        </div>
        <ol className="space-y-3 border-l-2 border-[var(--encre)] pl-5">
          {DEROULE.map((d) => (
            <li key={d.titre}>
              <p className="text-sm font-bold tabular-nums text-[var(--doux)]">{d.temps}</p>
              <p className="font-[family-name:var(--titres)] text-2xl">{d.titre}</p>
            </li>
          ))}
        </ol>
      </header>
      <ChoixMontures />
    </main>
  );
}
