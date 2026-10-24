"use client";

import { useState, type FormEvent } from "react";
import { PIECES, euros } from "./donnees";
import { CartePiece } from "./Pieces";

/**
 * La lettre du vendredi : l'adresse et l'accord, puis rien. Aucun envoi — la
 * confirmation le dit. Une vraie lettre suppose le consentement préalable
 * (code des postes et des communications électroniques, art. L34-5).
 */
export function Lettre() {
  const [inscrite, setInscrite] = useState(false);
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInscrite(true);
  };

  if (inscrite) {
    return (
      <div role="status" className="space-y-2 border border-[#C9A86A] p-6">
        <p className="font-[family-name:var(--titres)] text-4xl">C&apos;est noté, à vendredi 17 h.</p>
        <p>Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        <button type="button" onClick={() => setInscrite(false)} className="text-sm font-semibold underline underline-offset-4">
          Revenir au formulaire
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={soumettre} className="space-y-4">
      <label className="block space-y-2">
        <span className="block text-[13px] font-semibold uppercase tracking-[0.16em]">Ton adresse e-mail</span>
        <input
          type="email"
          required
          autoComplete="email"
          className="min-h-13 w-full border border-[var(--sur-sombre)]/60 bg-transparent px-4 text-lg text-[var(--sur-sombre)] focus:outline-2 focus:outline-offset-2 focus:outline-[#C9A86A]"
        />
      </label>
      <label className="flex items-start gap-3 text-[15px] leading-relaxed">
        <input type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-[#C9A86A]" />
        <span>J&apos;accepte de recevoir la lettre du vendredi, une fois par semaine. Je peux me désinscrire à chaque lettre.</span>
      </label>
      <button type="submit" className="min-h-13 w-full bg-[#C9A86A] px-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--sombre)] sm:w-auto">
        Être prévenue à 17 h
      </button>
    </form>
  );
}

/** « Elle est pour moi » : la pièce est mise de côté — en démonstration, nulle part. */
export function Reserver({ numero, prix, taille }: { numero: number; prix: number; taille: string }) {
  const [pour, setPour] = useState(false);
  return pour ? (
    <div role="status" className="space-y-2 border-2 border-[var(--accent)] bg-[var(--carte)] p-5">
      <p className="font-[family-name:var(--titres)] text-4xl">Pièce n° {numero} mise de côté.</p>
      <p className="text-[var(--doux)]">
        {taille}, {euros(prix)} TTC. Sur un vrai site, on passerait au paiement, puis à l&apos;expédition sous 48 h, dans un écrin numéroté.
      </p>
      <p className="text-sm font-semibold">Démonstration : rien n&apos;est envoyé, aucun paiement.</p>
      <button type="button" onClick={() => setPour(false)} className="text-sm font-semibold underline underline-offset-4">
        Annuler
      </button>
    </div>
  ) : (
    <button
      type="button"
      onClick={() => setPour(true)}
      className="flex min-h-14 w-full items-center justify-between bg-[var(--encre)] pl-6 text-[14px] font-semibold uppercase tracking-[0.16em] text-[var(--fond)]"
    >
      Elle est pour moi
      <span aria-hidden="true" className="grid h-14 w-14 place-items-center bg-[var(--accent)] text-xl text-[var(--sur-accent)]">→</span>
    </button>
  );
}

const FILTRES = [
  { id: "toutes", libelle: "Toutes" },
  { id: "la", libelle: "Encore là" },
  { id: "parties", libelle: "Parties" },
] as const;

/** Toutes les pièces, filtrées : celles qui sont encore là, celles qui sont parties. */
export function ListePieces() {
  const [filtre, setFiltre] = useState<(typeof FILTRES)[number]["id"]>("toutes");
  const garde = (id: (typeof FILTRES)[number]["id"], p: (typeof PIECES)[number]) => (id === "toutes" ? true : id === "la" ? !p.partieLe : !!p.partieLe);
  const liste = [...PIECES].reverse().filter((p) => garde(filtre, p));
  return (
    <div className="space-y-8">
      <div role="group" aria-label="Filtrer les pièces" className="flex flex-wrap gap-2">
        {FILTRES.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filtre === f.id}
            onClick={() => setFiltre(f.id)}
            className={`min-h-11 border px-5 text-[13px] font-semibold uppercase tracking-[0.14em] ${filtre === f.id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
          >
            {f.libelle} ({PIECES.filter((p) => garde(f.id, p)).length})
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {liste.map((p) => (
          <li key={p.numero}>
            <CartePiece piece={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
