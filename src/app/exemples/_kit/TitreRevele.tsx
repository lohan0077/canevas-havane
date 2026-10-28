"use client";

import { useEffect, useRef } from "react";

/**
 * Un titre dont les mots montent l'un après l'autre, en sortant du flou. `*mot*`
 * met un mot en relief (`classeAccent`, souvent l'italique d'une seconde police).
 * `auChargement` : révélé dès l'arrivée sur la page (premier écran) ; sinon, quand
 * il entre à l'écran. Le texte reste un texte ordinaire pour les lecteurs d'écran.
 */
export default function TitreRevele({
  texte,
  as = "h2",
  className = "",
  classeAccent = "",
  delai = 0,
  auChargement = false,
  id,
}: {
  texte: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  classeAccent?: string;
  delai?: number;
  auChargement?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (auChargement) {
      // Une image plus tard : la transition part de l'état caché, pas du résultat.
      const t = requestAnimationFrame(() => { el.dataset.vu = ""; });
      return () => cancelAnimationFrame(t);
    }
    const obs = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          el.dataset.vu = "";
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -2% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [auChargement]);

  const Balise = as;
  return (
    <Balise ref={ref as React.Ref<HTMLHeadingElement>} id={id} className={className} style={{ "--kit-delai": `${delai}ms` } as React.CSSProperties}>
      {decouper(texte).map(({ mot, accent }, i, tous) => (
        <span key={i}>
          <span className={`kit-mot ${accent ? classeAccent : ""}`} style={{ "--kit-i": i } as React.CSSProperties}>
            {mot}
          </span>
          {i < tous.length - 1 ? " " : null}
        </span>
      ))}
    </Balise>
  );
}

// Les mots sont séparés par des espaces ordinaires : une espace insécable (avant
// « ? », dans « 60 € ») garde ses deux côtés dans le même mot. `*…*` met en relief
// un ou plusieurs mots ; la ponctuation qui suit l'étoile fermante reste en relief.
function decouper(texte: string) {
  const sortie: { mot: string; accent: boolean }[] = [];
  let enRelief = false;
  for (const mot of texte.split(/ +/)) {
    if (mot.startsWith("*")) enRelief = true;
    sortie.push({ mot: mot.replace(/\*/g, ""), accent: enRelief });
    if (mot.replace(/[.,;:!?…»\u202f\u00a0]+$/, "").endsWith("*")) enRelief = false;
  }
  return sortie;
}
