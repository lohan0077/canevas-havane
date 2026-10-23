// Écrit par outils/registre-exemples.mjs — ne pas modifier à la main.
import { fiche as f0 } from "./a-garder/fiche";
import { fiche as f1 } from "./a-l-endroit/fiche";
import { fiche as f2 } from "./a-la-prochaine/fiche";
import { fiche as f3 } from "./apres-nous/fiche";
import { fiche as f4 } from "./apres-vous/fiche";
import { fiche as f5 } from "./autographe/fiche";
import { fiche as f6 } from "./belle-portee/fiche";
import { fiche as f7 } from "./bon-mardi/fiche";
import { fiche as f8 } from "./bonjour-monture/fiche";
import { fiche as f9 } from "./bonne-nouvelle/fiche";
import { fiche as f10 } from "./capot-ouvert/fiche";
import { fiche as f11 } from "./ciel-variable/fiche";
import { fiche as f12 } from "./cinquante-minutes/fiche";
import { fiche as f13 } from "./clair-de-salon/fiche";
import { fiche as f14 } from "./cles-a-toi/fiche";
import { fiche as f15 } from "./deux-sucres/fiche";
import { fiche as f16 } from "./dimanche-midi/fiche";
import { fiche as f17 } from "./dimanche-soir/fiche";
import { fiche as f18 } from "./douze-mois/fiche";
import { fiche as f19 } from "./emprunte/fiche";
import { fiche as f20 } from "./et-s-il-pleut/fiche";
import { fiche as f21 } from "./franchement/fiche";
import { fiche as f22 } from "./gateaux-perdus/fiche";
import { fiche as f23 } from "./l-addition/fiche";
import { fiche as f24 } from "./l-heure-dite/fiche";
import { fiche as f25 } from "./le-pourquoi/fiche";
import { fiche as f26 } from "./le-pre-du-vendredi/fiche";
import { fiche as f27 } from "./le-veilleur/fiche";
import { fiche as f28 } from "./lundi-d-apres/fiche";
import { fiche as f29 } from "./mains-libres/fiche";
import { fiche as f30 } from "./mode-avion/fiche";
import { fiche as f31 } from "./moins-le-quart/fiche";
import { fiche as f32 } from "./neuf-etes/fiche";
import { fiche as f33 } from "./nouvelles-du-jour/fiche";
import { fiche as f34 } from "./ombre-lente/fiche";
import { fiche as f35 } from "./paraphe/fiche";
import { fiche as f36 } from "./parole-tenue/fiche";
import { fiche as f37 } from "./pas-souple/fiche";
import { fiche as f38 } from "./patience/fiche";
import { fiche as f39 } from "./pavillon-bis/fiche";
import { fiche as f40 } from "./pignon-sur-pre/fiche";
import { fiche as f41 } from "./pour-plus-tard/fiche";
import { fiche as f42 } from "./premier-billet/fiche";
import { fiche as f43 } from "./premier-soir/fiche";
import { fiche as f44 } from "./premier-trajet/fiche";
import { fiche as f45 } from "./premiere-bougie/fiche";
import { fiche as f46 } from "./rayon-frais/fiche";
import { fiche as f47 } from "./relue/fiche";
import { fiche as f48 } from "./reviens/fiche";
import { fiche as f49 } from "./rien-a-signaler/fiche";
import { fiche as f50 } from "./sans-soupir/fiche";
import { fiche as f51 } from "./sept-mille-diners/fiche";
import { fiche as f52 } from "./souvenance/fiche";
import { fiche as f53 } from "./tel-quel/fiche";
import { fiche as f54 } from "./tiers-regard/fiche";
import { fiche as f55 } from "./tour-du-quartier/fiche";
import { fiche as f56 } from "./transmis/fiche";
import { fiche as f57 } from "./trois-marches/fiche";
import { fiche as f58 } from "./tu-vas-voir/fiche";
import { fiche as f59 } from "./veilleuse/fiche";
import { fiche as f60 } from "./vert-en-aout/fiche";
import { fiche as f61 } from "./voix-basse/fiche";

export const SITES = [
  { chemin: "/exemples/a-garder", ...f0 },
  { chemin: "/exemples/a-l-endroit", ...f1 },
  { chemin: "/exemples/a-la-prochaine", ...f2 },
  { chemin: "/exemples/apres-nous", ...f3 },
  { chemin: "/exemples/apres-vous", ...f4 },
  { chemin: "/exemples/autographe", ...f5 },
  { chemin: "/exemples/belle-portee", ...f6 },
  { chemin: "/exemples/bon-mardi", ...f7 },
  { chemin: "/exemples/bonjour-monture", ...f8 },
  { chemin: "/exemples/bonne-nouvelle", ...f9 },
  { chemin: "/exemples/capot-ouvert", ...f10 },
  { chemin: "/exemples/ciel-variable", ...f11 },
  { chemin: "/exemples/cinquante-minutes", ...f12 },
  { chemin: "/exemples/clair-de-salon", ...f13 },
  { chemin: "/exemples/cles-a-toi", ...f14 },
  { chemin: "/exemples/deux-sucres", ...f15 },
  { chemin: "/exemples/dimanche-midi", ...f16 },
  { chemin: "/exemples/dimanche-soir", ...f17 },
  { chemin: "/exemples/douze-mois", ...f18 },
  { chemin: "/exemples/emprunte", ...f19 },
  { chemin: "/exemples/et-s-il-pleut", ...f20 },
  { chemin: "/exemples/franchement", ...f21 },
  { chemin: "/exemples/gateaux-perdus", ...f22 },
  { chemin: "/exemples/l-addition", ...f23 },
  { chemin: "/exemples/l-heure-dite", ...f24 },
  { chemin: "/exemples/le-pourquoi", ...f25 },
  { chemin: "/exemples/le-pre-du-vendredi", ...f26 },
  { chemin: "/exemples/le-veilleur", ...f27 },
  { chemin: "/exemples/lundi-d-apres", ...f28 },
  { chemin: "/exemples/mains-libres", ...f29 },
  { chemin: "/exemples/mode-avion", ...f30 },
  { chemin: "/exemples/moins-le-quart", ...f31 },
  { chemin: "/exemples/neuf-etes", ...f32 },
  { chemin: "/exemples/nouvelles-du-jour", ...f33 },
  { chemin: "/exemples/ombre-lente", ...f34 },
  { chemin: "/exemples/paraphe", ...f35 },
  { chemin: "/exemples/parole-tenue", ...f36 },
  { chemin: "/exemples/pas-souple", ...f37 },
  { chemin: "/exemples/patience", ...f38 },
  { chemin: "/exemples/pavillon-bis", ...f39 },
  { chemin: "/exemples/pignon-sur-pre", ...f40 },
  { chemin: "/exemples/pour-plus-tard", ...f41 },
  { chemin: "/exemples/premier-billet", ...f42 },
  { chemin: "/exemples/premier-soir", ...f43 },
  { chemin: "/exemples/premier-trajet", ...f44 },
  { chemin: "/exemples/premiere-bougie", ...f45 },
  { chemin: "/exemples/rayon-frais", ...f46 },
  { chemin: "/exemples/relue", ...f47 },
  { chemin: "/exemples/reviens", ...f48 },
  { chemin: "/exemples/rien-a-signaler", ...f49 },
  { chemin: "/exemples/sans-soupir", ...f50 },
  { chemin: "/exemples/sept-mille-diners", ...f51 },
  { chemin: "/exemples/souvenance", ...f52 },
  { chemin: "/exemples/tel-quel", ...f53 },
  { chemin: "/exemples/tiers-regard", ...f54 },
  { chemin: "/exemples/tour-du-quartier", ...f55 },
  { chemin: "/exemples/transmis", ...f56 },
  { chemin: "/exemples/trois-marches", ...f57 },
  { chemin: "/exemples/tu-vas-voir", ...f58 },
  { chemin: "/exemples/veilleuse", ...f59 },
  { chemin: "/exemples/vert-en-aout", ...f60 },
  { chemin: "/exemples/voix-basse", ...f61 },
];
