import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import { DOSSIER, TARIFS, euros, photos } from "../_composants/donnees";

// Une page par besoin, avec les mots des clients : « gardiennage chantier prix »
// (suggestion Google relevée le 15/10/2026, voir la vidéo agenda-securite).
export const metadata: Metadata = {
  title: "Gardiennage de chantier : prix et déroulé — Veilleuse, site de démonstration",
  description: "Gardiennage de chantier la nuit et le week-end : ce qui est compris, le prix d'exemple, le rapport de 7 h. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/veilleuse/gardiennage-de-chantier"),
};

const t = TARIFS.chantier;

const COMPRIS = [
  "Un agent de 19 h à 7 h, titulaire de sa carte professionnelle",
  "Des rondes à heures variables : portail, bâches, stockage, engins",
  "Une photo du site à chaque ronde",
  "Le rapport à 7 h, au conducteur de travaux",
  "Les week-ends et jours fériés, au même prix d'exemple",
];

const PAS_COMPRIS = [
  "La pose de clôtures ou d'éclairage de chantier",
  "La vidéosurveillance à distance",
  "Les contrôles d'identité : un agent privé n'en a pas le pouvoir",
];

const QUESTIONS = [
  { question: "À partir de combien de nuits ?", reponse: "Une seule. Beaucoup de chantiers nous appellent pour un pont, un week-end, ou les nuits où le matériel attend d'être posé." },
  { question: "Et si le chantier s'arrête plus tôt ?", reponse: "Tu préviens la veille avant midi : la nuit suivante n'est pas facturée." },
  { question: "Le rapport peut-il aller à plusieurs personnes ?", reponse: "Oui : conducteur de travaux, maître d'ouvrage, assureur si tu le souhaites. Même rapport, même heure." },
];

export default function GardiennageDeChantier() {
  return (
    <main>
      <EnTetePage surtitre="Gardiennage de chantier" titre="Le matériel dort. *Toi aussi.*" photo={photos.aube}>
        Un agent la nuit et le week-end, des rondes, et le rapport de 7 h pour le conducteur de
        travaux. Prix, déroulé, ce qui est compris : tout est sur cette page.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Apparition de="zoom" className="flex flex-col justify-between gap-8 rounded-[2.5rem] bg-[var(--accent)] p-8 text-[var(--sur-accent)] sm:p-10">
          <p className="text-[12px] font-bold uppercase tracking-[0.22em]">Prix d&apos;exemple · HT</p>
          <p className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,5.2rem)] leading-[0.95] tabular-nums">{euros(t.min)} – {euros(t.max)}</p>
          <p className="text-lg">par nuit, {t.detail}. Prix HT : clients professionnels.</p>
        </Apparition>
        <div className="grid gap-5 sm:grid-cols-2">
          <Apparition delai={100} className="rounded-[2.5rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
            <h2 className="mb-4 text-3xl font-normal">Ce qui est compris</h2>
            <ul className="divide-y divide-[var(--trait)]">
              {COMPRIS.map((c) => (
                <li key={c} className="flex gap-3 py-3"><span aria-hidden="true" className="font-bold text-[var(--accent-texte)]">✓</span>{c}</li>
              ))}
            </ul>
          </Apparition>
          <Apparition delai={200} className="rounded-[2.5rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)]">
            <h2 className="mb-4 text-3xl font-normal">Ce qui ne l&apos;est pas</h2>
            <ul className="divide-y divide-white/15">
              {PAS_COMPRIS.map((c) => (
                <li key={c} className="flex gap-3 py-3"><span aria-hidden="true">—</span>{c}</li>
              ))}
            </ul>
          </Apparition>
        </div>
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Apparition><Surtitre>Tes questions</Surtitre></Apparition>
            <TitreRevele texte="Sur le gardiennage *de chantier.*" className="text-[clamp(2.6rem,5vw,4.2rem)] font-normal leading-[0.98]" classeAccent="text-[var(--accent-texte)]" />
            <Bouton href={`${DOSSIER}/devis`} variante="nuit">Faire mon devis</Bouton>
          </div>
          <Accordeon questions={QUESTIONS} />
        </div>
      </section>

      <div className="h-3 bg-[var(--carte)] sm:h-5" />
      <div className="bg-[var(--carte)]"><AppelFinal /></div>
    </main>
  );
}
