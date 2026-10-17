// Écrit par outils/registre-exemples.mjs — ne pas modifier à la main.
import { fiche as f0 } from "./neuf-etes/fiche";
import { fiche as f1 } from "./premier-plongeon/fiche";

export const SITES = [
  { chemin: "/exemples/neuf-etes", ...f0 },
  { chemin: "/exemples/premier-plongeon", ...f1 },
];
