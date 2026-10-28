"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { DOSSIER, PIECES, grave, matiere, nomForme, trouver, type Piece } from "./donnees";

const inscrites = PIECES.filter((p) => p.registre?.length);

/**
 * Le registre d'une pièce : le bijou, puis les prénoms inscrits, du premier au
 * dernier, et en dessous une ligne vide — « à la prochaine ». Les lignes arrivent
 * l'une après l'autre ; la ligne vide, touchée, dit à quoi elle sert.
 */
export function FicheNumero({ piece, sombre = false }: { piece: Piece; sombre?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [suite, setSuite] = useState(false);
  const lignes = piece.registre ?? [];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const entree = (delai: number) => ({
    className: `transition-[opacity,translate] duration-500 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
    style: { transitionDelay: `${delai}ms` },
  });

  return (
    <article data-film="fiche" className={`border ${sombre ? "border-white/20 bg-[#1B342E]" : "border-[var(--trait)] bg-[var(--carte)]"}`}>
      <header {...entree(0)} className={`${entree(0).className} border-b ${sombre ? "border-white/20" : "border-[var(--trait)]"} px-5 py-5`}>
        <p className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${sombre ? "text-[#C9A86A]" : "text-[var(--accent-texte)]"}`}>Le registre · n° {grave(piece.numero)}</p>
        <h3 className="mt-1 font-[family-name:var(--titres)] text-[38px] leading-tight">
          {nomForme(piece)} <em>«&nbsp;{piece.nom}&nbsp;»</em>
        </h3>
        <p className={`text-sm ${sombre ? "text-[var(--sur-sombre)]/90" : "text-[var(--doux)]"}`}>{matiere(piece)}{piece.pierre ? `, ${piece.pierre.nom}` : ""} · une sur une</p>
      </header>
      <ol className={`divide-y ${sombre ? "divide-white/15" : "divide-[var(--trait)]"}`}>
        {lignes.map((l, i) => (
          <li key={l.annee + l.prenom} data-film="premier-nom" {...entree(350 + i * 250)} className={`${entree(350 + i * 250).className} grid grid-cols-[76px_1fr_auto] items-baseline gap-3 px-5 py-4`}>
            <span className="font-[family-name:var(--titres)] text-2xl tabular-nums">{l.annee}</span>
            <span className="font-[family-name:var(--titres)] text-[34px] italic">{l.prenom}</span>
            <span className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${sombre ? "text-[var(--sur-sombre)]/90" : "text-[var(--doux)]"}`}>{i === 0 ? "Premier nom" : `${i + 1}e nom`}</span>
          </li>
        ))}
        {lignes.length === 0 && (
          <li {...entree(350)} className={`${entree(350).className} px-5 py-4 text-[15px] leading-relaxed`}>
            {piece.partieLe ? `Partie le ${piece.partieLe}. Son premier nom n'est pas encore inscrit : il le sera avec l'accord de qui la porte.` : "Elle est encore à l'atelier : son premier nom sera celui de qui la choisira."}
          </li>
        )}
        <li {...entree(lignes.length ? 900 : 600)} className={entree(lignes.length ? 900 : 600).className}>
          <button
            type="button"
            data-film="ligne-vide"
            aria-expanded={suite}
            onClick={() => setSuite((s) => !s)}
            className={`grid w-full grid-cols-[76px_1fr_auto] items-baseline gap-3 px-5 py-4 text-left transition-colors ${suite ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : ""}`}
          >
            <span className="text-xl tracking-[0.12em] tabular-nums">20··</span>
            <span aria-hidden="true" className="h-px self-center border-b-2 border-dotted border-current opacity-60" />
            <span className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${suite || sombre ? "text-[#C9A86A]" : "text-[var(--accent-texte)]"}`}>À la prochaine</span>
          </button>
          {suite && (
            <p role="status" className="bg-[var(--sombre)] px-5 pb-5 text-[15px] leading-relaxed text-[var(--sur-sombre)]">
              Cette ligne attend celle ou celui qui la portera après {lignes.at(-1)?.prenom ?? "toi"}. Le jour où le bijou passera, son prénom s&apos;inscrira ici — avec son accord, et le tien.
            </p>
          )}
        </li>
      </ol>
      <p className={`border-t px-5 py-3 text-[13px] ${sombre ? "border-white/20 text-[var(--sur-sombre)]/90" : "border-[var(--trait)] text-[var(--doux)]"}`}>Un prénom et une année, avec l&apos;accord de chacun. Exemple : la marque est fictive.</p>
    </article>
  );
}

/** Chercher un numéro gravé : on le tape, sa page s'ouvre. `depart` : un numéro déjà ouvert. */
export default function Registre({ sombre = false, depart }: { sombre?: boolean; depart?: string }) {
  const [saisie, setSaisie] = useState(depart ?? "");
  const [cherche, setCherche] = useState<string | null>(depart ?? null);
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCherche(saisie.replace(/\D/g, "").padStart(4, "0"));
  };
  const piece = cherche ? trouver(cherche) : undefined;

  return (
    <div className="space-y-6">
      <form onSubmit={soumettre} className="space-y-3" data-film="recherche">
        <label htmlFor="alp-numero" className="block text-[13px] font-semibold uppercase tracking-[0.18em]">Le numéro gravé à l&apos;intérieur</label>
        <div className="flex gap-2">
          <span className={`flex min-h-14 min-w-0 flex-1 items-center border px-4 ${sombre ? "border-[var(--sur-sombre)]/60 bg-[#1B342E]" : "border-[var(--encre)] bg-[var(--carte)]"}`}>
            <span aria-hidden="true" className={`mr-2 font-[family-name:var(--titres)] text-3xl ${sombre ? "text-[#C9A86A]" : "text-[var(--doux)]"}`}>N°</span>
            <input
              id="alp-numero"
              inputMode="numeric"
              autoComplete="off"
              maxLength={4}
              required
              value={saisie}
              onChange={(e) => setSaisie(e.target.value.replace(/\D/g, ""))}
              placeholder="····"
              className={`w-full min-w-0 bg-transparent font-[family-name:var(--titres)] text-4xl tracking-[0.12em] tabular-nums focus:outline-none ${sombre ? "placeholder:text-[var(--sur-sombre)]/80" : "placeholder:text-[var(--doux)]"}`}
            />
          </span>
          <button type="submit" className="min-h-14 shrink-0 bg-[var(--accent)] px-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--sur-accent)]">
            Ouvrir sa page
          </button>
        </div>
        <p className={`text-[13px] ${sombre ? "text-[var(--sur-sombre)]/90" : "text-[var(--doux)]"}`}>
          Numéros d&apos;exemple : {inscrites.slice(0, 3).map((p) => grave(p.numero)).join(", ")}…
        </p>
      </form>
      {cherche && (piece ? (
        <div className="space-y-3">
          <FicheNumero key={piece.numero} piece={piece} sombre={sombre} />
          <Link href={`${DOSSIER}/pieces/${piece.numero}`} className="inline-block text-[13px] font-semibold uppercase tracking-[0.16em] underline underline-offset-8">
            Sa page, avec sa fabrication
          </Link>
        </div>
      ) : (
        <p role="status" className={`border p-5 leading-relaxed ${sombre ? "border-white/20 bg-[#1B342E]" : "border-[var(--trait)] bg-[var(--carte)]"}`}>
          Le n° {cherche} n&apos;est pas encore sorti de l&apos;atelier. Vérifie à l&apos;intérieur de l&apos;anneau : le numéro a quatre chiffres.
        </p>
      ))}
    </div>
  );
}
