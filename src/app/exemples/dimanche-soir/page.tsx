import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, FORMULE, QUESTIONS, photos } from "./_composants/donnees";
import { Affiche, AppelFinal, Faq, Horloge, Programme } from "./_composants/Blocs";
import CaseQuestion from "./_composants/CaseQuestion";

// L'accueil de Dimanche Soir. La vidéo : « Sur le site, une seule case : écris ta
// question, en une phrase. » La case est l'ouverture ; autour, ce qu'un vrai cabinet
// dirait : la question qui revient, le programme des trois heures, ce qu'on tape sur
// Google, l'affiche du lancement, le prix, les questions.
export const metadata: Metadata = {
  title: "Dimanche Soir — site de démonstration",
  description: "Site de démonstration d'un cabinet de coaching imaginaire, réalisé par Canevas Havane : trois heures pour une seule question, celle qui revient le dimanche soir.",
  ...adressesDeLaPage("/exemples/dimanche-soir"),
};

const RECHERCHES = ["quitter son cdi pour une reconversion", "quitter son cdi pour créer son entreprise", "quitter son cdi pour une formation"];

export default function DimancheSoir() {
  return (
    <main>
      {/* 1 · La case, sur le bleu nuit, avec la lueur d'une lampe. */}
      <section className="relative overflow-hidden">
        <Image src={photos.fenetre.src} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,42,68,.55),rgba(30,42,68,.92)_55%,#1E2A44)]" />
        <div aria-hidden="true" className="absolute -top-20 right-[-80px] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(242,193,78,.4),transparent_70%)]" />
        <div className="relative max-w-6xl mx-auto px-5 pt-10 pb-16 sm:pt-20 sm:pb-24 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <CaseQuestion />
          <p className="hidden lg:block font-[family-name:var(--titres)] text-3xl italic leading-snug text-[var(--doux)]">
            Pas « ta meilleure version ». Trois heures, pour une seule question.
          </p>
        </div>
      </section>

      {/* 2 · La question qui revient. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
        <div className="mx-auto"><Horloge /></div>
        <div className="space-y-5">
          <h2 className="text-5xl sm:text-6xl">Dimanche, <span className="italic text-[var(--accent-texte)]">22 h.</span></h2>
          <p className="text-xl leading-relaxed max-w-2xl">
            La semaine reprend demain, et la question revient. Toujours la même, depuis des
            mois. On ne te propose pas de devenir quelqu&apos;un d&apos;autre : on te propose de
            la regarder, trois heures, jusqu&apos;au bout.
          </p>
        </div>
      </section>

      {/* 3 · Le programme des trois heures. */}
      <section id="programme" className="scroll-mt-20 max-w-6xl mx-auto px-5 pb-16 sm:pb-24 space-y-8">
        <Programme />
        <Link href={`${DOSSIER}/programme`} className="inline-flex items-center gap-2 font-semibold underline underline-offset-4 decoration-[var(--accent)]">
          Le programme en détail <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* 4 · Ce qu'on tape déjà. */}
      <section className="bg-[var(--sombre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <h2 className="text-5xl sm:text-6xl">Ces questions, <span className="italic text-[var(--accent-texte)]">on les tape déjà.</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Un dimanche soir, dans un moteur de recherche. On n&apos;y trouve que des listes
              de conseils. Ici, on regarde la tienne, avec ses détails.
            </p>
          </div>
          <div className="rounded-[28px] bg-[var(--carte)] p-5 space-y-1">
            <p className="flex items-center gap-3 rounded-full border border-[var(--trait)] px-4 py-3 text-[var(--doux)]">
              <span aria-hidden="true">⌕</span> quitter son cdi
            </p>
            <ul className="pt-2">
              {RECHERCHES.map((r) => (
                <li key={r} className="px-4 py-2.5 text-lg">
                  quitter son cdi <b className="font-semibold text-[var(--accent-texte)]">{r.replace("quitter son cdi ", "")}</b>
                </li>
              ))}
            </ul>
            <p className="px-4 pt-2 text-sm text-[var(--doux)]">Suggestions de recherche relevées le 15 octobre 2026.</p>
          </div>
        </div>
      </section>

      {/* 5 · Pourquoi trois heures. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
          <Image src={photos.lampeRouge.src} alt={photos.lampeRouge.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <h2 className="text-5xl sm:text-6xl">Pourquoi <span className="italic text-[var(--accent-texte)]">trois heures&nbsp;?</span></h2>
          <p className="text-lg leading-relaxed">
            Une heure pour la question, une pour les options, une pour ce que tu testes. Trois
            soirs, trois semaines de suite. Ni dix séances d&apos;avance, ni abonnement.
          </p>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Trois heures, c&apos;est un format, pas une promesse : personne ne peut dire
            d&apos;avance ce que tu en feras.
          </p>
        </div>
      </section>

      {/* 6 · L'affiche du lancement. */}
      <section className="border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-5 md:order-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Le lancement</p>
            <h2 className="text-5xl sm:text-6xl">Une affiche, <span className="italic">un dimanche à 21 h.</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Publiée une seule fois, à l&apos;heure où tout le monde y pense. Pas de publicité qui
              te suit : une question posée, et une case pour y répondre.
            </p>
          </div>
          <Affiche />
        </div>
      </section>

      {/* 7 · Le prix. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
        <div className="space-y-4">
          <h2 className="text-5xl sm:text-6xl">Un seul <span className="italic text-[var(--accent-texte)]">prix.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Payé séance par séance, 90 € TTC chacune. Tu peux t&apos;arrêter après la première.</p>
        </div>
        <div className="rounded-[28px] bg-[var(--carte)] p-7 sm:p-9 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">{FORMULE.seances} séances × {FORMULE.duree}</p>
          <p className="font-[family-name:var(--titres)] text-7xl tabular-nums">{FORMULE.prix} <span className="text-2xl italic">TTC</span></p>
          <p className="text-[var(--doux)]">Prix d&apos;exemple : l&apos;entreprise est fictive. Ni CPF, ni abonnement.</p>
          <Link href={`${DOSSIER}/reserver`} className="mt-3 inline-flex min-h-[52px] items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 font-semibold">Choisir mes soirs</Link>
        </div>
      </section>

      {/* 8 · Les questions. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-5xl sm:text-6xl">Avant <span className="italic text-[var(--accent-texte)]">de réserver.</span></h2>
        <Faq questions={QUESTIONS} />
      </section>

      <AppelFinal />
    </main>
  );
}
