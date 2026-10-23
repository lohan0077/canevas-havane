"use client";

import Image from "next/image";
import Apparition from "../../_kit/Apparition";
import { MOIS, PHOTOS } from "./donnees";
import { useMoisCourant } from "./mois";

/**
 * Les douze planches en arche, en frise sous l'en-tête de l'accueil : l'année entière
 * d'un coup d'œil, le mois en cours cerclé de mimosa. Ornement : le calendrier, plus
 * bas, dit la même chose en texte.
 */
export default function Frise() {
  const courant = useMoisCourant();
  return (
    <ol aria-hidden="true" className="grid grid-cols-12 gap-1 sm:gap-2.5">
      {MOIS.map((m, i) => {
        const actif = m.n === courant;
        return (
          <Apparition as="li" key={m.n} de="rideau" delai={150 + i * 70} className="space-y-1.5">
            <span className={`relative block aspect-[2/3] overflow-hidden rounded-t-full transition-opacity ${actif ? "opacity-100 ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--sombre)]" : "opacity-55"}`}>
              <Image src={PHOTOS[m.photo].src} alt="" fill sizes="(min-width: 640px) 110px, 30px" className="object-cover" />
            </span>
            <span className={`block text-center font-[family-name:var(--titres)] text-[10px] italic sm:text-sm ${actif ? "text-[var(--accent)]" : ""}`}>
              {String(m.n).padStart(2, "0")}
            </span>
          </Apparition>
        );
      })}
    </ol>
  );
}
