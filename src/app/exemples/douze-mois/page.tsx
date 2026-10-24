import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../_kit/Accordeon";
import Apparition from "../_kit/Apparition";
import PhotoCinema from "../_kit/PhotoCinema";
import TitreRevele from "../_kit/TitreRevele";
import { ACCENT_SOMBRE, AppelFinal, Bouton, Intitule, Surtitre, Titre } from "./_composants/Blocs";
import Calendrier from "./_composants/Calendrier";
import ChoixMessage from "./_composants/ChoixMessage";
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
      {/* ---------- Premier écran : un chardon doré sur le noir, le nom, l'heure limite ----------
          La photo et le texte se partagent l'écran : le noir de la photo continue dans
          celui de la section, et aucun mot ne se pose sur la fleur. */}
      <section className="relative isolate grid min-h-[100svh] bg-[#050505] text-[var(--sur-sombre)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[46svh] overflow-hidden lg:min-h-0">
          <PhotoCinema src={PHOTOS.chardon.src} alt="" priority origine="35% 40%" sizes="(min-width: 1024px) 55vw, 100vw" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,rgba(5,5,5,0)_0%,#050505_100%)] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-1/3 lg:bg-[linear-gradient(90deg,rgba(5,5,5,0)_0%,#050505_100%)]" />
        </div>
        <div className="relative flex flex-col justify-end gap-5 px-6 pb-12 pt-2 lg:justify-center lg:gap-7 lg:pb-16 lg:pl-4 lg:pr-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pt-36">
          <Apparition><Surtitre clair>Fleurs de saison, rien d&apos;autre</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="Douze *Mois*"
            className="text-[clamp(3.6rem,8.5vw,8.5rem)] font-normal leading-[0.9] tracking-[-0.03em] lg:[&>span:first-child]:block"
            classeAccent={ACCENT_SOMBRE}
          />
          <TitreRevele
            as="p"
            auChargement
            delai={300}
            texte={"Commandé avant 14\u00a0h, *livré aujourd'hui.*"}
            className="max-w-[30rem] scroll-mt-24 font-[family-name:var(--titres)] text-[clamp(1.75rem,2.8vw,2.5rem)] font-normal leading-[1.08] tracking-[-0.01em] text-balance [font-variant-numeric:lining-nums]"
            classeAccent={ACCENT_SOMBRE}
            id="heure"
          />
          <Apparition as="p" delai={600} className="max-w-[26rem] text-lg leading-relaxed">
            Ce qui fleurit en France ce mois-ci, et la phrase sur la carte, écrite à la main.
          </Apparition>
          <Apparition delai={800} className="flex flex-wrap gap-3">
            <Bouton href={`${DOSSIER}#choix`}>C&apos;est pour dire quoi&nbsp;?</Bouton>
            <Bouton href={`${DOSSIER}#calendrier`} variante="contour">Le calendrier</Bouton>
          </Apparition>
        </div>
      </section>

      {/* ---------- 01. L'outil de la marque : le calendrier ---------- */}
      <section id="calendrier" className="scroll-mt-16 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
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
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(42,21,32,0)_0%,rgba(42,21,32,1)_100%)]" />
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
