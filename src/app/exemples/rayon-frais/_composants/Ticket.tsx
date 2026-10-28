"use client";

import { useState } from "react";
import { questionsLigne, ticket, totalTicket } from "./donnees";

/**
 * Le ticket de caisse de la première séance, ligne par ligne : on touche une ligne,
 * elle se surligne, et les mêmes trois questions s'affichent pour chacune — on
 * comprend, on ne juge pas. Ticket d'exemple, rien n'est envoyé.
 */
export default function Ticket() {
  const [vues, setVues] = useState<number[]>([]);
  const [courante, setCourante] = useState<number | null>(null);

  const toucher = (i: number) => {
    setCourante(i);
    setVues((v) => (v.includes(i) ? v : [...v, i]));
  };

  return (
    <div className="grid gap-5 sm:grid-cols-[minmax(0,320px)_1fr] sm:items-start" data-film="ticket">
      <div className="mx-auto w-full max-w-[320px] rotate-[-1.5deg] bg-white px-5 pt-6 pb-8 font-[family-name:var(--texte)] text-[15px] shadow-[0_24px_50px_-30px_rgba(31,59,36,0.6)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),95%_100%,90%_calc(100%-10px),85%_100%,80%_calc(100%-10px),75%_100%,70%_calc(100%-10px),65%_100%,60%_calc(100%-10px),55%_100%,50%_calc(100%-10px),45%_100%,40%_calc(100%-10px),35%_100%,30%_calc(100%-10px),25%_100%,20%_calc(100%-10px),15%_100%,10%_calc(100%-10px),5%_100%,0_calc(100%-10px))]">
        <p className="text-center font-bold tracking-[0.2em]">SUPERMARCHÉ</p>
        <p className="text-center text-xs text-[var(--doux)]">Samedi · 10 h 12</p>
        <ul className="mt-4 border-y border-dashed border-[#BFB6A3] py-2">
          {ticket.map((l, i) => (
            <li key={l.article}>
              <button
                type="button"
                data-ligne={i}
                aria-pressed={courante === i}
                onClick={() => toucher(i)}
                className={`flex w-full justify-between gap-3 rounded px-1.5 py-1.5 text-left tabular-nums transition-colors ${
                  courante === i ? "bg-[#F2C94C]" : vues.includes(i) ? "bg-[#F7EBCB]" : "hover:bg-[#FFF7E6]"
                }`}
              >
                <span>{l.article}</span>
                <span>{l.prix}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 flex justify-between font-bold tabular-nums"><span>TOTAL</span><span>{totalTicket} €</span></p>
        <p className="mt-3 text-center text-xs text-[var(--doux)]">Ticket d&apos;exemple</p>
      </div>

      <div className="rounded-[24px] bg-[var(--carte)] border-2 border-[var(--encre)] p-5 sm:p-6 space-y-3 min-h-[200px]" aria-live="polite">
        {courante === null ? (
          <>
            <p className="font-[family-name:var(--titres)] text-2xl font-semibold">Touchez une ligne.</p>
            <p className="text-[var(--doux)]">À la première séance, on fait ça ensemble, avec votre vrai ticket.</p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-[var(--accent-texte)]">Ligne {courante + 1} sur {ticket.length}</p>
            <p className="font-[family-name:var(--titres)] text-3xl font-semibold" data-film="article">{ticket[courante].article}</p>
            <ul className="space-y-1.5">
              {questionsLigne.map((q) => (
                <li key={q} className="flex gap-2"><span aria-hidden="true" className="text-[var(--accent-texte)]">→</span>{q}</li>
              ))}
            </ul>
            <p className="text-sm text-[var(--doux)]">Les mêmes questions pour chaque ligne : on comprend, on ne juge pas.</p>
          </>
        )}
        <p className="text-sm font-semibold tabular-nums">{vues.length} ligne{vues.length > 1 ? "s" : ""} sur {ticket.length} regardée{vues.length > 1 ? "s" : ""}</p>
      </div>
    </div>
  );
}
