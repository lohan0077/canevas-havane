import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { cabinet, photos, porteOuverte } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Porte ouverte — Cinquante Minutes, site de démonstration",
  description:
    "La soirée porte ouverte d'un cabinet de psychologue imaginaire : on visite, on repart, personne ne demande rien.",
  ...adressesDeLaPage("/exemples/cinquante-minutes/porte-ouverte"),
};

export default function PorteOuverte() {
  return (
    <main>
      <EnTetePage surtitre="Pour l'ouverture du cabinet" titre="Porte ouverte. On ne vous demandera *rien.*" photo={photos.porte}>
        Une soirée pour voir le cabinet avant d&apos;y venir. Vous visitez, vous repartez.
      </EnTetePage>

      {/* La date, en très grand. */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <Apparition className="grid gap-6 border-y border-[var(--trait)] py-10 md:grid-cols-[1.3fr_0.7fr] md:items-end">
          <p className="font-[family-name:var(--titres)] text-[clamp(3rem,8vw,7.5rem)] italic leading-[0.95] tabular-nums">{porteOuverte.date}</p>
          <div className="space-y-2 text-lg md:text-right">
            <p className="font-[family-name:var(--titres)] text-4xl tabular-nums">{porteOuverte.heures}</p>
            <p className="text-[var(--doux)]">{cabinet.adresse}, {cabinet.ville} (exemple)</p>
          </div>
        </Apparition>
      </section>

      {/* Quatre règles. */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>La soirée</Surtitre></Apparition>
          <TitreRevele
            texte="Quatre règles, *pas une de plus.*"
            className="font-normal text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.96] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <ol className="space-y-4">
          {porteOuverte.regles.map((r, i) => (
            <Apparition as="li" key={r} delai={i * 120} de="droite" className="flex gap-6 rounded-[1.75rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
              <span className="font-[family-name:var(--titres)] text-5xl italic leading-none text-[var(--accent-texte)] tabular-nums">{i + 1}</span>
              <p className="self-center text-xl leading-relaxed">{r}</p>
            </Apparition>
          ))}
        </ol>
      </section>

      {/* Le déroulé de la soirée, sur la nuit. */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <Apparition><Surtitre clair>De 18 h à 20 h</Surtitre></Apparition>
              <TitreRevele
                texte="Vous entrez. *Ou pas.*"
                className="font-normal text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.96] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent)]"
              />
              <ol className="space-y-5 border-l border-white/20 pl-6">
                {porteOuverte.deroule.map((d, i) => (
                  <Apparition as="li" key={d.heure} delai={i * 130} className="relative">
                    <span aria-hidden="true" className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-[var(--accent)]" />
                    <p className="font-[family-name:var(--titres)] text-3xl italic tabular-nums">{d.heure}</p>
                    <p className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">{d.texte}</p>
                  </Apparition>
                ))}
              </ol>
            </div>
            <Apparition de="rideau" className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem]">
              <Image src={photos.entrouverte.src} alt={photos.entrouverte.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </Apparition>
          </div>
        </div>
      </section>

      {/* L'affiche. */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Apparition de="zoom" className="mx-auto w-full max-w-[400px] rotate-[-3deg]">
          <figure className="rounded-[6px] bg-[#3B2440] p-9 pb-10 text-[var(--sur-sombre)] shadow-[0_40px_80px_-30px_rgba(42,24,48,0.8)]">
            <p className="font-[family-name:var(--titres)] text-[2.9rem] leading-[1.02]">
              Porte ouverte. On ne vous demandera <em className="text-[var(--accent)]">rien.</em>
            </p>
            <figcaption className="mt-12 text-[12px] font-semibold uppercase tracking-[0.22em]">
              Cinquante Minutes · psychologue · {porteOuverte.date.toLowerCase()}, {porteOuverte.heures}
            </figcaption>
          </figure>
        </Apparition>
        <div className="space-y-6">
          <Apparition><Surtitre>L&apos;affiche</Surtitre></Apparition>
          <TitreRevele
            texte="Ça ne vend pas une thérapie. *Ça rend la porte moins lourde.*"
            className="font-normal text-[clamp(2.4rem,4.8vw,4.2rem)] leading-[1] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={200} className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
            Une vraie date, dans un cabinet fictif : la soirée n&apos;aura pas lieu. Sur un vrai
            site, elle se tient hors des heures de séance, sans aucun patient présent.
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
