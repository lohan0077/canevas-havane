import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import CalculPalier from "../../_kit/CalculPalier";
import { COMPRIS, DOSSIER, PALIERS_PRIX, PAGE_EXEMPLE, photos } from "../_composants/donnees";
import { Note } from "../_composants/Blocs";

// Le prix par personne, TTC, selon le nombre d'invités (exemple), ce qu'il comprend,
// les allergènes et les boissons (sans alcool).
export const metadata: Metadata = {
  title: "Le prix · Transmis — site de démonstration",
  description: "Le prix par personne, toutes taxes comprises, selon le nombre d'invités, et ce qu'il comprend. Site de démonstration, prix d'exemple.",
  ...adressesDeLaPage("/exemples/transmis/prix"),
};

export default function Prix() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-10 pb-16 sm:pt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-5">
          <Note>Le prix, sans détour</Note>
          <h1 className="text-[48px] sm:text-7xl font-normal">Par personne, <em className="text-[var(--accent-texte)]">tout compris.</em></h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Glisse le nombre d&apos;invités : le prix par personne s&apos;affiche, toutes taxes comprises. Ce sont des prix
            d&apos;exemple.
          </p>
        </div>
        <CalculPalier
          etiquette="Invités"
          unite="invités"
          min={40}
          max={200}
          pas={10}
          depart={120}
          paliers={PALIERS_PRIX}
          titreResultat="Ton prix · exemple"
          legende="Les essais en cuisine et la dégustation sont compris, quel que soit le nombre d'invités."
        />
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-[40px] sm:text-5xl font-normal">Ce que comprend le prix</h2>
            <ul className="space-y-3 text-lg">
              {COMPRIS.map((c) => (
                <li key={c} className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>{c}</li>
              ))}
            </ul>
            <p className="text-[15px] leading-relaxed text-[var(--doux)]">
              Les boissons comprises sont sans alcool : eaux plates et gazeuses, citronnade maison, café.
            </p>
          </div>
          <div className="space-y-5">
            <h2 className="text-[40px] sm:text-5xl font-normal">Les allergènes</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Chaque plat dit ce qu&apos;il contient, parmi les quatorze allergènes que la réglementation européenne oblige à
              signaler. Avant la commande, on te demande les allergies et les régimes de tes invités, table par table.
            </p>
            <div className="rounded-[12px] border border-[var(--trait)] p-5 space-y-1">
              <p className="font-[family-name:var(--titres)] text-[24px] italic">{PAGE_EXEMPLE.plat}</p>
              <p className="text-[15px]"><strong>Allergènes&nbsp;:</strong> {PAGE_EXEMPLE.allergenes.join(", ").toLowerCase()} (exemple).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="relative aspect-[2/3] max-w-sm overflow-hidden rounded-[6px]">
          <Image src={photos.ragout.src} alt={photos.ragout.alt} fill sizes="(min-width: 768px) 360px, 90vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <p className="font-[family-name:var(--titres)] text-[40px] sm:text-6xl leading-[1.05]">Le prix d&apos;un repas. <em className="text-[var(--accent-texte)]">Le goût d&apos;une famille.</em></p>
          <Link href={`${DOSSIER}#recette`} className="inline-flex h-14 items-center rounded-full bg-[var(--accent)] px-7 text-[17px] font-semibold text-[var(--sur-accent)]">
            Envoyer ma recette
          </Link>
        </div>
      </section>
    </div>
  );
}
