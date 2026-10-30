"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Apparition from "../../_kit/Apparition";
import { Bouton, Surtitre, Titre } from "./Blocs";
import { DOSSIER, SAMEDIS, entreprise } from "./donnees";

/**
 * Le dernier écran de chaque page, clair et centré : les samedis encore libres, « les
 * vrais, mis à jour à chaque réservation ». La page des samedis montre déjà la grille
 * entière : l'écran s'y efface. Les « pris » sont un exemple ; rien ne bascule tout seul.
 */
export default function SamedisLibres() {
  const chemin = usePathname();
  if (chemin === `${DOSSIER}/samedis-libres`) return null;
  return (
    <section id="samedis-libres" className="scroll-mt-20 border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-10 px-6 py-28 text-center md:py-36">
        <div className="space-y-6">
          <Apparition><Surtitre>Mis à jour à chaque réservation</Surtitre></Apparition>
          <Titre texte="les samedis *encore libres.*" className="mx-auto" />
        </div>
        <ul className="mx-auto grid max-w-xl grid-cols-3 gap-2 sm:grid-cols-6">
          {SAMEDIS.map((s) => (
            <li key={s.id} className={`rounded-2xl border p-3 ${s.pris ? "border-[var(--trait)] text-[var(--doux)]" : "border-[var(--encre)]/30 bg-[var(--carte)]"}`}>
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em]">Samedi</span>
              <span className="block font-[family-name:var(--titres)] font-semibold text-[30px] leading-tight">{s.jour}</span>
              <span className="block text-[13px]">{s.mois}</span>
              <span className={`mt-1 block text-[12px] font-medium uppercase tracking-[0.1em] ${s.pris ? "line-through" : "text-[var(--accent-texte)]"}`}>{s.pris ? "Pris" : "Libre"}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}/samedis-libres`}>Bloquer ma date</Bouton>
            <Bouton href={`${DOSSIER}#question`} variante="contour">Écrire notre phrase</Bouton>
          </div>
          <p className="text-[15px] text-[var(--doux)]">
            Samedis d&apos;exemple, pour les mariages : l&apos;entreprise est fictive. Ou par téléphone :{" "}
            <span className="font-medium tabular-nums text-[var(--encre)]">{entreprise.telephone}</span>
          </p>
          <Link href={`${DOSSIER}/formats`} className="text-[15px] underline underline-offset-4">Formats et prix</Link>
        </div>
      </div>
    </section>
  );
}
