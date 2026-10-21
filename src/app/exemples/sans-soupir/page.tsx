import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { COURS, DOSSIER, FICHES, GOUTER, QUESTIONS, entreprise, euros, photos } from "./_composants/donnees";
import Eligible from "./_composants/Eligible";
import TroisFois from "./_composants/TroisFois";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une entreprise de
// dépannage informatique de zéro » : pas de l'urgence, de la patience. L'informaticien
// qui t'explique trois fois, la fiche sur le frigo, toutes les fiches gratuites à
// imprimer, le crédit d'impôt dit honnêtement, et le goûter numérique du lancement.
// Mise en page inspirée du modèle « Mindora » de MotionSites (une grande carte claire
// et arrondie, un titre en deux temps, de petites cartes en dessous), transposée.
export const metadata: Metadata = {
  title: "Sans Soupir — site de démonstration",
  description: "Site de démonstration d'une marque d'assistance informatique imaginaire, réalisé par Canevas Havane : on répète, sans soupirer — et toutes les fiches sont gratuites.",
  ...adressesDeLaPage("/exemples/sans-soupir"),
};

const PETITES = [
  { titre: "Trois fois, s'il le faut", texte: "Et une quatrième, si tu veux." },
  { titre: "Une fiche sur le frigo", texte: "En gros caractères, après chaque visite." },
  { titre: "Les fiches, gratuites", texte: "Toutes, à imprimer, sans compte." },
];

export default function SansSoupir() {
  const apercu = FICHES.slice(0, 4);
  return (
    <div>
      {/* La grande carte d'accueil. */}
      <section className="px-3 pt-3 sm:px-6 sm:pt-6">
        <div className="max-w-6xl mx-auto grid gap-3 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[36px] bg-[var(--carte)] border border-[var(--trait)] px-4 pt-12 pb-5 sm:px-12 sm:pt-16 text-center space-y-7">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-[var(--fond)] px-4 py-2 text-[15px] font-semibold">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#86BBD8]" />
              Informatique à domicile · {entreprise.ville}
            </p>
            <h1 className="text-[38px] min-[400px]:text-[44px] sm:text-7xl font-bold leading-[1.02] tracking-[-0.035em]">
              On répète.
              <span className="block">
                Sans{" "}
                <span className="relative inline-block">
                  soupirer.
                  <svg aria-hidden="true" viewBox="0 0 200 16" preserveAspectRatio="none" className="absolute -bottom-3 left-0 h-4 w-full">
                    <path d="M2 10 C 25 2, 45 16, 68 8 S 110 2, 134 9 S 175 15, 198 6" fill="none" stroke="#F6AE2D" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            </h1>
            <p className="mx-auto max-w-md text-xl leading-relaxed text-[var(--doux)]">
              Des cours d&apos;informatique chez toi, avec quelqu&apos;un qui explique trois fois s&apos;il le faut. Pas de l&apos;urgence&nbsp;: de la patience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={`${DOSSIER}/fiches`} className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] pl-7 pr-2 py-2 text-lg font-bold">
                Les fiches gratuites
                <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)]">→</span>
              </Link>
              <a href={`tel:${entreprise.telephoneLien}`} className="w-full sm:w-auto rounded-full border-2 border-[var(--sombre)] px-7 py-[14px] text-lg font-bold">{entreprise.telephone}</a>
            </div>
            <ul className="grid gap-2 sm:grid-cols-3 pt-4 text-left">
              {PETITES.map((p) => (
                <li key={p.titre} className="rounded-[22px] bg-[var(--fond)] p-4">
                  <p className="font-bold leading-snug">{p.titre}</p>
                  <p className="text-[15px] text-[var(--doux)]">{p.texte}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-[36px]">
            <Image src={photos.pelote.src} alt={photos.pelote.alt} fill preload loading="eager" sizes="(min-width: 1024px) 420px, 100vw" className="object-cover object-[50%_45%]" />
          </div>
        </div>
      </section>

      {/* Le contre-pied. */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-8">
        <ul className="flex flex-wrap gap-3" aria-label="Ce qu'on ne vend pas">
          {["« SOS »", "« Urgence »", "« 24 h sur 24 »"].map((m) => (
            <li key={m} className="rounded-full border-2 border-[var(--trait)] px-4 py-2 text-lg font-bold text-[var(--doux)] line-through decoration-[#B42318] decoration-[3px]">{m}</li>
          ))}
        </ul>
        <h2 className="text-[42px] sm:text-6xl font-bold leading-[1.02] tracking-[-0.03em]">
          On ne vend pas de l&apos;urgence. <span className="text-[var(--accent-texte)]">On vend de la patience.</span>
        </h2>
        <p className="max-w-2xl text-xl leading-relaxed text-[var(--doux)]">
          Une panne, ça se répare. Mais ce qui fait peur, c&apos;est de ne pas comprendre — et
          d&apos;avoir l&apos;impression de déranger en demandant encore. Ici, demander encore, c&apos;est
          le métier.
        </p>
      </section>

      {/* Trois fois. */}
      <section className="bg-[#DCEBF3]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--encre)]">Essaie</p>
            <h2 className="text-[40px] sm:text-6xl font-bold leading-[1.02] tracking-[-0.03em]">Trois fois. Sans soupirer.</h2>
            <p className="text-xl leading-relaxed text-[var(--doux)]">Demande-nous de répéter. On l&apos;explique autrement, à chaque fois.</p>
          </div>
          <TroisFois />
        </div>
      </section>

      {/* La fiche sur le frigo. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div aria-hidden="true" className="relative mx-auto w-full max-w-[340px] rounded-[28px] bg-[#E9EEF1] px-6 pt-10 pb-16 shadow-[inset_0_0_0_2px_#D5DEE4]">
          <span className="absolute right-4 top-24 h-28 w-2.5 rounded-full bg-[#C2CDD4]" />
          <span className="absolute left-8 top-6 h-8 w-8 rounded-full bg-[#86BBD8]" />
          <span className="absolute right-12 top-5 h-7 w-10 rounded-lg bg-[#F6AE2D]" />
          <div className="relative rotate-[-2deg] rounded-md bg-white px-5 pt-7 pb-5 shadow-[0_14px_26px_-14px_rgba(34,50,61,0.5)] space-y-3">
            <span className="absolute left-1/2 -top-3 h-7 w-7 -translate-x-1/2 rounded-full bg-[#B42318] shadow" />
            <p className="text-sm font-bold text-[var(--accent-texte)]">Sans Soupir · fiche n° 12</p>
            <p className="font-[family-name:var(--titres)] text-[26px] font-bold leading-tight">Appeler Léa en vidéo</p>
            <ol className="space-y-1.5 text-xl font-semibold">
              <li>1. Touche la bulle verte.</li>
              <li>2. Touche « Léa ».</li>
              <li>3. Touche la caméra. Souris&nbsp;!</li>
            </ol>
            <p className="border-t border-dashed border-[var(--trait)] pt-2 text-[15px] italic">Bloqué&nbsp;? Appelle-nous. On répète.</p>
          </div>
        </div>
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Après chaque visite</p>
          <h2 className="text-[40px] sm:text-6xl font-bold leading-[1.02] tracking-[-0.03em]">Une fiche sur le frigo.</h2>
          <p className="text-xl leading-relaxed text-[var(--doux)]">En gros caractères, trois étapes, pas une de plus. Pour refaire seul, demain, sans personne à côté.</p>
        </div>
      </section>

      {/* Les fiches gratuites. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24 space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Sur le site</p>
              <h2 className="text-[40px] sm:text-6xl font-bold leading-[1.02] tracking-[-0.03em]">Toutes les fiches. Gratuites, à imprimer.</h2>
            </div>
            <Link href={`${DOSSIER}/fiches`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3.5 font-bold">Voir les {FICHES.length} fiches</Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {apercu.map((f) => (
              <li key={f.numero} className="rounded-[24px] bg-[#3A5667] p-5 space-y-2">
                <p className="text-[15px] font-bold text-[#C8D6DF]">Fiche n° {f.numero} · {f.theme}</p>
                <p className="font-[family-name:var(--titres)] text-[22px] font-bold leading-tight">{f.titre}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cours à domicile et crédit d'impôt. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Cours à domicile</p>
          <h2 className="text-[40px] sm:text-5xl font-bold leading-[1.02] tracking-[-0.03em]">Chez toi, sur ton appareil.</h2>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {COURS.map((c) => (
              <li key={c.titre} className="py-4 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1">
                <span className="font-bold">{c.titre}</span>
                <span className="font-bold tabular-nums text-right">{euros(c.ht * 1.2)} TTC</span>
                <span className="text-[15px] text-[var(--doux)]">{c.detail}</span>
                <span className="text-[15px] tabular-nums text-right text-[var(--doux)]">{euros(c.ht)} HT</span>
              </li>
            ))}
          </ul>
          <p className="text-[15px] text-[var(--doux)]">Prix d&apos;exemple. <Link href={`${DOSSIER}/cours-a-domicile`} className="font-bold text-[var(--encre)] underline underline-offset-4">Le détail des cours</Link></p>
        </div>
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Le crédit d&apos;impôt, honnêtement</p>
          <h2 className="text-[40px] sm:text-5xl font-bold leading-[1.02] tracking-[-0.03em]">Apprendre, oui. Dépanner, non.</h2>
          <Eligible />
        </div>
      </section>

      {/* Le goûter numérique. */}
      <section className="px-3 sm:px-6">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[#FCE7BF] overflow-hidden grid lg:grid-cols-2">
          <div className="relative min-h-[260px]">
            <Image src={photos.gouter.src} alt={photos.gouter.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
          <div className="px-6 py-12 sm:px-12 space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--encre)]">Pour commencer</p>
            <h2 className="text-[40px] sm:text-5xl font-bold leading-[1.02] tracking-[-0.03em]">Le goûter numérique.</h2>
            <p className="text-xl leading-relaxed">Tu viens avec ta tablette, tu poses toutes tes questions. Gratuit, et rien à vendre.</p>
            <p className="rounded-2xl bg-[var(--carte)] px-5 py-4 text-lg font-bold">
              {GOUTER.date.charAt(0).toUpperCase() + GOUTER.date.slice(1)}, {GOUTER.heure}
              <span className="block text-base font-semibold text-[var(--doux)]">à {GOUTER.lieu}</span>
            </p>
            <Link href={`${DOSSIER}/gouter-numerique`} className="inline-flex rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-3.5 font-bold">Je viens</Link>
          </div>
        </div>
      </section>

      {/* Questions. */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-8">
        <h2 className="text-[40px] sm:text-6xl font-bold leading-[1.02] tracking-[-0.03em]">Tu peux demander.</h2>
        <div className="space-y-3">
          {QUESTIONS.map((q) => (
            <details key={q.question} className="group rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] px-5 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-xl font-bold leading-snug [&::-webkit-details-marker]:hidden">
                {q.question}
                <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-2xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-6 text-lg leading-relaxed text-[var(--doux)]">{q.reponse}</p>
            </details>
          ))}
        </div>
      </section>

      {/* L'appel. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div className="relative aspect-[4/5] max-h-[460px] overflow-hidden rounded-[32px]">
          <Image src={photos.lunettes.src} alt={photos.lunettes.alt} fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-6">
          <h2 className="text-[46px] sm:text-7xl font-bold leading-[0.98] tracking-[-0.035em]">Appelle. <span className="text-[var(--accent-texte)]">On répète.</span></h2>
          <p className="text-xl leading-relaxed text-[var(--doux)]">Du lundi au samedi, de 9 h à 18 h. Une vraie personne, qui a le temps.</p>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-8 py-4 text-xl font-bold">{entreprise.telephone}</a>
        </div>
      </section>
    </div>
  );
}
