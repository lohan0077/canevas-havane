import Apparition from "../../_kit/Apparition";
import { nonFais } from "./donnees";

/**
 * Les trois choses que l'ostéopathe ne fait pas. Chaque ligne se barre en
 * apparaissant ; avec `detail`, elle s'ouvre sur son explication et son texte
 * de référence (les ancres #non-… servent au tournage de la vidéo).
 */
export default function ListeNon({ detail = false }: { detail?: boolean }) {
  return (
    <ul className="divide-y divide-white/15 border-y border-white/15">
      {nonFais.map((n, i) => (
        <Apparition as="li" key={n.id} id={`non-${n.id}`} delai={detail ? 0 : i * 160} className="scroll-mt-28">
          {detail ? (
            <details className="kit-accordeon group">
              <summary className="flex items-start gap-5 py-7">
                <span aria-hidden="true" className="mt-3 w-6 shrink-0 text-[13px] font-medium tabular-nums text-[#F0A07A]">0{i + 1}</span>
                <span className="flex-1 font-[family-name:var(--titres)] text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.01em]">
                  <span className="kit-barre">{n.titre}</span>
                </span>
                <span aria-hidden="true" className="kit-plus mt-2 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 text-xl">+</span>
              </summary>
              <div className="space-y-3 pb-8 pl-11 pr-4 text-lg leading-relaxed text-[var(--sur-sombre)]">
                <p>{n.texte}</p>
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#F0A07A]">{n.source}</p>
              </div>
            </details>
          ) : (
            <p className="flex items-start gap-5 py-6">
              <span aria-hidden="true" className="mt-3 w-6 shrink-0 text-[13px] font-medium tabular-nums text-[#F0A07A]">0{i + 1}</span>
              <span className="font-[family-name:var(--titres)] text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.01em]">
                <span className="kit-barre">{n.titre}</span>
              </span>
            </p>
          )}
        </Apparition>
      ))}
    </ul>
  );
}
