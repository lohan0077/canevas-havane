import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, FORMULES, QUESTIONS, SOIREE, entreprise, euros, photos } from "./_composants/donnees";
import { Crochets, Faq, SamedisLibres } from "./_composants/Blocs";
import ChansonInterdite from "./_composants/ChansonInterdite";

// L'accueil de Deux Heures. La vidéo : « Sur l'accueil, une seule question : quelle
// chanson est interdite à ton mariage ? Tu l'écris. Et le site répond : noté, elle
// passera pas. » Autour : la piste encore pleine à deux heures (selon la salle), les
// samedis libres, la page « DJ ou playlist », la soirée heure par heure, les prix.
export const metadata: Metadata = {
  title: "Deux Heures — site de démonstration",
  description: "Site de démonstration d'un DJ de mariage imaginaire, réalisé par Canevas Havane : quelle chanson est interdite à ton mariage ?",
  ...adressesDeLaPage("/exemples/deux-heures"),
};

// Les cases de la piste, allumées comme à deux heures du matin (décor).
const PISTE = ["#FF7A2F", "#7B61FF", "#3A302B", "#FF9A5C", "#2A1F3D"];

export default function DeuxHeures() {
  return (
    <div>
      {/* 1 · Le nom en grand, et une seule question. */}
      <section id="interdite" className="relative scroll-mt-16 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rotate-[-12deg] bg-[radial-gradient(closest-side,rgba(255,122,47,.38),transparent),radial-gradient(closest-side_at_70%_60%,rgba(123,97,255,.28),transparent)] blur-2xl" />
        <div className="relative max-w-6xl mx-auto px-5 pt-6 pb-14 sm:pt-10">
          <div className="flex items-center justify-between gap-3">
            <Crochets>DJ de mariage</Crochets>
            <Crochets>02:00 · piste pleine</Crochets>
          </div>
          <h1 className="mt-3 text-[56px] sm:text-[150px] uppercase leading-[0.86] tracking-[-0.05em]">
            <span className="font-extrabold">Deux</span>
            <br />
            <span className="font-light">Heures</span>
          </h1>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div className="space-y-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Une seule question</p>
              <h2 className="text-[30px] sm:text-5xl font-extrabold uppercase leading-[1.02] tracking-[-0.03em]">
                Quelle chanson est <span className="font-light text-[var(--accent-texte)]">interdite</span> à ton mariage&nbsp;?
              </h2>
            </div>
            <ChansonInterdite />
          </div>
        </div>
      </section>

      {/* 2 · Pas du son : la piste encore pleine. */}
      <section className="border-t border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
            <Image src={photos.bouleOr.src} alt={photos.bouleOr.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
            <p className="absolute left-4 bottom-4 rounded-full bg-[var(--fond)] px-4 py-2 font-[family-name:var(--titres)] text-[22px] font-extrabold tabular-nums">02:00</p>
          </div>
          <div className="space-y-5">
            <Crochets>Ce qu&apos;on vend vraiment</Crochets>
            <p className="font-[family-name:var(--titres)] text-[36px] sm:text-6xl font-extrabold uppercase leading-[0.98] tracking-[-0.04em]">
              Pas du son. <span className="font-light text-[var(--accent-texte)]">La piste encore pleine, à deux heures.</span>
            </p>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Les platines, la fumée, les lasers : tout le monde en a. Ce qui reste, c&apos;est la piste à deux heures du matin
              — si la salle le permet. Encore pleine.
            </p>
            <div aria-hidden="true" className="grid grid-cols-8 gap-1.5 max-w-xs">
              {Array.from({ length: 24 }, (_, k) => (
                <span key={k} className="aspect-square rounded-[4px]" style={{ background: PISTE[(k * 7 + Math.floor(k / 8)) % PISTE.length], opacity: k % 5 === 0 ? 1 : 0.7 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 · Les samedis libres. */}
      <SamedisLibres />

      {/* 4 · DJ ou playlist : la page honnête. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-5">
          <Crochets>La vraie question</Crochets>
          <h2 className="text-[36px] sm:text-6xl font-extrabold uppercase leading-[0.98] tracking-[-0.04em]">DJ ou <span className="font-light">playlist&nbsp;?</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            On répond honnêtement. Même quand la réponse, c&apos;est : prends une playlist. Un dîner calme à trente n&apos;a pas
            besoin de nous.
          </p>
          <Link href={`${DOSSIER}/dj-ou-playlist`} className="inline-flex h-12 items-center rounded-full bg-[var(--encre)] px-6 font-bold text-[var(--fond)]">
            Lire la réponse
          </Link>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
          <Image src={photos.bouleRose.src} alt={photos.bouleRose.alt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
        </div>
      </section>

      {/* 5 · La soirée, heure par heure. */}
      <section className="border-t border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
          <h2 className="text-[36px] sm:text-6xl font-extrabold uppercase leading-[0.98] tracking-[-0.04em]">La soirée, <span className="font-light">heure par heure</span></h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOIREE.map((s) => (
              <li key={s.heure} className="rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-5 space-y-2">
                <p className="font-[family-name:var(--titres)] text-[34px] font-extrabold text-[var(--accent-texte)] tabular-nums">{s.heure}</p>
                <h3 className="text-[18px] font-extrabold uppercase">{s.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 · Les prix. */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-8">
          <div className="space-y-3">
            <Crochets>Le prix, sur la page</Crochets>
            <h2 className="text-[36px] sm:text-6xl font-extrabold uppercase leading-[0.98] tracking-[-0.04em]">Pas de « contactez-nous »</h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {FORMULES.map((f) => (
              <li key={f.nom} className="rounded-[24px] border border-[var(--trait)] bg-[var(--fond)] p-6 space-y-2">
                <h3 className="text-[20px] font-extrabold uppercase">{f.nom}</h3>
                <p className="font-[family-name:var(--titres)] text-[38px] font-extrabold tabular-nums">{f.nom === "Une heure de plus" ? "+ " : ""}{euros(f.prix)}</p>
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-texte)]">TTC · exemple</p>
                <p className="leading-relaxed text-[var(--doux)]">{f.detail}</p>
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-[var(--doux)]">Son et lumière compris, installation l&apos;après-midi. L&apos;heure de fin, c&apos;est la salle qui la fixe.</p>
        </div>
      </section>

      {/* 7 · Ce qu'on ne fait pas. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[28px]">
          <Image src={photos.rayons.src} alt={photos.rayons.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-4">
          <h2 className="text-[30px] sm:text-5xl font-extrabold uppercase leading-[1] tracking-[-0.03em]">Ce qu&apos;on ne fait <span className="font-light">jamais</span></h2>
          <ul className="space-y-3 text-lg leading-relaxed">
            <li>— Passer la chanson interdite. Même à minuit, même pour l&apos;oncle.</li>
            <li>— Promettre une heure de fin que la salle n&apos;autorise pas.</li>
            <li>— Publier une photo de tes invités sans leur accord, ni celui des mariés.</li>
          </ul>
        </div>
      </section>

      {/* 8 · Les questions. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-[30px] sm:text-5xl font-extrabold uppercase leading-[1] tracking-[-0.03em]">Les <span className="font-light">questions</span></h2>
        <Faq questions={QUESTIONS} />
      </section>

      {/* 9 · L'appel. */}
      <section className="relative overflow-hidden border-t border-[var(--trait)]">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,122,47,.32),transparent)] blur-2xl" />
        <div className="relative max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-6">
          <p className="font-[family-name:var(--titres)] text-[36px] sm:text-7xl font-extrabold uppercase leading-[0.96] tracking-[-0.04em]">
            On ne se demande plus s&apos;il faut un DJ. <span className="font-light text-[var(--accent-texte)]">On bloque son samedi.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={`${DOSSIER}/samedis-libres`} className="inline-flex h-14 items-center rounded-full bg-[var(--accent)] px-7 text-[17px] font-bold text-[var(--sur-accent)]">
              Bloquer ma date
            </Link>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex h-14 items-center rounded-full border border-[var(--encre)] px-6 text-[17px] tabular-nums">
              {entreprise.telephone}
            </a>
          </div>
          <p className="text-sm text-[var(--doux)]">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
        </div>
      </section>
    </div>
  );
}
