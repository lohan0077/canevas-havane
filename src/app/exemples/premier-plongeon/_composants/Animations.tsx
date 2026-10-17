"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { styles as s } from "./Habillage";

/**
 * Les photos et les cartes sous la ligne de flottaison montent doucement quand on
 * les atteint. Tout est visible sans JavaScript, et rien ne bouge si le visiteur
 * limite les animations : l'état « attente » n'est posé qu'ici.
 *
 * On regarde la position au défilement plutôt qu'un IntersectionObserver : un saut
 * direct en bas de page (lien d'ancre, touche Fin, mesure automatique du contraste)
 * révèle aussi tout ce qui a été sauté — rien ne reste invisible derrière.
 */
export default function Animations() {
  const chemin = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seuil = () => window.innerHeight * 0.92;
    let attente = Array.from(document.querySelectorAll<HTMLElement>(`.${s.revele}`)).filter(
      (el) => el.getBoundingClientRect().top > seuil(),
    );
    attente.forEach((el) => (el.dataset.etat = "attente"));

    let image = 0;
    const verifier = () => {
      image = 0;
      attente = attente.filter((el) => {
        if (el.getBoundingClientRect().top > seuil()) return true;
        el.dataset.etat = "vu";
        return false;
      });
      if (!attente.length) arreter();
    };
    const programmer = () => {
      if (!image) image = requestAnimationFrame(verifier);
    };
    const arreter = () => {
      window.removeEventListener("scroll", programmer);
      window.removeEventListener("resize", programmer);
    };
    window.addEventListener("scroll", programmer, { passive: true });
    window.addEventListener("resize", programmer);
    return () => {
      cancelAnimationFrame(image);
      arreter();
      attente.forEach((el) => delete el.dataset.etat);
    };
  }, [chemin]);

  return null;
}
