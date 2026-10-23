// Une barre d'onglets de navigateur, dessinée. Plus il y a d'onglets, plus ils
// rétrécissent ; au-delà de huit, on ne voit plus que leurs pastilles. Le dernier
// s'appelle « Ton voyage ». Décorative : la phrase qui l'accompagne dit la même chose.
const TITRES = ["Vols pas chers", "Hôtel Lisbonne", "Avis hôtel", "Comparateur", "Météo avril", "Vols + hôtel", "Location voiture", "Forum voyage"];
const COULEURS = ["#F2A58E", "#E5674B", "#7FB59A", "#F2C14E", "#9B8BC4", "#6FB3C8", "#D96A6A", "#C9A27E"];

export default function BarreOnglets({ nombre, sombre = false }: { nombre: number; sombre?: boolean }) {
  const seul = nombre === 1;
  const serre = nombre > 8; // plus de titre ni de marge intérieure : des pastilles
  return (
    <div aria-hidden="true" className={`w-full min-w-0 overflow-hidden rounded-t-2xl ${sombre ? "bg-[#0F241F]" : "bg-[#E7DDCC]"} px-2 pt-2`}>
      <div className="flex h-9 gap-[3px]">
        {Array.from({ length: nombre }, (_, k) => (
          <div
            key={k}
            className={`flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden rounded-t-lg text-[11px] font-semibold transition-all duration-300 ${serre ? "justify-center px-0" : "px-2"} ${
              seul ? "max-w-[220px] bg-[#FBF6EC] text-[#1F3D36]" : sombre ? "bg-[#21433A] text-[#FBF6EC]" : "bg-[#F6F0E4] text-[#1F3D36]"
            }`}
          >
            <i className={`${nombre > 24 ? "h-1.5 w-1.5" : "h-3 w-3"} shrink-0 rounded-full`} style={{ background: seul ? "#E5674B" : COULEURS[k % COULEURS.length] }} />
            {!serre && <span className="truncate">{seul ? "Ton voyage" : TITRES[k % TITRES.length]}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
