import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Horloge from "../_composants/Horloge";
import { BoutonRdv, Surtitre } from "../_composants/Blocs";
import { cabinet, etapes } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La première séance — Cinquante Minutes, site de démonstration",
  description:
    "Une horloge de cinquante minutes qui raconte la première séance chez une psychologue imaginaire : un déroulé, pas une promesse.",
  ...adressesDeLaPage("/exemples/cinquante-minutes/premiere-seance"),
};

export default function PremiereSeance() {
  return (
    <main>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-16 space-y-7">
        <div className="space-y-4 px-1">
          <Surtitre>La première séance · {cabinet.seance.duree}</Surtitre>
          <h1 className="text-[42px] sm:text-6xl">Ce qui se passe, <em className="text-[var(--accent-texte)]">minute après minute.</em></h1>
        </div>
        <Horloge />
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-6 pb-20 space-y-8">
        <h2 className="text-[34px] sm:text-5xl">Les cinquante minutes, <em>en entier.</em></h2>
        <ol className="border-l border-[var(--trait)] ml-2 space-y-9">
          {etapes.map((e) => (
            <li key={e.minute} className="relative pl-8">
              <span aria-hidden="true" className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-[var(--accent)]" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)] tabular-nums">{e.minute} min</p>
              <h3 className="mt-1 text-[28px] italic">{e.texte}</h3>
              <p className="mt-2 text-lg leading-relaxed text-[var(--doux)]">{e.detail}</p>
            </li>
          ))}
        </ol>
        <p className="text-[var(--doux)]">
          Un déroulé d&apos;exemple : chaque psychologue a sa façon de faire, et la durée d&apos;une
          séance varie d&apos;un cabinet à l&apos;autre. Aucune séance ne promet un résultat.
        </p>
        <BoutonRdv />
      </section>
    </main>
  );
}
