import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { COMPRIS, DELAI, DOSSIER, ENGAGEMENTS, FAQ, entreprise, photos } from "./_composants/donnees";
import PlanMaison from "./_composants/PlanMaison";
import Historique from "./_composants/Historique";
import Faq from "./_composants/Faq";

// Le site de l'installateur imaginé dans la vidéo « Si je devais remplir le carnet de
// chantiers d'un installateur de clim » : on ne vend pas une clim, on vend la première
// nuit où l'on dort en août. Mise en page inspirée du modèle « Mindful Companion » de
// MotionSites — un ciel en dégradé, un grand titre doux —, transposée à la nuit d'été.
export const metadata: Metadata = {
  title: "Nuit d'Août — site de démonstration",
  description: "Site de démonstration d'un installateur de climatisation imaginaire, réalisé par Canevas Havane : le plan de ta maison donne une fourchette pose comprise, et le vrai délai de pose est affiché en haut du site.",
  ...adressesDeLaPage("/exemples/nuit-d-aout"),
};

export default function NuitDAout() {
  return (
    <div>
      {/* 1. L'ouverture : le ciel d'une nuit d'été. */}
      <section className="relative overflow-hidden bg-[#1B2A4E] bg-[linear-gradient(180deg,#0F1B33_0%,#1B2A4E_55%,#3B4A7A_100%)] text-[var(--sur-sombre)]">
        <svg aria-hidden="true" viewBox="0 0 160 90" className="absolute right-3 top-3 w-40 h-[90px] opacity-70">
          {[[20, 12], [62, 30], [104, 10], [140, 42], [92, 58], [150, 78], [30, 64]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill="#F3F5FA" />
          ))}
        </svg>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2B6A0]">Climatisation · Ta Ville</p>
            <h1 className="text-[3.1rem] sm:text-8xl font-light tracking-[-0.03em] leading-[0.98]">Des nuits où l&apos;on dort.</h1>
            <p className="text-xl leading-relaxed max-w-md text-[#C9D3F2]">
              On ne vend pas une clim. On vend la première nuit où tu dors, en plein mois d&apos;août.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#ma-maison" className="rounded-full bg-[#F2B6A0] text-[var(--encre)] px-7 py-3.5 text-lg font-semibold">Le plan de ma maison</Link>
              <Link href={`${DOSSIER}/ma-date`} className="rounded-full border border-[#C9D3F2] px-7 py-3.5 text-lg font-medium">Ma date de pose</Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[340px] aspect-[3/4] rounded-[200px_200px_28px_28px] overflow-hidden border border-[#3B4A7A]">
            <Image src={photos.chambre.src} alt={photos.chambre.alt} fill priority sizes="340px" className="object-cover" />
            <span className="absolute left-3 right-3 bottom-3 rounded-[18px] bg-[var(--sombre)]/85 px-4 py-3 text-sm">
              <span className="block text-xs uppercase tracking-[0.18em] text-[#F2B6A0]">Délai de pose cette semaine</span>
              <span className="block font-[family-name:var(--titres)] text-2xl font-light">{DELAI.valeur}</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Le plan de ta maison. */}
      <section id="ma-maison" className="scroll-mt-20 max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Ta maison</p>
          <h2 className="text-5xl sm:text-6xl font-light tracking-[-0.02em]">Quelle pièce on rafraîchit&nbsp;?</h2>
          <p className="text-xl leading-relaxed text-[var(--doux)]">
            Touche la chambre, puis le salon : le site compte les unités et te donne la fourchette, pose
            comprise. Avant même de nous appeler.
          </p>
          <p className="text-sm text-[var(--doux)]">Calcul fait dans ton navigateur : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
        <PlanMaison />
      </section>

      {/* 3. Ce que « pose comprise » comprend. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Ce que vous tapez</p>
            <h2 className="text-4xl sm:text-5xl font-light tracking-[-0.02em]">« Installation climatisation prix maison ».</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">Alors voilà ce que la fourchette comprend. Le reste se voit à la visite technique.</p>
          </div>
          <ul className="space-y-3">
            {COMPRIS.map((c) => (
              <li key={c} className="flex gap-3 rounded-[16px] bg-[var(--fond)] px-4 py-3 text-lg">
                <span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Le vrai délai. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Tout en haut du site</p>
          <h2 className="text-5xl sm:text-6xl font-light tracking-[-0.02em]">Le vrai délai de pose.</h2>
          <p className="text-xl leading-relaxed text-[var(--doux)]">
            Mis à jour chaque lundi. En avril, neuf jours ; en juin, cinq semaines. Tu le vois grimper,
            et tu signes au printemps. Le délai affiché est le délai réel, jamais gonflé.
          </p>
        </div>
        <Historique />
      </section>

      {/* 5. Réserver sa pose. */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto rounded-[30px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-12 sm:p-14 grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2B6A0]">Avant l&apos;été</p>
            <h2 className="text-4xl sm:text-6xl font-light tracking-[-0.02em]">N&apos;attends pas la canicule.</h2>
            <p className="text-xl leading-relaxed text-[#C9D3F2]">Choisis ta date de pose sur le site. Elle est confirmée après la visite technique.</p>
          </div>
          <Link href={`${DOSSIER}/ma-date`} className="flex justify-center rounded-full bg-[#F2B6A0] text-[var(--encre)] px-7 py-4 text-lg font-semibold">Réserver ma pose</Link>
        </div>
      </section>

      {/* 6. L'attestation de capacité. */}
      <section id="attestation" className="scroll-mt-20 max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Une preuve, pas une promesse</p>
          <h2 className="text-4xl sm:text-5xl font-light tracking-[-0.02em]">Notre attestation de capacité.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Poser et mettre en service une clim split demande un opérateur qui la détient (code de
            l&apos;environnement, art. R543-78 et R543-99). La nôtre est ici, avec sa date de validité.
          </p>
        </div>
        <div className="rounded-[24px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Attestation de capacité · fluides frigorigènes</p>
          <p className="font-[family-name:var(--titres)] text-3xl font-light tabular-nums">N° {entreprise.attestation}</p>
          <p>Délivrée par un organisme agréé · valable jusqu&apos;au {entreprise.validite}</p>
          <p className="text-sm text-[var(--doux)]">Numéro, organisme et date d&apos;exemple.</p>
        </div>
      </section>

      {/* 7. Ce qu'on fait, ce qu'on ne fait pas. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-8">
          <h2 className="text-4xl sm:text-5xl font-light tracking-[-0.02em]">Trois règles, tenues.</h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {ENGAGEMENTS.map((e) => (
              <li key={e.titre} className="rounded-[22px] bg-[var(--fond)] p-6 space-y-2">
                <h3 className="text-2xl font-semibold">{e.titre}</h3>
                <p className="text-lg leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Le soir, puis le matin. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-3 grid-cols-2">
        <div className="relative col-span-2 aspect-[16/9] rounded-[24px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.toits.src} alt={photos.toits.alt} fill sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
          <p className="absolute left-4 bottom-4 rounded-full bg-[var(--sombre)]/85 text-[var(--sur-sombre)] px-4 py-2 text-sm">22 h, 31 °C dehors</p>
        </div>
        <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.draps.src} alt={photos.draps.alt} fill sizes="(min-width: 1152px) 550px, 50vw" className="object-cover" />
        </div>
        <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.oreiller.src} alt={photos.oreiller.alt} fill sizes="(min-width: 1152px) 550px, 50vw" className="object-cover" />
          <p className="absolute left-3 bottom-3 rounded-full bg-[var(--carte)] text-[var(--encre)] px-3 py-1.5 text-sm font-medium">7 h, reposé</p>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-8">
        <h2 className="text-5xl font-light tracking-[-0.02em] text-center">Questions.</h2>
        <Faq questions={FAQ} />
      </section>

      {/* 10. Le dernier mot. */}
      <section className="bg-[#0F1B33] bg-[linear-gradient(180deg,#1B2A4E_0%,#0F1B33_100%)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center space-y-6">
          <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl font-light tracking-[-0.03em]">Cet été, <span className="text-[#F2B6A0]">tu dors.</span></p>
          <Link href="#ma-maison" className="inline-flex rounded-full bg-[#F2B6A0] text-[var(--encre)] px-8 py-4 text-lg font-semibold">Commencer par le plan</Link>
        </div>
      </section>
    </div>
  );
}
