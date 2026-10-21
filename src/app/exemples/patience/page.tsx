import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Compteur from "./_composants/Compteur";
import Meules from "./_composants/Meules";
import MoisParMois from "./_composants/MoisParMois";
import { CAVE, DOSSIER, MEULES, QUESTIONS, boutique, photos } from "./_composants/donnees";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une fromagerie » :
// Patience ne vend pas du fromage, elle vend du temps. Chaque fromage affiche son âge
// en jours, et le compteur tourne pendant qu'on regarde ; on réserve sa meule six mois
// à l'avance ; le jour J, on coupe les meules devant le quartier. Premier écran
// inspiré du modèle « Luxury Botanical » de MotionSites (un objet au centre, sur son
// socle, dans une lumière chaude ; un titre à empattements avec un mot en italique),
// transposé dans la pénombre d'une cave.
export const metadata: Metadata = {
  title: "Patience — site de démonstration",
  description: "Site de démonstration d'une fromagerie imaginaire, réalisé par Canevas Havane : l'âge de chaque fromage en jours, et la meule qu'on réserve six mois avant de la manger.",
  ...adressesDeLaPage("/exemples/patience"),
};

const tomme = CAVE[0];

export default function Patience() {
  return (
    <div>
      {/* 1 — La meule, sa lumière, son âge. */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,#5A3E26_0%,#2A1E15_62%)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 pt-10 sm:pt-16 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-texte)]">Fromagerie · affineur</p>
            <h1 className="text-[3.3rem] sm:text-7xl">Affiné <em className="text-[var(--accent-texte)]">sans se presser.</em></h1>
            <p className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Ici, on ne vend pas du fromage. On vend le temps qu&apos;il a passé en cave —
              compté en jours, à la seconde près.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[3/2] overflow-hidden rounded-t-[999px] rounded-b-[24px]">
              <Image src={photos.tommes.src} alt={photos.tommes.alt} fill sizes="(min-width: 768px) 448px, 100vw" className="object-cover" priority />
            </div>
            <div aria-hidden="true" className="mx-auto -mt-2 h-4 w-[86%] rounded-b-[20px] bg-[#1C140E]" />
          </div>
        </div>
        <div id="age" className="scroll-mt-16 mx-auto max-w-6xl px-5 pb-16">
          <div className="grid gap-6 rounded-[24px] border border-[var(--trait)] bg-[#2A1E15]/80 p-6 backdrop-blur sm:p-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-texte)]">{tomme.nom} · {tomme.numero} · exemple</p>
              <p className="font-[family-name:var(--titres)] text-2xl italic">Elle est en cave depuis…</p>
              <p className="text-sm text-[var(--doux)]">{tomme.lait} · {tomme.poids}</p>
            </div>
            <Compteur entree={tomme.entree} dureeJours={tomme.dureeJours} grand film="age" />
          </div>
        </div>
      </section>

      {/* 2 — Du temps. */}
      <section className="bg-[#F4ECD8] text-[#2A1E15]">
        <div className="mx-auto max-w-4xl space-y-6 px-5 py-20 text-center sm:py-28">
          <p className="font-[family-name:var(--titres)] text-4xl leading-tight sm:text-6xl">
            Pas du fromage. <em className="text-[#7A5410]">Du temps.</em>
          </p>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#5C4A38]">
            Celui qu&apos;il a passé en cave, retourné, brossé, goûté. Tout ce qu&apos;on vend
            ici a attendu. Alors on affiche combien.
          </p>
        </div>
      </section>

      {/* 3 — La cave, en ce moment. */}
      <section id="cave" className="scroll-mt-16 mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl">En cave, <em className="text-[var(--accent-texte)]">en ce moment.</em></h2>
          <Link href={`${DOSSIER}/cave`} className="rounded-full border border-[var(--accent)] px-5 py-2.5 text-sm">Toute la cave</Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-2">
          {CAVE.slice(1).map((f) => (
            <li key={f.slug} className="space-y-4 rounded-[20px] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">{f.numero} · exemple</p>
                <h3 className="text-3xl">{f.nom}</h3>
                <p className="text-sm text-[var(--doux)]">{f.lait} · {f.poids}</p>
              </div>
              <Compteur entree={f.entree} dureeJours={f.dureeJours} />
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Dates d&apos;entrée en cave d&apos;exemple : la fromagerie est fictive. L&apos;âge est calculé à partir d&apos;elles.</p>
      </section>

      {/* 4 — Réserver sa meule. */}
      <section id="meule" className="scroll-mt-16 border-y border-[var(--trait)] bg-[var(--sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl">Tu la réserves aujourd&apos;hui. <em className="text-[var(--accent-texte)]">Tu la manges dans six mois.</em></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Trente grandes tommes sont entrées en cave le 14 octobre. Choisis la tienne :
              elle garde son numéro jusqu&apos;au {MEULES.pret}, et tu reçois une photo
              d&apos;elle chaque mois.
            </p>
            <div className="relative hidden aspect-[3/4] max-w-xs overflow-hidden rounded-[20px] md:block">
              <Image src={photos.cave.src} alt={photos.cave.alt} fill sizes="320px" className="object-cover" />
            </div>
          </div>
          <Meules />
        </div>
      </section>

      {/* 5 — Une photo d'elle chaque mois. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-24">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-4xl sm:text-5xl">Une photo d&apos;elle, <em className="text-[var(--accent-texte)]">chaque mois.</em></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le premier mois, une croûte blanche. Le sixième, une croûte dorée. Tu la vois
            changer, de loin, jusqu&apos;au jour où tu viens la chercher.
          </p>
        </div>
        <MoisParMois />
      </section>

      {/* 6 — L'affiche. */}
      <section aria-label="L'affiche" className="bg-[#F4ECD8] text-[#2A1E15]">
        <div className="mx-auto max-w-5xl px-5 py-24 text-center sm:py-32">
          <p className="font-[family-name:var(--titres)] text-[2.8rem] leading-[1.05] sm:text-8xl">
            Ce fromage sera prêt le <em className="text-[#7A5410]">14 avril.</em>
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.3em]">Patience · fromagerie</p>
        </div>
      </section>

      {/* 7 — Le jour J. */}
      <section id="decoupe" className="scroll-mt-16 mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[20px]">
          <Image src={photos.coupe.src} alt={photos.coupe.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-texte)]">Samedi 17 avril 2027 · 10 h</p>
          <h2 className="text-4xl sm:text-5xl">Le jour J, <em className="text-[var(--accent-texte)]">on coupe les meules devant tout le quartier.</em></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le samedi qui suit la fin d&apos;affinage, devant la boutique. On ouvre les meules
            une à une, on goûte ensemble, et chacun repart avec la sienne.
          </p>
        </div>
      </section>

      {/* 8 — Questions. */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-4xl sm:text-5xl">Questions <em className="text-[var(--accent-texte)]">de patience.</em></h2>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {QUESTIONS.map((x) => (
              <li key={x.q}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-[family-name:var(--titres)] text-xl [&::-webkit-details-marker]:hidden">
                    {x.q}
                    <span aria-hidden="true" className="text-2xl text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-6 pr-8 leading-relaxed text-[var(--doux)]">{x.r}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — La fromagerie. */}
      <section id="fromagerie" className="scroll-mt-16 mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl">La fromagerie</h2>
          <p className="text-lg">{boutique.adresse} · la boutique devant, la cave dessous.</p>
          <p><a href={`tel:${boutique.telephone.replace(/ /g, "")}`} className="text-xl underline underline-offset-4 [font-variant-numeric:lining-nums]">{boutique.telephone}</a></p>
        </div>
        <dl className="space-y-3 self-end">
          {boutique.horaires.map((h) => (
            <div key={h.jours} className="flex justify-between gap-4 border-b border-[var(--trait)] pb-3">
              <dt className="font-semibold">{h.jours}</dt>
              <dd className="text-right text-[var(--doux)]">{h.heures}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
