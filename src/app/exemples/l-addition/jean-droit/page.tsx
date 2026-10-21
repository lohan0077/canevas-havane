import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, euros, photos, produits, tva } from "../_composants/donnees";
import Addition from "../_composants/Addition";
import Commande from "../_composants/Commande";

export const metadata: Metadata = {
  title: "Jean droit · L'Addition — site de démonstration",
  description: "Site de démonstration d'une marque de vêtements imaginaire : le jean droit, 100 % coton, 120 € TTC, son addition ligne par ligne, son vrai stock et son jour de livraison.",
  ...adressesDeLaPage("/exemples/l-addition/jean-droit"),
};

const jean = produits[0];
const ligne = (id: string) => jean.lignes.find((l) => l.id === id)?.montant ?? 0;
const RESUME = [
  ["Toile", ligne("toile")],
  ["Couture", ligne("couture")],
  ["Envoi, rivets, TVA", ligne("envoi") + ligne("rivets") + tva(jean)],
  ["La marque", ligne("marque")],
] as const;

export default function JeanDroit() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-8 sm:px-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="order-2 space-y-6 md:order-1">
          <Image src={photos.pile.src} width={photos.pile.largeur} height={photos.pile.hauteur} alt={photos.pile.alt} sizes="(min-width: 768px) 600px, 100vw" className="aspect-[4/3] w-full rounded-[20px] object-cover" />
          <Image src={photos.rouleaux.src} width={photos.rouleaux.largeur} height={photos.rouleaux.hauteur} alt={photos.rouleaux.alt} sizes="(min-width: 768px) 600px, 100vw" className="aspect-[3/2] w-full rounded-[20px] object-cover" />
          <p className="text-sm text-[var(--doux)]">Photos d&apos;illustration : la marque est fictive.</p>
        </div>

        <div className="order-1 space-y-6 md:order-2" id="fiche">
          <nav aria-label="Fil d'Ariane" className="text-sm">
            <Link href={DOSSIER} className="underline underline-offset-4">Accueil</Link> / Jean droit
          </nav>
          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Jean droit · {jean.composition}</p>
            <h1 className="text-5xl font-black tracking-tight">
              Tu sais ce que tu <span className="text-[var(--accent-texte)]">paies.</span>
            </h1>
            <p className="text-2xl font-black tabular-nums">
              120,00 € <span className="text-base font-bold text-[var(--doux)]">TTC · exemple</span>
            </p>
          </div>
          <ul className="divide-y divide-[var(--trait)] border-y-2 border-[var(--encre)]" aria-label="L'addition, en résumé">
            {RESUME.map(([libelle, montant]) => (
              <li key={libelle} className="flex justify-between gap-4 py-2">
                <span>{libelle}</span>
                <span className="font-bold tabular-nums">{euros(montant, false)}</span>
              </li>
            ))}
          </ul>
          <Commande />
          <dl className="grid grid-cols-2 gap-4 rounded-[16px] bg-[var(--carte)] p-5 text-sm">
            <div>
              <dt className="font-bold">Composition</dt>
              <dd>{jean.composition}</dd>
            </div>
            <div>
              <dt className="font-bold">Toile</dt>
              <dd>Denim brut, 13,5 onces</dd>
            </div>
            <div>
              <dt className="font-bold">Coupe</dt>
              <dd>Droite, taille haute</dd>
            </div>
            <div>
              <dt className="font-bold">Entretien</dt>
              <dd>{jean.entretien}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="addition" className="scroll-mt-20 bg-[var(--carte)] px-5 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tight">L&apos;addition complète.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Chaque euro de ce jean, et à quoi il sert. Touche une ligne pour l&apos;explication. Montants
              d&apos;exemple : le calcul, lui, est juste.
            </p>
          </div>
          <Addition />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 md:grid-cols-3">
        {[
          ["Livré le jeudi", "Commande passée jusqu'au lundi soir : livrée le jeudi de la même semaine. La date exacte est sous le bouton."],
          ["14 jours pour changer d'avis", "Comme pour tout achat à distance. Pour un échange de taille, l'envoi du nouveau jean est à notre charge."],
          ["Pas de promo", "Le prix ne bouge pas d'un jour à l'autre. Tu n'as rien à guetter."],
        ].map(([t, d]) => (
          <div key={t} className="space-y-2 border-t-2 border-[var(--encre)] pt-4">
            <h2 className="text-2xl font-black tracking-tight">{t}</h2>
            <p className="text-[var(--doux)]">{d}</p>
          </div>
        ))}
      </section>
    </>
  );
}
