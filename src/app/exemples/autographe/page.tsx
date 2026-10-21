import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Pot from "./_composants/Pot";
import Recherche from "./_composants/Recherche";
import Signature from "./_composants/Signature";
import { AUTEURS, DEDICACE, DOSSIER, QUESTIONS, auteurDe, boutique, euros, photos } from "./_composants/donnees";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une épicerie
// fine » : Autographe vend des auteurs. Chaque pot porte la signature de celui qui
// l'a fait ; sur le site, on ne cherche pas un produit, on cherche quelqu'un ; et le
// lancement est une séance de dédicace. Premier écran inspiré du modèle « Menuchi »
// de MotionSites (l'objet au centre, un court texte à gauche, le nom en très grand
// au pied de l'écran), transposé sur papier et encre bleue.
export const metadata: Metadata = {
  title: "Autographe — site de démonstration",
  description: "Site de démonstration d'une épicerie fine imaginaire, réalisé par Canevas Havane : chaque pot porte la signature de celui qui l'a fait, et l'on y cherche quelqu'un, pas un produit.",
  ...adressesDeLaPage("/exemples/autographe"),
};

const helene = auteurDe("helene")!;
const VITRINE = [
  { slug: "helene", oeuvre: 0 },
  { slug: "joseph", oeuvre: 0 },
  { slug: "lina", oeuvre: 0 },
];

const LIVRE = [
  ["Un livre a un auteur.", "Un pot aussi. Son prénom est écrit plus gros que le produit."],
  ["Un auteur a un numéro.", "Hélène est l'auteure n° 12. On la retrouve, on lit tout ce qu'elle fait."],
  ["Un livre se dédicace.", "Un samedi, les auteurs viennent signer leurs pots à la boutique."],
];

export default function Autographe() {
  return (
    <div>
      {/* 1 — L'objet, le manifeste, le nom. */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 sm:pt-14 md:grid-cols-[1fr_1.1fr_1fr] md:items-center">
          <p className="max-w-xs text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)] md:order-3 md:justify-self-end md:text-right">
            Épicerie fine
            <br />
            Chaque pot est signé.
          </p>
          <div className="md:order-2">
            <Pot auteur={helene} oeuvre={helene.oeuvres[0]} animee />
          </div>
          <p className="max-w-xs text-lg leading-relaxed md:order-1">
            Ici, un pot de miel a un auteur, comme un livre. Son prénom sur l&apos;étiquette,
            plus gros que le produit. Sa signature en dessous.
          </p>
        </div>
        <h1 className="mt-8 select-none whitespace-nowrap pb-[0.18em] text-center text-[16.2vw] font-semibold leading-[0.85] tracking-[-0.035em] md:text-[11.5rem]" aria-label="Autographe, l'épicerie qui vend des auteurs">
          Autographe
        </h1>
      </section>

      {/* 2 — On cherche quelqu'un. */}
      <section id="chercher" className="scroll-mt-16 border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:py-20 md:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-4xl font-semibold sm:text-5xl">
            Tu ne cherches pas un produit. <em className="font-normal">Tu cherches quelqu&apos;un.</em>
          </h2>
          <Recherche />
        </div>
      </section>

      {/* 3 — Un pot, c'est un livre. */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image src={photos.pots.src} alt={photos.pots.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-8">
          <h2 className="text-5xl font-semibold sm:text-6xl">Un pot de confiture, <em className="font-normal">c&apos;est un livre.</em></h2>
          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {LIVRE.map(([a, b]) => (
              <div key={a} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="font-[family-name:var(--titres)] text-xl font-semibold">{a}</dt>
                <dd className="text-[var(--doux)]">{b}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 4 — Le catalogue, comme une table des matières. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-4xl space-y-10 px-5 py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-5xl font-semibold sm:text-6xl">Les auteurs</h2>
            <Link href={`${DOSSIER}/auteurs`} className="border-b-2 border-[#F6EFE3] pb-1 font-semibold">Tout le catalogue</Link>
          </div>
          <ol className="space-y-1">
            {[...AUTEURS].sort((a, b) => a.numero - b.numero).map((a) => (
              <li key={a.slug}>
                <Link href={`${DOSSIER}/auteurs/${a.slug}`} className="group flex items-baseline gap-3 py-3">
                  <span className="w-10 shrink-0 text-sm tabular-nums text-[#C9CFDD]">n° {a.numero}</span>
                  <span className="font-[family-name:var(--titres)] text-[1.75rem] leading-none group-hover:italic sm:text-4xl">{a.prenom}</span>
                  <span aria-hidden="true" className="mb-1.5 flex-1 border-b border-dotted border-[#F6EFE3]/50" />
                  <span className="text-right text-[15px] text-[#C9CFDD]">{a.metier}</span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="text-sm text-[#C9CFDD]">Auteurs, prénoms et lieux d&apos;exemple : l&apos;épicerie est fictive.</p>
        </div>
      </section>

      {/* 5 — Les pots du moment. */}
      <section id="pots" className="scroll-mt-16 mx-auto max-w-6xl space-y-12 px-5 py-20 sm:py-28">
        <h2 className="max-w-2xl text-5xl font-semibold sm:text-6xl">Parutions <em className="font-normal">de l&apos;automne.</em></h2>
        <ul className="grid gap-14 md:grid-cols-3 md:gap-8">
          {VITRINE.map(({ slug, oeuvre }) => {
            const a = auteurDe(slug)!;
            const o = a.oeuvres[oeuvre];
            return (
              <li key={slug} className="space-y-5">
                <Pot auteur={a} oeuvre={o} className="max-w-[15rem]" />
                <div className="space-y-1 text-center">
                  <p className="font-[family-name:var(--titres)] text-2xl font-semibold">{a.prenom}</p>
                  <p className="text-[var(--doux)]">{o.nom} · {o.poids}</p>
                  <p className="font-semibold tabular-nums">{euros(o.prix)} TTC <span className="text-sm font-normal text-[var(--doux)]">· exemple</span></p>
                  <Link href={`${DOSSIER}/auteurs/${slug}`} className="inline-block pt-2 underline underline-offset-4">Tout ce {a.feminin ? "qu'elle" : "qu'il"} fait</Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 6 — L'étiquette. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-semibold sm:text-6xl">Son nom d&apos;abord. <em className="font-normal">Le produit ensuite.</em></h2>
            <p className="text-lg leading-relaxed">
              Notre collerette porte le prénom de l&apos;auteur en grand, sa signature et
              son numéro. Elle s&apos;ajoute à son étiquette, elle ne la remplace pas : la
              dénomination, les ingrédients, les allergènes, le poids et l&apos;origine
              restent ceux qu&apos;il a écrits, au dos du pot.
            </p>
            <p className="text-lg leading-relaxed">
              Et sur le site, avant de mettre un pot de côté, tu lis tout : chaque fiche
              affiche ses ingrédients et ses allergènes en gras.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={photos.plume.src} alt={photos.plume.alt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 7 — La séance de dédicace. */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="grid gap-10 border-2 border-[var(--encre)] p-6 sm:p-10 md:grid-cols-[1fr_1fr]">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">{DEDICACE.date} · {DEDICACE.heure}</p>
            <h2 className="text-5xl font-semibold sm:text-6xl">Séance de <em className="font-normal">dédicace.</em></h2>
            <p className="text-lg leading-relaxed">
              Les auteurs viennent signer leurs pots à la boutique, comme des écrivains.
              On fait la queue, on dit un mot, on repart avec un pot signé à la main.
            </p>
            <Link href={`${DOSSIER}/dedicaces`} className="inline-flex min-h-12 items-center bg-[var(--accent)] px-6 font-semibold text-[var(--sur-accent)]">
              Le programme
            </Link>
          </div>
          <ol className="divide-y divide-[var(--trait)] self-center border-y border-[var(--trait)]">
            {DEDICACE.programme.map((p) => {
              const a = auteurDe(p.slug)!;
              return (
                <li key={p.slug} className="grid grid-cols-[7.5rem_1fr] gap-3 py-4">
                  <span className="text-[15px] tabular-nums text-[var(--doux)]">{p.heure}</span>
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-2xl font-semibold">{a.prenom}</span>
                    <span className="text-[15px]">{p.quoi}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 8 — Questions. */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-5xl font-semibold">Questions <em className="font-normal">de lecteurs.</em></h2>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {QUESTIONS.map((x) => (
              <li key={x.q}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-[family-name:var(--titres)] text-xl font-semibold [&::-webkit-details-marker]:hidden">
                    {x.q}
                    <span aria-hidden="true" className="shrink-0 text-2xl text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-6 pr-8 text-lg leading-relaxed text-[var(--doux)]">{x.r}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — La boutique. */}
      <section id="boutique" className="scroll-mt-16 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:grid-cols-[1.2fr_1fr] sm:py-24">
          <div className="space-y-4">
            <h2 className="text-5xl font-semibold">La boutique</h2>
            <p className="text-lg">{boutique.adresse}</p>
            <p><a href={`tel:${boutique.telephone.replace(/ /g, "")}`} className="text-2xl font-semibold underline underline-offset-4 tabular-nums">{boutique.telephone}</a></p>
            <Signature variante={2} couleur="#E8B4A8" className="h-14 w-60" />
          </div>
          <dl className="space-y-3 self-end">
            {boutique.horaires.map((h) => (
              <div key={h.jours} className="flex justify-between gap-4 border-b border-[#F6EFE3]/30 pb-3">
                <dt className="font-semibold">{h.jours}</dt>
                <dd className="tabular-nums text-[#C9CFDD]">{h.heures}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
