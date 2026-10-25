// Le positionnement, dit à l'identique sur l'accueil, /expertise et /bio : il est compris
// dans le partenariat, sans supplément (décision de Lohan, 25/10/2026). Une seule source
// pour la phrase, pour qu'elle ne puisse pas diverger d'une page à l'autre.
//
// En Plus Jakarta et non en Cormorant : la Cormorant décale l'accent du « à ».
export const PHRASE_POSITIONNEMENT =
  "Avant la première maquette, on fixe ensemble votre positionnement : ce que vous vendez vraiment, à qui, et pourquoi on doit vous choisir. Le site est construit autour.";
export const MENTION_POSITIONNEMENT = "Compris dans le partenariat, sans avance de frais.";

export default function Positionnement() {
  return (
    <div className="mx-auto max-w-3xl px-4 text-center">
      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary-texte)]">
        Le positionnement
      </p>
      <p className="mt-6 text-xl md:text-3xl font-light leading-snug text-[var(--color-foreground)]">
        {PHRASE_POSITIONNEMENT}
      </p>
      <p className="mt-6 text-sm md:text-base font-medium text-[var(--color-primary-texte)]">
        {MENTION_POSITIONNEMENT}
      </p>
    </div>
  );
}
