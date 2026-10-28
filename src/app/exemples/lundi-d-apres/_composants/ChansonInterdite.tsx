"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER } from "./donnees";

/**
 * L'accueil, côté mariage : « Quelle chanson est interdite à votre mariage ? ». On
 * l'écrit, le site répond « Noté : elle ne passera pas. » et la tamponne. Puis celle qui
 * doit passer. Rien n'est envoyé : la page le dit.
 */
export default function ChansonInterdite() {
  const [interdite, setInterdite] = useState("");
  const [notee, setNotee] = useState<string | null>(null);
  const [voulue, setVoulue] = useState("");
  const [voulueNotee, setVoulueNotee] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <form
        className="rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-5 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (interdite.trim()) setNotee(interdite.trim());
        }}
      >
        <label htmlFor="chanson-interdite" className="block text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">
          La chanson à ne jamais passer
        </label>
        <div className="relative">
          <input
            id="chanson-interdite"
            value={interdite}
            onChange={(e) => { setInterdite(e.target.value); setNotee(null); }}
            placeholder="Son titre"
            autoComplete="off"
            className={`w-full rounded-full border border-[var(--trait)] bg-[var(--fond)] pl-5 pr-28 h-14 text-[17px] placeholder:text-[var(--doux)] ${notee ? "line-through decoration-[var(--accent)] decoration-[3px]" : ""}`}
          />
          {/* Une fois notée, le bouton cède la place au tampon ; modifier le titre le fait revenir. */}
          {notee ? (
            <span aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rotate-[-9deg] rounded-[8px] border-[3px] border-[var(--accent)] bg-[var(--fond)] px-2.5 py-1 text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--accent-texte)]">
              Interdite
            </span>
          ) : (
            <button type="submit" className="absolute right-1.5 top-1.5 h-11 rounded-full bg-[var(--accent)] px-5 text-[15px] font-medium text-[var(--sur-accent)]">
              Noter
            </button>
          )}
        </div>
        <div aria-live="polite">
          {notee && (
            <p role="status" className="flex items-start gap-3 rounded-xl bg-[var(--fond)] p-4">
              <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent)] font-bold text-[var(--sur-accent)]">✓</span>
              <span>
                <span className="block font-medium">Noté : elle ne passera pas.</span>
                <span className="block text-[14px] text-[var(--doux)]">«&nbsp;{notee}&nbsp;» est dans votre fiche, même si un oncle la réclame à minuit. Démonstration : rien n&apos;est envoyé.</span>
              </span>
            </p>
          )}
        </div>
      </form>

      <form
        className="rounded-2xl border border-[var(--trait)] p-5 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (voulue.trim()) setVoulueNotee(voulue.trim());
        }}
      >
        <label htmlFor="chanson-voulue" className="block text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">
          Et celle qui doit passer
        </label>
        <div className="flex gap-2">
          <input
            id="chanson-voulue"
            value={voulue}
            onChange={(e) => { setVoulue(e.target.value); setVoulueNotee(null); }}
            placeholder="Celle du bal"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-full border border-[var(--trait)] bg-[var(--fond)] px-5 h-12 text-[16px] placeholder:text-[var(--doux)]"
          />
          <button type="submit" className="shrink-0 rounded-full border-2 border-[var(--encre)] px-4 h-12 text-[14px] font-medium">Noter</button>
        </div>
        {voulueNotee && <p role="status" className="text-[14px]">«&nbsp;{voulueNotee}&nbsp;» ouvrira le bal. Noté.</p>}
      </form>

      <Link href={`${DOSSIER}/samedis-libres`} className="flex h-12 items-center justify-center rounded-full bg-[var(--encre)] text-[15px] font-medium text-[var(--fond)]">
        Et votre date, elle est libre&nbsp;?
      </Link>
    </div>
  );
}
