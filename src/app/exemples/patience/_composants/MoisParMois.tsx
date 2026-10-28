/**
 * « Une photo d'elle chaque mois » : six croûtes dessinées, de la meule blanche du
 * premier mois à la croûte dorée du sixième. Un dessin, pas une photo : la meule
 * n'existe pas.
 */
const CROUTES = ["#EFE7D2", "#E6D6AE", "#DCC48C", "#CFAE6A", "#BE954E", "#A57B3A"];

export default function MoisParMois() {
  return (
    <ol className="grid grid-cols-3 gap-4 sm:grid-cols-6">
      {CROUTES.map((c, i) => (
        <li key={c} className="space-y-2 text-center">
          <svg viewBox="0 0 80 56" aria-hidden="true" className="mx-auto w-full max-w-[7rem]">
            <ellipse cx="40" cy="38" rx="34" ry="12" fill={c} stroke="#1C140E" strokeOpacity=".35" />
            <rect x="6" y="20" width="68" height="18" fill={c} />
            <ellipse cx="40" cy="20" rx="34" ry="12" fill={c} stroke="#1C140E" strokeOpacity=".35" />
            {Array.from({ length: i }, (_, k) => <circle key={k} cx={22 + k * 8} cy={20 + (k % 2) * 3} r="1.6" fill="#1C140E" fillOpacity=".25" />)}
          </svg>
          <p className="text-sm">Mois <span className="[font-variant-numeric:lining-nums]">{i + 1}</span></p>
        </li>
      ))}
    </ol>
  );
}
