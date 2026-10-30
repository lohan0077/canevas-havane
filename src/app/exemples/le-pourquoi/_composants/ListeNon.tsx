import Apparition from "../../_kit/Apparition";
import { nonFais } from "./donnees";

// Le trait outremer qui barre chaque ligne, posé d'emblée (30/10/2026) : il ne se
// dessine plus en entrant à l'écran, le seul moment animé du site est son premier écran.
const BARRE =
  "[background-image:linear-gradient(var(--accent),var(--accent))] bg-no-repeat [background-position:0_58%] [background-size:100%_0.09em] box-decoration-clone";

/**
 * Les trois choses que l'ostéopathe ne fait pas, barrées. Trois limites qui valent
 * ensemble, pas une suite : pas de numéros. Avec `detail`, chaque ligne s'ouvre sur son
 * explication et son texte de référence (les ancres #non-… servent au tournage de la
 * vidéo).
 */
export default function ListeNon({ detail = false }: { detail?: boolean }) {
  return (
    <ul className="divide-y divide-white/15 border-y border-white/15">
      {nonFais.map((n) => (
        <Apparition as="li" key={n.id} id={`non-${n.id}`} className="scroll-mt-28">
          {detail ? (
            <details className="kit-accordeon group">
              <summary className="flex items-start gap-5 py-7">
                <span className="flex-1 font-[family-name:var(--titres)] text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.01em]">
                  <span className={BARRE}>{n.titre}</span>
                </span>
                <span aria-hidden="true" className="kit-plus mt-2 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 text-xl">+</span>
              </summary>
              <div className="space-y-3 pb-8 pr-4 text-lg leading-relaxed text-[var(--sur-sombre)]">
                <p>{n.texte}</p>
                <p className="text-[15px] font-semibold text-[#AEB8FF]">{n.source}</p>
              </div>
            </details>
          ) : (
            <p className="py-6 font-[family-name:var(--titres)] text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.01em]">
              <span className={BARRE}>{n.titre}</span>
            </p>
          )}
        </Apparition>
      ))}
    </ul>
  );
}
