import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT_CLAIR, AppelFinal, Appli, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import PlanMaison from "../_composants/PlanMaison";
import { COMPRIS_CLIM, DOSSIER, FOURCHETTES, euros, maison, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ma clim, pièce par pièce — Rien à Signaler, site de démonstration",
  description:
    "Le plan de ta maison : touche les pièces à rafraîchir, le site compte les unités et donne la fourchette TTC, pose comprise. Installateur imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/rien-a-signaler/ma-maison"),
};

export default function MaMaison() {
  return (
    <main>
      <EnTetePage surtitre="Ma clim" titre="La première nuit *où tu dors.*" photo={photos.chambre} origine="50% 45%">
        Pas un appareil : une chambre au frais, en plein mois d&apos;août. Touche les pièces à rafraîchir, le site te
        donne la fourchette, TTC, pose comprise. Le prix ferme vient au devis, après la visite technique.
      </EnTetePage>

      <section id="plan" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-8 md:py-24">
        <Apparition de="zoom">
          <Appli titre="Ma maison" etat="Plan · exemple">
            <PlanMaison />
          </Appli>
        </Apparition>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 sm:px-8 md:grid-cols-2 md:pb-32">
        <Apparition de="zoom" className="rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] sm:p-10">
          <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em]">Les fourchettes · TTC, pose comprise</p>
          <ul className="mt-4 divide-y divide-white/15">
            {Object.entries(FOURCHETTES).map(([n, [min, max]]) => (
              <li key={n} className="flex items-baseline justify-between gap-6 py-3">
                <span>{n} {Number(n) > 1 ? "unités intérieures" : "unité intérieure"}</span>
                <span className="font-[family-name:var(--titres)] text-xl font-semibold tabular-nums tracking-[-0.02em]">{euros(min)} – {euros(max)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-[var(--sur-sombre)]/90">Exemples. La puissance de chaque pièce se calcule à la visite : surface, exposition, isolation.</p>
        </Apparition>
        <Apparition de="zoom" delai={150} className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7 sm:p-10">
          <TitreRevele
            texte="Ce que la pose *comprend.*"
            className="font-[family-name:var(--titres)] text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1] tracking-[-0.05em]"
            classeAccent={ACCENT_CLAIR}
          />
          <ul className="mt-5 divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-[17px]">
            {COMPRIS_CLIM.map((c) => (
              <li key={c} className="flex gap-3 py-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>{c}</li>
            ))}
          </ul>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--doux)]">
            On installe la clim pour rafraîchir les pièces l&apos;été. Selon ton logement, l&apos;accord de la copropriété
            ou une déclaration en mairie peuvent être nécessaires pour l&apos;unité extérieure : on te le dit à la visite.
          </p>
        </Apparition>
      </section>

      <section id="attestation" className="scroll-mt-24 border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-28">
          <div className="space-y-6">
            <Apparition><Surtitre>Vérifiable</Surtitre></Apparition>
            <TitreRevele
              texte="Notre attestation *de capacité.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,4.2rem)] font-semibold leading-[1] tracking-[-0.05em]"
              classeAccent={ACCENT_CLAIR}
            />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
              Poser et mettre en service une clim split demande un opérateur qui la détient (C. env., art. R543-78 et
              R543-99). On la montre, avec sa date de validité.
            </Apparition>
            <Apparition delai={250}><Bouton href={`${DOSSIER}/ma-date`}>Réserver ma date de pose</Bouton></Apparition>
          </div>
          <Apparition de="zoom" delai={150} className="relative overflow-hidden rounded-[2rem] bg-[var(--accent)] p-8 text-[var(--sur-accent)] sm:p-10">
            <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.18em]">Attestation de capacité · fluides frigorigènes</p>
            <p className="mt-6 font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums">N° {maison.attestation}</p>
            <p className="mt-6 text-lg">Délivrée par un organisme agréé · valable jusqu&apos;au {maison.validite}</p>
            <p className="mt-1 text-sm">Numéro, organisme et date d&apos;exemple.</p>
            <div className="relative mt-8 aspect-[16/7] overflow-hidden rounded-[1.25rem] bg-[var(--sombre)]">
              <Image src={photos.toits.src} alt={photos.toits.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            </div>
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
