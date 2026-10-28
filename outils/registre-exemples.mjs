// Rassemble les fiches des sites de démonstration (src/app/exemples/<site>/fiche.ts)
// dans src/app/exemples/_registre.ts, la liste de toutes leurs pages dans
// outils/pages-exemples.json (lue par outils/contraste.mjs), et les adresses des
// anciens sites fondus dans un autre dans outils/redirections-exemples.json (lue par
// next.config.ts). À relancer quand un site est ajouté, fondu ou retiré :
//   node outils/registre-exemples.mjs
import { readdirSync, existsSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const racine = join(dirname(fileURLToPath(import.meta.url)), "..");
const dossier = join(racine, "src/app/exemples");
const sites = readdirSync(dossier)
  .filter((d) => !d.startsWith("_") && !d.startsWith("[") && existsSync(join(dossier, d, "fiche.ts")))
  .sort();

const imports = sites.map((s, i) => `import { fiche as f${i} } from "./${s}/fiche";`).join("\n");
const liste = sites.map((s, i) => `  { chemin: "/exemples/${s}", ...f${i} },`).join("\n");
writeFileSync(join(dossier, "_registre.ts"),
  `// Écrit par outils/registre-exemples.mjs — ne pas modifier à la main.\n` +
  `${imports}\n\nexport const SITES = [\n${liste}\n];\n`);

// Toutes les pages : la page d'accueil de chaque site et ses sous-pages.
const pages = ["/exemples"];
const parcourir = (rel) => {
  const abs = join(dossier, rel);
  if (existsSync(join(abs, "page.tsx"))) pages.push(`/exemples/${rel}`);
  for (const d of readdirSync(abs)) {
    if (d.startsWith("_") || d.startsWith("[") || !statSync(join(abs, d)).isDirectory()) continue;
    parcourir(`${rel}/${d}`);
  }
};
sites.forEach(parcourir);
writeFileSync(join(racine, "outils/pages-exemples.json"), JSON.stringify(pages, null, 2) + "\n");

// Un ancien site « Remplir l'agenda » fondu dans le site de son métier : son adresse,
// et toutes ses sous-pages, mènent à l'accueil du site qui l'a absorbé.
const redirections = [];
for (const s of sites) {
  const ancien = readFileSync(join(dossier, s, "fiche.ts"), "utf8").match(/ancien:\s*"([a-z0-9-]+)"/)?.[1];
  if (!ancien) continue;
  if (sites.includes(ancien)) throw new Error(`${s} absorbe ${ancien}, qui existe encore : supprimer src/app/exemples/${ancien}`);
  redirections.push({ source: `/exemples/${ancien}`, destination: `/exemples/${s}` });
  redirections.push({ source: `/exemples/${ancien}/:chemin*`, destination: `/exemples/${s}` });
}
writeFileSync(join(racine, "outils/redirections-exemples.json"), JSON.stringify(redirections, null, 2) + "\n");
console.log(`${sites.length} sites, ${pages.length} pages, ${redirections.length / 2} ancien(s) site(s) redirigé(s)`);
