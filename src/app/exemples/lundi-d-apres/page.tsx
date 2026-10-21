import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, FORMATS, METHODE, QUESTIONS, entreprise, photos } from "./_composants/donnees";
import { Coin, Faq, MachineACafe } from "./_composants/Blocs";
import PhraseLundi from "./_composants/PhraseLundi";

// L'accueil de Lundi d'Après. La vidéo : « Sur le site, une seule question : qu'est-ce
// que tes équipes doivent se raconter lundi ? Et on construit la soirée à l'envers, à
// partir de cette phrase. » Autour : le lundi d'après (la machine à café), la méthode,
// les formats et leurs prix HT, la phrase du lundi, les croissants du lancement.
export const metadata: Metadata = {
  title: "Lundi d'Après — site de démonstration",
  description: "Site de démonstration d'une agence d'événements d'entreprise imaginaire, réalisé par Canevas Havane : lundi, vos équipes diront quoi ?",
  ...adressesDeLaPage("/exemples/lundi-d-apres"),
};

export default function LundiDApres() {
  return (
    <div>
      {/* 1 · Une seule question. */}
      <section id="question" className="scroll-mt-16 max-w-6xl mx-auto px-5 pt-6 pb-16 sm:pt-10">
        <div className="flex items-start justify-between gap-4">
          <Coin>avant le lieu,<br />avant la date</Coin>
          <Coin className="text-right">agence d&apos;événements<br />d&apos;entreprise</Coin>
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-4 lg:pt-6">
            <h1 className="text-[52px] sm:text-[88px] font-bold lowercase leading-[0.95] tracking-[-0.04em]">
              lundi, vos équipes diront <span className="text-[var(--accent-texte)]">quoi&nbsp;?</span>
            </h1>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Écrivez la phrase qu&apos;on entendra devant la machine à café. On construit la soirée à l&apos;envers, à partir
              d&apos;elle.
            </p>
          </div>
          <PhraseLundi />
        </div>
      </section>

      {/* 2 · Pas une soirée : le lundi d'après. */}
      <section className="bg-[#9AD1D4] [--doux:#5A3D2B]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-5">
            <Coin>ce qu&apos;on vend vraiment</Coin>
            <p className="font-[family-name:var(--titres)] text-[44px] sm:text-7xl font-bold lowercase leading-[0.98] tracking-[-0.03em]">
              pas une soirée. le lundi d&apos;après.
            </p>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Une soirée, ça s&apos;oublie le lendemain. Ce qu&apos;on construit, c&apos;est le moment dont tout le monde parle
              encore lundi matin, devant la machine à café.
            </p>
            <p className="text-[13px] text-[var(--doux)]">Les phrases dans les bulles sont des exemples.</p>
          </div>
          <MachineACafe />
        </div>
      </section>

      {/* 3 · La méthode, à l'envers. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[40px] sm:text-6xl font-bold lowercase leading-[1] tracking-[-0.03em]">la soirée, à l&apos;envers</h2>
          <Link href={`${DOSSIER}/a-l-envers`} className="inline-flex h-12 items-center rounded-full bg-[var(--encre)] px-6 font-semibold text-[var(--fond)]">
            Voir un exemple
          </Link>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <li key={m.titre} className="rounded-[28px] bg-[var(--carte)] p-6 space-y-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-lg font-bold">{i + 1}</span>
              <h3 className="text-[24px] font-bold lowercase">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4 · Les formats, et leurs prix (HT : nos clients sont des entreprises). */}
      <section className="bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-8">
          <div className="space-y-3">
            <Coin>le prix, sur la page</Coin>
            <h2 className="text-[40px] sm:text-6xl font-bold lowercase leading-[1] tracking-[-0.03em]">trois formats</h2>
          </div>
          <ul className="grid gap-3 md:grid-cols-3">
            {FORMATS.map((f) => (
              <li key={f.nom} className="rounded-[28px] bg-[var(--fond)] p-6 space-y-2">
                <h3 className="text-[22px] font-bold lowercase">{f.nom}</h3>
                <p className="font-[family-name:var(--titres)] text-[20px] font-semibold text-[var(--accent-texte)]">{f.prix}</p>
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--doux)]">exemple</p>
                <p className="leading-relaxed text-[var(--doux)]">{f.detail}</p>
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-[var(--doux)]">Prix hors taxes, par personne : nos clients sont des entreprises. Le devis détaille tout, ligne par ligne.</p>
        </div>
      </section>

      {/* 5 · La phrase du lundi. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative aspect-[3/4] max-w-sm overflow-hidden rounded-[32px]">
          <Image src={photos.micro.src} alt={photos.micro.alt} fill sizes="(min-width: 768px) 380px, 90vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <Coin>une par événement</Coin>
          <h2 className="text-[40px] sm:text-6xl font-bold lowercase leading-[1] tracking-[-0.03em]">la phrase du lundi</h2>
          <figure className="rounded-[28px] bg-[var(--encre)] p-6 text-[var(--fond)] space-y-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#FFD9A0]">Exemple</p>
            <blockquote className="font-[family-name:var(--titres)] text-[28px] font-semibold leading-snug">« On refait ça quand&nbsp;? »</blockquote>
          </figure>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Après chaque événement, on note la vraie phrase entendue lundi. On ne la publie qu&apos;avec l&apos;accord de
            l&apos;entreprise et de la personne.
          </p>
          <Link href={`${DOSSIER}/la-phrase-du-lundi`} className="inline-flex font-semibold underline decoration-[var(--accent)] decoration-[3px] underline-offset-[6px]">
            Comment on la recueille →
          </Link>
        </div>
      </section>

      {/* 6 · Les croissants du lundi. */}
      <section className="bg-[#9AD1D4] [--doux:#5A3D2B]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-5">
            <Coin>un lundi matin, 8 h 30</Coin>
            <h2 className="text-[40px] sm:text-6xl font-bold lowercase leading-[1] tracking-[-0.03em]">des croissants, et un mot</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Pour nous présenter, un lundi, on livre des croissants dans les bureaux du quartier, achetés chez le boulanger
              d&apos;à côté. Sans rien vous demander en échange. Avec un mot.
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[32px]">
              <Image src={photos.croissants.src} alt={photos.croissants.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
            </div>
            <p className="absolute -bottom-6 left-4 right-10 rotate-[-2deg] rounded-[20px] bg-[var(--accent)] px-5 py-4 font-[family-name:var(--titres)] text-[22px] font-bold leading-tight">
              ça, c&apos;est lundi. imaginez le vendredi.
            </p>
          </div>
        </div>
      </section>

      {/* 7 · Les questions. */}
      <section className="max-w-6xl mx-auto px-5 pt-20 pb-16 sm:pb-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <h2 className="text-[40px] sm:text-6xl font-bold lowercase leading-[1] tracking-[-0.03em]">vos questions</h2>
          <div className="relative hidden lg:block aspect-[3/2] overflow-hidden rounded-[32px]">
            <Image src={photos.cafe.src} alt={photos.cafe.alt} fill sizes="380px" className="object-cover" />
          </div>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      {/* 8 · L'appel. */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="rounded-[40px] bg-[var(--accent)] px-6 py-12 sm:px-12 sm:py-16 space-y-6">
          <p className="font-[family-name:var(--titres)] text-[40px] sm:text-7xl font-bold lowercase leading-[0.98] tracking-[-0.03em]">
            ça vend pas une soirée. ça vend le lundi.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={`${DOSSIER}#question`} className="inline-flex h-14 items-center rounded-full bg-[var(--encre)] px-7 text-[17px] font-semibold text-[var(--fond)]">
              Écrire notre phrase
            </Link>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex h-14 items-center rounded-full border-2 border-[var(--encre)] px-6 text-[17px] font-semibold tabular-nums">
              {entreprise.telephone}
            </a>
          </div>
          <p className="text-sm">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
        </div>
      </section>
    </div>
  );
}
