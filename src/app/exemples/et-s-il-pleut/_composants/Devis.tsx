import Apparition from "../../_kit/Apparition";
import { DEVIS, euros } from "./donnees";

const somme = (l: { prix: number }[]) => l.reduce((t, x) => t + x.prix, 0);

/**
 * Le devis d'exemple : « prévu, chiffré, réservé ». Le plan B y a ses lignes et son
 * prix, comme le plan A : l'annoncer sans le chiffrer serait trompeur. Prix TTC d'exemple.
 */
export default function Devis() {
  const total = somme(DEVIS.commun) + somme(DEVIS.soleil) + somme(DEVIS.pluie);
  const bloc = (titre: string, lignes: { poste: string; prix: number }[], teinte: string, icone: string, delai: number) => (
    <Apparition delai={delai} className="space-y-3 rounded-2xl p-5" style={{ background: teinte }}>
      <p className="flex items-center justify-between font-[family-name:var(--titres)] text-xl italic">
        <span>{titre}</span>
        <span aria-hidden="true" className="text-base">{icone}</span>
      </p>
      <ul className="space-y-2">
        {lignes.map((l) => (
          <li key={l.poste} className="flex items-baseline justify-between gap-4">
            <span className="leading-snug">{l.poste}</span>
            <span className="shrink-0 font-semibold tabular-nums">{euros(l.prix)}</span>
          </li>
        ))}
      </ul>
      <p className="flex justify-between border-t border-[var(--encre)]/20 pt-2 text-sm">
        <span>Sous-total</span>
        <span className="font-semibold tabular-nums">{euros(somme(lignes))}</span>
      </p>
    </Apparition>
  );
  return (
    <div id="devis" data-film="devis" className="scroll-mt-20 space-y-4 rounded-[1.75rem] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_40px_80px_-50px_rgba(25,26,40,0.5)] sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-[family-name:var(--titres)] text-3xl italic">Devis d&apos;exemple</p>
        <p className="text-sm text-[var(--doux)]">Mariage du 11 septembre 2027, prix TTC d&apos;exemple</p>
      </div>
      {bloc("Dans les deux cas", DEVIS.commun, "#EEEDF3", "◐", 0)}
      <div className="grid gap-4 md:grid-cols-2">
        {bloc("Plan A, soleil", DEVIS.soleil, "#FFF3C4", "☀", 120)}
        {bloc("Plan B, pluie", DEVIS.pluie, "#E2E0EE", "☂", 240)}
      </div>
      <Apparition delai={360} className="flex flex-wrap items-baseline justify-between gap-3 rounded-2xl bg-[var(--sombre)] px-5 py-4 text-[var(--sur-sombre)]">
        <span className="font-[family-name:var(--titres)] text-2xl italic">Les deux, dans le même devis</span>
        <span className="font-[family-name:var(--titres)] text-3xl tabular-nums">{euros(total)}</span>
      </Apparition>
      <p className="text-sm leading-relaxed text-[var(--doux)]">
        Le plan B est prévu, chiffré et réservé dès la signature. S&apos;il fait beau, la grange sert de vestiaire et de coin des enfants : rien n&apos;est perdu.
      </p>
    </div>
  );
}
