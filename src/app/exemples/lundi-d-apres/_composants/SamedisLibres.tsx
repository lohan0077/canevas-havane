"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, SAMEDIS } from "./donnees";

/**
 * Sur chaque page, les samedis encore libres : « les vrais, mis à jour à chaque
 * réservation ». La page des samedis montre déjà la grille entière : la bande s'y efface.
 * Les « pris » sont un exemple ; rien ne bascule tout seul à l'écran.
 */
export default function SamedisLibres() {
  const chemin = usePathname();
  if (chemin === `${DOSSIER}/samedis-libres`) return null;
  return (
    <section id="samedis-libres" className="scroll-mt-20 px-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-[96rem] rounded-[2.5rem] bg-[#9AD1D4] px-5 py-12 text-[#2A190F] sm:px-10 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-7">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#2A190F] px-3.5 py-1.5 text-[13px] font-bold lowercase text-[#FFD9A0]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#FF6B4A]" />
                mis à jour à chaque réservation
              </p>
              <h2 className="font-[family-name:var(--titres)] text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold lowercase leading-[0.9] tracking-[-0.05em]">
                les samedis encore libres
              </h2>
            </div>
            <Link href={`${DOSSIER}/samedis-libres`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#2A190F] px-6 font-[family-name:var(--titres)] font-bold lowercase text-[#FFF4E6] transition-transform hover:scale-[1.03]">
              bloquer ma date <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {SAMEDIS.map((s) => (
              <li key={s.id} className={`rounded-[20px] p-3 text-center ${s.pris ? "bg-[#9AD1D4] text-[#4A3424] ring-1 ring-[#2A190F]/30" : "bg-[#FFF4E6] text-[#2A190F]"}`}>
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em]">samedi</span>
                <span className="block font-[family-name:var(--titres)] text-[34px] font-extrabold leading-tight">{s.jour}</span>
                <span className="block text-[13px]">{s.mois}</span>
                <span className={`mt-1 block text-[12px] font-bold uppercase tracking-[0.1em] ${s.pris ? "line-through" : "text-[#B8381F]"}`}>{s.pris ? "Pris" : "Libre"}</span>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-[#4A3424]">Samedis d&apos;exemple, juin et juillet 2027, pour les mariages : l&apos;entreprise est fictive.</p>
        </div>
      </div>
    </section>
  );
}
