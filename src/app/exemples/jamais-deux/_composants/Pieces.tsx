import Link from "next/link";
import Bijou, { nomForme } from "./Bijou";
import { DOSSIER, euros, type Piece } from "./donnees";

/** Le tampon d'une pièce vendue : elle est partie, sa page reste. */
export function Tampon({ grand = false, visible = true }: { grand?: boolean; visible?: boolean }) {
  return (
    <span
      aria-hidden={!visible}
      className={`pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-[3px] border-double border-[var(--accent-texte)] bg-[var(--fond)] font-[family-name:var(--titres)] italic text-[var(--accent-texte)] shadow-[0_8px_22px_-10px_rgba(0,0,0,0.6)] transition-[opacity,scale] duration-300 ${
        grand ? "px-7 py-2 text-5xl" : "px-3 py-0.5 text-xl"
      } ${visible ? "scale-100 opacity-100" : "scale-150 opacity-0"}`}
    >
      Partie
    </span>
  );
}

/** Une pièce dans une grille : son velours, son dessin, son numéro, son prix. */
export function CartePiece({ piece, compacte = false }: { piece: Piece; compacte?: boolean }) {
  return (
    <Link href={`${DOSSIER}/pieces/${piece.numero}`} className="group block">
      <span className="relative block aspect-square overflow-hidden bg-[var(--sombre)]">
        <span aria-hidden="true" className="absolute inset-y-0 left-1/3 w-px bg-white/[0.07]" />
        <span aria-hidden="true" className="absolute inset-y-0 left-2/3 w-px bg-white/[0.07]" />
        <Bijou piece={piece} className="relative h-full w-full p-3 transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-2 top-1.5 text-[13px] font-semibold tabular-nums text-[var(--sur-sombre)]">[{piece.numero}]</span>
        {piece.partieLe && <Tampon />}
      </span>
      <span className="mt-2 block">
        <span className={`block font-[family-name:var(--titres)] leading-tight ${compacte ? "text-lg" : "text-2xl"}`}>{piece.nom}</span>
        <span className="block text-[13px] text-[var(--doux)]">
          {compacte ? (piece.partieLe ? "Partie" : euros(piece.prix)) : `${nomForme(piece)} · ${piece.partieLe ? `partie le ${piece.partieLe}` : `${euros(piece.prix)} TTC`}`}
        </span>
      </span>
    </Link>
  );
}
