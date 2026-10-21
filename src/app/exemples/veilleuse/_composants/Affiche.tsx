import MentionCnaps from "./MentionCnaps";

/**
 * L'affiche de lancement, telle qu'elle sera collée : « On veille. Tu dors. », la
 * lune, et en bas les mentions que la loi impose sur toute annonce (CSI, art. L612-15).
 */
export default function Affiche() {
  return (
    <figure className="mx-auto w-full max-w-[360px] rotate-[-2deg]">
      <div className="relative overflow-hidden rounded-[18px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-7 pt-10 pb-6 shadow-[0_40px_70px_-35px_rgba(0,0,0,0.8)] space-y-10">
        <div aria-hidden="true" className="absolute right-6 top-8 h-20 w-20 rounded-full bg-[var(--accent)] shadow-[0_0_60px_20px_rgba(244,201,93,0.35)]" />
        <div aria-hidden="true" className="absolute right-2 top-5 h-20 w-20 rounded-full bg-[var(--sombre)]" />
        <p className="relative pt-16 font-[family-name:var(--titres)] text-[56px] leading-[0.98]">
          On veille.
          <span className="block text-[var(--accent)]">Tu dors.</span>
        </p>
        <div className="relative space-y-3 border-t border-[#3E5449] pt-4">
          <p className="flex items-baseline justify-between">
            <span className="font-[family-name:var(--titres)] text-2xl">Veilleuse</span>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C9C2B3]">Sécurité privée</span>
          </p>
          <MentionCnaps sur="sombre" className="text-[10.5px]" />
        </div>
      </div>
      <figcaption className="mt-5 text-center text-sm text-[var(--doux)] rotate-[2deg]">L&apos;affiche de lancement · exemple</figcaption>
    </figure>
  );
}
