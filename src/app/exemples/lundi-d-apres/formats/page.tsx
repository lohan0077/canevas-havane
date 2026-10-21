import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import CalculPalier from "../../_kit/CalculPalier";
import { DOSSIER, FORMATS, QUESTIONS, photos } from "../_composants/donnees";
import { Coin, Faq } from "../_composants/Blocs";

// Les trois formats et leurs prix, hors taxes (les clients sont des entreprises, et le
// site le dit), un calcul d'ordre de grandeur selon le nombre de participants, et les
// questions. Prix d'exemple.
export const metadata: Metadata = {
  title: "Formats et prix · Lundi d'Après — site de démonstration",
  description: "Soirée d'entreprise, séminaire, fête de fin d'année : les formats et leurs prix hors taxes, par personne. Site de démonstration, prix d'exemple.",
  ...adressesDeLaPage("/exemples/lundi-d-apres/formats"),
};

const PALIERS = [
  { jusqua: 50, titre: "Une équipe", prix: "110 € HT par personne · exemple", detail: "Soirée d'entreprise jusqu'à 50 personnes : lieu, dîner, le moment de 23 h, et nous." },
  { jusqua: 150, titre: "Un étage entier", prix: "95 € HT par personne · exemple", detail: "Soirée d'entreprise de 60 à 150 personnes : lieu, dîner, le moment de 23 h, et nous." },
  { jusqua: 400, titre: "Toute l'entreprise", prix: "85 € HT par personne · exemple", detail: "Soirée d'entreprise de 160 à 400 personnes : lieu, dîner, le moment de 23 h, et nous." },
];

export default function Formats() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-14 sm:pt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-5">
          <Coin>hors taxes : nos clients sont des entreprises</Coin>
          <h1 className="text-[48px] sm:text-[84px] font-bold lowercase leading-[0.95] tracking-[-0.04em]">formats et prix</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Un ordre de grandeur tout de suite, le devis détaillé ensuite. Glissez le nombre de participants pour une soirée
            d&apos;entreprise.
          </p>
        </div>
        <CalculPalier
          etiquette="Effectif"
          unite="personnes"
          min={20}
          max={400}
          pas={10}
          depart={140}
          paliers={PALIERS}
          titreResultat="Ordre de grandeur · exemple"
          legende="Prix hors taxes, par personne. Le devis dit tout, ligne par ligne."
        />
      </section>

      <section className="bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 space-y-8">
          <h2 className="text-[36px] sm:text-5xl font-bold lowercase leading-[1] tracking-[-0.03em]">trois formats</h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {FORMATS.map((f) => (
              <li key={f.nom} className="rounded-[28px] bg-[var(--fond)] p-6 space-y-2">
                <h3 className="text-[22px] font-bold lowercase">{f.nom}</h3>
                <p className="font-[family-name:var(--titres)] text-[20px] font-semibold text-[var(--accent-texte)]">{f.prix}</p>
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--doux)]">exemple</p>
                <p className="leading-relaxed text-[var(--doux)]">{f.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <h2 className="text-[36px] sm:text-5xl font-bold lowercase leading-[1] tracking-[-0.03em]">vos questions</h2>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[32px]">
            <Image src={photos.croissants.src} alt={photos.croissants.alt} fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover" />
          </div>
          <Link href={`${DOSSIER}#question`} className="inline-flex h-12 items-center rounded-full bg-[var(--accent)] px-6 font-semibold text-[var(--sur-accent)]">
            Écrire notre phrase
          </Link>
        </div>
        <Faq questions={QUESTIONS} />
      </section>
    </div>
  );
}
