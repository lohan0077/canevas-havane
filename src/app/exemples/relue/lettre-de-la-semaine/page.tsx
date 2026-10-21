import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { LETTRE, photos } from "../_composants/donnees";
import Lecture from "../_composants/Lecture";
import ProposerLettre from "../_composants/ProposerLettre";

export const metadata: Metadata = {
  title: "La lettre de la semaine · Relue — site de démonstration",
  description: "Chaque semaine, Relue lit à voix haute une vraie lettre, avec l'accord de celui qui l'a écrite. Papeterie imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/relue/lettre-de-la-semaine"),
};

export default function LettreDeLaSemaine() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Chaque semaine · lettre n° {LETTRE.numero}</p>
          <h1 className="font-normal text-[3.2rem] leading-[0.98] sm:text-7xl">Une vraie lettre, <span className="italic">lue à voix haute.</span></h1>
          <p className="text-xl leading-relaxed">
            Avec l&apos;accord de celui qui l&apos;a écrite. Cette semaine : Robert, à Brest, en mai 1984.
          </p>
        </div>
        <div className="min-w-0">
          <Lecture />
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="font-normal text-5xl">Le papier est à toi. <span className="italic">Le texte, à celui qui l&apos;a écrit.</span></h2>
            <p className="text-lg leading-relaxed">
              Une lettre reçue t&apos;appartient comme objet. Mais seul son auteur décide de la faire
              connaître (code de la propriété intellectuelle, art. L121-2) — ou ses héritiers, s&apos;il
              n&apos;est plus là. Alors on demande, toujours, avant de lire.
            </p>
            <p className="text-lg leading-relaxed">
              Et si la lettre nomme d&apos;autres personnes, on change leur prénom, ou on leur demande
              aussi.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-normal text-3xl">Proposer une lettre</h2>
            <ProposerLettre />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-[4px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.lettres.src} alt={photos.lettres.alt} fill sizes="(min-width: 1152px) 1088px, 100vw" className="object-cover" />
        </div>
      </section>
    </div>
  );
}
