// Une barre d'onglets de navigateur, dessinée. Plus il y a d'onglets, plus ils
// rétrécissent ; au-delà de huit, on ne voit plus que leurs pastilles. Le dernier
// s'appelle « Ton voyage ». Décorative : la phrase qui l'accompagne dit la même chose.
const TITRES = ["Vols pas chers", "Hôtel Lisbonne", "Avis hôtel", "Comparateur", "Météo avril", "Vols + hôtel", "Location voiture", "Forum voyage"];
const COULEURS = ["#2E7DD7", "#E8664A", "#3BAF6A", "#F2B134", "#7A4E8C", "#1F8FB3", "#B33A3A", "#5E4B3F"];

export default function BarreOnglets({ nombre, sombre = false }: { nombre: number; sombre?: boolean }) {
  const seul = nombre === 1;
  const serre = nombre > 8; // plus de titre ni de marge intérieure : des pastilles
  return (
    <div aria-hidden="true" className={`w-full min-w-0 overflow-hidden rounded-t-xl ${sombre ? "bg-[#1B3A57]" : "bg-[#DCE8F3]"} px-2 pt-2`}>
      <div className="flex h-9 gap-[3px]">
        {Array.from({ length: nombre }, (_, k) => (
          <div
            key={k}
            className={`flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden rounded-t-lg text-[11px] font-semibold ${serre ? "justify-center px-0" : "px-2"} ${
              seul ? "max-w-[220px] bg-white text-[#0F2A43]" : sombre ? "bg-[#264B6E] text-[#EAF3FA]" : "bg-[#F4F8FC] text-[#0F2A43]"
            }`}
          >
            <i className={`${nombre > 24 ? "h-1.5 w-1.5" : "h-3 w-3"} shrink-0 rounded-full`} style={{ background: seul ? "#1F5FA8" : COULEURS[k % COULEURS.length] }} />
            {!serre && <span className="truncate">{seul ? "Ton voyage" : TITRES[k % TITRES.length]}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
