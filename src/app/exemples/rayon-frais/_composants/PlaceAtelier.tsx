"use client";

import { useState } from "react";
import { atelierInfo } from "./donnees";

/** « Je viens » : une place notée pour l'atelier, sans rien demander. Rien n'est envoyé. */
export default function PlaceAtelier() {
  const [note, setNote] = useState(false);
  return note ? (
    <div role="status" className="rounded-2xl bg-[#FFF7E6] text-[#1F3B24] p-5 space-y-1">
      <p className="font-[family-name:var(--titres)] text-2xl font-semibold [font-variant-numeric:lining-nums]">Place notée · {atelierInfo.date.toLowerCase()}, {atelierInfo.heure}</p>
      <p className="text-sm">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
    </div>
  ) : (
    <button type="button" onClick={() => setNote(true)} className="w-full min-h-14 rounded-full bg-[#FFF7E6] text-[#1F3B24] text-lg font-semibold">
      Je viens
    </button>
  );
}
