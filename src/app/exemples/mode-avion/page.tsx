import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, TARIFS, photos, questions, salle } from "./_composants/donnees";
import TempsEcran from "./_composants/TempsEcran";
import Faq from "./_composants/Faq";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une salle de
// sport » : une heure où personne ne peut te joindre. Un seul outil, le temps d'écran
// de la semaine converti en séances. Mise en page inspirée du modèle « Sky Estate » de
// MotionSites (un ciel en plein écran, le nom en lettres géantes par-dessus, une
// navigation en pilule), transposée à une salle de sport, de nuit, vue d'un hublot.
export const metadata: Metadata = {
  title: "Mode Avion — site de démonstration",
  description: "Site de démonstration d'une salle de sport imaginaire, réalisé par Canevas Havane : le téléphone reste au casier une heure, et ton temps d'écran de la semaine devient des séances.",
  ...adressesDeLaPage("/exemples/mode-avion"),
};

const REGLE = [
  { titre: "Un casier", texte: "À l'entrée, un mur de petits casiers. Tu y poses ton téléphone, la porte se ferme." },
  { titre: "Une heure", texte: "La durée d'une séance. Ni notifications, ni appels, ni « juste un message »." },
  { titre: "Un numéro", texte: "Celui de l'accueil, pour tes proches, en cas d'urgence. On vient te chercher." },
];

const PAS_ICI = ["Pas d'avant-après", "Pas de promo de janvier", "Pas de corps à atteindre", "Pas d'écran sur les machines"];

export default function ModeAvion() {
  return (
    <main>
      {/* 1. L'ouverture : le ciel, vu d'un hublot, et le nom en grand. */}
      <section className="max-w-5xl mx-auto px-3 sm:px-6 pt-3">
        <div className="relative aspect-[4/5] sm:aspect-[16/9] overflow-hidden rounded-[32px] bg-[var(--carte)]">
          <Image src={photos.nuages.src} alt={photos.nuages.alt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover object-[50%_40%]" />
          <p aria-hidden="true" className="absolute inset-x-0 top-5 text-center font-[family-name:var(--titres)] text-[19vw] sm:text-[150px] font-semibold leading-none tracking-[-0.05em] text-[#F5F5F2]">
            Mode Avion
          </p>
          <p className="absolute left-4 bottom-4 rounded-full bg-[var(--fond)] px-4 py-2 text-sm font-semibold">Salle de sport · Ta Ville</p>
        </div>
        <div className="grid gap-6 py-10 sm:grid-cols-[1.3fr_1fr] sm:items-end">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.04em] leading-[1]">Ton téléphone t'attend dehors.</h1>
            <p className="text-lg leading-relaxed text-[var(--doux)]">Une heure où personne ne peut te joindre. Ton téléphone reste au casier, et toi, tu t'entraînes.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:justify-end">
            <Link href={`${DOSSIER}#outil`} className="rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Le calcul</Link>
            <Link href={`${DOSSIER}/seances`} className="rounded-full border border-[var(--encre)] px-6 py-3.5 font-semibold">Réserver une séance</Link>
          </div>
        </div>
      </section>

      {/* 2. La règle de la maison. */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <ol className="grid gap-3 md:grid-cols-3">
          {REGLE.map((r, i) => (
            <li key={r.titre} className="rounded-[26px] border border-[var(--trait)] p-6 space-y-2">
              <p className="font-[family-name:var(--titres)] text-sm text-[var(--accent-texte)] tabular-nums">0{i + 1}</p>
              <h2 className="text-3xl font-semibold tracking-tight">{r.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{r.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. Le seul outil. */}
      <section id="outil" className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start scroll-mt-20">
        <div className="space-y-4 lg:pt-6">
          <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Le calcul</p>
          <h2 className="text-5xl font-semibold tracking-[-0.04em]">Ton temps d'écran&nbsp;?</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Un seul outil sur ce site. Tu entres ton temps d'écran de la semaine, il te répond en séances.</p>
        </div>
        <TempsEcran />
      </section>

      {/* 4. Les casiers. */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px] bg-[var(--carte)]">
          <Image src={photos.hublot.src} alt={photos.hublot.alt} fill sizes="(min-width: 768px) 500px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em]">Un mur de casiers, à l'entrée.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Tu poses ton téléphone, la porte se ferme, pour une heure. Comme en vol : il est là, mais il ne te dérange pas.</p>
          <Link href={`${DOSSIER}/la-salle`} className="inline-flex rounded-full bg-[var(--sombre)] px-6 py-3.5 font-semibold text-[var(--sur-sombre)]">Choisir un casier</Link>
        </div>
      </section>

      {/* 5. Ce qu'on vend. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl font-semibold tracking-[-0.05em] leading-[0.95]">Pas des abdos. Une heure à toi.</p>
            <ul className="flex flex-wrap gap-2">
              {PAS_ICI.map((x) => (
                <li key={x} className="rounded-full border border-[var(--sur-sombre)] px-4 py-2 text-sm font-semibold">{x}</li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-[var(--sur-sombre)]">
            <Image src={photos.barres.src} alt={photos.barres.alt} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 6. Les prix. */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 space-y-8">
        <h2 className="text-5xl font-semibold tracking-[-0.04em]">Les prix.</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {TARIFS.map((t) => (
            <li key={t.nom} className="rounded-[26px] bg-[var(--carte)] p-6 space-y-2">
              <p className="font-[family-name:var(--titres)] text-4xl font-semibold tracking-tight">{t.prix}</p>
              <p className="font-semibold">{t.nom}</p>
              <p className="text-[var(--doux)]">{t.detail}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prix TTC d'exemple : la salle est fictive. Aucune réduction à durée limitée.</p>
      </section>

      {/* 7. Questions. */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
        <h2 className="text-5xl font-semibold tracking-[-0.04em]">Questions.</h2>
        <Faq questions={questions} />
      </section>

      {/* 8. Le dernier mot. */}
      <section className="max-w-5xl mx-auto px-3 sm:px-6 pb-20">
        <div className="relative overflow-hidden rounded-[32px] border border-[var(--trait)] bg-[var(--carte)] px-6 py-14 sm:p-16 space-y-6">
          <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl font-semibold tracking-[-0.05em] leading-[0.95]">
            Ton téléphone n'est <span className="text-[var(--accent-texte)]">pas invité.</span>
          </p>
          <p className="text-lg text-[var(--doux)]">{salle.adresse} (adresse d'exemple). Ouvert tous les jours.</p>
          <Link href={`${DOSSIER}/seances`} className="inline-flex rounded-full bg-[var(--accent)] px-7 py-4 font-semibold text-[var(--sur-accent)]">Réserver une séance</Link>
        </div>
      </section>
    </main>
  );
}
