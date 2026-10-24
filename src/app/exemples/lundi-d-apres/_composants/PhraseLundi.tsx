"use client";

import { useEffect, useRef, useState } from "react";
import { ACCUEIL, EXEMPLES_PHRASES, themeDe, type Moment } from "./donnees";
import s from "./Lundi.module.css";

/**
 * « Lundi, vos équipes diront quoi ? » On écrit la phrase ; « Construire la soirée »
 * la construit à l'envers : lundi d'abord, puis le moment qui la fera dire, le dîner,
 * l'accueil. Les étapes viennent de mots-clés de la phrase, calculées ici : rien
 * n'est envoyé, et la page le dit.
 */
export default function PhraseLundi() {
  const [phrase, setPhrase] = useState("");
  const [construite, setConstruite] = useState<string | null>(null);
  const frappe = useRef<number | null>(null);

  // Un exemple choisi s'écrit lettre après lettre, comme si on le tapait ; d'un coup
  // si le visiteur a demandé moins d'animations.
  const arreter = () => {
    if (frappe.current !== null) window.clearInterval(frappe.current);
    frappe.current = null;
  };
  useEffect(() => arreter, []);
  const taper = (texte: string) => {
    arreter();
    setConstruite(null);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhrase(texte);
      return;
    }
    let n = 0;
    frappe.current = window.setInterval(() => {
      n += 1;
      setPhrase(texte.slice(0, n));
      if (n >= texte.length) arreter();
    }, 28);
  };
  const theme = construite ? themeDe(construite) : null;
  const etapes: (Moment & { id: string })[] = theme
    ? [
        { id: "lundi", heure: "Lundi, 9 h", titre: `« ${construite} »`, texte: "La phrase. Devant la machine à café, on en parle encore." },
        { id: "moment", ...theme.moment },
        { id: "diner", ...theme.diner },
        { id: "accueil", ...ACCUEIL },
      ]
    : [];

  return (
    <div className="space-y-6">
      <form
        id="phrase-lundi"
        className="rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (phrase.trim()) setConstruite(phrase.trim().replace(/^[«"\s]+|[»"\s]+$/g, ""));
        }}
      >
        <label htmlFor="phrase" className="block text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">
          La phrase qu&apos;on se dira devant la machine à café
        </label>
        <textarea
          id="phrase"
          value={phrase}
          onChange={(e) => {
            arreter();
            setPhrase(e.target.value);
          }}
          rows={3}
          placeholder="« On ne savait pas que… »"
          className="w-full resize-none rounded-xl bg-[var(--fond)] p-4 font-[family-name:var(--titres)] text-[22px] leading-snug placeholder:text-[var(--doux)]"
        />
        <div className="space-y-2">
          <p className="text-[13px] text-[var(--doux)]">Pas d&apos;idée&nbsp;? Prenez un exemple&nbsp;:</p>
          <div className="flex flex-wrap gap-2">
            {EXEMPLES_PHRASES.map((x, i) => (
              <button
                key={x}
                type="button"
                data-film={`exemple-${i + 1}`}
                onClick={() => taper(x)}
                className="rounded-full border border-[var(--encre)]/30 px-3 py-1.5 text-left text-[13px] hover:bg-[var(--fond)]"
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={!phrase.trim()}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] text-[15px] font-medium text-[var(--sur-accent)] disabled:opacity-100 disabled:bg-[var(--fond)] disabled:text-[var(--doux)] disabled:cursor-not-allowed"
        >
          Construire la soirée <span aria-hidden="true">↩</span>
        </button>
        <p className="text-[13px] text-[var(--doux)]">On part de votre phrase, et on remonte jusqu&apos;au vendredi. Démonstration : rien n&apos;est envoyé.</p>
      </form>

      {theme && (
        <section id="soiree-envers" aria-live="polite" className="scroll-mt-20 space-y-3">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">La soirée, à l&apos;envers · exemple</p>
          <ol key={construite} className="relative space-y-3 before:absolute before:left-[27px] before:top-6 before:bottom-6 before:w-px before:bg-[var(--accent)]">
            {etapes.map((e, i) => (
              <li
                key={e.id}
                data-film={`envers-${e.id}`}
                className={`${s.etape} relative flex gap-4 rounded-2xl p-4 ${i === 0 ? "bg-[var(--encre)] text-[var(--fond)]" : "bg-[var(--carte)]"}`}
                style={{ "--rang": i } as React.CSSProperties}
              >
                <span aria-hidden="true" className={`relative z-10 grid h-6 w-6 shrink-0 translate-x-[3px] place-items-center rounded-full border-[3px] border-[var(--accent)] ${i === 0 ? "bg-[var(--accent)]" : "bg-[var(--fond)]"}`} />
                <div className="space-y-1">
                  <p className={`text-[12px] font-medium uppercase tracking-[0.16em] ${i === 0 ? "text-[#FFD9A0]" : "text-[var(--accent-texte)]"}`}>{e.heure}</p>
                  <h3 className="font-[family-name:var(--titres)] text-[22px] font-normal leading-snug">{e.titre}</h3>
                  <p className={`text-[15px] leading-relaxed ${i === 0 ? "text-[#D8C9B4]" : "text-[var(--doux)]"}`}>{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-[13px] text-[var(--doux)]">
            Construite à partir des mots de votre phrase. Une vraie soirée se construit en rendez-vous, avec vous.
          </p>
        </section>
      )}
    </div>
  );
}
