/**
 * Un bandeau qui défile sans fin (mots-clés, questions, étapes). Le contenu est
 * écrit deux fois pour boucler ; la seconde copie est masquée aux lecteurs d'écran.
 * Il s'arrête au survol, et reste immobile avec « animations réduites ».
 */
export default function Defilant({
  elements,
  duree = 38,
  sens = "normal",
  separateur = "✦",
  className = "",
  classeElement = "",
}: {
  elements: React.ReactNode[];
  duree?: number;
  sens?: "normal" | "inverse";
  separateur?: React.ReactNode;
  className?: string;
  classeElement?: string;
}) {
  const serie = (copie: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={copie || undefined}>
      {elements.map((e, i) => (
        <div key={i} className="flex shrink-0 items-center">
          <span className={classeElement}>{e}</span>
          <span aria-hidden="true" className="mx-6 md:mx-10 opacity-70">{separateur}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div className={`kit-defilant ${className}`} data-sens={sens} style={{ "--kit-duree": `${duree}s` } as React.CSSProperties}>
      <div className="kit-defilant-piste">
        {serie(false)}
        {serie(true)}
      </div>
    </div>
  );
}
