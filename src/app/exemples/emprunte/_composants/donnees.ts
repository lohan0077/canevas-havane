// Tout ce que le site d'Emprunté affiche, au même endroit. La marque est fictive :
// chaque prix, chaque photo du mur, chaque prénom est un exemple, et le site le dit.
//
// Règles tenues ici (Videos/marque-marques-dtc/SOURCES.md) :
//   - « 100 % laine » : une seule fibre (règlement (UE) n° 1007/2011, art. 7), affichée
//     avant l'achat (art. 16) ; l'étiquette « À rendre à… » s'ajoute à l'étiquette de
//     composition, elle ne la remplace pas ;
//   - « Ajouter sa taille » est une option : un pull se vend seul, au même prix, sans
//     quantité imposée (C. conso., L121-11) et sans « offert » ni « gratuit » ;
//   - le mur des voleurs : de vraies photos de vrais clients, chacune avec l'accord écrit
//     de la personne photographiée, aucun mineur ; ici, des dessins marqués « exemple » ;
//   - aucune origine revendiquée ; téléphone dans la tranche ARCEP de fiction.

export const DOSSIER = "/exemples/emprunte";

export const marque = {
  nom: "Emprunté",
  adresse: "12 rue de l'Exemple, 00000 Ta Ville",
  telephone: "01 99 00 73 44",
  telephoneLien: "+33199007344",
  horaires: "Du lundi au vendredi, de 9 h à 17 h",
  siret: "000 000 000 00000",
};

export const PRIX = 129; // TTC, exemple

export const couleurs = [
  { id: "marine", nom: "Marine", teinte: "#1E2A44" },
  { id: "rouille", nom: "Rouille", teinte: "#B5532E" },
  { id: "chine", nom: "Gris chiné", teinte: "#9A968F" },
  { id: "ecru", nom: "Écru", teinte: "#EFE6D3" },
];

export const TAILLES = ["XS", "S", "M", "L", "XL"];

export const euros = (n: number) => `${n} €`;

export type Voleur = { id: string; legende: string; groupe: "famille" | "amis" | "animaux"; pull: string; peau: string; depuis: string; chien?: boolean };

export const voleurs: Voleur[] = [
  { id: "frere", legende: "Mon frère", groupe: "famille", pull: "#1E2A44", peau: "#E9C9A8", depuis: "Pris à Noël 2024" },
  { id: "copine", legende: "Ma copine", groupe: "amis", pull: "#B5532E", peau: "#D9A88A", depuis: "Pris un dimanche de mars" },
  { id: "pere", legende: "Mon père, depuis 2019", groupe: "famille", pull: "#9A968F", peau: "#C99A7A", depuis: "Pris en 2019, porté depuis" },
  { id: "coloc", legende: "Ma coloc", groupe: "amis", pull: "#1E2A44", peau: "#B98A6A", depuis: "Pris « juste pour ce soir »" },
  { id: "soeur", legende: "Ma sœur", groupe: "famille", pull: "#B5532E", peau: "#E2B898", depuis: "Pris pour un départ en vacances" },
  { id: "chien", legende: "Mon chien", groupe: "animaux", pull: "#9A968F", peau: "#8A6A4A", depuis: "Pris pour dormir dessus", chien: true },
];

export const questions = [
  { q: "« Ajouter sa taille », c'est obligatoire ?", r: "Non. Un pull se commande seul, à 129 €. Le second, si tu l'ajoutes, coûte le même prix : ni remise, ni « offert », juste un bouton de plus." },
  { q: "C'est quoi, l'étiquette « À rendre à » ?", r: "Une étiquette cousue à l'intérieur du col, avec ton prénom brodé. Elle s'ajoute à l'étiquette de composition, qui reste à sa place." },
  { q: "Et si je change d'avis ?", r: "Quatorze jours après la réception, comme pour tout achat à distance. Un pull brodé à ton prénom est personnalisé : il ne peut pas être renvoyé au titre de la rétractation. On te le dit avant de commander." },
  { q: "Comment je laisse ma photo sur le mur ?", r: "Tu envoies la photo du voleur avec son accord écrit à lui — c'est lui qu'on voit, pas toi. Pas de mineur sur le mur. Et on retire une photo dès qu'on nous le demande." },
  { q: "Ça gratte ?", r: "C'est de la laine, rien d'autre. Si ta peau ne supporte pas la laine, ce pull ne la changera pas : on préfère te le dire." },
];

export const NAVIGATION = [
  { href: `${DOSSIER}/col-rond`, libelle: "Le pull col rond" },
  { href: `${DOSSIER}/mur-des-voleurs`, libelle: "Le mur des voleurs" },
];

export const photos = {
  enfile: { src: `${DOSSIER}/enfile.webp`, largeur: 1200, hauteur: 1500, alt: "Quelqu'un enfile un gros pull écru, la tête encore cachée dans le col" },
  pile: { src: `${DOSSIER}/pile.webp`, largeur: 1000, hauteur: 1500, alt: "Une pile de pulls en maille, gris, écru et taupe, pliés les uns sur les autres" },
  pileSombre: { src: `${DOSSIER}/pile-sombre.webp`, largeur: 1000, hauteur: 1500, alt: "Une pile de pulls aux couleurs chaudes, brun, rouille, kaki et crème" },
};
