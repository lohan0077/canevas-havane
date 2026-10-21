import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { entreprise, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Candidats · Chaise Pleine — site de démonstration",
  description: "Placement gratuit pour les candidats, et ce que le cabinet fait (et ne fait pas) d'une candidature. Cabinet fictif, site de démonstration.",
  ...adressesDeLaPage("/exemples/chaise-pleine/candidats"),
};

const ENGAGEMENTS = [
  { t: "Rien à payer", d: "Le placement est gratuit pour toi : aucune rétribution ne peut t'être demandée pour te trouver un poste (Code du travail, art. L.5321-3). C'est l'entreprise qui recrute qui paie." },
  { t: "Ton accord avant chaque envoi", d: "Ta candidature n'est présentée à une entreprise qu'après ton accord écrit, pour ce poste-là." },
  { t: "Rien de publié", d: "Ni ton nom, ni ton parcours, ni l'entreprise qui t'a recruté. Pas de « ils nous ont fait confiance »." },
  { t: "Tes données, pas plus longtemps que nécessaire", d: "Une vraie candidature serait conservée le temps du recrutement, puis supprimée, sauf accord de ta part. Tu peux demander l'accès ou l'effacement à tout moment." },
];

export default function Candidats() {
  return (
    <main>
      <header className="mx-auto max-w-6xl space-y-4 px-5 pt-10 sm:pt-16">
        <p className="text-sm font-bold text-[var(--accent-texte)]">Candidats</p>
        <h1 className="max-w-4xl text-[2.35rem] sm:text-6xl font-extrabold tracking-tight">Placement gratuit <span className="text-[var(--accent-texte)]">pour les candidats.</span></h1>
        <p className="max-w-2xl text-lg leading-relaxed">Ce site parle aux dirigeants. Mais une chaise ne se remplit pas sans toi : voilà ce qu&apos;on te doit.</p>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:py-16 md:grid-cols-[1.2fr_0.8fr] md:items-start">
        <ul className="space-y-4">
          {ENGAGEMENTS.map((e) => (
            <li key={e.t} className="space-y-1 rounded-xl bg-[var(--carte)] p-5">
              <h2 className="text-2xl font-extrabold">{e.t}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{e.d}</p>
            </li>
          ))}
        </ul>
        <div className="space-y-5">
          <Image src={photos.chaiseRouge.src} width={photos.chaiseRouge.largeur} height={photos.chaiseRouge.hauteur} alt={photos.chaiseRouge.alt} sizes="(min-width: 768px) 420px, 100vw" className="aspect-square w-full rounded-2xl object-cover" />
          <div className="rounded-xl bg-[#2A343D] p-5 text-[#F4F1EA]">
            <p className="font-extrabold">Pas d&apos;offres sur ce site</p>
            <p className="mt-1 text-sm leading-relaxed text-[#E1E6EA]">Le cabinet est fictif : aucune offre, aucun dépôt de CV. Un vrai cabinet le ferait par un formulaire séparé, avec ton accord.</p>
            <p className="mt-3 text-sm"><a href={`tel:${entreprise.telephoneLien}`} className="underline underline-offset-4">{entreprise.telephone}</a> · numéro de fiction</p>
          </div>
        </div>
      </section>
    </main>
  );
}
