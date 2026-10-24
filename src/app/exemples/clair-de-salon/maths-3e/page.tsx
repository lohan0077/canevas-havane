import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Note, PrixCours, Surtitre } from "../_composants/Blocs";
import { CalculMois, Programme3e } from "../_composants/Outils";
import { styleCahier } from "../_composants/cahier";
import { DOSSIER, METHODE, entreprise, photos } from "../_composants/donnees";

// La page par classe. La vidéo « Remplir l'agenda » : « Ensuite, une page par classe.
// Maths, troisième : la méthode, le programme, le prix. » Parce que c'est ce que tapent
// les parents : « prix cours particulier maths 3ème » (suggestion Google du 15/10/2026).
export const metadata: Metadata = {
  title: "Maths, 3e — Clair de Salon, site de démonstration",
  description: "Cours de maths de 3e à domicile : la méthode, le programme, le prix à l'heure (exemple). Site de démonstration d'une entreprise de cours à domicile imaginaire.",
  ...adressesDeLaPage("/exemples/clair-de-salon/maths-3e"),
};

export default function Maths3e() {
  return (
    <main>
      <EnTetePage surtitre={`Les maths · avec ${entreprise.mathematicienne}`} titre="Maths, *3e.*" photo={photos.compas} origine="45% 50%">
        <p>Thalès, fonctions, brevet : la méthode pas à pas, le programme, le prix de l&apos;heure.</p>
        <ul className="mt-6 flex flex-wrap gap-2.5 text-base">
          {[["#methode", "La méthode"], ["#programme", "Le programme"], ["#prix", "Le prix"]].map(([h, l]) => (
            <li key={h}>
              <Link href={h} className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-5 font-semibold hover:bg-white/10">{l}</Link>
            </li>
          ))}
        </ul>
      </EnTetePage>

      <section id="methode" className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-4 py-16 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:py-24">
        <div className="space-y-5">
          <Apparition><Surtitre>1 · La méthode</Surtitre></Apparition>
          <TitreRevele
            texte="Pas à pas, *et par écrit.*"
            className="text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition de="rideau" className="relative hidden aspect-[3/2] overflow-hidden rounded-[2rem] md:block">
            <Image src={photos.chrono.src} alt={photos.chrono.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
          </Apparition>
        </div>
        <ol className="overflow-hidden rounded-[2rem] border border-[var(--trait)] py-2 pl-12 pr-5 sm:pl-16" style={styleCahier}>
          {METHODE.map((m, i) => (
            <Apparition as="li" key={m.titre} delai={i * 110} className="grid grid-cols-[40px_1fr] gap-3 py-4">
              <span className="font-[family-name:var(--f-caveat)] text-[40px] leading-none text-[var(--accent-texte)]">{i + 1}</span>
              <span>
                <span className="block text-xl font-bold">{m.titre}</span>
                <span className="block leading-relaxed text-[var(--doux)]">{m.texte}</span>
              </span>
            </Apparition>
          ))}
        </ol>
      </section>

      <section id="programme" className="scroll-mt-20 px-3 sm:px-5">
        <div className="rounded-[2.5rem] border border-[var(--trait)] bg-[var(--carte)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:py-24">
            <div className="space-y-5">
              <Apparition><Surtitre>2 · Le programme</Surtitre></Apparition>
              <TitreRevele
                texte="Ce qu'on voit *en 3e.*"
                className="text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent-texte)]"
              />
              <Note>Cochez ce qui bloque : on commencera par là.</Note>
              <p className="text-[var(--doux)]">Rien n&apos;est envoyé, c&apos;est pour vous.</p>
            </div>
            <Programme3e />
          </div>
        </div>
      </section>

      <section id="prix" className="mx-auto grid max-w-6xl scroll-mt-20 gap-8 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-5">
          <Apparition><Surtitre>3 · Le prix</Surtitre></Apparition>
          <PrixCours />
        </div>
        <div className="space-y-5 lg:pt-12">
          <TitreRevele
            texte="Le même pour *toutes les classes.*"
            className="text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <CalculMois />
          <Bouton href={`${DOSSIER}/reserver`}>Voir les créneaux</Bouton>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
