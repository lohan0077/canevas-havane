import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Trajet from "./_composants/Trajet";
import Essai from "./_composants/Essai";
import { CarteOccasion, Faq, Libelle } from "./_composants/Blocs";
import { DOSSIER, FORFAITS, IMAGES, OCCASIONS, entreprise, euros } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "Ça Monte — site de démonstration",
  description: "Site de démonstration d'un magasin de vélos imaginaire, réalisé par Canevas Havane : ton trajet, c'est combien ? Le site te montre le vélo qu'il te faut.",
  ...adressesDeLaPage("/exemples/ca-monte"),
};

const REPERES = [
  { chiffre: "25 km/h", texte: "Là où l'assistance s'arrête. Nos temps de trajet restent en dessous." },
  { chiffre: "2 h", texte: "D'essai, sur ton vrai trajet, au départ du magasin." },
  { chiffre: "1 fiche", texte: "Par vélo d'occasion : batterie testée, révision, marquage." },
];

const AFFICHE = [
  { titre: "La batterie, testée", texte: "Capacité restante mesurée au banc, en pourcentage de l'origine, avec la date du test." },
  { titre: "Le marquage, comme la loi l'impose", texte: "Chaque vélo vendu est identifié et inscrit au fichier national (code des transports, art. L1271-2). Tous les magasins y sont tenus." },
  { titre: "La taille, conseillée", texte: "De quelle taille à quelle taille il convient, écrit sur la fiche, et réglé avant l'essai." },
  { titre: "La révision, détaillée", texte: "Ce qu'on a changé et réglé, pièce par pièce. Pas « révisé », tout court." },
];

export default function CaMonte() {
  const vitrine = OCCASIONS.slice(0, 3);
  return (
    <div>
      {/* 1. L'ouverture : une seule question, et l'outil qui y répond. */}
      <section id="trajet" className="scroll-mt-16 bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-14 pt-8 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:pb-20 lg:pt-14">
          <div className="space-y-5 lg:pt-6">
            <Libelle clair>Magasin de vélos · atelier · occasion</Libelle>
            <h1 className="font-bold uppercase leading-[0.95] tracking-tight text-[52px] sm:text-[80px]">
              Ton trajet, <span className="text-[#D7F23C]">c&apos;est combien&nbsp;?</span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-[#C3C7CC]">
              Pas de catalogue de cinq cents vélos. Glisse la distance, dis-nous s&apos;il y a une côte : on te montre le vélo qu&apos;il te faut.
            </p>
          </div>
          <Trajet />
        </div>
      </section>

      {/* 2. Le parti pris, en capitales. */}
      <section className="bg-[#D7F23C] text-[var(--sombre)]">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:py-20">
          <h2 className="font-bold uppercase leading-[0.98] tracking-tight text-[40px] sm:text-[64px]">
            On ne vend pas un vélo. On vend le trajet de lundi matin.
          </h2>
          <dl className="mt-10 grid gap-6 border-t-2 border-[var(--sombre)] pt-6 sm:grid-cols-3">
            {REPERES.map((r) => (
              <div key={r.chiffre}>
                <dt className="font-[family-name:var(--titres)] text-[44px] font-bold leading-none tabular-nums">{r.chiffre}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed">{r.texte}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3. L'essai sur ton vrai trajet. */}
      <section id="essai" className="mx-auto grid max-w-6xl scroll-mt-16 gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div className="space-y-5">
          <Libelle>L&apos;essai</Libelle>
          <h2 className="font-bold uppercase leading-[0.98] tracking-tight text-[40px] sm:text-[56px]">Sur ton vrai trajet, un samedi matin.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le vélo réglé à ta taille, un casque prêté, deux heures. Tu fais ton trajet, ta côte comprise, et tu reviens nous dire.
          </p>
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[28px] lg:block">
            <Image src={IMAGES.piste.src} alt={IMAGES.piste.alt} width={IMAGES.piste.largeur} height={IMAGES.piste.hauteur} sizes="460px" className="h-full w-full object-cover" />
          </div>
        </div>
        <Essai />
      </section>

      {/* 4. L'occasion. */}
      <section className="border-y-2 border-[var(--sombre)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-4">
              <Libelle>L&apos;occasion</Libelle>
              <h2 className="font-bold uppercase leading-[0.98] tracking-tight text-[40px] sm:text-[56px]">Chaque vélo a sa fiche.</h2>
            </div>
            <Link href={`${DOSSIER}/occasion`} className="text-[14px] font-bold uppercase tracking-[0.08em] underline underline-offset-4">Tous les vélos d&apos;occasion</Link>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {vitrine.map((o) => <li key={o.id}><CarteOccasion o={o} /></li>)}
          </ul>
          <p className="mt-4 text-[13px] text-[var(--doux)]">Vélos, prix TTC et tests d&apos;exemple : le magasin est fictif.</p>
        </div>
      </section>

      {/* 5. Ce qu'on affiche. */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <Libelle>Sur chaque fiche</Libelle>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {AFFICHE.map((a, i) => (
            <li key={a.titre} className="flex gap-4 rounded-[24px] bg-[var(--carte)] p-5">
              <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--sombre)] font-[family-name:var(--titres)] text-lg font-bold text-[#D7F23C]">{i + 1}</span>
              <span>
                <span className="block text-[20px] font-bold leading-tight">{a.titre}</span>
                <span className="mt-1 block leading-relaxed text-[var(--doux)]">{a.texte}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. L'atelier. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
            <Image src={IMAGES.atelier.src} alt={IMAGES.atelier.alt} width={IMAGES.atelier.largeur} height={IMAGES.atelier.hauteur} sizes="(min-width: 1024px) 540px, 100vw" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-5">
            <Libelle clair>L&apos;atelier</Libelle>
            <h2 className="font-bold uppercase leading-[0.98] tracking-tight text-[40px] sm:text-[56px]">Les prix, <span className="text-[#D7F23C]">affichés.</span></h2>
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {FORFAITS.slice(0, 3).map((f) => (
                <li key={f.nom} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-semibold">{f.nom}</span>
                  <span className="font-[family-name:var(--titres)] text-[22px] font-bold tabular-nums text-[#D7F23C]">{euros(f.prix)}</span>
                </li>
              ))}
            </ul>
            <p className="text-[13px] text-[#C3C7CC]">Prix TTC d&apos;exemple, main-d&apos;œuvre comprise, pièces en plus.</p>
            <Link href={`${DOSSIER}/atelier`} className="inline-flex min-h-12 items-center rounded-full bg-[#D7F23C] px-6 font-bold uppercase tracking-[0.06em] text-[var(--sombre)]">
              Tous les forfaits
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Une image, une phrase. */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:items-center lg:py-24">
        <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-[28px]">
          <Image src={IMAGES.chaine.src} alt={IMAGES.chaine.alt} width={IMAGES.chaine.largeur} height={IMAGES.chaine.hauteur} sizes="(min-width: 768px) 420px, 100vw" className="h-full w-full object-cover" />
        </div>
        <p className="font-bold uppercase leading-[1.08] tracking-tight text-[36px] sm:text-[52px]">
          Moteur, couple, wattheures&nbsp;? On t&apos;explique, si tu veux. Mais d&apos;abord&nbsp;: <span className="bg-[#D7F23C] px-1">est-ce que ça monte ta côte&nbsp;?</span>
        </p>
      </section>

      {/* 8. Questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 lg:grid-cols-[0.8fr_1.2fr] lg:pb-24">
        <div className="space-y-4">
          <Libelle>Questions</Libelle>
          <h2 className="font-bold uppercase leading-[0.98] tracking-tight text-[40px] sm:text-[56px]">Avant de passer.</h2>
        </div>
        <Faq />
      </section>

      {/* 9. Venir. */}
      <section className="bg-[#D7F23C] text-[var(--sombre)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="font-bold uppercase leading-[0.98] tracking-tight text-[40px] sm:text-[56px]">Passe au magasin.</h2>
            <p className="text-lg font-semibold">{entreprise.adresse} · {entreprise.horaires}</p>
          </div>
          <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="flex min-h-14 items-center justify-center rounded-full bg-[var(--sombre)] px-8 text-lg font-bold tabular-nums text-[#D7F23C]">
            {entreprise.telephone}
          </a>
        </div>
      </section>
    </div>
  );
}
