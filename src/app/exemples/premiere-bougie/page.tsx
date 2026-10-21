import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, FAQ, HONORAIRES, euros, photos } from "./_composants/donnees";
import Bilan from "./_composants/Bilan";
import Jour365 from "./_composants/Jour365";
import Bougie from "./_composants/Bougie";

// Le site du cabinet imaginé dans la vidéo « Si je devais créer un cabinet de
// recrutement » : tout le monde vend des talents ; Première Bougie vend le premier
// anniversaire de la personne recrutée. Pas d'offres d'emploi, un seul bilan —
// toujours là un an après, et parties —, et un gâteau à une bougie.
export const metadata: Metadata = {
  title: "Première Bougie — site de démonstration",
  description: "Site de démonstration d'un cabinet de recrutement imaginaire, réalisé par Canevas Havane : pas d'offres d'emploi, un seul bilan — combien de recrues sont toujours là un an après.",
  ...adressesDeLaPage("/exemples/premiere-bougie"),
};

const Petit = ({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) => (
  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${clair ? "text-[#F2C14E]" : "text-[var(--accent-texte)]"}`}>{children}</p>
);

export default function PremiereBougie() {
  return (
    <main>
      {/* 1. Le nom, en grand */}
      <section className="mx-auto max-w-6xl px-5 pt-8 sm:pt-12">
        <div className="grid grid-cols-2 gap-4 text-[13px] leading-snug sm:grid-cols-4">
          <p className="font-semibold">Cabinet de recrutement</p>
          <p className="text-[var(--doux)]">Pour les PME qui veulent que ça dure.</p>
          <p className="text-[var(--doux)] max-sm:hidden">Pas d&apos;offres d&apos;emploi ici.</p>
          <p className="text-[var(--doux)] max-sm:hidden">Un seul chiffre : toujours là, un an après.</p>
        </div>
        <h1 className="mt-6 font-normal leading-[0.86] text-[clamp(3.6rem,19vw,12.5rem)] tracking-tight">
          <span className="block">Première</span>
          <span className="flex items-end gap-3">
            <span>Bougie</span>
            <Bougie allumee className="mb-[0.08em] h-[0.9em] w-[0.36em] shrink-0" />
          </span>
        </h1>
        <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div className="space-y-5">
            <p className="font-[family-name:var(--titres)] text-3xl sm:text-4xl leading-tight">
              On ne compte pas les CV placés. <em className="text-[var(--accent-texte)]">On compte les anniversaires.</em>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="#bilan" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">Voir le bilan</Link>
              <Link href={`${DOSSIER}/recruter`} className="inline-flex min-h-13 items-center justify-center rounded-full border-2 border-[var(--encre)] px-7 font-semibold">Recruter avec nous</Link>
            </div>
          </div>
          <Image src={photos.cupcake.src} width={photos.cupcake.largeur} height={photos.cupcake.hauteur} alt={photos.cupcake.alt} sizes="(min-width: 768px) 480px, 100vw" priority className="aspect-[4/3] w-full rounded-[28px] object-cover object-[50%_70%]" />
        </div>
      </section>

      {/* 2. Le bilan */}
      <section id="bilan" className="scroll-mt-16 mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-5">
          <Petit>Sur ce site</Petit>
          <h2 className="text-5xl sm:text-6xl font-normal">Pas d&apos;offres d&apos;emploi. <em className="text-[var(--accent-texte)]">Un seul chiffre.</em></h2>
          <p className="text-lg leading-relaxed">Combien de recrues sont toujours là, un an après. Et combien sont parties : les deux chiffres. C&apos;est ça, la confiance.</p>
          <Link href={`${DOSSIER}/bilan`} className="inline-block font-semibold underline underline-offset-[6px]">Comment on compte</Link>
        </div>
        <Bilan />
      </section>

      {/* 3. Jour 365 */}
      <section id="jour-365" className="scroll-mt-16 border-y border-[var(--trait)] bg-[#FBEFD8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="space-y-5">
            <Petit>Jour 365</Petit>
            <h2 className="text-5xl sm:text-6xl font-normal">Le jour où elle fête <em className="text-[var(--accent-texte)]">sa première année.</em></h2>
            <p className="text-lg leading-relaxed">C&apos;est la date qu&apos;on vise, dès le premier rendez-vous.</p>
          </div>
          <Jour365 />
        </div>
      </section>

      {/* 4. Le gâteau */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-2 md:items-center">
        <Image src={photos.gateau.src} width={photos.gateau.largeur} height={photos.gateau.hauteur} alt={photos.gateau.alt} sizes="(min-width: 768px) 540px, 100vw" className="aspect-square w-full rounded-[28px] object-cover" />
        <div className="space-y-5">
          <Petit>À chaque première année</Petit>
          <h2 className="text-5xl sm:text-6xl font-normal">Un gâteau. <em className="text-[var(--accent-texte)]">Une seule bougie.</em></h2>
          <p className="text-lg leading-relaxed">Livré dans l&apos;entreprise, le jour 365. Pour la personne, et pour l&apos;équipe qui l&apos;a gardée.</p>
          <p className="rounded-2xl bg-[var(--carte)] p-4 text-[15px] leading-relaxed">
            Et la photo sur LinkedIn ? Seulement avec l&apos;accord de la personne <strong>et</strong> celui de l&apos;entreprise. Sinon, pas de photo : le gâteau suffit.
          </p>
        </div>
      </section>

      {/* 5. La première année, étape par étape */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-16 sm:py-24">
          <div className="max-w-2xl space-y-4">
            <Petit clair>Comment on travaille</Petit>
            <h2 className="text-5xl sm:text-6xl font-normal">Du jour −30 <em className="text-[#F2C14E]">au jour 365.</em></h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e) => (
              <li key={e.titre} className="space-y-2 border-t border-[#3A3A55] pt-5">
                <p className="text-sm font-semibold text-[#F2C14E] [font-variant-numeric:lining-nums]">{e.jour}</p>
                <h3 className="text-3xl font-normal">{e.titre}</h3>
                <p className="leading-relaxed text-[#DCDCE6]">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Les deux chiffres */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-2">
        <div className="space-y-5">
          <Petit>Pourquoi les départs aussi</Petit>
          <h2 className="text-5xl sm:text-6xl font-normal">Les deux chiffres. <em className="text-[var(--accent-texte)]">C&apos;est ça, la confiance.</em></h2>
        </div>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>N&apos;afficher que ceux qui restent, ce serait raconter la moitié de l&apos;histoire. Alors on compte aussi celles et ceux qui sont partis avant leur première année.</p>
          <p className="text-[var(--doux)]">Toujours en chiffres d&apos;ensemble : un intitulé de poste et une date suffiraient à reconnaître quelqu&apos;un. Ce qui se passe chez nos clients reste chez eux.</p>
        </div>
      </section>

      {/* 7. Les honoraires */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:pb-24">
        <div className="grid gap-8 rounded-[28px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6 sm:p-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-4">
            <Petit>Honoraires</Petit>
            <h2 className="text-4xl sm:text-5xl font-normal">Une partie payée <em className="text-[var(--accent-texte)]">à la première bougie.</em></h2>
            <p className="leading-relaxed text-[var(--doux)]">On a intérêt à ce que ça dure, autant que toi.</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-[var(--doux)]">Exemple · {HONORAIRES.exemple}</p>
            <p className="font-[family-name:var(--titres)] text-5xl [font-variant-numeric:lining-nums]">{euros(HONORAIRES.total)} HT</p>
            <ul className="space-y-2">
              {HONORAIRES.parts.map((x) => (
                <li key={x.quand} className="flex items-center gap-3">
                  <span className="h-3 rounded-full bg-[#F2C14E]" style={{ width: `${x.part * 1.6}px` }} aria-hidden="true" />
                  <span className="font-semibold [font-variant-numeric:lining-nums]">{x.part} %</span>
                  <span className="text-[var(--doux)]">{x.quand}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--doux)]">Prix exemple, hors taxes : nos clients sont des entreprises.</p>
          </div>
        </div>
      </section>

      {/* 8. Les candidats */}
      <section className="bg-[#FBEFD8] border-y border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-5">
            <Petit>Et si tu cherches un poste</Petit>
            <h2 className="text-5xl sm:text-6xl font-normal">Placement gratuit <em className="text-[var(--accent-texte)]">pour les candidats.</em></h2>
            <p className="text-lg leading-relaxed">Aucun frais ne peut t&apos;être demandé pour te trouver un poste (Code du travail, art. L.5321-3). Ta candidature n&apos;est présentée qu&apos;avec ton accord, et ton nom n&apos;apparaît nulle part.</p>
          </div>
          <Image src={photos.main.src} width={photos.main.largeur} height={photos.main.hauteur} alt={photos.main.alt} sizes="(min-width: 768px) 400px, 100vw" className="aspect-[4/5] w-full rounded-[28px] object-cover" />
        </div>
      </section>

      {/* 9. Questions */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Petit>Questions</Petit>
          <h2 className="text-5xl sm:text-6xl font-normal">Avant de <em className="text-[var(--accent-texte)]">souffler.</em></h2>
        </div>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {FAQ.map((x) => (
            <li key={x.q}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="font-[family-name:var(--titres)] text-3xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 pr-8 leading-relaxed text-[var(--doux)]">{x.r}</p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      {/* 10. Un an. Toujours là. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-4xl space-y-6 px-5 py-16 text-center sm:py-24">
          <h2 className="text-5xl sm:text-7xl font-normal">Un an. <em className="text-[#F2C14E]">Toujours là.</em></h2>
          <p className="mx-auto max-w-lg text-lg leading-relaxed text-[#DCDCE6]">C&apos;est ce qu&apos;on veut écrire sous la photo de ta prochaine recrue, avec son accord.</p>
          <Link href={`${DOSSIER}/recruter`} className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#F2C14E] px-8 font-semibold text-[#22223B]">Recruter avec nous</Link>
        </div>
      </section>
    </main>
  );
}
