import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, IMAGES, PROCHAINE, entreprise, euros, pieceNumero } from "./_composants/donnees";
import { CartePiece } from "./_composants/Pieces";
import { Faq, Libelle } from "./_composants/Blocs";
import FilmFabrication from "./_composants/FilmFabrication";
import Vendredi from "./_composants/Vendredi";
import { Lettre } from "./_composants/Interactions";

export const metadata: Metadata = {
  title: "Jamais Deux — site de démonstration",
  description: "Site de démonstration d'une créatrice de bijoux imaginaire, réalisé par Canevas Havane : chaque pièce a sa page et son numéro, et la sortie du vendredi 18 h.",
  ...adressesDeLaPage("/exemples/jamais-deux"),
};

const PRINCIPE = [
  { n: "01", titre: "Un numéro", texte: "Chaque pièce porte le sien, dans l'ordre où elle est sortie de l'atelier. La dernière : n° 53." },
  { n: "02", titre: "Une seule", texte: "Faite une fois, jamais refaite. Le marteau ne tombe pas deux fois au même endroit." },
  { n: "03", titre: "Une page qui reste", texte: "Quand elle part, sa page reste en ligne, avec un tampon et sa date. Jamais le nom de personne." },
];

const ENGAGEMENTS = [
  { titre: "Le prix, en entier", texte: "Affiché toutes taxes comprises sur chaque page. La livraison suivie est ajoutée avant le paiement, jamais après." },
  { titre: "Une taille d'écart", texte: "Une bague s'ajuste d'une taille à l'atelier, sans frais, dans le mois qui suit." },
  { titre: "Quatorze jours", texte: "Pour changer d'avis après réception, sans te justifier. Remboursement intégral." },
  { titre: "Une lettre, pas plus", texte: "Le vendredi à 17 h, si tu t'y es inscrite. Rien d'autre, et on ne la partage avec personne." },
];

export default function JamaisDeux() {
  const vedette = pieceNumero(47)!;
  const parties = [46, 44, 43, 41].map((n) => pieceNumero(n)!);

  return (
    <div>
      {/* 1. L'ouverture : la pièce, son numéro entre crochets, sa fiche. */}
      <section data-film="ouverture" className="relative overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 mx-auto flex max-w-6xl justify-between px-5">
          {[0, 1, 2, 3].map((i) => <span key={i} className="w-px bg-white/[0.08]" />)}
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 pb-12 pt-9 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16 lg:pb-20 lg:pt-16">
          <div className="space-y-6">
            <Libelle clair>Bijoux en argent · numérotés</Libelle>
            <h1 className="text-[64px] sm:text-[96px] lg:text-[120px]">
              Une pièce.
              <br />
              <em>Jamais deux.</em>
            </h1>
            <p className="max-w-md text-lg leading-relaxed">
              Chaque bijou est fait une fois, à l&apos;atelier, et porte son numéro. Quand il part, sa page reste.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href={`${DOSSIER}#vendredi`} className="flex min-h-12 items-center bg-[var(--sur-sombre)] px-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--sombre)]">
                Vendredi, 18 h
              </Link>
              <Link href={`${DOSSIER}/pieces`} className="flex min-h-12 items-center border border-[var(--sur-sombre)] px-6 text-[13px] font-semibold uppercase tracking-[0.14em]">
                Toutes les pièces
              </Link>
            </div>
          </div>
          <div>
            <div className="relative aspect-[5/4] overflow-hidden">
              <Image src={IMAGES.bagueMartelee.src} alt={IMAGES.bagueMartelee.alt} width={IMAGES.bagueMartelee.largeur} height={IMAGES.bagueMartelee.hauteur} sizes="(min-width: 1024px) 520px, 100vw" priority className="h-full w-full object-cover" />
              <span className="absolute bottom-0 left-0 bg-[var(--sombre)] px-3 pt-1 font-[family-name:var(--titres)] text-[64px] leading-none tabular-nums">[47]</span>
              <span className="absolute right-0 top-0 bg-[var(--sombre)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em]">1 sur 1</span>
            </div>
            <Link href={`${DOSSIER}/pieces/47`} className="group flex bg-[var(--carte)] text-[var(--encre)]">
              <span className="flex-1 space-y-1 p-4">
                <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">Pièce n° 47 · argent 925</span>
                <span className="block font-[family-name:var(--titres)] text-[28px] leading-none">Bague martelée</span>
                <span className="block text-sm">Prix : {euros(vedette.prix)} TTC <span className="text-[var(--doux)]">(exemple)</span></span>
              </span>
              <span aria-hidden="true" className="grid w-[72px] place-items-center bg-[var(--accent)] text-2xl text-[var(--sur-accent)] transition-colors group-hover:bg-[var(--encre)]">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Le principe. */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <ol className="grid gap-10 sm:grid-cols-3">
          {PRINCIPE.map((p) => (
            <li key={p.n} className="space-y-3 border-t border-[var(--encre)] pt-5">
              <p className="font-[family-name:var(--titres)] text-5xl text-[var(--accent-texte)] tabular-nums">{p.n}</p>
              <h2 className="text-[34px]">{p.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. Chaque pièce a sa page, avec le film de sa fabrication. */}
      <section id="pages" className="scroll-mt-20 border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="space-y-5">
            <Libelle>Chaque pièce a sa page</Libelle>
            <h2 className="text-5xl sm:text-6xl">
              Pièce n° 47, <em className="text-[var(--accent-texte)]">une sur une.</em>
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Son numéro, sa matière, sa taille, son prix. Et le film de sa fabrication, du fil d&apos;argent à la dernière passe de polissage.
            </p>
            <Link href={`${DOSSIER}/pieces/47`} className="inline-flex min-h-12 items-center gap-3 bg-[var(--encre)] px-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--fond)]">
              Ouvrir sa page <span aria-hidden="true">→</span>
            </Link>
          </div>
          <FilmFabrication numero={47} />
        </div>
      </section>

      {/* 4. La sortie du vendredi. */}
      <section id="vendredi" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="space-y-5">
            <Libelle>Chaque vendredi · 18 h</Libelle>
            <h2 className="text-5xl sm:text-6xl">
              La sortie de la semaine. Six pièces. <em className="text-[var(--accent-texte)]">Les vraies.</em>
            </h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Pas de collection, pas de stock : les six pièces finies dans la semaine, montrées le vendredi à 18 h.
            </p>
            <p data-film="abonnees" className="border-l-2 border-[var(--accent)] pl-4 text-lg leading-relaxed">
              Les abonnées à la lettre les voient en premier, à 17 h.{" "}
              <a href="#lettre" className="font-semibold underline underline-offset-4">Je m&apos;inscris</a>
            </p>
          </div>
          <div className="space-y-6">
            <Vendredi />
            <p className="bg-[var(--carte)] px-4 py-3 text-[15px]">
              Prochaine sortie : <strong>{PROCHAINE.date}, {PROCHAINE.heure}</strong> — les n° {PROCHAINE.numeros}, encore à l&apos;atelier.
            </p>
          </div>
        </div>
      </section>

      {/* 5. La lettre du vendredi. */}
      <section id="lettre" className="scroll-mt-16 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="space-y-5">
            <Libelle clair>La lettre du vendredi</Libelle>
            <h2 className="text-5xl sm:text-6xl">
              17 h, <em>une heure avant.</em>
            </h2>
            <p className="max-w-md text-lg leading-relaxed">
              Les six pièces, leurs numéros, leurs prix. Une lettre par semaine, pas une de plus.
            </p>
          </div>
          <Lettre />
        </div>
      </section>

      {/* 6. Les pièces parties : leurs pages restent. */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-5">
            <Libelle>Le registre</Libelle>
            <h2 className="text-5xl sm:text-6xl">
              Elles sont parties. <em className="text-[var(--accent-texte)]">Leurs pages restent.</em>
            </h2>
          </div>
          <Link href={`${DOSSIER}/pieces`} className="text-[13px] font-semibold uppercase tracking-[0.14em] underline underline-offset-8">
            Toutes les pièces
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {parties.map((p) => (
            <li key={p.numero}>
              <CartePiece piece={p} />
            </li>
          ))}
        </ul>
      </section>

      {/* 7. L'atelier. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={IMAGES.soudureBloc.src} alt={IMAGES.soudureBloc.alt} width={IMAGES.soudureBloc.largeur} height={IMAGES.soudureBloc.hauteur} sizes="(min-width: 1024px) 560px, 100vw" className="h-full w-full object-cover object-right" />
          </div>
          <div className="space-y-5">
            <Libelle>L&apos;atelier</Libelle>
            <h2 className="text-5xl sm:text-6xl">Un établi, deux mains, <em>un marteau.</em></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Je m&apos;appelle {entreprise.creatrice}. Je scie, je soude, je martèle et je polis chaque pièce moi-même, à la main. Six par semaine, parce que c&apos;est ce que tiennent mes journées.
            </p>
            <Link href={`${DOSSIER}/atelier`} className="inline-flex min-h-12 items-center gap-3 border border-[var(--encre)] px-6 text-[13px] font-semibold uppercase tracking-[0.14em]">
              Comment naît une pièce <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Ce qui ne change pas. */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <Libelle>Ce qui ne change pas</Libelle>
        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENTS.map((e) => (
            <li key={e.titre} className="space-y-2 border-t border-[var(--trait)] pt-5">
              <h3 className="text-[28px]">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 9. Questions. */}
      <section id="questions" className="mx-auto max-w-4xl scroll-mt-20 px-5 pb-16 lg:pb-24">
        <h2 className="mb-8 text-5xl sm:text-6xl">Questions <em className="text-[var(--accent-texte)]">fréquentes.</em></h2>
        <Faq />
      </section>

      {/* 10. Venir voir. */}
      <section className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl">Les voir de près&nbsp;?</h2>
            <p className="max-w-lg text-lg leading-relaxed">
              L&apos;atelier ouvre sur rendez-vous, du mardi au samedi. On essaie les bagues, on regarde les marques du marteau.
            </p>
          </div>
          <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="flex min-h-14 items-center justify-center bg-[var(--sur-accent)] px-8 text-lg font-semibold tabular-nums text-[var(--accent)]">
            {entreprise.telephone}
          </a>
        </div>
      </section>
    </div>
  );
}
