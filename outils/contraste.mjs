// Mesure du contraste réel, en navigateur, sur les pages livrées.
// Rapport WCAG 2.1 AA : 4,5:1 pour le texte courant, 3:1 pour le grand texte
// (>= 24 px, ou >= 18,66 px en gras).
//
// Deux pièges traités ici, parce qu'ils faussent silencieusement la mesure :
//   - Tailwind 4 renvoie les couleurs calculées en `oklab(...)`. Une expression
//     régulière qui suppose `rgb(r, g, b)` lit alors « 0.99 » comme un rouge de 0
//     et déclare noir un texte blanc. Toute couleur est donc résolue en RGB par
//     le navigateur lui-même, via un canvas.
//   - Un texte peint par un dégradé (`background-clip: text`) a une couleur
//     calculée transparente. Son contraste ne se mesure pas ainsi : il est compté
//     à part, à regarder à l'œil, jamais silencieusement en « conforme ».
//
// Sort en code d'erreur 1 dès qu'un texte passe sous le seuil : branché en CI,
// il suffit à faire échouer la compilation.
//
// Playwright n'est pas une dépendance du site — il n'a rien à faire dans l'image
// de production. On l'appelle à la demande :
//
//   npx --yes playwright@1.62.1 install --with-deps chromium
//   npx --yes -p playwright@1.62.1 node outils/contraste.mjs
//
// Usage : node contraste.mjs [origine]     (défaut : https://canevas-havane.com)
// Sur une compilation locale : node outils/contraste.mjs http://localhost:3000

import { chromium } from "playwright";

const origine = process.argv[2] ?? "https://canevas-havane.com";

const pages = [
  "/", "/expertise", "/tarifs", "/realisations", "/realisations/keo",
  "/realisations/edificia", "/blog", "/a-propos", "/contact",
  "/mentions-legales", "/confidentialite", "/cgv", "/page-inexistante-404",
];

const mesure = () => {
  // Résolution de n'importe quelle notation CSS (rgb, oklab, oklch, color-mix…)
  // en RGB + alpha, en laissant le moteur de rendu faire la conversion.
  const toile = document.createElement("canvas");
  toile.width = toile.height = 1;
  const ctx = toile.getContext("2d", { willReadFrequently: true });
  const cache = new Map();
  const resoudre = (css) => {
    if (cache.has(css)) return cache.get(css);
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#000";
    ctx.fillStyle = css;
    if (ctx.fillStyle === "#000000" && !/^(#000000|#000|black|rgb\(0, ?0, ?0\))$/i.test(css.trim())) {
      cache.set(css, null); // notation non comprise : on ne devine pas
      return null;
    }
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    const a = d[3] / 255;
    // getImageData rend des valeurs pré-multipliées par alpha : on les rétablit.
    const rgb = a === 0 ? [0, 0, 0] : [d[0], d[1], d[2]].map((c) => Math.min(255, c / a));
    const r = { rgb, a };
    cache.set(css, r);
    return r;
  };

  const lum = ([r, g, b]) => {
    const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const melange = (av, ar) => av.rgb.map((c, i) => c * av.a + ar[i] * (1 - av.a));
  const fondDe = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const bg = resoudre(getComputedStyle(n).backgroundColor);
      if (bg && bg.a > 0) {
        if (bg.a >= 0.999) return bg.rgb;
        return melange(bg, fondDe(n.parentElement || document.body));
      }
      n = n.parentElement;
    }
    const racine = resoudre(getComputedStyle(document.documentElement).backgroundColor);
    return racine && racine.a >= 0.999 ? racine.rgb : [255, 255, 255];
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  const echecs = [];
  const degrades = [];
  let mesures = 0;

  for (const el of document.querySelectorAll("body *")) {
    const txt = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(" ")
      .trim();
    if (!txt) continue;
    const st = getComputedStyle(el);
    if (st.visibility === "hidden" || st.display === "none" || +st.opacity === 0) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;

    const av = resoudre(st.webkitTextFillColor || st.color);
    if (!av) continue;

    // Texte peint par un dégradé : couleur de remplissage transparente.
    if (av.a === 0) { degrades.push(txt.slice(0, 45)); continue; }

    const fond = fondDe(el);
    const couleur = av.a < 0.999 ? melange(av, fond) : av.rgb;
    const taille = parseFloat(st.fontSize);
    const poids = parseInt(st.fontWeight) || 400;
    const grand = taille >= 24 || (taille >= 18.66 && poids >= 700);
    const seuil = grand ? 3 : 4.5;
    const c = ratio(couleur, fond);
    mesures++;
    if (c < seuil - 0.005) {
      echecs.push({
        txt: txt.slice(0, 50),
        rapport: +c.toFixed(2),
        seuil,
        px: +taille.toFixed(1),
        couleur: st.color,
        effective: "rgb(" + couleur.map(Math.round).join(",") + ")",
        fond: "rgb(" + fond.map(Math.round).join(",") + ")",
      });
    }
  }
  return { mesures, echecs, degrades: degrades.length, exemplesDegrades: degrades.slice(0, 3) };
};

const navigateur = await chromium.launch();
let totalMesures = 0, totalEchecs = 0, totalDegrades = 0;

for (const schema of ["light", "dark"]) {
  const contexte = await navigateur.newContext({
    colorScheme: schema,
    viewport: { width: 1280, height: 900 },
  });
  const onglet = await contexte.newPage();

  for (const chemin of pages) {
    const reponse = await onglet.goto(origine + chemin, { waitUntil: "networkidle", timeout: 45000 });
    await onglet.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await onglet.waitForTimeout(1200);
    await onglet.evaluate(() => window.scrollTo(0, 0));
    await onglet.waitForTimeout(300);

    const { mesures, echecs, degrades, exemplesDegrades } = await onglet.evaluate(mesure);
    totalMesures += mesures;
    totalEchecs += echecs.length;
    totalDegrades += degrades;
    console.log(
      `${echecs.length === 0 ? "OK   " : "ECHEC"} [${schema}] ${chemin.padEnd(26)} HTTP ${reponse?.status()}  ${String(mesures).padStart(4)} mesures, ${echecs.length} sous le seuil, ${degrades} en degrade (non mesurable)`,
    );
    if (degrades && exemplesDegrades.length) console.log(`      degrades : ${exemplesDegrades.join(" | ")}`);
    for (const e of echecs) {
      console.log(`      -> ${e.rapport}:1 (exige ${e.seuil}:1) ${e.px}px  ${e.effective} sur ${e.fond}  « ${e.txt} »`);
    }
  }
  await contexte.close();
}

await navigateur.close();
console.log(`\n=== TOTAL : ${totalMesures} textes mesures, ${totalEchecs} sous le seuil WCAG AA, ${totalDegrades} en degrade (a verifier a l'oeil) ===`);
process.exit(totalEchecs === 0 ? 0 : 1);
