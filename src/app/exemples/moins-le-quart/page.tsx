import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Accueil from "./_composants/Accueil";
import Sachet from "./_composants/Sachet";
import { CAFES, DOSSIER, ORDRE, QUESTIONS, euros, maison, photos } from "./_composants/donnees";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une marque de
// café » : Moins le Quart ne vend pas un pays, il vend une heure. L'accueil suit
// l'heure du visiteur — le soir, il propose le déca. Premier écran inspiré du modèle
// « Unwind Hero » de MotionSites (un très grand titre en graisse fine, une carte
// posée par-dessus, la lumière qui fait l'ambiance), transposé en cadran qui passe
// du matin à la nuit.
export const metadata: Metadata = {
  title: "Moins le Quart — site de démonstration",
  description: "Site de démonstration d'une marque de café imaginaire, réalisé par Canevas Havane : chaque café porte une heure, et l'accueil suit la tienne.",
  ...adressesDeLaPage("/exemples/moins-le-quart"),
};

export default function MoinsLeQuart() {
  return (
    <div>
      {/* 1 — L'accueil qui suit l'heure. */}
      <Accueil />

      {/* 2 — Pas un pays. Une heure. */}
      <section className="mx-auto max-w-6xl space-y-8 px-5 py-20 sm:py-28">
        <p className="font-[family-name:var(--titres)] text-[2.6rem] font-extralight leading-[1.02] tracking-[-0.03em] sm:text-7xl">
          <span className="text-[var(--doux)] line-through decoration-[var(--accent)] decoration-2">Éthiopie. Notes de fruits rouges.</span>
          <br />
          Sept heures <span className="font-medium text-[var(--accent-texte)]">moins le quart.</span>
        </p>
        <p className="max-w-2xl text-lg leading-relaxed">
          Les autres marques vendent un pays et une liste d&apos;arômes. Nous, une heure de
          la journée. Chaque café porte la sienne — toujours moins le quart, parce que le
          café arrive toujours un peu avant l&apos;heure.
        </p>
      </section>

      {/* 3 — La gamme. */}
      <section id="gamme" className="scroll-mt-16 border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:py-24">
          <h2 className="font-[family-name:var(--titres)] text-4xl font-light tracking-[-0.02em] sm:text-6xl">Trois cafés, <span className="font-medium">trois heures.</span></h2>
          <ul className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            {ORDRE.map((k) => (
              <li key={k} className="space-y-5 text-center">
                <Sachet cafe={CAFES[k]} />
                <div className="space-y-1">
                  <p className="font-[family-name:var(--titres)] text-2xl font-medium">{CAFES[k].nom}</p>
                  <p className="text-[var(--doux)]">{CAFES[k].enLettres}</p>
                  <p className="tabular-nums">{euros(CAFES[k].prix)} TTC les 250 g <span className="text-sm text-[var(--doux)]">· exemple</span></p>
                </div>
              </li>
            ))}
          </ul>
          <Link href={`${DOSSIER}/cafes`} className="mx-auto flex min-h-12 w-fit items-center rounded-full bg-[var(--encre)] px-7 font-semibold text-[var(--fond)]">Les trois cafés en détail</Link>
        </div>
      </section>

      {/* 4 — Le premier café. */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
          <Image src={photos.aube.src} alt={photos.aube.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-6">
          <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">6 h 45</p>
          <h2 className="font-[family-name:var(--titres)] text-4xl font-light tracking-[-0.02em] sm:text-5xl">Celui d&apos;avant que <span className="font-medium">la maison se réveille.</span></h2>
          <p className="text-lg leading-relaxed">{CAFES.matin.phrase}</p>
          <p className="text-lg leading-relaxed">Le premier de la journée, bu dans le silence de la cuisine, avant que quelqu&apos;un d&apos;autre ne descende.</p>
        </div>
      </section>

      {/* 5 — Le déca du soir. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
          <div className="space-y-6 md:order-1">
            <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.24em] text-[#E8A24B]">21 h 45</p>
            <h2 className="font-[family-name:var(--titres)] text-4xl font-light tracking-[-0.02em] sm:text-5xl">Le soir, <span className="font-medium">c&apos;est le déca.</span></h2>
            <p className="text-lg leading-relaxed">{CAFES.soir.phrase}</p>
            <p className="text-lg leading-relaxed">Passe sur le site après dîner : l&apos;accueil te le propose de lui-même.</p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] md:order-2">
            <Image src={photos.soir.src} alt={photos.soir.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 6 — Le moulin de 6 h 45. */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative aspect-[2/3] max-h-[34rem] overflow-hidden rounded-[28px]">
          <Image src={photos.moulin.src} alt={photos.moulin.alt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-6">
          <h2 className="font-[family-name:var(--titres)] text-4xl font-light tracking-[-0.02em] sm:text-5xl">Chaque matin, <span className="font-medium">à 6 h 45 pile.</span></h2>
          <p className="text-lg leading-relaxed">
            Une courte vidéo, tous les jours, publiée à sept heures moins le quart : le
            moulin qui tourne. Pas de musique, pas de texte. Rien d&apos;autre.
          </p>
          <ol className="grid grid-cols-3 gap-3" aria-label="Les trois premières vidéos">
            {["Jour 1", "Jour 2", "Jour 3"].map((j) => (
              <li key={j} className="rounded-2xl border border-[var(--trait)] bg-[var(--carte)] px-3 py-4 text-center">
                <p className="text-sm text-[var(--doux)]">{j}</p>
                <p className="font-[family-name:var(--titres)] text-2xl font-light">6 h 45</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 — L'affiche. */}
      <section aria-label="L'affiche" className="bg-[var(--encre)] text-[var(--fond)]">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:py-32">
          <p className="font-[family-name:var(--titres)] text-[3.4rem] font-extralight leading-none tracking-[-0.04em] sm:text-9xl">
            Il est moins le <span className="font-medium text-[#E8A24B]">quart.</span>
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.24em]">Moins le Quart · café torréfié</p>
        </div>
      </section>

      {/* 8 — Questions. */}
      <section id="questions" className="scroll-mt-16 mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="font-[family-name:var(--titres)] text-4xl font-light tracking-[-0.02em] sm:text-5xl">Questions, <span className="font-medium">à toute heure.</span></h2>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {QUESTIONS.map((x) => (
            <li key={x.q}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-[family-name:var(--titres)] text-xl [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="text-2xl text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 pr-8 text-lg leading-relaxed text-[var(--doux)]">{x.r}</p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      {/* 9 — Nous trouver. */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:grid-cols-2">
          <div className="space-y-3">
            <h2 className="font-[family-name:var(--titres)] text-4xl font-light">La maison</h2>
            <p className="text-lg">{maison.adresse} · torréfaction et comptoir</p>
            <p><a href={`tel:${maison.telephone.replace(/ /g, "")}`} className="text-xl font-semibold underline underline-offset-4 tabular-nums">{maison.telephone}</a></p>
          </div>
          <div className="space-y-3 self-end">
            <p className="text-lg">Ouvert du mardi au samedi, de 6 h 45 à 18 h 45. Évidemment.</p>
            <Link href={`${DOSSIER}/maison`} className="inline-flex min-h-12 items-center rounded-full border border-[var(--encre)] px-6 font-semibold">Découvrir la maison</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
