import { getImageProps } from "next/image";
import { DOSSIER } from "./donnees";

// L'affiche du premier écran : une image de la scène 3D elle-même, rendue par notre
// navigateur (aucune photo d'ailleurs), debout pour un téléphone, couchée pour un
// ordinateur. « avant » attend que la 3D arrive, parapluies fermés ; « apres » montre
// la fin (parapluies ouverts) à qui demande moins d'animations ou n'a pas de WebGL.

const IMAGES = {
  debout: { largeur: 780, hauteur: 1690 },
  couche: { largeur: 1680, hauteur: 1051 },
};

function image(forme: keyof typeof IMAGES, moment: "avant" | "apres", prioritaire: boolean) {
  return getImageProps({
    src: `${DOSSIER}/ceremonie-${forme}-${moment}.webp`,
    alt: "",
    width: IMAGES[forme].largeur,
    height: IMAGES[forme].hauteur,
    sizes: "100vw",
    quality: 75,
    priority: prioritaire,
  }).props;
}

export default function Affiche({ finale = false }: { finale?: boolean }) {
  const moment = finale ? "apres" : "avant";
  const debout = image("debout", moment, !finale);
  const couche = image("couche", moment, !finale);
  const deboutFinale = image("debout", "apres", false);
  const coucheFinale = image("couche", "apres", false);
  return (
    <picture>
      {/* Moins d'animations : la 3D ne bougera pas, l'affiche montre déjà la fin. */}
      {!finale && <source media={`(prefers-reduced-motion: reduce) and (orientation: portrait)`} srcSet={deboutFinale.srcSet} sizes="100vw" />}
      {!finale && <source media="(prefers-reduced-motion: reduce)" srcSet={coucheFinale.srcSet} sizes="100vw" />}
      <source media="(orientation: portrait)" srcSet={debout.srcSet} sizes="100vw" />
      {/* Une image par orientation : next/image ne sait pas faire de <picture>, getImageProps en fournit les mêmes tailles optimisées. */}
      <img {...couche} alt="" className="absolute inset-0 h-full w-full object-cover" />
    </picture>
  );
}
