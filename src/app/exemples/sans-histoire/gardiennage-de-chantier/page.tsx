import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule, Questions } from "../_composants/Blocs";
import { DOSSIER, TARIFS, euros, photos } from "../_composants/donnees";

// Une page par besoin, avec les mots des clients : « gardiennage chantier prix »
// (suggestion Google relevée le 15/10/2026, voir la vidéo agenda-securite).
export const metadata: Metadata = {
  title: "Gardiennage de chantier : prix et déroulé · Sans Histoire — site de démonstration",
  description: "Gardiennage de chantier la nuit et le week-end : ce qui est compris, le prix d'exemple, le rapport de 7 h. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/sans-histoire/gardiennage-de-chantier"),
};

const t = TARIFS.chantier;

const COMPRIS = [
  "Un agent de 19 h à 7 h, titulaire de sa carte professionnelle",
  "Des rondes à heures variables, portail, bâches, stockage, engins",
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
  { question: "Et si le chantier s'arrête plus tôt ?", reponse: "Vous prévenez la veille avant midi, la nuit suivante n'est pas facturée." },
  { question: "Le rapport peut-il aller à plusieurs personnes ?", reponse: "Oui : conducteur de travaux, maître d'ouvrage, assureur si vous le souhaitez. Même rapport, même heure." },
];

export default function GardiennageDeChantier() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <Intitule niveau={1} surtitre="Gardiennage de chantier" titre={<>Le matériel dort. <span className="italic text-[var(--accent-texte)]">Vous aussi.</span></>}>
          Un agent la nuit et le week-end, des rondes, et le rapport de 7 h pour le
          conducteur de travaux. Prix, déroulé, ce qui est compris : tout est sur cette page.
        </Intitule>
        <div className="rounded-[24px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F0A47F]">Prix d&apos;exemple</p>
          <p className="font-[family-name:var(--titres)] text-4xl tabular-nums">{euros(t.min)} – {euros(t.max)} HT</p>
          <p className="text-[#C7C1B4]">par nuit, {t.detail}. Prix HT : clients professionnels.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden rounded-[30px]">
          <Image src={photos.aube.src} alt={photos.aube.alt} fill sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover object-[50%_40%]" />
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <h2 className="text-3xl sm:text-4xl font-normal">Ce qui est compris</h2>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {COMPRIS.map((c) => (
              <li key={c} className="flex gap-3 py-3.5"><span aria-hidden="true" className="text-[var(--accent-texte)] font-bold">✓</span>{c}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <h2 className="text-3xl sm:text-4xl font-normal">Ce qui ne l&apos;est pas</h2>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {PAS_COMPRIS.map((c) => (
              <li key={c} className="flex gap-3 py-3.5 text-[var(--doux)]"><span aria-hidden="true">—</span>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-6 pb-16 space-y-8">
        <h2 className="text-3xl sm:text-4xl font-normal">Vos questions sur le gardiennage de chantier</h2>
        <Questions questions={QUESTIONS} />
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28">
        <div className="rounded-[28px] border border-[var(--encre)] p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="font-[family-name:var(--titres)] text-3xl leading-tight">Combien de nuits, et où ? <span className="italic">Trois questions suffisent.</span></p>
          <Link href={`${DOSSIER}/devis`} className="shrink-0 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-4 font-semibold text-center">Faire mon devis</Link>
        </div>
      </section>
    </div>
  );
}
