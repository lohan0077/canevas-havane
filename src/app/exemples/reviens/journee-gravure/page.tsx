import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Creneaux from "../../_kit/Creneaux";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { OutilGrave } from "../_composants/Outils";
import { JOURNEE, creneauxJournee, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La journée gravure — Reviens., site de démonstration",
  description:
    "La journée gravure de Reviens., dépôt de matériel professionnel imaginaire : gratuite, toutes marques — tu ramènes tes outils, on les grave à ton prénom.",
  ...adressesDeLaPage("/exemples/reviens/journee-gravure"),
};

const RANGEE = [
  { couleur: "#8E3B2E", prenom: "MEHDI" },
  { couleur: "#2F6B6B", prenom: "SONIA" },
  { couleur: "#5B6B2F", prenom: "LUCAS" },
];

export default function JourneeGravure() {
  return (
    <main>
      <EnTetePage surtitre="Pour le lancement · gratuit" n="01" titre="La journée *gravure.*" photo={photos.outils}>
        Tu ramènes tes vieux outils, toutes marques, et on les grave à ton prénom. Gratuit, sans rien
        acheter.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 md:pt-28">
        <dl className="grid gap-4 sm:grid-cols-3">
          {[
            ["Quand", `${JOURNEE.date}, ${JOURNEE.heures}`],
            ["Où", JOURNEE.lieu],
            ["Combien", `Jusqu'à ${JOURNEE.maxOutils} outils par personne`],
          ].map(([t, d], i) => (
            <Apparition key={t} delai={i * 110} de="zoom" className="rounded-[16px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6">
              <dt className="font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">{t}</dt>
              <dd className="mt-2 font-[family-name:var(--titres)] text-2xl font-black uppercase leading-tight first-letter:uppercase">{d}</dd>
            </Apparition>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-24">
        <div className="space-y-6">
          <Apparition><Surtitre n="02">Toutes marques</Surtitre></Apparition>
          <TitreRevele
            texte="Ta vieille visseuse aussi. *Surtout elle.*"
            className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.3rem,4.8vw,4.2rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
            classeAccent="text-[var(--accent-texte)]"
          />
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {RANGEE.map((r, i) => (
            <Apparition as="li" key={r.prenom} delai={i * 140} de="zoom" className="rounded-[18px] bg-[#E7E1D5] p-5">
              <OutilGrave id="visseuse" corps={r.couleur} gravure="#F7EBDD" prenom={r.prenom} titre={`Une visseuse d'une autre marque, gravée « ${r.prenom} »`} className="w-full" />
            </Apparition>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[var(--doux)]">Des outils d&apos;autres marques, dessinés sans logo. Les prénoms sont inventés.</p>
      </section>

      <section className="px-3 pb-20 sm:px-5 md:pb-28">
        <div className="rounded-[22px] bg-[#E9D8B4] text-[#1F2B35] [--accent-texte:#8E3524]">
          <div className="mx-auto grid max-w-6xl gap-12 px-7 py-20 sm:px-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Surtitre n="03">Réserve ton heure</Surtitre>
              <TitreRevele
                texte="Une heure *pour cinq outils.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4.2vw,3.6rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
                classeAccent="text-[var(--accent-texte)]"
              />
              <p className="text-lg leading-relaxed">Viens avec l&apos;outil chargé ou vide, peu importe : on grave le corps.</p>
              <div id="creneaux" className="rounded-[16px] bg-[var(--carte)] p-5 sm:p-6">
                <Creneaux
                  creneaux={creneauxJournee}
                  colonnes={4}
                  titreCarte="Ta place à la journée gravure"
                  bouton="Réserver cette heure"
                  confirmation="Réservée : {creneau}, samedi 14 novembre."
                  note="Les heures prises sont un exemple : le dépôt est fictif."
                  libellePris="Complet"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-[16px] border-2 border-[var(--accent)] bg-[var(--carte)] p-6">
                <h2 className="font-[family-name:var(--titres)] text-2xl font-black uppercase">Avant de venir : la garantie.</h2>
                <p className="mt-3 leading-relaxed text-[var(--doux)]">
                  Graver un outil d&apos;une autre marque peut toucher à la garantie de son fabricant. Regarde
                  ce qu&apos;elle dit avant de venir : on te pose la question sur place, et on ne grave que si
                  tu es d&apos;accord.
                </p>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[18px]">
                <Image src={photos.chantier.src} alt={photos.chantier.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
