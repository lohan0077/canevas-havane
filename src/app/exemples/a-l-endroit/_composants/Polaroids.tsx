import { MONTURES } from "./donnees";
import Visage from "./Visage";

const ANGLES = [-6, 4, -2, 5, -4];

/** Les cinq photos de la séance, une par monture, comme des polaroïds posés en éventail. */
export default function Polaroids() {
  return (
    <ul className="flex flex-wrap justify-center gap-x-1 gap-y-4 sm:gap-4" aria-label="Exemple : les cinq photos remises après une séance">
      {MONTURES.slice(0, 5).map((m, i) => (
        <li
          key={m.id}
          className="w-[46%] sm:w-[18%] bg-white p-2.5 pb-3 shadow-[0_18px_30px_-18px_rgba(29,43,58,0.55)]"
          style={{ transform: `rotate(${ANGLES[i]}deg)` }}
        >
          <div className="aspect-square overflow-hidden bg-[#E9EDF1]">
            <Visage monture={{ forme: m.forme, couleur: m.couleur }} titre={`Photo ${i + 1} : la monture ${m.nom}`} className="mx-auto mt-[6%] w-[88%]" />
          </div>
          <p className="mt-2 text-center font-[family-name:var(--titres)] text-lg italic text-[#1D2B3A]">{m.nom}</p>
        </li>
      ))}
    </ul>
  );
}
