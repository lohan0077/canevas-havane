/**
 * Ce qui peut ouvrir droit au crédit d'impôt, et ce qui n'y ouvre pas — les deux
 * colonnes de la vidéo. Sources : C. trav., art. D7231-1 et L7232-1-2 ; fiche DGE
 * « Assistance informatique à domicile ». Aucun prix ici : l'avantage fiscal reste à part.
 */
export default function Eligible() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-[26px] bg-[#E3F4EC] p-5 space-y-3">
        <p className="flex items-center gap-2 font-[family-name:var(--titres)] text-xl font-bold text-[#1E6B4E]"><span aria-hidden="true">✓</span>Possible</p>
        <ul className="space-y-2 font-semibold">
          <li>Installation</li>
          <li>Cours chez toi</li>
          <li>Logiciels à jour</li>
        </ul>
      </div>
      <div className="rounded-[26px] bg-[#FBE6E2] p-5 space-y-3">
        <p className="flex items-center gap-2 font-[family-name:var(--titres)] text-xl font-bold text-[#9B2C1F]"><span aria-hidden="true">✕</span>Exclu</p>
        <ul className="space-y-2 font-semibold">
          <li>Dépannage</li>
          <li>Réparation</li>
          <li>Aide à distance</li>
        </ul>
      </div>
      <p className="col-span-2 text-sm leading-relaxed text-[var(--doux)]">
        Possible sous conditions : une entreprise déclarée services à la personne, dont les
        cours restent l&apos;activité principale, une prestation chez toi, et 3&nbsp;000&nbsp;€ de
        dépenses par an et par foyer au plus. Code du travail, art. D7231-1, L7232-1-2 et
        D7233-5 ; fiche « Assistance informatique à domicile » de la DGE.
      </p>
    </div>
  );
}
