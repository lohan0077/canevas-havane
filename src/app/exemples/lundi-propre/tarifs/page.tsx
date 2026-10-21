import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { PASSAGES, SURFACES, euros, photos, prixMensuel } from "../_composants/donnees";
import { AppelFinal, Pastille, Section } from "../_composants/Blocs";
import Grille from "../_composants/Grille";

export const metadata: Metadata = {
  title: "Nos prix · Lundi Propre — site de démonstration",
  description: "Le prix mensuel du nettoyage de vos bureaux, tout de suite, selon la surface et les passages par semaine. Prix d'exemple hors taxes, prix ferme au devis après visite.",
  ...adressesDeLaPage("/exemples/lundi-propre/tarifs"),
};

const COMPRIS = [
  "Le rapport de passage, chaque soir",
  "Les produits et le matériel",
  "Les consommables des sanitaires, au prix coûtant (exemple)",
  "L'attestation de vigilance à la signature, puis tous les six mois",
  "Un passage de rattrapage le lendemain si quelque chose manque",
];

export default function Tarifs() {
  return (
    <>
      <Section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5 lg:sticky lg:top-28">
          <Pastille>Nos prix · hors taxes</Pastille>
          <h1 className="text-[40px] sm:text-7xl font-black leading-[0.95] tracking-[-0.04em]">Votre prix, tout de suite.</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Nos clients sont des entreprises&nbsp;: nos prix sont affichés hors taxes, TVA à 20&nbsp;% en
            sus. Ce sont des prix d'exemple&nbsp;; le prix ferme vient au devis, après une visite de vos
            locaux.
          </p>
        </div>
        <div className="rounded-[30px] bg-[var(--carte)] p-1.5">
          <Grille />
        </div>
      </Section>

      <div className="bg-[var(--carte)]">
        <Section className="space-y-6">
          <h2 className="text-[30px] sm:text-5xl font-black leading-[1] tracking-[-0.03em]">Toute la grille, par mois, HT.</h2>
          <div className="overflow-x-auto rounded-[22px] bg-[var(--fond)]" data-defile="">
            <table className="w-full min-w-[340px] text-left tabular-nums">
              <caption className="sr-only">Prix mensuels d'exemple hors taxes, selon la surface et les passages par semaine</caption>
              <thead>
                <tr className="border-b-2 border-[var(--encre)] text-sm">
                  <th scope="col" className="p-3">Surface</th>
                  {PASSAGES.map((p) => <th key={p} scope="col" className="p-3 text-right">{p}&nbsp;/&nbsp;sem.</th>)}
                </tr>
              </thead>
              <tbody>
                {SURFACES.map((s) => (
                  <tr key={s} className="border-b border-[var(--trait)] last:border-0">
                    <th scope="row" className="p-3 font-bold whitespace-nowrap">{s}&nbsp;m²</th>
                    {PASSAGES.map((p) => <td key={p} className="p-3 text-right whitespace-nowrap">{euros(prixMensuel(s, p))}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[var(--doux)]">Prix d'exemple, hors taxes, en euros par mois. L'entreprise est fictive.</p>
        </Section>
      </div>

      <Section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <Pastille>Compris dans le prix</Pastille>
          <h2 className="text-[30px] sm:text-5xl font-black leading-[1] tracking-[-0.03em]">Ce que paie votre mensualité.</h2>
          <ul className="space-y-3">
            {COMPRIS.map((c) => (
              <li key={c} className="flex gap-3 text-lg">
                <span aria-hidden="true" className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-xs font-black">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
          <Image src={photos.plateau.src} alt={photos.plateau.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </Section>

      <AppelFinal />
    </>
  );
}
