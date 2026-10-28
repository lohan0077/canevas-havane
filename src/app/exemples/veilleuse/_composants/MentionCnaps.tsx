import { PHRASE_L612_14, entreprise } from "./donnees";

/**
 * Les deux mentions que le Code de la sécurité intérieure impose sur tout document
 * informatif, contractuel ou publicitaire (art. L612-15, al. 1) : l'identification
 * de l'autorisation d'exercer et la phrase de l'art. L612-14.
 *   - par défaut : une ligne, pour le devis, le rapport, l'espace client, l'affiche ;
 *   - `evidence` : le bloc du pied de chaque page, en grand (#mentions-cnaps : la
 *     vidéo « Remplir l'agenda » le filme).
 */
export default function MentionCnaps({
  sur = "clair",
  evidence = false,
  compacte = false,
  className = "",
}: {
  sur?: "clair" | "sombre";
  evidence?: boolean;
  compacte?: boolean;
  className?: string;
}) {
  if (evidence) {
    return (
      <div data-film="mentions" id="mentions-cnaps" className={`scroll-mt-24 rounded-[2rem] border border-white/20 p-6 sm:p-9 ${className}`}>
        <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">Mentions obligatoires, en évidence</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-2">
            <p className="text-[15px]">{entreprise.denomination} · autorisation d&apos;exercer délivrée par le CNAPS</p>
            <p className="font-[family-name:var(--titres)] text-[clamp(1.35rem,3.6vw,2.4rem)] leading-tight [overflow-wrap:anywhere]">n°&nbsp;{entreprise.autorisation}</p>
            <p className="text-sm">Numéro d&apos;exemple : l&apos;entreprise est fictive.</p>
          </div>
          <blockquote className="border-l-2 border-[var(--accent)] pl-5">
            <p className="font-[family-name:var(--titres)] text-[clamp(1.25rem,2.4vw,1.9rem)] leading-snug">« {PHRASE_L612_14} »</p>
            <footer className="mt-3 text-sm">Code de la sécurité intérieure, art.&nbsp;L612-14 et L612-15.</footer>
          </blockquote>
        </div>
      </div>
    );
  }
  const couleur = sur === "sombre" ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]";
  return (
    <p className={`${compacte ? "border-t border-[var(--trait)] pt-3" : ""} text-xs leading-relaxed ${couleur} ${className}`}>
      {entreprise.denomination} · Autorisation d&apos;exercer délivrée par le CNAPS n°&nbsp;
      <span className="[overflow-wrap:anywhere]">{entreprise.autorisation}</span> (exemple) · « {PHRASE_L612_14} »
    </p>
  );
}
