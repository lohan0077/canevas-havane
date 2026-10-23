import Image from "next/image";
import Link from "next/link";
import Bijou from "./Bijou";
import { DOSSIER, euros, grave, matiere, nomForme, type Piece } from "./donnees";

/** Le tampon d'une pièce vendue : elle est partie, sa page reste. */
export function Tampon({ grand = false, visible = true }: { grand?: boolean; visible?: boolean }) {
  return (
    <span
      aria-hidden={!visible}
      className={`pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-[3px] border-double border-[var(--accent-texte)] bg-[var(--fond)] font-[family-name:var(--titres)] italic text-[var(--accent-texte)] shadow-[0_8px_22px_-10px_rgba(0,0,0,0.6)] transition-[opacity,scale] duration-300 ${
        grand ? "px-8 py-2 text-6xl" : "px-3 py-0.5 text-2xl"
      } ${visible ? "scale-100 opacity-100" : "scale-150 opacity-0"}`}
    >
      Partie
    </span>
  );
}

/** Une pièce dans une grille : son velours, son dessin (ou sa photo), son numéro gravé, son prix. */
export function CartePiece({ piece, compacte = false }: { piece: Piece; compacte?: boolean }) {
  return (
    <Link href={`${DOSSIER}/pieces/${piece.numero}`} className="group block">
      <span className="relative block aspect-square overflow-hidden bg-[var(--sombre)]">
        <span aria-hidden="true" className="absolute inset-y-0 left-1/3 w-px bg-white/[0.07]" />
        <span aria-hidden="true" className="absolute inset-y-0 left-2/3 w-px bg-white/[0.07]" />
        {piece.photo ? (
          <Image src={piece.photo.src} alt={piece.photo.alt} fill sizes="(min-width: 1024px) 280px, 50vw" className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <Bijou piece={piece} className="relative h-full w-full p-3 transition-transform duration-500 group-hover:scale-105" />
        )}
        <span className="absolute left-2 top-1.5 bg-[var(--sombre)] px-1.5 text-[13px] font-semibold tabular-nums tracking-[0.08em] text-[var(--sur-sombre)]">[{grave(piece.numero)}]</span>
        {piece.partieLe && <Tampon />}
      </span>
      <span className="mt-2.5 block">
        <span className={`block font-[family-name:var(--titres)] leading-tight ${compacte ? "text-xl" : "text-[28px]"}`}>{piece.nom}</span>
        <span className="block text-[13px] text-[var(--doux)]">
          {compacte ? (piece.partieLe ? "Partie" : euros(piece.prix)) : `${nomForme(piece)} · ${matiere(piece).split(" ")[0]} · ${piece.partieLe ? `partie le ${piece.partieLe}` : `${euros(piece.prix)} TTC`}`}
        </span>
      </span>
    </Link>
  );
}
