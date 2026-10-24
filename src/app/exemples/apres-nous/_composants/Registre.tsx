"use client";

import { useState } from "react";
import { registreParNumero, registres, type Ligne, type Registre as R } from "./donnees";

/** Le papier du registre : chaque ligne porte son propre trait. */
const PAPIER = "bg-[var(--carte)]";

function Page({ registre }: { registre: R }) {
  const [annee, setAnnee] = useState("");
  const [texte, setTexte] = useState("");
  const [ecrites, setEcrites] = useState<Ligne[]>([]);
  const lignes = [...registre.lignes, ...ecrites];
  const vides = Math.max(1, registre.vides - ecrites.length);

  return (
    <article className="overflow-hidden rounded-[6px] border border-[var(--trait)] shadow-[0_30px_60px_-40px_rgba(59,36,22,0.55)]" data-film="registre" aria-live="polite">
      <header className="space-y-2 border-b-2 border-[var(--encre)] bg-[var(--fond)] px-5 py-5 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Registre · exemple</p>
        <h2 className="text-4xl sm:text-5xl">
          {registre.meuble} n°&nbsp;{registre.numero}
        </h2>
        <p className="text-sm text-[var(--doux)]">
          {registre.essence} · {registre.dimensions} · {registre.livre}
        </p>
      </header>
      <ol className={`${PAPIER} px-5 sm:px-8`}>
        {lignes.map((l, i) => (
          <li key={`${l.annee}-${l.texte}-${i}`} className="grid grid-cols-[3.4rem_1fr] gap-x-3 border-b border-[var(--trait)] py-3.5 sm:grid-cols-[4rem_1fr_auto]">
            <span className="font-[family-name:var(--titres)] text-xl tabular-nums">{l.annee}</span>
            <span className="space-y-1">
              <span className="block font-semibold">{l.texte}</span>
              {l.detail && <span className="block text-sm leading-relaxed text-[var(--doux)]">{l.detail}</span>}
            </span>
            <span className="col-start-2 text-xs uppercase tracking-[0.16em] text-[var(--doux)] sm:col-start-3 sm:self-start sm:pt-1">— {l.par}</span>
          </li>
        ))}
        <li className="grid grid-cols-[3.4rem_1fr] items-center gap-x-3 border-b border-dashed border-[var(--accent-texte)] py-3 sm:grid-cols-[4rem_1fr]" data-film="vides">
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={annee}
            onChange={(e) => setAnnee(e.target.value.replace(/\D/g, ""))}
            placeholder="20··"
            aria-label="Année de la ligne à écrire"
            data-film="annee"
            className="w-full bg-transparent font-[family-name:var(--titres)] text-xl tabular-nums outline-none placeholder:text-[var(--doux)]"
          />
          <form
            className="flex min-w-0 items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!texte.trim()) return;
              setEcrites([...ecrites, { annee: annee || "20··", texte: texte.trim(), par: "toi" }]);
              setAnnee("");
              setTexte("");
            }}
          >
            <input
              type="text"
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
              maxLength={60}
              placeholder="À toi d'écrire…"
              aria-label="Ce qui est arrivé à ce meuble"
              data-film="ligne"
              className="min-w-0 flex-1 bg-transparent font-[family-name:var(--f-caveat)] text-2xl outline-none placeholder:font-[family-name:var(--texte)] placeholder:text-base placeholder:text-[var(--doux)]"
            />
            {texte.trim() && (
              <button type="submit" className="shrink-0 rounded-full bg-[var(--encre)] px-4 py-2 text-sm font-semibold text-[var(--fond)]">
                Écrire
              </button>
            )}
          </form>
        </li>
        {Array.from({ length: vides - 1 }, (_, i) => (
          <li key={i} className="grid grid-cols-[3.4rem_1fr] gap-x-3 border-b border-dashed border-[var(--trait)] py-4 sm:grid-cols-[4rem_1fr]" aria-hidden="true">
            <span className="font-[family-name:var(--titres)] text-xl text-[var(--doux)]">20··</span>
            <span />
          </li>
        ))}
      </ol>
      <footer className="space-y-1 bg-[var(--fond)] px-5 py-4 text-sm text-[var(--doux)] sm:px-8">
        <p>Les premières lignes sont de l&apos;atelier. Les suivantes sont à toi.</p>
        {ecrites.length > 0 && <p className="font-semibold text-[var(--encre)]">Démonstration : ta ligne n&apos;est ni envoyée ni enregistrée.</p>}
      </footer>
    </article>
  );
}

/**
 * Le registre d'un meuble : on tape le numéro gravé sous le plateau, on lit ce qui lui
 * est arrivé, et on écrit la ligne suivante. Tout reste dans le navigateur.
 */
export default function Registre({ depart }: { depart?: string }) {
  const [saisie, setSaisie] = useState(depart ?? "");
  const [cherche, setCherche] = useState<string | null>(depart ?? null);
  const registre = cherche ? registreParNumero(cherche) : undefined;

  return (
    <div className="space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCherche(saisie.trim());
        }}
        className="space-y-3"
        data-film="recherche"
      >
        <label htmlFor="an-numero" className="block text-sm font-semibold uppercase tracking-[0.18em]">
          Le numéro gravé sous ton meuble
        </label>
        <div className="flex gap-2">
          <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full border-2 border-[var(--encre)] bg-[var(--carte)] px-5">
            <span aria-hidden="true" className="font-[family-name:var(--titres)] text-2xl">N°</span>
            <input
              id="an-numero"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={4}
              value={saisie}
              onChange={(e) => setSaisie(e.target.value)}
              placeholder="··"
              className="h-14 min-w-0 flex-1 bg-transparent font-[family-name:var(--titres)] text-3xl tabular-nums outline-none placeholder:text-[var(--doux)]"
            />
          </span>
          <button type="submit" className="shrink-0 rounded-full bg-[var(--encre)] px-5 font-semibold text-[var(--fond)]">
            Lire le registre
          </button>
        </div>
        <p className="text-sm text-[var(--doux)]">
          Numéros d&apos;exemple : {registres.map((r) => r.numero).join(", ")}.
        </p>
      </form>
      {cherche !== null && !registre && (
        <p role="status" className="rounded-[6px] border border-[var(--trait)] bg-[var(--carte)] p-5">
          Aucun meuble ne porte le numéro {cherche || "vide"}. Il est gravé sous le plateau, côté mur, à côté du nom de l&apos;atelier.
        </p>
      )}
      {registre && <Page key={registre.numero} registre={registre} />}
    </div>
  );
}
