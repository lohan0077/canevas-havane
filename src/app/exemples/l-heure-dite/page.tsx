import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, POMPES, QUESTIONS, VISITE, photos } from "./_composants/donnees";
import { Affiche, AppelFinal, LaRegle, Section, Surtitre } from "./_composants/Blocs";
import Ouverture from "./_composants/Ouverture";

export const metadata: Metadata = {
  title: "L'Heure Dite — site de démonstration",
  description: "Site de démonstration d'un installateur de pompes à chaleur imaginaire, réalisé par Canevas Havane : tu choisis le jour et l'heure de ton appel, on appelle à cette heure-là.",
  ...adressesDeLaPage("/exemples/l-heure-dite"),
};

export default function LHeureDite() {
  return (
    <>
      <Ouverture />

      <LaRegle />

      <Section className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
          <Image src={photos.horloge.src} alt={photos.horloge.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <Surtitre>Comme chez le coiffeur</Surtitre>
            <h2 className="text-[44px] sm:text-6xl font-normal tracking-[-0.02em]">Ton appel, à l'heure dite.</h2>
          </div>
          <ol className="space-y-7">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="grid grid-cols-[auto_1fr] gap-5">
                <span className="font-[family-name:var(--titres)] text-5xl leading-none text-[var(--accent-texte)] tabular-nums">{i + 1}</span>
                <div className="space-y-1.5">
                  <h3 className="text-2xl">{e.titre}</h3>
                  <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--sombre)] px-8 text-lg font-semibold text-[var(--sur-sombre)]">
            Choisir mon heure
          </Link>
        </div>
      </Section>

      <div className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <Section className="space-y-12">
          <div className="grid gap-5 md:grid-cols-2 md:items-end">
            <div className="space-y-3">
              <Surtitre>Ce qu'on installe</Surtitre>
              <h2 className="text-[44px] sm:text-6xl font-normal tracking-[-0.02em]">Trois pompes à chaleur, une seule méthode.</h2>
            </div>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Prix d'exemple, TTC, pose comprise, avant toute aide&nbsp;: on ne t'en promet aucune. Le prix
              ferme vient au devis écrit, après la visite.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[28px] border border-[var(--trait)] bg-[var(--trait)] md:grid-cols-3">
            {POMPES.map((p) => (
              <li key={p.nom} className="bg-[var(--carte)] p-7 flex flex-col gap-4">
                <h3 className="text-3xl">{p.nom}</h3>
                <p className="font-[family-name:var(--titres)] italic text-xl text-[var(--accent-texte)]">{p.phrase}</p>
                <p className="leading-relaxed text-[var(--doux)] flex-1">{p.texte}</p>
                <p className="pt-4 border-t border-[var(--trait)]">
                  <span className="text-sm">À partir de </span>
                  <span className="font-[family-name:var(--titres)] text-4xl tabular-nums whitespace-nowrap">{p.prix}</span>
                  <span className="block text-sm text-[var(--doux)]">TTC · exemple</span>
                </p>
              </li>
            ))}
          </ul>
          <Link href={`${DOSSIER}/pompes-a-chaleur`} className="inline-block text-lg underline underline-offset-4">Ce que chacune change chez toi</Link>
        </Section>
      </div>

      <Section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6 md:order-2">
          <Surtitre>La visite</Surtitre>
          <h2 className="text-[44px] sm:text-6xl font-normal tracking-[-0.02em]">On mesure avant de proposer.</h2>
          <p className="text-lg leading-relaxed">
            Une pompe à chaleur mal dimensionnée chauffe mal et s'use vite. À la visite, on regarde&nbsp;:
          </p>
          <ul className="space-y-3">
            {VISITE.map((v) => (
              <li key={v} className="flex gap-3 text-lg leading-snug">
                <span aria-hidden="true" className="mt-2.5 h-px w-5 shrink-0 bg-[var(--encre)]" />
                {v}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] md:order-1">
          <Image src={photos.radiateur.src} alt={photos.radiateur.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
        </div>
      </Section>

      <div className="bg-[#E3EEF3] text-[#14324A]">
        <Section className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em]">Notre affiche</p>
            <h2 className="text-[40px] sm:text-5xl font-normal tracking-[-0.02em]">Une seule affiche, et le message France Rénov' en bas.</h2>
            <p className="text-lg leading-relaxed">
              Depuis le 1er octobre 2026, toute publicité pour ces travaux reproduit le message
              du service public, tel quel. Le nôtre est en bas de l'affiche, et en haut de chaque
              page de ce site.
            </p>
          </div>
          <Affiche />
        </Section>
      </div>

      <Section id="questions" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-[44px] sm:text-6xl font-normal tracking-[-0.02em]">Ce qu'on nous demande.</h2>
          <div className="relative mt-6 hidden aspect-[2/3] max-w-xs overflow-hidden rounded-[26px] lg:block">
            <Image src={photos.fauteuil.src} alt={photos.fauteuil.alt} fill sizes="320px" className="object-cover" />
          </div>
        </div>
        <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {QUESTIONS.map((q) => (
            <details key={q.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--titres)] text-2xl">
                {q.q}
                <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--encre)] font-[family-name:var(--texte)] text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[17px] leading-relaxed text-[var(--doux)]">{q.r}</p>
            </details>
          ))}
        </div>
      </Section>

      <AppelFinal />
    </>
  );
}
