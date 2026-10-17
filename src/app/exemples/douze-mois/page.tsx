import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, MOIS, PHOTOS, QUESTIONS, boutique } from "./_composants/donnees";
import Calendrier from "./_composants/Calendrier";
import { Faq, Legende } from "./_composants/Blocs";

// L'accueil : le nom en travers de la page, la planche du mois, puis le calendrier
// qu'on feuillette. Ensuite la règle de la boutique, la vidéo du premier du mois, la
// Saint-Valentin sans roses, le bouquet du mois, les questions, la boutique.
export const metadata: Metadata = {
  title: "Douze Mois — site de démonstration",
  description: "Site de démonstration d'une boutique de fleurs imaginaire, réalisé par Canevas Havane : seulement ce qui fleurit en France ce mois-ci, dans un calendrier qu'on feuillette.",
  ...adressesDeLaPage("/exemples/douze-mois"),
};

// Les trois prochains « premier du mois », vus depuis octobre : la fleur qui arrive,
// celle qui s'en va.
const PREMIERS = [MOIS[10], MOIS[11], MOIS[0]];

export default function DouzeMois() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[var(--encre)]">
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
          <h1 className="text-center font-normal uppercase leading-[0.82] tracking-[-0.02em] text-[23vw] sm:text-[12.5vw] lg:text-[150px]">
            Douze <span className="sm:inline block italic normal-case tracking-normal">Mois</span>
          </h1>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--encre)] pt-4 sm:grid-cols-3">
            <Legende>Boutique de fleurs</Legende>
            <Legende>Fleurs de saison, rien d&apos;autre.</Legende>
            <p className="col-span-2 text-sm leading-relaxed sm:col-span-1">
              Ce qui fleurit en France ce mois-ci. Le reste, on ne le vend pas.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 pt-8 sm:px-6 md:grid-cols-[1fr_1.2fr_1fr] md:items-end">
          <div className="hidden space-y-2 md:block">
            <Legende n="01">Planche du mois</Legende>
            <p className="text-sm leading-relaxed text-[var(--doux)]">Une fleur par mois, montrée comme un spécimen : sa saison, ce qui l&apos;accompagne, ce qui arrive après.</p>
          </div>
          <figure className="relative">
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--encre)] bg-white">
              <Image src={PHOTOS.dahlia.src} alt={PHOTOS.dahlia.alt} width={PHOTOS.dahlia.largeur} height={PHOTOS.dahlia.hauteur} sizes="(min-width: 768px) 480px, 100vw" priority className="h-full w-full object-cover" />
              <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-[var(--encre)]">
                <path d="M0 150H400M200 0V300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.35" />
                <path d="M262 92L330 40H392" stroke="currentColor" strokeWidth="0.8" fill="none" />
              </svg>
              <p className="absolute right-2 top-6 text-[10px] uppercase tracking-[0.2em]">Cœur</p>
            </div>
            <figcaption className="mt-2 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em]">
              <span>Fig. 10 — Dahlia</span>
              <span className="text-[var(--doux)]">les derniers, avant le gel</span>
            </figcaption>
          </figure>
          <div className="space-y-3 md:text-right">
            <Legende n="02">Ce mois-ci</Legende>
            <a href="#calendrier" className="inline-flex items-center gap-3 border border-[var(--encre)] bg-[var(--encre)] px-5 py-3 text-xs uppercase tracking-[0.2em] text-[var(--fond)]">
              Ouvrir le calendrier ↓
            </a>
          </div>
        </div>
      </section>

      <section id="calendrier" className="scroll-mt-14 mx-auto max-w-6xl space-y-8 px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <Legende n="03">Le calendrier</Legende>
            <h2 className="text-5xl sm:text-7xl">Tourne <span className="italic">les pages.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--doux)]">En février, du mimosa. En mai, des pivoines. En septembre, des dahlias. Et pas de roses en janvier.</p>
        </div>
        <Calendrier />
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <h2 className="text-5xl leading-[1.02] sm:text-7xl">
            Ce qui fleurit en France, <span className="italic text-[#F2C94C]">ce mois-ci.</span> Le reste, on ne le vend pas.
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>Toutes les boutiques vendent des roses rouges toute l&apos;année. Même en janvier.</p>
            <p>Ici, une saison, des fleurs. Quand il n&apos;y a presque rien, on le dit — et on fait de beaux bouquets avec ce qu&apos;il y a.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-20 sm:px-6">
        <div className="space-y-3">
          <Legende n="04">Le premier de chaque mois</Legende>
          <h2 className="text-5xl sm:text-6xl">Celle qui arrive, <span className="italic">celle qui s&apos;en va.</span></h2>
          <p className="max-w-xl text-[var(--doux)]">Le premier de chaque mois, une courte vidéo : la fleur qui arrive en boutique, et celle qui nous quitte jusqu&apos;à l&apos;an prochain.</p>
        </div>
        <ol className="grid gap-px border border-[var(--encre)] bg-[var(--encre)] md:grid-cols-3">
          {PREMIERS.map((m) => (
            <li key={m.n} className="space-y-4 bg-[var(--fond)] p-6">
              <p className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em]">
                <span>1<sup>er</sup> {m.nom.toLowerCase()}</span>
                <span aria-hidden="true">▶</span>
              </p>
              <p className="font-[family-name:var(--titres)] text-4xl">{m.fleur}</p>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div><dt className="text-[10px] uppercase tracking-[0.2em] text-[var(--doux)]">Arrive</dt><dd>{MOIS[(m.n + 10) % 12].arrive}</dd></div>
                <div><dt className="text-[10px] uppercase tracking-[0.2em] text-[var(--doux)]">S&apos;en va</dt><dd>{m.part}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#F6D965] text-[#3A2A10]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-6">
            <p className="text-[11px] uppercase tracking-[0.26em]">14 février · le lancement</p>
            <p className="font-[family-name:var(--titres)] text-[64px] leading-[0.95] sm:text-[96px]">
              Pas de roses. Du <span className="italic text-[#8E2A1A]">mimosa.</span>
            </p>
            <p className="max-w-md text-lg">Le 14 février, une seule affiche en vitrine, et pas une seule rose rouge. Certains vont râler. Tant mieux : on parlera de la boutique.</p>
            <Link href={`${DOSSIER}/saint-valentin`} className="inline-block border border-[#3A2A10] px-5 py-3 text-xs uppercase tracking-[0.2em]">
              Réserver son mimosa
            </Link>
          </div>
          <div className="relative mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden border border-[#3A2A10]">
            <Image src={PHOTOS.mimosa.src} alt={PHOTOS.mimosa.alt} width={PHOTOS.mimosa.largeur} height={PHOTOS.mimosa.hauteur} sizes="320px" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--encre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div className="space-y-4">
            <Legende n="05">Le bouquet du mois</Legende>
            <h2 className="text-5xl sm:text-6xl">Douze bouquets <span className="italic">par an.</span></h2>
            <p className="max-w-md leading-relaxed text-[var(--doux)]">Chaque premier samedi, le bouquet de la saison, à prendre en boutique ou livré dans la ville. On s&apos;arrête quand tu veux.</p>
          </div>
          <ul className="divide-y divide-[var(--encre)] border-y border-[var(--encre)]">
            {[
              ["Le petit", "pour une table de chevet", "29 €"],
              ["Le moyen", "pour la table du salon", "45 €"],
              ["Le grand", "pour l'entrée, ou pour offrir", "65 €"],
            ].map(([nom, pour, prix]) => (
              <li key={nom} className="flex items-baseline justify-between gap-4 py-5">
                <span>
                  <span className="block font-[family-name:var(--titres)] text-3xl">{nom}</span>
                  <span className="text-sm text-[var(--doux)]">{pour}</span>
                </span>
                <span className="font-[family-name:var(--titres)] text-3xl">{prix}</span>
              </li>
            ))}
            <li className="py-3 text-xs text-[var(--doux)]">Prix TTC d&apos;exemple, par mois. Livraison dans la ville : 6 €.</li>
          </ul>
        </div>
      </section>

      <section id="questions" className="scroll-mt-14 mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3">
          <Legende n="06">Questions</Legende>
          <h2 className="text-5xl sm:text-6xl">Avant <span className="italic">de venir.</span></h2>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      <section className="border-t border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          <div className="space-y-3">
            <Legende n="07">La boutique</Legende>
            <p className="font-[family-name:var(--titres)] text-4xl">{boutique.horaires}</p>
          </div>
          <div className="space-y-1">
            <Legende>Adresse</Legende>
            <p className="text-lg leading-relaxed">{boutique.adresse.map((l) => <span key={l} className="block">{l}</span>)}</p>
          </div>
          <div className="space-y-1">
            <Legende>Téléphone</Legende>
            <a href={`tel:${boutique.telephoneLien}`} className="font-[family-name:var(--titres)] text-4xl">{boutique.telephone}</a>
          </div>
          <p className="text-xs text-[var(--doux)] md:col-span-3">
            Numéro de la tranche que l&apos;ARCEP réserve à la fiction, adresse inventée : la boutique n&apos;existe pas.{" "}
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
