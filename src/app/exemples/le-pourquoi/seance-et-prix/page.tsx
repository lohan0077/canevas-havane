import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, Surtitre } from "../_composants/Blocs";
import { DOSSIER, deroule, photos, seanceAdulte, tarifs } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La séance et le prix — Le Pourquoi, site de démonstration",
  description:
    "Le prix et la durée d'une séance chez un ostéopathe imaginaire, écrits en gros, avec la facture pour la mutuelle et le déroulé minute par minute.",
  ...adressesDeLaPage("/exemples/le-pourquoi/seance-et-prix"),
};

export default function SeanceEtPrix() {
  return (
    <main>
      {/* Le prix et la durée, en gros : c'est ce que la vidéo filme d'abord. */}
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]" data-film="prix">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-40 sm:px-8 md:pb-28 md:pt-48 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-8">
            <Apparition><Surtitre clair>Séance adulte · prix d&apos;exemple</Surtitre></Apparition>
            <h1 className="font-semibold leading-[0.84] tracking-[-0.06em] tabular-nums">
              <TitreRevele as="p" auChargement texte={seanceAdulte.duree} className="text-[clamp(6rem,16vw,13rem)]" />
              <TitreRevele as="p" auChargement delai={250} texte={seanceAdulte.prix} className="text-[clamp(6rem,16vw,13rem)] text-[var(--accent)]" />
            </h1>
            <Apparition delai={600}>
              <p id="facture" className="inline-flex items-center gap-3 rounded-full bg-[var(--fond)] px-5 py-3 font-[family-name:var(--titres)] text-[17px] font-semibold text-[var(--encre)]">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                Facture remise pour votre mutuelle
              </p>
            </Apparition>
            <Apparition as="p" delai={750} className="max-w-lg text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Le même prix à 7 h et à 20 h. Carte bancaire, espèces ou chèque. La facture vous sert à
              demander une prise en charge à votre mutuelle, si votre contrat le prévoit.
            </Apparition>
          </div>
          <Apparition de="rideau" delai={300} className="relative aspect-[4/5] max-h-[560px] overflow-hidden rounded-[2.5rem]">
            <Image src={photos.table.src} alt={photos.table.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="kit-cinema-img object-cover" />
          </Apparition>
        </div>
      </section>

      <section id="tarifs" className="mx-auto max-w-6xl space-y-10 px-5 py-24 sm:px-8 md:py-32">
        <TitreRevele
          texte="Quatre lignes, *pas une de plus.*"
          className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
          classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
        />
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {tarifs.map((t, i) => (
            <Apparition as="li" key={t.nom} delai={i * 100} className="grid gap-1 py-6 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-10">
              <div>
                <p className="font-[family-name:var(--titres)] text-2xl font-semibold tracking-[-0.02em]">{t.nom}</p>
                {t.note && <p className="text-[15px] text-[var(--doux)]">{t.note}</p>}
              </div>
              <p className="text-[var(--doux)] tabular-nums">{t.duree}</p>
              <p className="font-[family-name:var(--titres)] text-3xl font-semibold tabular-nums">{t.prix}</p>
            </Apparition>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple, TTC. Le cabinet est fictif.</p>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Apparition><Surtitre>Minute par minute</Surtitre></Apparition>
            <TitreRevele
              texte="Ce qui se passe *sur la table.*"
              className="text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
              classeAccent="font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]"
            />
            <Apparition as="p" className="text-lg leading-relaxed text-[var(--doux)]">Rien ne commence sans votre accord. Rien ne se fait sans être expliqué.</Apparition>
            <Apparition><Bouton href={`${DOSSIER}/rendez-vous`}>Réserver un créneau</Bouton></Apparition>
          </div>
          <ol className="relative ml-4 space-y-12 border-l border-[var(--trait)]">
            {deroule.map((d, i) => (
              <Apparition as="li" key={d.titre} delai={i * 80} className="relative pl-10">
                <span aria-hidden="true" className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-[var(--accent)] ring-8 ring-[var(--carte)]" />
                <p className="font-[family-name:var(--titres)] text-sm font-semibold tabular-nums text-[var(--accent-texte)]">{d.minute} min</p>
                <h2 className="mt-1 text-3xl font-semibold tracking-[-0.03em]">{d.titre}</h2>
                <p className="mt-3 text-lg leading-relaxed text-[var(--doux)]">{d.texte}</p>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
