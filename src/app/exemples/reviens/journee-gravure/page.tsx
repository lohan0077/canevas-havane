import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Creneaux from "../../_kit/Creneaux";
import { JOURNEE, creneauxJournee, photos } from "../_composants/donnees";
import { OutilGrave } from "../_composants/Outils";

export const metadata: Metadata = {
  title: "La journée gravure · Reviens. — site de démonstration",
  description: "Site de démonstration d'une marque d'outillage imaginaire : la journée gravure, gratuite, toutes marques — tu ramènes tes outils, on les grave à ton prénom.",
  ...adressesDeLaPage("/exemples/reviens/journee-gravure"),
};

const RANGEE = [
  { couleur: "#8E3B2E", prenom: "MEHDI" },
  { couleur: "#2F6B6B", prenom: "SONIA" },
  { couleur: "#5B6B2F", prenom: "LUCAS" },
];

export default function JourneeGravure() {
  return (
    <>
      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 pt-8 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Pour le lancement · gratuit</p>
        <h1 className="font-[family-name:var(--titres)] text-[52px] font-extrabold leading-[0.98] tracking-tight sm:text-7xl">
          La journée <span className="italic">gravure.</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Tu ramènes tes vieux outils, <strong>toutes marques</strong>, et on les grave à ton prénom.
          Gratuit, sans rien acheter.
        </p>
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["Quand", `${JOURNEE.date}, ${JOURNEE.heures}`],
            ["Où", JOURNEE.lieu],
            ["Combien", `Jusqu'à ${JOURNEE.maxOutils} outils par personne`],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border-2 border-[var(--encre)] bg-[var(--carte)] p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">{t}</dt>
              <dd className="mt-1 font-[family-name:var(--titres)] text-xl font-bold first-letter:uppercase">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-[var(--carte)] px-5 py-16 sm:px-6" aria-label="Toutes marques">
        <ul className="mx-auto grid max-w-5xl grid-cols-3 gap-2 sm:gap-4">
          {RANGEE.map((r) => (
            <li key={r.prenom} className="rounded-[18px] bg-[#E7E1D5] p-2 sm:rounded-[24px] sm:p-4">
              <OutilGrave id="visseuse" corps={r.couleur} gravure="#F7EBDD" prenom={r.prenom} titre={`Une visseuse d'une autre marque, gravée « ${r.prenom} »`} className="w-full" />
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-4 max-w-5xl text-sm text-[var(--doux)]">Des outils d&apos;autres marques, dessinés sans logo. Les prénoms sont inventés.</p>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <h2 className="font-[family-name:var(--titres)] text-4xl font-extrabold tracking-tight">Réserve ton heure.</h2>
          <p className="text-[var(--doux)]">Une heure suffit pour cinq outils. Viens avec l&apos;outil chargé ou vide, peu importe : on grave le corps.</p>
          <Creneaux
            creneaux={creneauxJournee}
            colonnes={4}
            titreCarte="Ta place à la journée gravure"
            bouton="Réserver cette heure"
            confirmation="Réservée : {creneau}, samedi 14 novembre."
            note="Les heures prises sont un exemple : la marque est fictive."
            libellePris="Complet"
          />
        </div>
        <div className="space-y-5">
          <div className="rounded-[24px] border-2 border-[var(--accent)] bg-[var(--carte)] p-5">
            <h2 className="font-[family-name:var(--titres)] text-2xl font-extrabold">Avant de venir : la garantie.</h2>
            <p className="mt-2 leading-relaxed text-[var(--doux)]">
              Graver un outil d&apos;une autre marque peut toucher à la garantie de son fabricant.
              Regarde ce qu&apos;elle dit avant de venir : on te pose la question sur place, et on ne grave
              que si tu es d&apos;accord.
            </p>
          </div>
          <Image src={photos.chantier.src} width={photos.chantier.largeur} height={photos.chantier.hauteur} alt={photos.chantier.alt} sizes="(min-width: 768px) 440px, 100vw" className="aspect-[4/5] w-full rounded-[28px] object-cover" />
        </div>
      </section>
    </>
  );
}
