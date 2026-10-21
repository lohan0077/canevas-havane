import { PHRASE_L612_14, entreprise } from "./donnees";

/**
 * Les deux mentions du Code de la sécurité intérieure (art. L612-15, al. 1) : le
 * numéro d'autorisation et la phrase de l'art. L612-14. `sur` dit la couleur du fond.
 */
export default function MentionCnaps({ sur = "clair", className = "" }: { sur?: "clair" | "sombre"; className?: string }) {
  const doux = sur === "sombre" ? "text-[#C9C2B3]" : "text-[var(--doux)]";
  return (
    <p className={`text-xs leading-relaxed ${doux} ${className}`}>
      {entreprise.denomination} · Autorisation d&apos;exercer délivrée par le CNAPS n°&nbsp;
      <span className="whitespace-nowrap">{entreprise.autorisation}</span> (exemple) · « {PHRASE_L612_14} »
    </p>
  );
}
