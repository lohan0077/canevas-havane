import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, JOURNEE, euros, marque, outils, photos, questions, teintes } from "./_composants/donnees";
import Gravure from "./_composants/Gravure";
import { OutilGrave } from "./_composants/Outils";
import styles from "./_composants/reviens.module.css";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une marque
// d'outillage » : les autres vendent la puissance ; Reviens. vend l'outil qu'on te rend,
// gravé à ton prénom. Ouverture inspirée du modèle « Future Machine » de MotionSites (un
// aplat de couleur franche, l'objet seul au centre, le nom en haut à gauche, une phrase
// en italique en bas à droite), transposée à un outil gravé.
export const metadata: Metadata = {
  title: "Reviens. — site de démonstration",
  description: "Site de démonstration d'une marque d'outillage imaginaire, réalisé par Canevas Havane : chaque outil gravé à ton prénom, la gravure en direct, et une journée gravure gratuite.",
  ...adressesDeLaPage("/exemples/reviens"),
};

const GAMME = ["KARIM", "SONIA", "MEHDI", "LUCAS", "INÈS"];

export default function Reviens() {
  return (
    <>
      {/* 1. L'ouverture. */}
      <section className="px-3 pb-10 pt-3 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-[var(--accent)] px-5 pb-8 pt-6 text-[var(--sur-accent)] sm:px-10 sm:pb-12">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
            <p className="order-2 font-[family-name:var(--titres)] text-[64px] font-extrabold leading-none tracking-tight sm:order-1 sm:text-[120px]">Reviens.</p>
            <p className="order-1 rounded-full border-2 border-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] sm:order-2 sm:mt-3">Outillage gravé</p>
          </div>
          <div className={`mx-auto my-6 w-full max-w-lg ${styles.flotte}`}>
            <OutilGrave id="visseuse" corps="#2A3A47" gravure="#E9D8B4" prenom="KARIM" titre="Une visseuse anthracite, gravée « KARIM » sur le corps" className="w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]" />
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <Link href={`${DOSSIER}/graver`} className="w-fit rounded-2xl bg-[var(--carte)] px-6 py-3.5 font-bold text-[var(--accent-texte)]">
              Graver le mien
            </Link>
            <h1 className="max-w-md text-right font-[family-name:var(--titres)] text-[40px] font-semibold italic leading-[1.02] sm:text-6xl">
              L&apos;outil qu&apos;on te rend.
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Le vrai problème. */}
      <section className="px-5 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <div className="relative rounded-[28px] border-2 border-dashed border-[var(--doux)] px-6 py-10" aria-hidden="true">
            <svg viewBox="0 0 640 520" className="mx-auto w-full max-w-sm opacity-60">
              <rect x="100" y="104" width="380" height="166" rx="76" fill="none" stroke="#56616B" strokeWidth="6" strokeDasharray="18 14" />
              <path d="M232 270 L338 270 L320 432 L208 432 Z" fill="none" stroke="#56616B" strokeWidth="6" strokeDasharray="18 14" />
              <rect x="150" y="432" width="230" height="74" rx="16" fill="none" stroke="#56616B" strokeWidth="6" strokeDasharray="18 14" />
            </svg>
            <span className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--titres)] text-8xl font-extrabold text-[var(--accent-texte)]">?</span>
          </div>
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Sur un chantier</p>
            <h2 className="font-[family-name:var(--titres)] text-5xl font-extrabold leading-[1.02] tracking-tight">
              Elle était là <span className="italic font-semibold">ce matin.</span>
            </h2>
            <p className="text-lg leading-relaxed">
              Les marques d&apos;outils vendent toutes la même chose : de la puissance, des volts, des
              éclairs. Sur un chantier, le vrai problème n&apos;est pas la puissance. C&apos;est la visseuse
              qui disparaît.
            </p>
          </div>
        </div>
      </section>

      {/* 3. L'inverse. */}
      <section className="bg-[var(--sombre)] px-5 py-20 text-[var(--sur-sombre)] sm:px-6">
        <div className="mx-auto max-w-5xl space-y-4">
          <p className="font-[family-name:var(--titres)] text-3xl font-semibold text-[#C9D0D6] line-through decoration-[#E9D8B4] decoration-4 sm:text-4xl">Pas la puissance.</p>
          <h2 className="font-[family-name:var(--titres)] text-6xl font-extrabold leading-[0.98] tracking-tight sm:text-8xl">
            L&apos;outil qu&apos;on <span className="italic text-[#E9D8B4]">te rend.</span>
          </h2>
          <p className="max-w-xl pt-4 text-lg text-[#C9D0D6]">
            « Reviens », c&apos;est ce que tu cries quand quelqu&apos;un part avec ta visseuse. C&apos;est
            aussi le nom de la marque.
          </p>
        </div>
      </section>

      {/* 4. La gravure. */}
      <section className="px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <h2 className="font-[family-name:var(--titres)] text-5xl font-extrabold leading-[1.02] tracking-tight">
              Gravé à ton prénom. <span className="text-[var(--accent-texte)]">Impossible à rater.</span>
            </h2>
            <dl className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                ["12 mm", "la hauteur des lettres"],
                ["Laser", "dans le corps de l'outil"],
                ["1", "prénom par outil"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-[var(--carte)] p-3 sm:p-4">
                  <dt className="sr-only">{l}</dt>
                  <dd className="whitespace-nowrap font-[family-name:var(--titres)] text-2xl font-extrabold sm:text-3xl">{v}</dd>
                  <dd className="mt-1 text-sm text-[var(--doux)]">{l}</dd>
                </div>
              ))}
            </dl>
            <p className="text-lg leading-relaxed">
              Sur le corps, en gros, pas sur une étiquette qu&apos;on décolle. Celui qui l&apos;emprunte sait à
              qui la rendre.
            </p>
          </div>
          <Image src={photos.etabli.src} width={photos.etabli.largeur} height={photos.etabli.hauteur} alt={photos.etabli.alt} sizes="(min-width: 768px) 480px, 100vw" className="aspect-[4/3] w-full rounded-[28px] object-cover" />
        </div>
      </section>

      {/* 5. L'atelier de gravure en ligne. */}
      <section id="graver" className="scroll-mt-20 bg-[var(--carte)] px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">En direct</p>
            <h2 className="font-[family-name:var(--titres)] text-5xl font-extrabold leading-[1.02] tracking-tight">Tu tapes ton prénom. Tu vois la gravure.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">Choisis l&apos;outil, sa couleur, et écris ton prénom : il se grave sous tes yeux, là où il le sera sur l&apos;outil.</p>
          </div>
          <Gravure outilDepart="visseuse" />
        </div>
      </section>

      {/* 6. La gamme. */}
      <section className="px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <h2 className="font-[family-name:var(--titres)] text-5xl font-extrabold tracking-tight">Cinq outils. Cinq prénoms.</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {outils.map((o, i) => {
              const t = teintes[i % teintes.length];
              return (
                <li key={o.id} className="flex flex-col justify-between gap-4 rounded-[24px] bg-[var(--carte)] p-5">
                  <OutilGrave id={o.id} corps={t.corps} gravure={t.gravure} prenom={GAMME[i]} titre={`${o.nom} ${t.nom.toLowerCase()}, gravée « ${GAMME[i]} »`} className="h-28 w-full" />
                  <div>
                    <h3 className="font-[family-name:var(--titres)] text-2xl font-extrabold">{o.nom}</h3>
                    <p className="text-sm text-[var(--doux)]">{o.detail}</p>
                    <p className="mt-2 font-semibold tabular-nums">{euros(o.prix)} <span className="text-sm font-normal text-[var(--doux)]">TTC · exemple</span></p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple, gravure comprise. Les prénoms sont inventés.</p>
        </div>
      </section>

      {/* 7. La journée gravure. */}
      <section className="px-3 pb-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 overflow-hidden rounded-[32px] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] sm:p-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E9D8B4]">Pour le lancement</p>
            <h2 className="font-[family-name:var(--titres)] text-5xl font-extrabold leading-[1.02] tracking-tight">La journée gravure.</h2>
            <p className="text-lg leading-relaxed text-[#C9D0D6]">
              Tu ramènes tes vieux outils, toutes marques, et on les grave. Gratuit, sans rien acheter :
              jusqu&apos;à {JOURNEE.maxOutils} outils par personne.
            </p>
            <p className="rounded-2xl border-2 border-[#E9D8B4] px-4 py-3 font-[family-name:var(--titres)] text-2xl font-bold first-letter:uppercase">
              {JOURNEE.date}, {JOURNEE.heures}
            </p>
            <Link href={`${DOSSIER}/journee-gravure`} className="inline-block rounded-2xl bg-[var(--sur-sombre)] px-6 py-3.5 font-bold text-[var(--sombre)]">
              Réserver mon heure
            </Link>
          </div>
          <Image src={photos.outils.src} width={photos.outils.largeur} height={photos.outils.hauteur} alt={photos.outils.alt} sizes="(min-width: 768px) 520px, 100vw" className="aspect-[3/2] w-full rounded-[24px] object-cover" />
        </div>
      </section>

      {/* 8. L'affiche. */}
      <section className="px-5 pb-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <div className="mx-auto w-full max-w-sm -rotate-3 rounded-[6px] bg-[var(--sombre)] p-8 shadow-[0_30px_60px_-30px_rgba(42,58,71,0.9)]">
            <p className="font-[family-name:var(--titres)] text-[52px] font-extrabold leading-[0.98] text-[var(--sur-sombre)]">
              Rends-la <span className="italic text-[#E9D8B4]">à Karim.</span>
            </p>
            <p className="mt-16 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--sur-sombre)]">Reviens. · outillage gravé</p>
          </div>
          <div className="space-y-4">
            <h2 className="font-[family-name:var(--titres)] text-4xl font-extrabold tracking-tight">Une seule affiche, dans les dépôts.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Quatre mots que tout le monde a déjà pensés. Affichée dans les dépôts de matériaux qui
              l&apos;acceptent, jamais sur un mur sans accord.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="bg-[var(--carte)] px-5 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-[family-name:var(--titres)] text-5xl font-extrabold tracking-tight">Avant de graver.</h2>
          <div className="space-y-3">
            {questions.map((x) => (
              <details key={x.q} className="group rounded-2xl border-2 border-[var(--encre)] bg-[var(--fond)] px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="font-[family-name:var(--titres)] text-2xl font-extrabold text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pt-3 leading-relaxed text-[var(--doux)]">{x.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. L'atelier. */}
      <section className="px-5 py-16 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[28px] border-2 border-[var(--encre)] p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="font-[family-name:var(--titres)] text-3xl font-extrabold">Passe graver à l&apos;atelier.</h2>
            <p className="text-[var(--doux)]">{marque.adresse} · {marque.horaires.toLowerCase()}.</p>
          </div>
          <a href={`tel:${marque.telephoneLien}`} className="rounded-2xl bg-[var(--encre)] px-6 py-4 text-center text-xl font-bold tabular-nums text-[var(--fond)]">
            {marque.telephone}
          </a>
        </div>
      </section>
    </>
  );
}
