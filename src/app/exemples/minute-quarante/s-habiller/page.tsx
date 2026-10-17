import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, REGLES, photos } from "../_composants/donnees";
import { AppelFinal, Bouton, Surtitre } from "../_composants/Blocs";
import Palettes from "../_composants/Palettes";
import Veille from "../_composants/Veille";

// La page qui répond à ce qu'on tape avant de venir : « shooting photo comment
// s'habiller » (suggestion Google relevée le 15/10/2026, voir la vidéo). Les trois
// règles en haut, puis l'outil des palettes et la liste de la veille.
export const metadata: Metadata = {
  title: "S'habiller pour sa séance · Minute Quarante — site de démonstration",
  description: "Comment s'habiller pour une séance photo en famille : trois couleurs qui vont ensemble, pas de gros logo, des chaussures où l'on est bien. Site de démonstration.",
  ...adressesDeLaPage("/exemples/minute-quarante/s-habiller"),
};

const EVITER = [
  "Tout le monde en blanc, ou tout le monde en jean",
  "Les couleurs fluo, qui teintent la peau de tout le monde",
  "Les gros motifs et les inscriptions",
  "Les vêtements qu'on n'a jamais portés",
];

export default function SHabiller() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-12 sm:pt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div className="space-y-5">
          <Surtitre>Avant ta séance</Surtitre>
          <h1 className="text-[44px] sm:text-7xl font-medium tracking-[-0.03em]">
            <span className="italic pr-[0.12em]">S&apos;habiller</span> pour ta séance
          </h1>
          <p className="text-lg leading-relaxed max-w-xl">
            Tu l&apos;as peut-être tapé sur Google en arrivant ici. La réponse tient en trois
            règles, et une palette à choisir.
          </p>
        </div>
        <ol data-film="regles" className="border-t border-[var(--encre)]">
          {REGLES.map((r, i) => (
            <li key={r.id} className="flex items-baseline gap-4 border-b border-[var(--trait)] py-3.5">
              <span className="font-[family-name:var(--titres)] italic text-3xl leading-none tabular-nums text-[var(--accent-texte)]">{i + 1}</span>
              <span className="text-xl font-semibold leading-snug">{r.titre}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="couleurs" className="max-w-6xl mx-auto px-5 py-12 sm:py-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="space-y-5">
          <Surtitre numero="1">Trois couleurs qui vont ensemble</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Choisis ta <span className="italic">palette.</span></h2>
          <p className="text-lg leading-relaxed">{REGLES[0].texte}</p>
          <p className="leading-relaxed text-[var(--doux)]">
            Touche une palette : la famille dessinée s&apos;habille avec. Rien n&apos;est
            envoyé, c&apos;est seulement une aide.
          </p>
        </div>
        <Palettes />
      </section>

      <section id="logo" data-film="logo" className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#E8A27F]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Surtitre numero="2">Pas de gros logo</Surtitre>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Sur la photo, <span className="italic">on ne verrait que lui.</span></h2>
          </div>
          <p className="text-lg leading-relaxed">{REGLES[1].texte}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid gap-10 md:grid-cols-2 md:items-start">
        <div className="space-y-5">
          <Surtitre numero="3">Des chaussures où tu es bien</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">On va <span className="italic">marcher.</span></h2>
          <p className="text-lg leading-relaxed">{REGLES[2].texte}</p>
          <div className="space-y-3 pt-4">
            <h3 className="text-2xl font-medium">Ce qu&apos;on évite</h3>
            <ul className="space-y-2">
              {EVITER.map((e) => (
                <li key={e} className="flex gap-3 leading-relaxed">
                  <span aria-hidden="true" className="font-bold text-[var(--accent-texte)]">✕</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[6px]">
          <Image src={photos.troisCouleurs.src} alt={photos.troisCouleurs.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
        <div className="space-y-5">
          <Surtitre>Et la veille</Surtitre>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Rien à <span className="italic">apprendre.</span></h2>
          <p className="text-lg leading-relaxed">On ne fait pas poser : il n&apos;y a rien à répéter. Juste cinq choses à préparer.</p>
          <Bouton href={`${DOSSIER}/reserver`}>Choisir ma date</Bouton>
        </div>
        <Veille />
      </section>

      <AppelFinal />
    </main>
  );
}
