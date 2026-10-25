import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre, Tirage } from "../_composants/Blocs";
import Palettes from "../_composants/Palettes";
import Veille from "../_composants/Veille";
import { DOSSIER, REGLES, photos } from "../_composants/donnees";

// La page qui répond à ce qu'on tape avant de venir : « shooting photo comment
// s'habiller » (suggestion Google relevée le 15/10/2026, voir la vidéo « Remplir
// l'agenda »). Les trois règles en haut, puis l'outil des palettes, le logo, la veille.
export const metadata: Metadata = {
  title: "S'habiller pour sa séance — Pour Plus Tard, site de démonstration",
  description: "Comment s'habiller pour une séance photo en famille : trois couleurs qui vont ensemble, pas de gros logo, des chaussures où l'on est bien. Site de démonstration.",
  ...adressesDeLaPage("/exemples/pour-plus-tard/s-habiller"),
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
      <EnTetePage
        surtitre="Avant ta séance"
        titre="S'habiller *pour ta séance.*"
        tirages={[{ ...photos.troisCouleurs, legende: "trois couleurs" }, { ...photos.minute40, legende: "minute 40" }, { ...photos.minute1, legende: "minute 1" }]}
        apres={
          <ol data-film="regles" className="max-w-2xl border-t border-white/25">
            {REGLES.map((r, i) => (
              <Apparition as="li" key={r.id} delai={500 + i * 120} className="flex items-baseline gap-4 border-b border-white/15 py-3.5">
                <span className="font-[family-name:var(--titres)] text-3xl italic leading-none text-[#E0B48C] tabular-nums">{i + 1}</span>
                <span className="text-xl font-semibold leading-snug">{r.titre}</span>
              </Apparition>
            ))}
          </ol>
        }
      >
        Tu l&apos;as peut-être tapé sur Google en arrivant ici. La réponse tient en trois règles, et une
        palette à choisir.
      </EnTetePage>

      {/* ---------- 1. Trois couleurs ---------- */}
      <section id="couleurs" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Surtitre numero="1" className="text-[var(--doux)]">{REGLES[0].titre}</Surtitre></Apparition>
          <TitreRevele
            texte="Choisis ta *palette.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-xl leading-relaxed">{REGLES[0].texte}</Apparition>
          <Apparition as="p" delai={250} className="text-[17px] leading-relaxed text-[var(--doux)]">
            Touche une palette : la famille dessinée s&apos;habille avec. Rien n&apos;est envoyé, c&apos;est
            seulement une aide.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Palettes />
        </Apparition>
      </section>

      {/* ---------- 2. Pas de gros logo ---------- */}
      <section id="logo" data-film="logo" className="scroll-mt-20 px-3 sm:px-5">
        <div className="kit-grain overflow-hidden rounded-[6px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:px-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
            <div className="space-y-6">
              <Surtitre numero="2">{REGLES[1].titre}</Surtitre>
              <TitreRevele
                texte="Sur la photo, *on ne verrait que lui.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.4vw,4.6rem)] font-medium leading-[0.95] tracking-[-0.03em]"
                classeAccent="italic text-[#E0B48C]"
              />
              <p className="max-w-lg text-xl leading-relaxed">{REGLES[1].texte}</p>
            </div>
            <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[320px]">
              <span className="absolute inset-0 rounded-full border border-white/20" />
              <span className="absolute inset-[16%] grid place-items-center rounded-[40%_40%_12%_12%] bg-[#4F5D45]">
                <span className="kit-barre font-[family-name:var(--titres)] text-[3.6rem] font-semibold italic text-[#F3EBDD]">LOGO</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 3. Les chaussures ---------- */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-2 md:items-center md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre numero="3" className="text-[var(--doux)]">{REGLES[2].titre}</Surtitre></Apparition>
          <TitreRevele
            texte="On va *marcher.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <p className="text-xl leading-relaxed">{REGLES[2].texte}</p>
          <div className="space-y-3 pt-4">
            <h3 className="font-[family-name:var(--titres)] text-2xl">Ce qu&apos;on évite</h3>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {EVITER.map((e) => (
                <li key={e} className="flex gap-3 py-3 text-[17px]">
                  <span aria-hidden="true" className="font-bold text-[var(--accent-texte)]">✕</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Apparition de="zoom" className="mx-auto w-full max-w-[420px]">
          <Tirage src={photos.troisCouleurs.src} alt={photos.troisCouleurs.alt} legende="beige, brun, moutarde" angle={3} sizes="420px" />
        </Apparition>
      </section>

      {/* ---------- La veille ---------- */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.1fr] md:items-start md:py-28">
          <div className="space-y-6">
            <Apparition><Surtitre className="text-[var(--doux)]">Et la veille</Surtitre></Apparition>
            <TitreRevele
              texte="Rien à *apprendre.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[0.92] tracking-[-0.035em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <p className="text-xl leading-relaxed">On ne fait pas poser : il n&apos;y a rien à répéter. Juste cinq choses à préparer.</p>
            <Bouton href={`${DOSSIER}/reserver`}>Choisir ma date</Bouton>
          </div>
          <Veille />
        </div>
      </section>

      <div className="h-6" />
      <AppelFinal />
    </main>
  );
}
