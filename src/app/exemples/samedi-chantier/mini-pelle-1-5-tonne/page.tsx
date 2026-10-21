import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, euros, machine, photos } from "../_composants/donnees";
import { Faq, Repere, Titre } from "../_composants/Blocs";
import PrixJours from "../_composants/PrixJours";

// La fiche de la machine qu'on réserve le plus, écrite pour ce que les gens tapent :
// « location mini pelle prix journée », « … avec chauffeur », « … particulier ».
// Prix TTC d'exemple ; caractéristiques : capacité du fabricant.
export const metadata: Metadata = {
  title: "Location mini-pelle 1,5 tonne · Samedi Chantier — site de démonstration",
  description: "Mini-pelle 1,5 tonne : le prix à la journée, avec ou sans chauffeur, livrée chez toi. Site de démonstration, prix d'exemple.",
  ...adressesDeLaPage("/exemples/samedi-chantier/mini-pelle-1-5-tonne"),
};

const QUESTIONS_MP = [
  { q: "Elle passe par mon portail ?", r: "Elle fait 0,99 m de large (donnée du fabricant). Mesure ton passage le plus étroit : on te le demande au téléphone, avant de livrer." },
  { q: "Je suis un particulier, je peux louer ?", r: "Oui, c'est pour toi qu'on a fait ce site. Les conditions de location et de conduite (âge, assurance) sont écrites dans le contrat (exemple), et on te fait une prise en main à la livraison." },
  { q: "Avec chauffeur, ça change quoi ?", r: "Il arrive avec la machine, creuse selon ton tracé, et repart le soir. Le carburant est compris. Tu n'as rien à conduire." },
  { q: "Et la DT-DICT ?", r: "Elle est obligatoire avant de creuser, même chez soi. On t'aide à la remplir avant la livraison." },
];

export default function MiniPelle() {
  const m = machine("mp15");
  return (
    <div>
      <section className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="max-w-7xl mx-auto rounded-[22px] border border-[var(--encre)] bg-[var(--accent)] px-5 py-7 sm:px-10 sm:py-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-[var(--encre)] px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em]">Location · prix à la journée</p>
            <Titre niveau={1}>Mini-pelle 1,5 tonne</Titre>
            <p className="font-[family-name:var(--titres)] text-[64px] sm:text-8xl font-black leading-none tabular-nums">{euros(m.jour)}</p>
            <p className="text-lg font-semibold">TTC la journée, livrée chez toi · exemple</p>
            <p className="max-w-md leading-relaxed">
              Puis {euros(m.jourEnPlus)} par jour en plus. Avec chauffeur : {euros(m.chauffeur!)} la journée, carburant compris.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-[var(--encre)]">
            <Image src={photos.tranchee.src} alt={photos.tranchee.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" priority />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <Repere numero="01">Ton prix</Repere>
          <Titre>Combien, <span className="text-[var(--accent-texte)]">pour ton chantier.</span></Titre>
          <p className="text-lg leading-relaxed">
            Le nombre de jours, le chauffeur si tu le veux : le total s&apos;affiche, toutes taxes comprises. Pas
            de devis à attendre.
          </p>
        </div>
        <PrixJours id="mp15" />
      </section>

      <section className="bg-[var(--carte)] border-y border-[var(--encre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <Repere numero="02">Ce qu&apos;elle fait</Repere>
            <Titre>Les chantiers <span className="text-[var(--accent-texte)]">d&apos;un week-end.</span></Titre>
            <ul className="space-y-3 text-lg">
              {["Une tranchée pour l'arrosage, un câble, un drain", "Le décaissement d'une terrasse", "Les fondations d'un abri de jardin", "Une souche, si elle n'est pas trop grosse"].map((x) => (
                <li key={x} className="flex gap-3"><span aria-hidden="true" className="font-black">→</span>{x}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <Repere numero="03">Capacité du fabricant</Repere>
            <dl className="divide-y divide-[var(--trait)] border-y border-[var(--encre)]">
              {[["Poids", "1,5 tonne"], ["Profondeur de fouille", "2,2 m"], ["Largeur", "0,99 m"], ["Godets fournis", "30 et 60 cm"]].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="text-[var(--doux)]">{k}</dt>
                  <dd className="font-[family-name:var(--titres)] text-xl font-black tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-[13px] text-[var(--doux)]">Données du fabricant, en exemple. Ton terrain, ta pente et ta terre décident du reste.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <Repere numero="04">Questions</Repere>
          <Titre>Avant de <span className="text-[var(--accent-texte)]">la louer.</span></Titre>
          <Link href={`${DOSSIER}/disponibilites`} className="inline-flex h-14 items-center rounded-full bg-[var(--encre)] px-7 font-black uppercase tracking-[0.04em] text-[var(--fond)]">
            Voir les samedis libres
          </Link>
        </div>
        <Faq questions={QUESTIONS_MP} />
      </section>
    </div>
  );
}
