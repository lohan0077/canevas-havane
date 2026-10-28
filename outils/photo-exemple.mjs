// Rapatrie une photo libre (Unsplash ou Pexels) pour un site de démonstration :
// téléchargée une fois, redimensionnée, convertie en WebP, servie depuis notre domaine
// — jamais appelée chez le photographe, donc aucune IP de visiteur transmise. Le
// crédit est noté dans public/exemples/<site>/credits.json, que la page des mentions
// légales du site affiche.
//
//   node outils/photo-exemple.mjs <site> <nom> <adresse de l'image> "<auteur>" <page de la photo> [largeur]
//
// Refuse toute autre source, et toute image qui dépasse 300 Ko après compression.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const sharp = createRequire(import.meta.url)("sharp");
const racine = join(dirname(fileURLToPath(import.meta.url)), "..");
const [site, nom, adresse, auteur, page, largeur = "1600"] = process.argv.slice(2);
if (!site || !nom || !adresse || !auteur || !page) {
  console.error('Usage : node outils/photo-exemple.mjs <site> <nom> <adresse> "<auteur>" <page> [largeur]');
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(site) || !/^[a-z0-9-]+$/.test(nom)) throw new Error("site et nom : minuscules, chiffres, tirets");
const hote = new URL(adresse).hostname;
const SOURCES = { "images.unsplash.com": "Unsplash", "images.pexels.com": "Pexels" };
if (!SOURCES[hote]) throw new Error(`Source refusée : ${hote} (seulement images.unsplash.com et images.pexels.com)`);
if (!/^https:\/\/(unsplash\.com|www\.pexels\.com)\//.test(page)) throw new Error("La page de la photo doit être sur unsplash.com ou pexels.com");

const reponse = await fetch(adresse);
if (!reponse.ok) throw new Error(`HTTP ${reponse.status} pour ${adresse}`);
const brut = Buffer.from(await reponse.arrayBuffer());

let image, qualite = 72;
for (; qualite >= 40; qualite -= 8) {
  image = await sharp(brut).rotate().resize({ width: Number(largeur), withoutEnlargement: true }).webp({ quality: qualite }).toBuffer();
  if (image.length <= 300_000) break;
}
if (image.length > 300_000) throw new Error(`Trop lourde même à qualité 40 : ${Math.round(image.length / 1000)} Ko — prendre une largeur plus petite`);

const dossier = join(racine, "public/exemples", site);
mkdirSync(dossier, { recursive: true });
writeFileSync(join(dossier, `${nom}.webp`), image);
const fichierCredits = join(dossier, "credits.json");
const credits = existsSync(fichierCredits) ? JSON.parse(readFileSync(fichierCredits, "utf8")) : [];
const entree = { fichier: `${nom}.webp`, auteur, source: SOURCES[hote], licence: `Licence ${SOURCES[hote]}`, page };
writeFileSync(fichierCredits, JSON.stringify([...credits.filter((c) => c.fichier !== entree.fichier), entree], null, 2) + "\n");
const { width, height } = await sharp(image).metadata();
console.log(`✓ /exemples/${site}/${nom}.webp — ${width} × ${height}, ${Math.round(image.length / 1000)} Ko (qualité ${qualite}), ${SOURCES[hote]} · ${auteur}`);
