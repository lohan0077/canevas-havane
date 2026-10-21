import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, OPTIONS, TENTES, photos } from "../_composants/donnees";
import { CarteTente, Faq, Surtitre } from "../_composants/Blocs";

// Les trois tentes, leur capacité (celle du fabricant), leur prix TTC d'exemple pour le
// week-end, ce qui est compris, et ce qu'on pose avec.
export const metadata: Metadata = {
  title: "Les tentes · Pignon sur Pré — site de démonstration",
  description: "Trois tentes de réception, de 60 à 240 invités assis selon le fabricant, montées la veille. Site de démonstration, prix d'exemple.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre/tentes"),
};

const COMPRIS = [
  "La visite du pré, trois semaines avant",
  "La livraison, dans un rayon de 30 km",
  "Le montage le vendredi, le démontage le lundi",
  "Les côtés amovibles, fermés ou ouverts",
  "Un numéro joignable tout le week-end",
];

const QUESTIONS_TENTES = [
  { q: "Pourquoi « capacité du fabricant » ?", r: "Parce que c'est lui qui conçoit chaque modèle et l'indique dans sa notice. On ne calcule pas une capacité à la louche : on te donne la sienne, puis on regarde avec toi ce que la piste ou le buffet retirent." },
  { q: "On peut la fermer s'il fait froid ?", r: "Oui : les côtés se ferment. Un chauffage d'appoint se prévoit à la visite, selon le modèle et la notice du fabricant." },
  { q: "Faut-il une autorisation ?", r: "Pour une fête ouverte au public, oui : une tente qui reçoit du public ne se monte pas sans l'autorisation de la mairie, et on prépare le dossier avec toi. Pour une fête privée, demande à ta mairie : on te dit quoi lui demander." },
];

export default function Tentes() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-10 pb-14 sm:pt-16 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div className="space-y-4">
          <Surtitre>Les tentes</Surtitre>
          <h1 className="text-[48px] sm:text-7xl font-normal">Trois tentes, <em className="text-[var(--accent-texte)]">un week-end.</em></h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Montées le vendredi, démontées le lundi. Les prix sont TTC, pour le week-end, montage et démontage compris.
          </p>
        </div>
        <div className="relative hidden md:block aspect-[3/4] overflow-hidden rounded-t-full">
          <Image src={photos.tenteJardin.src} alt={photos.tenteJardin.alt} fill sizes="380px" className="object-cover" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24">
        <ul className="grid gap-4 md:grid-cols-3">
          {TENTES.map((t) => (
            <li key={t.id}><CarteTente t={t} /></li>
          ))}
        </ul>
        <p className="mt-4 text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple. Capacité : celle du fabricant de chaque modèle, en invités assis à des tables rondes de dix.</p>
      </section>

      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <Surtitre>Compris</Surtitre>
            <h2 className="text-[40px] sm:text-5xl font-normal">Dans le prix.</h2>
            <ul className="space-y-3 text-lg">
              {COMPRIS.map((c) => (
                <li key={c} className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>{c}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <Surtitre>En plus</Surtitre>
            <h2 className="text-[40px] sm:text-5xl font-normal">Ce qu&apos;on pose avec.</h2>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {OPTIONS.map((o) => (
                <li key={o.nom} className="flex items-baseline justify-between gap-4 py-3.5">
                  <span>
                    <span className="block font-semibold">{o.nom}</span>
                    <span className="block text-[15px] text-[var(--doux)]">{o.detail}</span>
                  </span>
                  <span className="shrink-0 text-[15px] font-semibold">{o.prix}</span>
                </li>
              ))}
            </ul>
            <p className="text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple, pour le week-end.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-16 sm:py-24 space-y-8">
        <h2 className="text-[40px] font-normal">Questions</h2>
        <Faq questions={QUESTIONS_TENTES} />
        <Link href={`${DOSSIER}#pre`} className="inline-flex h-14 items-center rounded-full bg-[var(--accent)] px-6 text-[17px] font-semibold text-[var(--sur-accent)]">
          Voir ma tente sur mon pré
        </Link>
      </section>
    </div>
  );
}
