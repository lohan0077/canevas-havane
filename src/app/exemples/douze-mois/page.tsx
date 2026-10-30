import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import PhotoCinema from "../_kit/PhotoCinema";
import { AppelFinal, Intitule, Surtitre, Titre } from "./_composants/Blocs";
import Calendrier from "./_composants/Calendrier";
import ChoixMessage from "./_composants/ChoixMessage";
import JardinFleurs from "./_composants/JardinFleurs";
import { DOSSIER, PHOTOS, QUESTIONS } from "./_composants/donnees";

// Le site de Douze Mois, la boutique de fleurs des deux vidéos des fleuristes. Il garde
// la marque de « Créer une marque » — le nom, le calendrier qu'on feuillette, pas une
// rose au 14 février — et les idées de « Remplir l'agenda » : « c'est pour dire
// quoi ? », le bouquet et la phrase écrite à la main, l'heure limite écrite en gros.
//
// Version « carrée » (24/10/2026) : une idée par écran, sept écrans, une grille et une
// échelle de texte communes ; la règle, le premier du mois, le bouquet du mois et les
// trois gestes vivent sur les pages intérieures. Les éléments filmés par les deux
// vidéos (#heure, #choix, #proposition, #carte, #signature, #calendrier, data-mois,
// data-message) sont gardés.
export const metadata: Metadata = {
  title: "Douze Mois — boutique de fleurs, site de démonstration",
  description:
    "Le site d'une boutique de fleurs imaginaire qui ne vend que ce qui fleurit en France ce mois-ci : c'est pour dire quoi ? Le bouquet de la saison, la phrase écrite à la main, livré le jour même avant 14 h.",
  ...adressesDeLaPage("/exemples/douze-mois"),
};

const PAGES = [
  { href: `${DOSSIER}/calendrier`, photo: PHOTOS.tulipe, titre: "Les douze mois", texte: "Une fleur par mois, celles qui l'accompagnent, celle qui arrive et celle qui s'en va." },
  { href: `${DOSSIER}/saint-valentin`, photo: PHOTOS.mimosaBranche, titre: "Le 14 février", texte: "Pas une seule rose rouge. Du mimosa, la fleur de février." },
  { href: `${DOSSIER}/la-carte`, photo: PHOTOS.carteEcrite, titre: "La carte", texte: "Que mettre sur la carte ? Des phrases toutes prêtes, ou la tienne." },
  { href: `${DOSSIER}/livraison`, photo: PHOTOS.velo, titre: "La livraison", texte: "À vélo dans la ville. Commandé avant 14 h, livré aujourd'hui." },
];

export default function DouzeMois() {
  return (
    <main>
      {/* ---------- Premier écran : le jardin des douze mois ---------- */}
      <JardinFleurs />

      {/* ---------- 01. L'outil de la marque : le calendrier ---------- */}
      {/* Il prend la suite du jardin, sur la même nuit : un filet, et moins de vide au-dessus. */}
      <section id="calendrier" className="scroll-mt-16 border-t border-white/10 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 pb-28 pt-20 md:pb-40 md:pt-28">
          <Intitule
            clair
            numero="01"
            surtitre="Le calendrier"
            titre="Tourne *les pages.*"
            texte="En février, du mimosa. En mai, des pivoines. En septembre, des dahlias. Et pas de roses en janvier : en France, elles ne fleurissent pas dehors."
          />
          <Apparition delai={150}>
            <Calendrier />
          </Apparition>
          <Link href={`${DOSSIER}/calendrier`} className="inline-block text-[15px] underline underline-offset-4">
            L&apos;année entière
          </Link>
        </div>
      </section>

      {/* ---------- 02. L'outil de l'agenda : c'est pour dire quoi ? ---------- */}
      <section id="choix" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            numero="02"
            surtitre="Ton bouquet"
            titre={"C'est pour dire *quoi ?*"}
            texte="Une question, pas quarante vignettes. Le bouquet suit la saison, la phrase est écrite à la main sur la carte : tu n'as qu'à signer."
          />
          <Apparition delai={150}>
            <ChoixMessage />
          </Apparition>
        </div>
      </section>

      {/* ---------- Une photo, une phrase : des dahlias en terre, en octobre ---------- */}
      <section className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="absolute inset-x-0 top-0 h-[72%]">
          <PhotoCinema src={PHOTOS.dahliasJardin.src} alt="" origine="50% 45%" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(25,18,48,0)_0%,rgba(25,18,48,1)_100%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl space-y-5 px-6 pb-16 pt-[60svh] md:pb-24">
          <Apparition><Surtitre clair>Octobre · les derniers dahlias</Surtitre></Apparition>
          <Titre texte="Ce qui fleurit en France, ce mois-ci. *Le reste, on ne le vend pas.*" clair className="max-w-3xl" />
        </div>
      </section>

      {/* ---------- 03. La preuve : les pages de la boutique ---------- */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Intitule
            numero="03"
            surtitre="L'année"
            titre="Douze mois, *une page chacun.*"
            texte="Le calendrier entier, le 14 février sans roses, les phrases pour la carte, et la livraison du jour."
          />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-6">
            {PAGES.map((p, i) => (
              <Apparition as="li" key={p.href} delai={i * 90}>
                <Link href={p.href} className="group block space-y-4">
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--sombre)]">
                    <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]" />
                  </span>
                  <span className="flex items-baseline justify-between gap-3 font-[family-name:var(--titres)] text-2xl leading-tight">
                    {p.titre}
                    <span aria-hidden="true" className="text-[var(--accent-texte)] transition-transform group-hover:translate-x-1">→</span>
                  </span>
                  <span className="block text-[15px] leading-relaxed text-[var(--doux)]">{p.texte}</span>
                </Link>
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- 04. Questions ---------- */}
      <section id="questions" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>04 — Questions</Surtitre></Apparition>
            <Titre texte="Avant de *signer.*" />
            <Apparition className="relative mt-6 hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
              <Image src={PHOTOS.atelier.src} alt={PHOTOS.atelier.alt} fill sizes="30vw" className="object-cover" />
            </Apparition>
          </div>
          <Apparition delai={150}>
            <Accordeon questions={QUESTIONS.slice(0, 5).map((q) => ({ question: q.q, reponse: q.r }))} />
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
