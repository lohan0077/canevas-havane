import { PHRASE_L612_14, entreprise } from "./donnees";

/**
 * Les deux mentions que le Code de la sécurité intérieure impose sur tout document
 * informatif, contractuel ou publicitaire (art. L612-15, al. 1) : l'identification
 * de l'autorisation d'exercer et la phrase de l'art. L612-14. `compacte` pour le
 * devis et le rapport de nuit ; la version pleine est en pied de chaque page.
 */
export default function MentionCnaps({ compacte = false }: { compacte?: boolean }) {
  if (compacte) {
    return (
      <p className="text-xs leading-relaxed text-[var(--doux)] border-t border-[var(--trait)] pt-3">
        {entreprise.denomination} · Autorisation d&apos;exercer CNAPS n°&nbsp;
        <span className="break-all">{entreprise.autorisation}</span> (exemple) · « {PHRASE_L612_14} »
      </p>
    );
  }
  return (
    <div data-film="mentions" id="mentions-cnaps" className="rounded-[22px] border border-[#4A5652] p-5 sm:p-7 space-y-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F0A47F]">Mentions obligatoires, en évidence</p>
      <div className="space-y-1">
        <p className="text-sm text-[#C7C1B4]">Autorisation d&apos;exercer délivrée par le CNAPS</p>
        <p className="text-[17px] sm:text-2xl font-semibold tracking-tight tabular-nums leading-snug [overflow-wrap:anywhere]">n°&nbsp;{entreprise.autorisation}</p>
        <p className="text-xs text-[#C7C1B4]">Numéro d&apos;exemple : l&apos;entreprise est fictive.</p>
      </div>
      <blockquote className="font-[family-name:var(--titres)] italic text-xl sm:text-2xl leading-snug border-l-2 border-[var(--accent)] pl-4">
        « {PHRASE_L612_14} »
      </blockquote>
      <p className="text-xs text-[#C7C1B4]">Code de la sécurité intérieure, art.&nbsp;<span className="whitespace-nowrap">L612-14</span> et <span className="whitespace-nowrap">L612-15</span>.</p>
    </div>
  );
}
