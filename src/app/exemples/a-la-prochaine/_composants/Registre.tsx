"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { DOSSIER, REGISTRE, bijouDe, trouver, type Numero } from "./donnees";

/**
 * La page d'un numéro gravé : le bijou, puis les prénoms inscrits, du premier au
 * dernier, et en dessous une ligne vide — « à la prochaine ». Les lignes arrivent
 * l'une après l'autre ; la ligne vide, touchée, dit à quoi elle sert.
 */
export function FicheNumero({ n }: { n: Numero }) {
  const [visible, setVisible] = useState(false);
  const [suite, setSuite] = useState(false);
  const bijou = bijouDe(n);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const entree = (delai: number) => ({
    className: `transition-[opacity,translate] duration-500 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
    style: { transitionDelay: `${delai}ms` },
  });

  return (
    <article data-film="fiche" className="border border-[var(--trait)] bg-[var(--carte)]">
      <header {...entree(0)} className={`${entree(0).className} border-b border-[var(--trait)] px-5 py-5`}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Le registre · n° {n.numero}</p>
        <h3 className="mt-1 text-[34px]">
          {bijou.type} <em>«&nbsp;{bijou.nom}&nbsp;»</em>
        </h3>
        <p className="text-sm text-[var(--doux)]">{bijou.matiere}</p>
      </header>
      <ol className="divide-y divide-[var(--trait)]">
        {n.inscriptions.map((l, i) => (
          <li key={l.annee + l.prenom} data-film="premier-nom" {...entree(350 + i * 250)} className={`${entree(350 + i * 250).className} grid grid-cols-[64px_1fr_auto] items-baseline gap-3 px-5 py-4`}>
            <span className="font-[family-name:var(--titres)] text-2xl tabular-nums">{l.annee}</span>
            <span className="font-[family-name:var(--titres)] text-[30px] italic">{l.prenom}</span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">{i === 0 ? "Premier nom" : `${i + 1}e nom`}</span>
          </li>
        ))}
        <li {...entree(900)} className={entree(900).className}>
          <button
            type="button"
            data-film="ligne-vide"
            aria-expanded={suite}
            onClick={() => setSuite((s) => !s)}
            className={`grid w-full grid-cols-[64px_1fr_auto] items-baseline gap-3 px-5 py-4 text-left transition-colors ${suite ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : ""}`}
          >
            <span className="font-[family-name:var(--titres)] text-2xl tabular-nums">20··</span>
            <span aria-hidden="true" className="h-px self-center border-b-2 border-dotted border-current opacity-60" />
            <span className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${suite ? "text-[#C9A86A]" : "text-[var(--accent-texte)]"}`}>À la prochaine</span>
          </button>
          {suite && (
            <p role="status" className="bg-[var(--sombre)] px-5 pb-5 text-[15px] leading-relaxed text-[var(--sur-sombre)]">
              Cette ligne attend celle ou celui qui le portera après {n.inscriptions.at(-1)?.prenom}. Le jour où le bijou passera, son prénom s&apos;inscrira ici — avec son accord, et le tien.
            </p>
          )}
        </li>
      </ol>
      <p className="border-t border-[var(--trait)] px-5 py-3 text-[13px] text-[var(--doux)]">Un prénom et une année, avec l&apos;accord de chacun. Exemple : la marque est fictive.</p>
    </article>
  );
}

/** Chercher un numéro gravé : on le tape, sa page s'ouvre. */
export default function Registre() {
  const [saisie, setSaisie] = useState("");
  const [cherche, setCherche] = useState<string | null>(null);
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCherche(saisie.replace(/\D/g, "").padStart(4, "0"));
  };
  const n = cherche ? trouver(cherche) : undefined;

  return (
    <div className="space-y-6">
      <form onSubmit={soumettre} className="space-y-3" data-film="recherche">
        <label htmlFor="alp-numero" className="block text-[13px] font-semibold uppercase tracking-[0.18em]">Le numéro gravé</label>
        <div className="flex gap-2">
          <span className="flex min-h-14 flex-1 items-center border border-[var(--encre)] bg-[var(--carte)] px-4">
            <span aria-hidden="true" className="mr-2 font-[family-name:var(--titres)] text-2xl text-[var(--doux)]">N°</span>
            <input
              id="alp-numero"
              inputMode="numeric"
              autoComplete="off"
              maxLength={4}
              required
              value={saisie}
              onChange={(e) => setSaisie(e.target.value.replace(/\D/g, ""))}
              placeholder="····"
              className="w-full bg-transparent font-[family-name:var(--titres)] text-3xl tracking-[0.12em] tabular-nums placeholder:text-[var(--doux)] focus:outline-none"
            />
          </span>
          <button type="submit" className="min-h-14 bg-[var(--accent)] px-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--sur-accent)]">
            Ouvrir sa page
          </button>
        </div>
        <p className="text-[13px] text-[var(--doux)]">
          Numéros d&apos;exemple : {REGISTRE.slice(0, 3).map((r) => r.numero).join(", ")}…
        </p>
      </form>
      {cherche && (n ? (
        <div className="space-y-3">
          <FicheNumero key={n.numero} n={n} />
          <Link href={`${DOSSIER}/registre/${n.numero}`} className="inline-block text-[13px] font-semibold uppercase tracking-[0.16em] underline underline-offset-8">
            Sa page, à garder
          </Link>
        </div>
      ) : (
        <p role="status" className="border border-[var(--trait)] bg-[var(--carte)] p-5 leading-relaxed">
          Le n° {cherche} n&apos;est pas encore sorti de l&apos;atelier. Vérifie à l&apos;intérieur de l&apos;anneau : le numéro a quatre chiffres.
        </p>
      ))}
    </div>
  );
}
