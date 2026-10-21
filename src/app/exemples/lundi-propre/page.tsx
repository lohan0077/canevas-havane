import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, PREUVES, PRESTATIONS, QUESTIONS, photos } from "./_composants/donnees";
import { AppelFinal, Pastille, PostIt, Section } from "./_composants/Blocs";
import Grille from "./_composants/Grille";

export const metadata: Metadata = {
  title: "Lundi Propre — site de démonstration",
  description: "Site de démonstration d'une entreprise de nettoyage de bureaux imaginaire, réalisé par Canevas Havane : le rapport de passage chaque soir, et la grille de prix en ligne, hors taxes.",
  ...adressesDeLaPage("/exemples/lundi-propre"),
};

export default function LundiPropre() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-6 pb-16 sm:pb-24">
        <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.14em]">
          <span className="rounded-full border-2 border-[var(--encre)] px-3 py-1">Nettoyage de bureaux</span>
          <span>Exemple-Ville</span>
        </div>
        {/* Le mot géant, et posé dessus comme l'objet du modèle, le post-it du lundi
            matin — celui qu'on vise : « Rien à signaler ». */}
        <div className="relative mt-10 sm:mt-14 pb-16 sm:pb-6">
          <h1 className="text-left sm:text-center font-black leading-[0.82] tracking-[-0.05em]">
            <span className="block text-[22.5vw] sm:text-[190px]">LUNDI</span>
            <span className="sr-only"> </span>
            <span className="mt-4 block text-[12vw] sm:text-[96px] font-semibold tracking-[-0.03em]">propre<span aria-hidden="true" className="text-[var(--accent)]">.</span></span>
          </h1>
          <div className="absolute right-0 top-[62%] sm:top-auto sm:right-[8%] sm:-bottom-6">
            <PostIt heure="Lundi, 8 h 12" texte="Rien à signaler." signe="l'accueil" className="rotate-[7deg] w-[118px] p-3 text-[13px] leading-snug sm:w-[210px] sm:p-5 sm:text-base" />
          </div>
        </div>
        <p className="mt-12 text-center text-xl sm:text-2xl font-semibold">Un lundi matin sans une seule remarque.</p>
        <p className="mx-auto mt-3 max-w-xl text-center text-lg leading-relaxed text-[var(--doux)]">
          Le soir, quand vos bureaux sont vides, on passe. Et avant 21 h 30, vous recevez le rapport&nbsp;:
          ce qui a été fait, et ce qu'on a remarqué en passant.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href={`${DOSSIER}/tarifs`} className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--encre)] px-8 text-lg font-bold text-[var(--fond)]">
            Votre prix, tout de suite
          </Link>
          <Link href={`${DOSSIER}/rapport-de-passage`} className="inline-flex h-14 items-center justify-center rounded-full border-2 border-[var(--encre)] px-8 text-lg font-bold">
            Voir un rapport
          </Link>
        </div>
      </section>

      <div className="bg-[var(--carte)]">
        <Section className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-5">
            <Pastille>Le constat</Pastille>
            <h2 className="text-[34px] sm:text-6xl font-black leading-[0.98] tracking-[-0.03em]">On ne vous remarque qu'une fois&nbsp;: le jour d'un oubli.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)] max-w-2xl">
              Quand tout va bien, le nettoyage ne se voit pas. Le seul jour où l'on y pense, c'est
              le post-it du lundi matin. Alors on ne vend pas du propre&nbsp;: on vend un lundi sans
              remarque, et les preuves qui vont avec.
            </p>
          </div>
          <PostIt heure="Lundi, 8 h 12" texte="La poubelle de la salle 3 n'a pas été vidée !!" signe="l'accueil" className="mx-auto w-[230px] p-5 rotate-[4deg]" />
        </Section>
      </div>

      <Section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <Pastille>Chaque soir</Pastille>
          <h2 className="text-[34px] sm:text-6xl font-black leading-[0.98] tracking-[-0.03em]">Le rapport de passage.</h2>
          <p className="text-lg leading-relaxed">
            Arrivée 19 h 40, départ 21 h 05. Quatorze bureaux, les sanitaires, les poubelles. Et ce
            qu'on a remarqué en passant&nbsp;: un store bloqué, une fuite sous l'évier — signalés
            avant que vous les voyiez.
          </p>
          <Link href={`${DOSSIER}/rapport-de-passage`} className="inline-flex h-12 items-center rounded-full bg-[var(--accent)] px-6 font-bold text-[var(--sur-accent)]">Ouvrir le rapport de mardi</Link>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
          <Image src={photos.bureau.src} alt={photos.bureau.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </Section>

      <div className="bg-[var(--carte)]">
        <Section id="prix" className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5 lg:sticky lg:top-28">
            <Pastille>Nos prix</Pastille>
            <h2 className="text-[34px] sm:text-6xl font-black leading-[0.98] tracking-[-0.03em]">Votre prix, tout de suite.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Votre surface, vos passages par semaine&nbsp;: un prix mensuel d'exemple s'affiche. Hors
              taxes, parce que nos clients sont des professionnels. Le prix ferme vient au devis,
              après une visite.
            </p>
          </div>
          <div className="rounded-[30px] bg-[var(--fond)] p-1.5">
            <Grille />
          </div>
        </Section>
      </div>

      <Section className="space-y-10">
        <div className="grid gap-5 md:grid-cols-2 md:items-end">
          <div className="space-y-4">
            <Pastille>Ce qu'on fait</Pastille>
            <h2 className="text-[34px] sm:text-6xl font-black leading-[0.98] tracking-[-0.03em]">Tout ce qui se voit lundi matin.</h2>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
            <Image src={photos.chiffon.src} alt={photos.chiffon.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PRESTATIONS.map((p) => (
            <li key={p.titre} className="rounded-[22px] border-2 border-[var(--trait)] p-5 space-y-2">
              <h3 className="text-lg font-black leading-tight">{p.titre}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </li>
          ))}
        </ul>
      </Section>

      <div id="preuves" className="bg-[var(--sombre)] text-[var(--sur-sombre)] scroll-mt-16">
        <Section className="space-y-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em]">Nos preuves</p>
            <h2 className="text-[34px] sm:text-6xl font-black leading-[0.98] tracking-[-0.03em]">
              L'acheteur ne compare plus les prix. Il compare <span className="text-[var(--accent)]">les preuves.</span>
            </h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {PREUVES.map((p, i) => (
              <li key={p.titre} className="rounded-[24px] border border-[var(--sur-sombre)]/25 p-6 space-y-2">
                <p className="font-[family-name:var(--titres)] text-3xl font-black text-[var(--accent)] tabular-nums">0{i + 1}</p>
                <h3 className="text-xl font-bold">{p.titre}</h3>
                <p className="leading-relaxed">{p.texte}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px] md:order-2">
          <Image src={photos.sanitaires.src} alt={photos.sanitaires.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <Pastille>Le rapport et nos agents</Pastille>
          <h2 className="text-[34px] sm:text-5xl font-black leading-[0.98] tracking-[-0.03em]">Ce qui a été fait, pas qui l'a fait.</h2>
          <p className="text-lg leading-relaxed">
            Le rapport dit les heures et les tâches&nbsp;; il ne nomme personne&nbsp;: «&nbsp;Équipe du soir · 2
            agents&nbsp;». Nos agents savent qu'il existe et ce qu'il contient avant de travailler chez
            vous, et le comité social et économique, quand l'entreprise en a un, est consulté sur ce
            dispositif.
          </p>
        </div>
      </Section>

      <div className="bg-[var(--carte)]">
        <Section id="questions" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <Pastille>Questions</Pastille>
            <h2 className="text-[34px] sm:text-6xl font-black leading-[0.98] tracking-[-0.03em]">Ce qu'on nous demande.</h2>
          </div>
          <div className="space-y-3">
            {QUESTIONS.map((q) => (
              <details key={q.q} className="group rounded-[20px] bg-[var(--fond)] px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                  {q.q}
                  <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] font-black transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-[var(--doux)]">{q.r}</p>
              </details>
            ))}
          </div>
        </Section>
      </div>

      <AppelFinal />
    </>
  );
}
