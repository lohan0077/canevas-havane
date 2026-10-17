// Contraste réel des textes posés sur la vidéo de l'ouverture de Premier Plongeon.
//
// `outils/contraste.mjs` mesure chaque texte contre la couleur de fond déclarée :
// sur une vidéo, c'est la nuit unie de l'ouverture (#04070d), pas ce qui passe
// réellement derrière les lettres. Ici, pour chaque chapitre, on lit la vidéo
// toutes les demi-secondes, on prend les pixels effectivement sous chaque texte —
// voiles et plaque de verre compris —, on retient le 95e centile de luminance et
// on le compare au seuil WCAG 2.1 AA (4,5:1, ou 3:1 pour le grand texte).
//
// Le Chromium livré par Playwright ne lit pas le H.264 : on lance Google Chrome
// (`channel: "chrome"`). Sur une compilation locale :
//
//   node outils/contraste-video.mjs http://127.0.0.1:3100
//
// Sort en code d'erreur 1 dès qu'un texte passe sous le seuil.

import { chromium } from "playwright";

const origine = process.argv[2] ?? "https://canevas-havane.com";
const chemin = "/exemples/premier-plongeon";
const ecrans = [
  { nom: "ordinateur", width: 1280, height: 800 },
  { nom: "téléphone", width: 375, height: 812 },
];

async function mesurer() {
  const header = document.querySelector("header");
  const H = header.getBoundingClientRect();
  const couleur = (css) => {
    const m = css.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
    return m ? { rgb: [+m[1], +m[2], +m[3]], a: m[4] === undefined ? 1 : +m[4] } : null;
  };
  // Les voiles : chaque élément dont la classe contient « voile ». Chrome réécrit
  // « to top » en dégradé du haut vers le bas : les arrêts se lisent depuis le haut
  // (ou depuis la gauche pour un dégradé horizontal).
  const couches = [...header.querySelectorAll('[class*="voile"]')]
    .filter((el) => getComputedStyle(el).display !== "none")
    .map((el) => {
      const g = getComputedStyle(el).backgroundImage;
      const arrets = [...g.matchAll(/rgba\(4, 7, 13, ([\d.]+)\) ([\d.]+)%/g)].map((m) => [+m[2] / 100, +m[1]]);
      const horizontal = /to (left|right)|deg/.test(g.split("rgba")[0]);
      return { arrets, horizontal, r: el.getBoundingClientRect() };
    });
  const interp = (arrets, p) => {
    for (let i = 0; i < arrets.length - 1; i++) {
      const [p0, a0] = arrets[i], [p1, a1] = arrets[i + 1];
      if (p <= p1) return p <= p0 ? a0 : a0 + (a1 - a0) * ((p - p0) / (p1 - p0));
    }
    return arrets[arrets.length - 1][1];
  };
  const appliquerVoiles = (px, x, y) => {
    for (const c of couches) {
      if (x < c.r.left || x > c.r.right || y < c.r.top || y > c.r.bottom) continue;
      const a = interp(c.arrets, c.horizontal ? (x - c.r.left) / c.r.width : (y - c.r.top) / c.r.height);
      px = px.map((q, i) => q * (1 - a) + [4, 7, 13][i] * a);
    }
    return px;
  };
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const lum = ([r, g, b]) => 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  const rapport = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  const toile = document.createElement("canvas");
  const ctx = toile.getContext("2d", { willReadFrequently: true });
  const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

  // Les textes posés sur le décor, avec la pile des fonds semi-transparents de
  // leurs ancêtres (la plaque de verre des chapitres). Ce qui est déclaré décoratif
  // ou posé sur une pastille opaque relève de `outils/contraste.mjs`.
  const textes = () =>
    [...header.querySelectorAll("*")].map((el) => {
      if (el.closest('[aria-hidden="true"]')) return null;
      const t = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join("");
      if (!t) return null;
      const st = getComputedStyle(el);
      if (st.visibility === "hidden" || st.display === "none") return null;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height || r.bottom > H.bottom || r.top < H.top) return null;
      const plaques = [];
      for (let n = el; n && n !== header; n = n.parentElement) {
        const bg = couleur(getComputedStyle(n).backgroundColor);
        if (bg && bg.a >= 0.99) return null;
        if (bg && bg.a > 0) plaques.unshift(bg);
      }
      return { el, plaques };
    }).filter(Boolean);

  const resultats = [];
  let total = 0;
  const boutons = [...header.querySelectorAll("ul button")];
  for (const bouton of boutons) {
    bouton.click();
    await attendre(1500);
    const v = [...header.querySelectorAll("video")].find((x) => /visible/.test(x.className));
    if (!v || v.readyState < 2) {
      resultats.push({ chapitre: bouton.textContent, erreur: "vidéo illisible" });
      continue;
    }
    v.pause();
    const els = textes();
    const pire = new Map();
    for (let t = 0; t < v.duration; t += 0.5) {
      v.currentTime = t;
      await new Promise((r) => v.addEventListener("seeked", r, { once: true }));
      const vr = v.getBoundingClientRect();
      for (const { el, plaques } of els) {
        const r = el.getBoundingClientRect();
        const st = getComputedStyle(el);
        const c = couleur(st.color);
        if (!c) continue;
        const W = Math.max(1, Math.round(r.width)), Hh = Math.max(1, Math.round(r.height));
        toile.width = W;
        toile.height = Hh;
        ctx.drawImage(v,
          ((r.left - vr.left) / vr.width) * v.videoWidth, ((r.top - vr.top) / vr.height) * v.videoHeight,
          (r.width / vr.width) * v.videoWidth, (r.height / vr.height) * v.videoHeight,
          0, 0, W, Hh);
        const d = ctx.getImageData(0, 0, W, Hh).data;
        const fonds = [];
        for (let j = 0; j < Hh; j++) {
          const y = r.top + ((j + 0.5) * r.height) / Hh;
          for (let i = 0; i < W; i++) {
            const x = r.left + ((i + 0.5) * r.width) / W;
            const k = (j * W + i) * 4;
            let px = appliquerVoiles([d[k], d[k + 1], d[k + 2]], x, y);
            for (const p of plaques) px = px.map((q, ii) => q * (1 - p.a) + p.rgb[ii] * p.a);
            fonds.push([lum(px), px]);
          }
        }
        fonds.sort((x, y) => x[0] - y[0]);
        const fond = fonds[Math.floor(fonds.length * 0.95)][1];
        const texte = c.rgb.map((q, i) => q * c.a + fond[i] * (1 - c.a));
        const taille = parseFloat(st.fontSize), poids = parseInt(st.fontWeight) || 400;
        const seuil = taille >= 24 || (taille >= 18.66 && poids >= 700) ? 3 : 4.5;
        const ratio = rapport(texte, fond);
        total++;
        const nom = el.textContent.trim().slice(0, 34);
        const avant = pire.get(nom);
        if (!avant || ratio < avant.ratio) pire.set(nom, { ratio: +ratio.toFixed(2), seuil, t });
      }
    }
    const liste = [...pire.entries()].map(([nom, x]) => ({ nom, ...x }));
    resultats.push({
      chapitre: bouton.textContent,
      textes: liste.length,
      minimum: Math.min(...liste.map((x) => x.ratio)),
      echecs: liste.filter((x) => x.ratio < x.seuil - 0.005),
    });
  }
  return { total, resultats };
}

const navigateur = await chromium.launch({ channel: "chrome" });
let totalMesures = 0, totalEchecs = 0, illisibles = 0;

for (const ecran of ecrans) {
  const contexte = await navigateur.newContext({ viewport: { width: ecran.width, height: ecran.height } });
  const onglet = await contexte.newPage();
  const reponse = await onglet.goto(origine + chemin, { waitUntil: "networkidle", timeout: 45000 });
  await onglet.waitForTimeout(2500); // fin de l'entrée animée
  const { total, resultats } = await onglet.evaluate(mesurer);
  totalMesures += total;
  console.log(`[${ecran.nom} ${ecran.width}x${ecran.height}] HTTP ${reponse?.status()}`);
  for (const r of resultats) {
    if (r.erreur) {
      illisibles++;
      console.log(`  ECHEC ${r.chapitre.padEnd(16)} ${r.erreur}`);
      continue;
    }
    totalEchecs += r.echecs.length;
    console.log(`  ${r.echecs.length ? "ECHEC" : "OK   "} ${r.chapitre.padEnd(16)} ${r.textes} textes, pire rapport ${r.minimum}:1`);
    for (const e of r.echecs) console.log(`      -> ${e.ratio}:1 (exige ${e.seuil}:1) à ${e.t} s  « ${e.nom} »`);
  }
  await contexte.close();
}

await navigateur.close();
console.log(`\n=== TOTAL : ${totalMesures} mesures sur la vidéo, ${totalEchecs} sous le seuil WCAG AA, ${illisibles} chapitre(s) illisible(s) ===`);
process.exit(totalEchecs === 0 && illisibles === 0 ? 0 : 1);
