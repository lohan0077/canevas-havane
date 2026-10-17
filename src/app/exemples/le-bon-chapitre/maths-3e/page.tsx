import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, METHODE, photos } from "../_composants/donnees";
import { AppelFinal, Note } from "../_composants/Blocs";
import { styleCahier } from "../_composants/cahier";
import { CalculMois, PrixCours } from "../_composants/Prix";
import Programme3e from "../_composants/Programme3e";

// La page par classe. La vidéo : « Ensuite, une page par classe. Maths, troisième : la
// méthode, le programme, le prix. » Parce que c'est ce que tapent les parents : « prix
// cours particulier maths 3ème » (suggestion Google relevée le 15/10/2026).
export const metadata: Metadata = {
  title: "Maths, 3e · Le Bon Chapitre — site de démonstration",
  description: "Cours de maths de 3e à domicile : la méthode, le programme, le prix à l'heure (exemple). Site de démonstration d'une professeure imaginaire.",
  ...adressesDeLaPage("/exemples/le-bon-chapitre/maths-3e"),
};

export default function Maths3e() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-12 sm:pt-12">
        <div className="rounded-[6px] border border-[var(--trait)] pl-12 pr-5 py-8 sm:pl-16 sm:pr-10 sm:py-12 space-y-5" style={styleCahier}>
          <Note>Cours à domicile</Note>
          <h1 className="text-[64px] sm:text-[96px]">
            Maths, <span className="text-[var(--accent-texte)]">3e</span>
          </h1>
          <p className="text-xl">Thalès, fonctions, brevet · la méthode pas à pas · le prix de l&apos;heure</p>
          <ul className="flex flex-wrap gap-2.5">
            {[["#methode", "La méthode"], ["#programme", "Le programme"], ["#prix", "Le prix"]].map(([h, l]) => (
              <li key={h}>
                <Link href={h} className="inline-flex min-h-[46px] items-center rounded-full border-2 border-[var(--encre)] bg-[var(--carte)] px-5 font-semibold">{l}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="methode" className="scroll-mt-20 max-w-6xl mx-auto px-5 py-12 sm:py-16 grid gap-8 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <Note>1. La méthode</Note>
          <h2 className="text-4xl sm:text-5xl">Pas à pas, <span className="text-[var(--accent-texte)]">et par écrit.</span></h2>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[6px]">
            <Image src={photos.compas.src} alt={photos.compas.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
          </div>
        </div>
        <ol className="space-y-5">
          {METHODE.map((m, i) => (
            <li key={m.titre} className="grid grid-cols-[40px_1fr] gap-3">
              <span className="font-[family-name:var(--f-caveat)] text-4xl leading-none text-[var(--accent-texte)]">{i + 1}</span>
              <span>
                <span className="block text-xl font-bold">{m.titre}</span>
                <span className="block leading-relaxed text-[var(--doux)]">{m.texte}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section id="programme" className="scroll-mt-20 border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-12 sm:py-16 grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <Note>2. Le programme</Note>
            <h2 className="text-4xl sm:text-5xl">Ce qu&apos;on voit <span className="text-[var(--accent-texte)]">en 3e.</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Cochez ce qui bloque : on commencera par là. Rien n&apos;est envoyé, c&apos;est pour
              vous.
            </p>
          </div>
          <Programme3e />
        </div>
      </section>

      <section id="prix" className="scroll-mt-20 max-w-6xl mx-auto px-5 py-12 sm:py-16 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-4">
          <Note>3. Le prix</Note>
          <h2 className="text-4xl sm:text-5xl">Le même pour <span className="text-[var(--accent-texte)]">toutes les classes.</span></h2>
          <PrixCours />
        </div>
        <div className="space-y-4 lg:pt-24">
          <CalculMois />
          <Link href={`${DOSSIER}/reserver`} className="flex min-h-[56px] items-center justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-lg font-bold">Voir les créneaux</Link>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
