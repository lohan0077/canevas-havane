import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, METHODE, POSE, PRIX, QUESTIONS, photos } from "./_composants/donnees";
import { AppelFinal, LaRegle, Section, Surtitre } from "./_composants/Blocs";
import Journee from "./_composants/Journee";
import Ouverture from "./_composants/Ouverture";

export const metadata: Metadata = {
  title: "Midi Pile — site de démonstration",
  description: "Site de démonstration d'un installateur solaire imaginaire, réalisé par Canevas Havane : ta journée solaire heure par heure, et un rappel seulement quand tu l'as demandé.",
  ...adressesDeLaPage("/exemples/midi-pile"),
};

export default function MidiPile() {
  return (
    <>
      <Ouverture />

      {/* Le contre-pied de la vidéo, en une phrase. */}
      <Section className="!py-14 sm:!py-20">
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center md:gap-14">
          <p className="font-[family-name:var(--titres)] text-[64px] sm:text-[120px] font-bold leading-none tracking-[-0.05em] tabular-nums">
            12<span className="text-[var(--accent-texte)]">:</span>00
          </p>
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">Pas des économies. Midi.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Tous les sites de solaire font la même promesse, en très gros. Nous, on te montre
              l'heure où ton toit donne le plus, et ce que tu peux en faire. Aucun chiffre
              d'économie : une forme de journée, puis ta vraie courbe, mesurée chez toi.
            </p>
          </div>
        </div>
      </Section>

      <div className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <Section id="journee" className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5 lg:sticky lg:top-28">
            <Surtitre>Ta journée</Surtitre>
            <h2 className="text-[40px] sm:text-6xl font-semibold tracking-[-0.03em]">Ton toit, heure par heure.</h2>
            <p className="text-lg leading-relaxed">
              Plein sud, ton toit produit surtout autour de midi. Il regarde l'ouest ? La courbe
              glisse vers le soir. Choisis ton orientation, la saison, le ciel : le site te dit
              quand lancer la machine.
            </p>
            <Link href={`${DOSSIER}/ma-journee`} className="inline-block font-bold underline underline-offset-4 decoration-2 decoration-[var(--accent)]">
              Comment lire la courbe
            </Link>
          </div>
          <Journee />
        </Section>
      </div>

      <Section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-[var(--trait)]">
          <Image src={photos.gris.src} alt={photos.gris.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-4">
          <Surtitre>La question qu'on nous pose</Surtitre>
          <h2 className="text-[38px] sm:text-5xl font-semibold tracking-[-0.02em]">Et quand il fait gris&nbsp;?</h2>
          <p className="text-lg leading-relaxed">
            Ton toit produit beaucoup moins, mais il ne s'arrête pas : la lumière passe à
            travers les nuages. Dans l'outil, touche « Gris » : la courbe s'aplatit, et
            l'orientation compte moins.
          </p>
          <p className="text-lg leading-relaxed">
            On ne t'annonce pas de chiffre. On mesure ton toit à la visite, et après la pose,
            le suivi te montre tes vraies journées, grises comprises.
          </p>
        </div>
      </Section>

      <div className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <Section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="relative aspect-[2/3] max-h-[560px] w-full overflow-hidden rounded-[30px]">
            <Image src={photos.panneaux.src} alt={photos.panneaux.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <Surtitre clair>Ce qu'on pose</Surtitre>
              <h2 className="text-[38px] sm:text-5xl font-semibold tracking-[-0.02em]">Des panneaux, et de quoi savoir ce qu'ils font.</h2>
            </div>
            <ol className="space-y-6">
              {POSE.map((p, i) => (
                <li key={p.titre} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] font-bold text-[var(--sur-accent)] tabular-nums">{i + 1}</span>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-semibold">{p.titre}</h3>
                    <p className="text-[17px] leading-relaxed">{p.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      </div>

      <Section id="prix" className="space-y-10">
        <div className="grid gap-4 md:grid-cols-2 md:items-end">
          <div className="space-y-3">
            <Surtitre>Prix</Surtitre>
            <h2 className="text-[38px] sm:text-5xl font-semibold tracking-[-0.02em]">Ce que ça coûte, pose comprise.</h2>
          </div>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Prix d'exemple, TTC, avant toute aide : on ne t'en promet aucune. Le prix ferme vient
            au devis écrit, après la visite de ton toit.
          </p>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {PRIX.map((p, i) => (
            <li key={p.taille} className={`rounded-[28px] border p-6 space-y-6 ${i === 1 ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--sur-accent)]" : "bg-[var(--carte)] border-[var(--trait)]"}`}>
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold">{p.taille}</h3>
                <p className={i === 1 ? "" : "text-[var(--doux)]"}>{p.detail}</p>
              </div>
              <p>
                <span className="block text-sm font-bold uppercase tracking-[0.12em]">À partir de</span>
                <span className="font-[family-name:var(--titres)] text-5xl font-semibold tracking-[-0.03em] tabular-nums whitespace-nowrap">{p.prix}</span>
                <span className="block text-sm font-semibold mt-1">TTC · exemple</span>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <div className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <Section id="methode" className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <Surtitre>Comment ça se passe</Surtitre>
            <h2 className="text-[38px] sm:text-5xl font-semibold tracking-[-0.02em]">De ta demande à ton premier midi.</h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[28px] border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2 lg:grid-cols-3">
            {METHODE.map((m, i) => (
              <li key={m.etape} className="bg-[var(--carte)] p-6 space-y-2">
                <p className="font-[family-name:var(--titres)] text-sm font-bold text-[var(--accent-texte)] tabular-nums">0{i + 1}</p>
                <h3 className="text-2xl font-semibold">{m.etape}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      <Section>
        <LaRegle />
      </Section>

      <Section id="questions" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-[38px] sm:text-5xl font-semibold tracking-[-0.02em]">Ce qu'on nous demande.</h2>
          <div className="relative mt-6 hidden aspect-[3/2] overflow-hidden rounded-[26px] lg:block">
            <Image src={photos.tuiles.src} alt={photos.tuiles.alt} fill sizes="420px" className="object-cover" />
          </div>
        </div>
        <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {QUESTIONS.map((q) => (
            <details key={q.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-semibold">
                {q.q}
                <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--encre)] text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[17px] leading-relaxed text-[var(--doux)]">{q.r}</p>
            </details>
          ))}
        </div>
      </Section>

      <AppelFinal />
    </>
  );
}
