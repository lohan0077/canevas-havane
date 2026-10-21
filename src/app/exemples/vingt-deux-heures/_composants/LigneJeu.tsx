import Boite from "./Boite";
import { euros, joueurs, type Jeu } from "./donnees";

/**
 * Un jeu, sur une ligne : la boîte, le genre, ce qu'on y fait, puis l'âge et
 * l'avertissement — toujours AVANT le bouton qui le met de côté (directive
 * 2009/48/CE, art. 11 § 2 : visibles avant l'achat, y compris en ligne).
 */
export default function LigneJeu({ jeu, action, detail = true }: { jeu: Jeu; action?: React.ReactNode; detail?: boolean }) {
  return (
    <article data-jeu={jeu.ref} className="rounded-[22px] bg-[var(--carte)] border-2 border-[var(--encre)] p-4 sm:p-5">
      <div className="flex gap-4">
        <Boite teinte={jeu.teinte} motif={jeu.motif} className="w-[68px] h-[68px] sm:w-20 sm:h-20 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-xl font-black tracking-[-0.02em] uppercase">{jeu.genre}</h3>
            <p className="text-lg font-bold tabular-nums whitespace-nowrap">{euros(jeu.prix)}</p>
          </div>
          <p className="text-sm font-semibold">
            {joueurs(jeu)} · {jeu.duree} · <span className="whitespace-nowrap">TTC · exemple</span>
          </p>
          {detail && <p className="mt-1 leading-snug">{jeu.phrase}</p>}
        </div>
      </div>
      <div className="mt-3 rounded-xl bg-[var(--fond)] px-3 py-2 text-sm leading-snug">
        <p>
          <strong>Dès {jeu.age} ans</strong>
          {jeu.attention ? (
            <>
              {" "}· <strong>Attention.</strong> {jeu.attention}
            </>
          ) : (
            " · aucun avertissement sur la boîte."
          )}
        </p>
      </div>
      {action && <div className="mt-3">{action}</div>}
    </article>
  );
}
