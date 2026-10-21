import {
  Archivo, Arvo, Bodoni_Moda, Bricolage_Grotesque, Caveat, DM_Sans, DM_Serif_Display, Figtree, Fraunces, Instrument_Serif, Inter, Lora, Manrope, Newsreader, Outfit, Playfair_Display, Sora, Space_Grotesk, Syne, Unbounded, Work_Sans, Young_Serif, Zilla_Slab,
} from "next/font/google";

// Les polices des sites de démonstration, servies depuis notre domaine (next/font),
// comme celles du site : aucune requête vers Google au chargement.
//
// Une liste fermée, et vérifiée : chacune a été rendue avec « Été où coûte à ç ê û Ô »
// avant d'entrer ici. Cormorant Garamond n'y est pas — ses accents se décalent.
// `preload: false` partout : la page ne précharge pas une police qu'elle n'affiche pas.
// Next exige un appel par constante, options écrites en toutes lettres.
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", preload: false, style: ["normal", "italic"], variable: "--f-fraunces" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", preload: false, style: ["normal", "italic"], variable: "--f-playfair" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], display: "swap", preload: false, weight: "400", style: ["normal", "italic"], variable: "--f-dmserif" });
const instrument = Instrument_Serif({ subsets: ["latin"], display: "swap", preload: false, weight: "400", style: ["normal", "italic"], variable: "--f-instrument" });
const youngSerif = Young_Serif({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--f-youngserif" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], display: "swap", preload: false, style: ["normal", "italic"], variable: "--f-bodoni" });
const lora = Lora({ subsets: ["latin"], display: "swap", preload: false, style: ["normal", "italic"], variable: "--f-lora" });
const newsreader = Newsreader({ subsets: ["latin"], display: "swap", preload: false, style: ["normal", "italic"], variable: "--f-newsreader" });
const arvo = Arvo({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "700"], style: ["normal", "italic"], variable: "--f-arvo" });
const zilla = Zilla_Slab({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--f-zilla" });
const syne = Syne({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-syne" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-spacegrotesk" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-bricolage" });
const unbounded = Unbounded({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-unbounded" });
const archivo = Archivo({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-archivo" });
const outfit = Outfit({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-outfit" });
const sora = Sora({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-sora" });
const manrope = Manrope({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-manrope" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", preload: false, style: ["normal", "italic"], variable: "--f-dmsans" });
const inter = Inter({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-inter" });
const workSans = Work_Sans({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-worksans" });
const figtree = Figtree({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-figtree" });
const caveat = Caveat({ subsets: ["latin"], display: "swap", preload: false, variable: "--f-caveat" });

export const POLICES = { fraunces, playfair, dmSerif, instrument, youngSerif, bodoni, lora, newsreader, arvo, zilla, syne, spaceGrotesk, bricolage, unbounded, archivo, outfit, sora, manrope, dmSans, inter, workSans, figtree, caveat };

export type NomPolice = keyof typeof POLICES;

const VARIABLES: Record<NomPolice, string> = {
  fraunces: "--f-fraunces",
  playfair: "--f-playfair",
  dmSerif: "--f-dmserif",
  instrument: "--f-instrument",
  youngSerif: "--f-youngserif",
  bodoni: "--f-bodoni",
  lora: "--f-lora",
  newsreader: "--f-newsreader",
  arvo: "--f-arvo",
  zilla: "--f-zilla",
  syne: "--f-syne",
  spaceGrotesk: "--f-spacegrotesk",
  bricolage: "--f-bricolage",
  unbounded: "--f-unbounded",
  archivo: "--f-archivo",
  outfit: "--f-outfit",
  sora: "--f-sora",
  manrope: "--f-manrope",
  dmSans: "--f-dmsans",
  inter: "--f-inter",
  workSans: "--f-worksans",
  figtree: "--f-figtree",
  caveat: "--f-caveat",
};

/** Le nom de la variable CSS d'une police, par exemple `--f-fraunces`. */
export const variablePolice = (nom: NomPolice) => VARIABLES[nom];
