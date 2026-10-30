import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// La soirée rembobinée, en maquette : une salle de réception coupée comme un plan
// d'architecte (deux murs, des poutres, le reste ouvert), et à côté, le coin café du
// bureau, lundi matin. Tout est construit et peint ici : aucun fichier chargé.
//
// Le temps se lit à l'envers. `p` va de 0 (vendredi, 23 h 47 : la fête bat son plein)
// à 1 (lundi, 9 h) ; chaque élément de la scène est une fonction de `p` — les confettis
// remontent dans leurs canons, les ballons redescendent sur les tables, les verres se
// remplissent, les invités reculent jusqu'à l'accueil puis ressortent par la porte, les
// suspensions se rallument une à une. Seule la vie « en place » (la danse, la boule à
// facettes, la vapeur du café) suit l'horloge.

/* ============================ outils ============================ */

export const borne = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const entre = (a: number, b: number, x: number) => borne((x - a) / (b - a));
export const lisse = (a: number, b: number, x: number) => {
  const t = entre(a, b, x);
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const doux = (t: number) => t * t * (3 - 2 * t);

/** Un tirage reproductible : la même graine donne la même soirée, et les mêmes affiches. */
function hasard(graine: number) {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** L'angle le plus court de a vers b. */
function versAngle(a: number, b: number, t: number) {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

/* ============================ la palette ============================ */

export const NUIT = "#0E0C1D";
const ROSE = "#FF3D7F";
const VIOLET = "#7A63FF";
const AMBRE = "#FFB86B";
const BLEU = "#5CC8FF";
const COUPE = "#D9D6E8"; // la tranche des murs et du socle, comme un carton de maquette

/* ============================ textures peintes ============================ */

type Peintre = (ctx: CanvasRenderingContext2D, l: number, h: number) => void;

function toile(liste: THREE.Texture[], l: number, h: number, dessin: Peintre, srgb = true) {
  const c = document.createElement("canvas");
  c.width = l;
  c.height = h;
  dessin(c.getContext("2d")!, l, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  liste.push(t);
  return t;
}

/** Lames de parquet, joints décalés. `teintes` : [r, g, b] de base et l'écart. */
const parquet = (alea: () => number, base: [number, number, number], ecart: number, joint: string): Peintre => (ctx, l, h) => {
  const lames = 8;
  const largeur = h / lames;
  for (let i = 0; i < lames; i++) {
    let x = -alea() * 200;
    while (x < l) {
      const longueur = 150 + alea() * 180;
      const v = (alea() - 0.5) * ecart;
      ctx.fillStyle = `rgb(${base[0] + v},${base[1] + v * 0.8},${base[2] + v * 0.6})`;
      ctx.fillRect(x, i * largeur, longueur, largeur);
      for (let k = 0; k < 10; k++) {
        ctx.strokeStyle = `rgba(0,0,0,${0.04 + alea() * 0.06})`;
        ctx.lineWidth = 0.6 + alea();
        const y = i * largeur + alea() * largeur;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x + longueur * 0.3, y + 1.5, x + longueur * 0.7, y - 1.5, x + longueur, y);
        ctx.stroke();
      }
      ctx.fillStyle = joint;
      ctx.fillRect(x, i * largeur, 2, largeur);
      x += longueur;
    }
    ctx.fillStyle = joint;
    ctx.fillRect(0, (i + 1) * largeur - 2, l, 2);
  }
};

/** Un dégradé vertical, pour le fond de la nuit et celui du matin. */
const degrade = (haut: string, bas: string, lueur?: string): Peintre => (ctx, l, h) => {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, haut);
  g.addColorStop(1, bas);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, l, h);
  if (lueur) {
    const r = ctx.createRadialGradient(l * 0.55, h * 0.62, 0, l * 0.55, h * 0.62, l * 0.7);
    r.addColorStop(0, lueur);
    r.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = r;
    ctx.fillRect(0, 0, l, h);
  }
};

/**
 * Le mur de la salle : un enduit d'encre violette, une plinthe haute à panneaux
 * moulurés, et de grands panneaux au-dessus. `fenetres` : des baies en arc, en
 * fraction de la largeur ; leur nuit est peinte à part, dans la carte de lueur.
 */
function murSalle(alea: () => number, largeurM: number, fenetres: number[], porte?: [number, number]): Peintre {
  return (ctx, l, h) => {
    const m = l / largeurM; // pixels par mètre
    ctx.fillStyle = "#2B2542";
    ctx.fillRect(0, 0, l, h);
    for (let i = 0; i < 2600; i++) {
      ctx.fillStyle = alea() < 0.5 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.05)";
      ctx.fillRect(alea() * l, alea() * h, 2, 2);
    }
    const y = (metres: number) => h - metres * m;
    const moulure = (x0: number, y0: number, x1: number, y1: number) => {
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      ctx.lineWidth = 2;
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
      ctx.strokeStyle = "rgba(0,0,0,0.28)";
      ctx.strokeRect(x0 + 3, y0 + 3, x1 - x0, y1 - y0);
    };
    const libre = (x0: number, x1: number) =>
      ![...fenetres.map((f) => [f * l - 0.95 * m, f * l + 0.95 * m]), ...(porte ? [[porte[0] * m - 0.2 * m, porte[1] * m + 0.2 * m]] : [])].some(([a, b]) => x1 > a && x0 < b);
    // la cimaise et la plinthe
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, y(1.05), l, 6);
    ctx.fillStyle = "rgba(255,255,255,0.07)";
    ctx.fillRect(0, y(1.05) - 2, l, 2);
    ctx.fillStyle = "#1C1830";
    ctx.fillRect(0, y(0.14), l, 0.14 * m);
    // panneaux bas et hauts, là où il n'y a ni baie ni porte
    const pas = 1.6 * m;
    for (let x = 0.25 * m; x + pas <= l; x += pas + 0.2 * m) {
      if (!libre(x, x + pas)) continue;
      moulure(x, y(0.9), x + pas, y(0.3));
      moulure(x, y(3.9), x + pas, y(1.35));
    }
    // les baies : un cadre clair, l'arc en haut ; leur verre est peint dans la lueur
    for (const f of fenetres) {
      const cx = f * l;
      const demi = 0.75 * m;
      ctx.fillStyle = "#0B0A16";
      ctx.beginPath();
      ctx.moveTo(cx - demi, y(0.55));
      ctx.lineTo(cx - demi, y(3.0));
      ctx.arc(cx, y(3.0), demi, Math.PI, 0);
      ctx.lineTo(cx + demi, y(0.55));
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#4A4266";
      ctx.lineWidth = 7;
      ctx.stroke();
    }
  };
}

/** La nuit dans les baies : bleu profond, lueur de ville en bas, petites fenêtres allumées. */
function lueurBaies(alea: () => number, largeurM: number, fenetres: number[]): Peintre {
  return (ctx, l, h) => {
    const m = l / largeurM;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, l, h);
    const y = (metres: number) => h - metres * m;
    for (const f of fenetres) {
      const cx = f * l;
      const demi = 0.75 * m - 4;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx - demi, y(0.55) - 4);
      ctx.lineTo(cx - demi, y(3.0));
      ctx.arc(cx, y(3.0), demi, Math.PI, 0);
      ctx.lineTo(cx + demi, y(0.55) - 4);
      ctx.closePath();
      ctx.clip();
      const g = ctx.createLinearGradient(0, y(3.75), 0, y(0.55));
      g.addColorStop(0, "#0A1240");
      g.addColorStop(0.65, "#1B2470");
      g.addColorStop(1, "#5B3A86");
      ctx.fillStyle = g;
      ctx.fillRect(cx - demi, y(3.8), demi * 2, 3.3 * m);
      // la ville au loin
      for (let k = 0; k < 7; k++) {
        const bx = cx - demi + alea() * demi * 2;
        const bh = (0.4 + alea() * 1.1) * m;
        ctx.fillStyle = "#0A0B22";
        ctx.fillRect(bx - 0.2 * m, y(0.55) - bh, (0.25 + alea() * 0.35) * m, bh);
        for (let w = 0; w < 9; w++) {
          ctx.fillStyle = alea() < 0.5 ? "rgba(255,200,130,0.9)" : "rgba(160,190,255,0.6)";
          ctx.fillRect(bx - 0.18 * m + alea() * 0.25 * m, y(0.55) - alea() * bh, 3, 3);
        }
      }
      // les montants de la baie
      ctx.fillStyle = "#000";
      ctx.fillRect(cx - 3, y(3.75), 6, 3.3 * m);
      ctx.fillRect(cx - demi, y(1.9), demi * 2, 5);
      ctx.restore();
    }
  };
}

/** Le velours du rideau de scène : des plis verticaux, plus sombres au creux. */
const velours: Peintre = (ctx, l, h) => {
  for (let x = 0; x < l; x++) {
    const v = 0.5 + 0.5 * Math.sin((x / l) * Math.PI * 2 * 18);
    const r = 46 + v * 40;
    ctx.fillStyle = `rgb(${r},${18 + v * 14},${70 + v * 46})`;
    ctx.fillRect(x, 0, 1, h);
  }
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "rgba(0,0,0,0.45)");
  g.addColorStop(0.3, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.25)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, l, h);
};

/** Les facettes de la boule : des carreaux de miroir et leurs joints. */
const facettes: Peintre = (ctx, l, h) => {
  ctx.fillStyle = "#2a2a30";
  ctx.fillRect(0, 0, l, h);
  const n = 40;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n / 2; j++) {
      const v = 170 + Math.random() * 85;
      ctx.fillStyle = `rgb(${v},${v},${v + 6})`;
      ctx.fillRect((i * l) / n + 1, (j * h) / (n / 2) + 1, l / n - 2, h / (n / 2) - 2);
    }
};

/** Le panneau du pupitre du DJ : une grille de petites diodes. */
const diodes: Peintre = (ctx, l, h) => {
  ctx.fillStyle = "#08070F";
  ctx.fillRect(0, 0, l, h);
  for (let x = 0; x < 24; x++)
    for (let y = 0; y < 10; y++) {
      const t = Math.sin(x * 0.5 + y * 0.9) * 0.5 + 0.5;
      ctx.fillStyle = t > 0.6 ? ROSE : t > 0.3 ? VIOLET : "#1A1730";
      ctx.beginPath();
      ctx.arc((x + 0.5) * (l / 24), (y + 0.5) * (h / 10), 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
};

/** Le mur blanc du bureau, un enduit à peine nuancé. */
const enduitClair: Peintre = (ctx, l, h) => {
  ctx.fillStyle = "#DCD9E8";
  ctx.fillRect(0, 0, l, h);
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = Math.random() < 0.5 ? "rgba(255,255,255,0.35)" : "rgba(80,70,120,0.035)";
    ctx.fillRect(Math.random() * l, Math.random() * h, 2, 2);
  }
};

/** Le matin derrière la fenêtre du bureau : ciel pâle, immeubles clairs au loin. */
const matin: Peintre = (ctx, l, h) => {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#BFD3FF");
  g.addColorStop(0.55, "#E9EEFF");
  g.addColorStop(1, "#FFE9D6");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, l, h);
  const soleil = ctx.createRadialGradient(l * 0.18, h * 0.5, 0, l * 0.18, h * 0.5, l * 0.5);
  soleil.addColorStop(0, "rgba(255,246,225,0.95)");
  soleil.addColorStop(1, "rgba(255,246,225,0)");
  ctx.fillStyle = soleil;
  ctx.fillRect(0, 0, l, h);
  for (let i = 0; i < 14; i++) {
    const x = (i / 14) * l + Math.random() * 20;
    const bh = h * (0.18 + Math.random() * 0.3);
    ctx.fillStyle = `rgba(${150 + Math.random() * 30},${160 + Math.random() * 30},${200 + Math.random() * 30},0.55)`;
    ctx.fillRect(x, h - bh, l / 16 + Math.random() * 30, bh);
  }
};

/** Le cadran de l'horloge du bureau : 9 h pile. */
const cadran: Peintre = (ctx, l) => {
  const c = l / 2;
  ctx.fillStyle = "#FBFAFE";
  ctx.beginPath();
  ctx.arc(c, c, c, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = NUIT;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.lineWidth = i % 3 === 0 ? 10 : 4;
    ctx.beginPath();
    ctx.moveTo(c + Math.sin(a) * c * 0.78, c - Math.cos(a) * c * 0.78);
    ctx.lineTo(c + Math.sin(a) * c * 0.9, c - Math.cos(a) * c * 0.9);
    ctx.stroke();
  }
  ctx.lineCap = "round";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(c, c);
  ctx.lineTo(c - c * 0.48, c); // la petite aiguille sur le 9
  ctx.stroke();
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(c, c);
  ctx.lineTo(c, c - c * 0.7); // la grande sur le 12
  ctx.stroke();
  ctx.fillStyle = ROSE;
  ctx.beginPath();
  ctx.arc(c, c, 12, 0, Math.PI * 2);
  ctx.fill();
};

/* ============================ matières de lumière ============================ */

/**
 * Des halos posés sur des points : un disque doux, additif, d'une taille en mètres.
 * Ils donnent leur lueur aux ampoules sur téléphone, où il n'y a pas de halo de
 * post-traitement, et les reflets de la boule à facettes.
 */
function matiereHalos() {
  return new THREE.ShaderMaterial({
    uniforms: { echelle: { value: 400 } },
    vertexShader: /* glsl */ `
      attribute float taille;
      attribute float force;
      attribute vec3 teinte;
      uniform float echelle;
      varying vec3 vTeinte;
      varying float vForce;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = taille * echelle / -mv.z;
        vTeinte = teinte;
        vForce = force;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vTeinte;
      varying float vForce;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float a = pow(max(0.0, 1.0 - d), 2.4) * vForce;
        if (a < 0.002) discard;
        gl_FragColor = vec4(vTeinte, a);
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

/** Le faisceau d'un projecteur : un cône ouvert, vif à la source, fondu sur les bords. */
function matiereFaisceau(couleur: string) {
  return new THREE.ShaderMaterial({
    uniforms: { couleur: { value: new THREE.Color(couleur) }, force: { value: 1 } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying float vBord;
      void main() {
        vUv = uv;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vec3 n = normalize(normalMatrix * normal);
        vBord = abs(dot(n, normalize(-mv.xyz)));
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 couleur;
      uniform float force;
      varying vec2 vUv;
      varying float vBord;
      void main() {
        float a = pow(vUv.y, 1.6) * pow(vBord, 1.8) * force * 0.55;
        gl_FragColor = vec4(couleur, a);
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
}

/** Une flaque de lumière au sol : un disque additif, plus fort au centre. */
function matiereFlaque(couleur: string) {
  return new THREE.ShaderMaterial({
    uniforms: { couleur: { value: new THREE.Color(couleur) }, force: { value: 1 } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      uniform vec3 couleur;
      uniform float force;
      varying vec2 vUv;
      void main() {
        float d = length(vUv - 0.5) * 2.0;
        float a = pow(max(0.0, 1.0 - d), 2.0) * force;
        gl_FragColor = vec4(couleur, a);
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

/* ============================ géométries ============================ */

/** La silhouette d'un invité, tournée comme une pièce d'échecs : sans visage, sans bras. */
function geometrieSilhouette() {
  const profil = [
    [0.0, 0.0], [0.2, 0.0], [0.215, 0.05], [0.19, 0.16], [0.16, 0.5], [0.155, 0.72],
    [0.19, 0.98], [0.215, 1.12], [0.2, 1.2], [0.14, 1.25], [0.075, 1.28], [0.06, 1.32], [0.0, 1.32],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(profil, 18);
}

/** Une chaise de réception, d'un seul tenant. */
function geometrieChaise() {
  const parts: THREE.BufferGeometry[] = [];
  const assise = new RoundedBoxGeometry(0.44, 0.06, 0.42, 2, 0.02);
  assise.translate(0, 0.46, 0);
  parts.push(assise);
  const dossier = new RoundedBoxGeometry(0.44, 0.42, 0.04, 2, 0.015);
  dossier.translate(0, 0.74, -0.19);
  parts.push(dossier);
  for (const [x, z] of [[-0.19, -0.18], [0.19, -0.18], [-0.19, 0.18], [0.19, 0.18]]) {
    const pied = new THREE.CylinderGeometry(0.018, 0.014, 0.46, 6);
    pied.translate(x, 0.23, z);
    parts.push(pied);
  }
  for (const x of [-0.19, 0.19]) {
    const montant = new THREE.CylinderGeometry(0.016, 0.016, 0.44, 6);
    montant.translate(x, 0.7, -0.19);
    parts.push(montant);
  }
  const g = mergeGeometries(parts.map((p) => (p.index ? p.toNonIndexed() : p)));
  parts.forEach((p) => p.dispose());
  return g;
}

/** Un verre droit, épais, de dessin (assez grand pour qu'on le voie se remplir). */
function geometrieVerre() {
  const profil = [[0.0, 0.0], [0.06, 0.0], [0.066, 0.01], [0.072, 0.17], [0.066, 0.17], [0.06, 0.016], [0.0, 0.016]].map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(profil, 20);
}

/** Une chaînette pendante entre deux points : une parabole, échantillonnée. */
function chainette(a: THREE.Vector3, b: THREE.Vector3, fleche: number, n: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const p = a.clone().lerp(b, t);
    p.y -= fleche * 4 * t * (1 - t);
    pts.push(p);
  }
  return pts;
}

/* ============================ les données de la soirée ============================ */

type Personne = {
  couleur: THREE.Color;
  taille: number;
  phase: number;
  retard: number;
  danse: THREE.Vector3; // vendredi 23 h : sur la piste (y : la hauteur du sol, la scène pour le chanteur)
  chaise: THREE.Vector3; // 21 h : assis, tourné vers la table
  table: THREE.Vector3;
  accueil: THREE.Vector3; // 19 h : devant la table d'accueil
  chanteur: boolean;
};

type Confetti = {
  bouche: THREE.Vector3;
  sol: THREE.Vector3;
  haut: number;
  depart: number;
  duree: number;
  tour: THREE.Vector3;
  angleSol: number;
  phase: number;
};

type Ballon = { ancre: THREE.Vector3; ecart: THREE.Vector3; plafond: THREE.Vector3; longueur: number; retard: number; phase: number };

/** Les tables du dîner (x, z) : quatre rondes, nappées jusqu'au sol, sous les poutres. */
const TABLES: [number, number][] = [[-5.2, -0.6], [-5.2, 2.85], [-1.6, 3.4], [5.6, 3.3]];
/** Les suspensions de la salle, dans l'ordre où elles se rallument (de la piste vers l'accueil). */
const SUSPENSIONS: [number, number][] = [[5.6, -0.2], [5.6, 3.3], [2.0, 3.5], [-1.6, 3.4], [-1.6, -0.9], [-5.2, 2.85], [-5.2, -0.6]];
const POUTRES = [-5.2, -1.6, 2.0, 5.6];
const PORTE = { x: -6.0, largeur: 1.15, hauteur: 2.45 };
const ACCUEIL = { x: -3.9, z: -4.05 };
const MICRO = new THREE.Vector3(2.5, 0.5, -3.15);
const BOULE = new THREE.Vector3(3.8, 3.55, -0.7);
const PROJECTEURS = [1.0, 2.6, 4.2, 5.8];
const COULEURS_FAISCEAUX = [ROSE, VIOLET, BLEU, ROSE];
const CANONS = [new THREE.Vector3(-0.05, 0, -2.25), new THREE.Vector3(6.75, 0, -2.25)];

/* ============================ la construction ============================ */

export type Cadrage = "paysage" | "portrait";

export type Soiree = {
  racine: THREE.Group;
  /** Pose la scène à l'instant `p` (0 : la fête, 1 : lundi), `temps` en secondes pour la vie en place. */
  appliquer: (p: number, temps: number) => { eclat: number };
  /** Le plan de caméra à l'instant `p`. */
  camera: (p: number, cadrage: Cadrage, cible: THREE.Vector3, position: THREE.Vector3) => number;
  lumieres: THREE.Light[];
  halos: THREE.ShaderMaterial[];
  fond: { nuit: THREE.Texture; matin: THREE.Texture };
  /** L'instant où l'on quitte la salle pour le bureau. */
  coupe: number;
  liberer: () => void;
};

export function construireSoiree(options: { ordinateur: boolean }): Soiree {
  const { ordinateur } = options;
  const alea = hasard(1027);
  const textures: THREE.Texture[] = [];
  const racine = new THREE.Group();
  const salle = new THREE.Group();
  const bureau = new THREE.Group();
  bureau.position.set(60, 0, 0);
  racine.add(salle, bureau);

  const ombres = ordinateur;
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material | THREE.Material[], parent: THREE.Object3D, ombre = true) => {
    const o = new THREE.Mesh(g, m);
    if (ombres) {
      o.castShadow = ombre;
      o.receiveShadow = true;
    }
    parent.add(o);
    return o;
  };

  /* ---------- matières communes ---------- */
  const coupe = new THREE.MeshStandardMaterial({ color: COUPE, roughness: 0.9 });
  const noirLaque = new THREE.MeshStandardMaterial({ color: "#0B0A12", roughness: 0.18, metalness: 0.1 });
  const noirMat = new THREE.MeshStandardMaterial({ color: "#16131F", roughness: 0.75 });
  const metal = new THREE.MeshStandardMaterial({ color: "#C9C6D6", roughness: 0.28, metalness: 1 });
  const nappe = new THREE.MeshStandardMaterial({ color: "#EFEDF6", roughness: 0.92 });
  const blanc = new THREE.MeshStandardMaterial({ color: "#F7F6FB", roughness: 0.5 });

  /* ============================ LA SALLE ============================ */

  // Le socle et le parquet sombre (14 m × 10 m).
  const socle = mesh(new THREE.BoxGeometry(14.4, 0.5, 10.4), [coupe, coupe, noirMat, coupe, coupe, coupe], salle, false);
  socle.position.set(-0.2, -0.25, -0.2);
  const texParquet = toile(textures, 1024, 1024, parquet(alea, [58, 40, 36], 22, "rgba(10,6,8,0.85)"));
  texParquet.repeat.set(3.5, 2.5);
  const sol = mesh(new THREE.PlaneGeometry(14, 10), new THREE.MeshStandardMaterial({ map: texParquet, roughness: 0.38, metalness: 0.05 }), salle, false);
  sol.rotation.x = -Math.PI / 2;
  sol.position.y = 0.001;

  // La piste : une laque noire bordée d'un filet clair.
  const piste = mesh(new THREE.BoxGeometry(6.0, 0.03, 3.9), [coupe, coupe, noirLaque, coupe, coupe, coupe], salle, false);
  piste.position.set(3.3, 0.015, -0.55);

  // Les murs : le fond (avec sa porte) et la gauche, en tranche claire.
  const largeurFond = 14;
  const fenetresFond = [0.27];
  const fenetresGauche = [0.2, 0.52, 0.84];
  const lueurMur = toile(textures, 1536, 512, lueurBaies(alea, largeurFond, fenetresFond));
  const peintureFond = toile(textures, 1536, 512, murSalle(alea, largeurFond, fenetresFond, [PORTE.x + 7 - PORTE.largeur / 2, PORTE.x + 7 + PORTE.largeur / 2]));
  const lueurGauche = toile(textures, 1152, 512, lueurBaies(alea, 10, fenetresGauche));
  const peintureGauche = toile(textures, 1152, 512, murSalle(alea, 10, fenetresGauche));
  for (const t of [lueurMur, peintureFond, lueurGauche, peintureGauche]) t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  const murFond = new THREE.MeshStandardMaterial({ map: peintureFond, emissiveMap: lueurMur, emissive: "#ffffff", emissiveIntensity: 1, roughness: 0.85 });
  const murGauche = new THREE.MeshStandardMaterial({ map: peintureGauche, emissiveMap: lueurGauche, emissive: "#ffffff", emissiveIntensity: 1, roughness: 0.85 });
  const H = 4.6;
  const E = 0.25;

  /** Un pan de mur : une boîte en tranche claire et sa face peinte, aux coordonnées du mur entier. */
  const panFond = (x0: number, x1: number, y0: number, y1: number) => {
    const boite = mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, E), coupe, salle);
    boite.position.set((x0 + x1) / 2, (y0 + y1) / 2, -5 - E / 2);
    const face = new THREE.PlaneGeometry(x1 - x0, y1 - y0);
    const uv = face.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, ((uv.getX(i) ? x1 : x0) + 7) / largeurFond, (uv.getY(i) ? y1 : y0) / H);
    const f = mesh(face, murFond, salle, false);
    f.position.set((x0 + x1) / 2, (y0 + y1) / 2, -5 + 0.002);
  };
  const p0 = PORTE.x - PORTE.largeur / 2;
  const p1 = PORTE.x + PORTE.largeur / 2;
  panFond(-7.25, p0, 0, H);
  panFond(p1, 7, 0, H);
  panFond(p0, p1, PORTE.hauteur, H);
  // Derrière la porte, un vestibule sombre où les invités disparaissent, et sa lueur chaude.
  const vestibule = mesh(new THREE.BoxGeometry(2.4, PORTE.hauteur + 0.2, 2.2), new THREE.MeshBasicMaterial({ color: "#07060C", side: THREE.BackSide }), salle, false);
  vestibule.position.set(PORTE.x, PORTE.hauteur / 2, -6.35);
  const lueurPorte = mesh(new THREE.PlaneGeometry(PORTE.largeur - 0.1, PORTE.hauteur - 0.1), new THREE.MeshBasicMaterial({ color: "#5A3A2A" }), salle, false);
  lueurPorte.position.set(PORTE.x, PORTE.hauteur / 2, -7.4);

  // la face intérieure du mur gauche (+x) porte la peinture ; les autres sont en tranche
  const murG = mesh(new THREE.BoxGeometry(E, H, 10.5), [murGauche, coupe, coupe, coupe, coupe, coupe], salle);
  murG.position.set(-7 - E / 2, H / 2, -0.25);

  // Les poutres, coupées net à l'avant comme la maquette.
  for (const x of POUTRES) {
    const poutre = mesh(new THREE.BoxGeometry(0.14, 0.24, 10.25), [noirMat, noirMat, noirMat, noirMat, coupe, noirMat], salle);
    poutre.position.set(x, H - 0.12, -0.12);
  }

  // La scène, son rideau de velours, son filet de lumière.
  const scene = mesh(new THREE.BoxGeometry(6.8, 0.5, 2.35), [noirMat, noirMat, noirLaque, noirMat, noirMat, noirMat], salle);
  scene.position.set(3.4, 0.25, -3.85);
  const filet = mesh(new THREE.BoxGeometry(6.8, 0.035, 0.035), new THREE.MeshBasicMaterial({ color: ROSE, toneMapped: false }), salle, false);
  filet.position.set(3.4, 0.49, -2.68);
  const filetMat = filet.material as THREE.MeshBasicMaterial;
  const marche = mesh(new THREE.BoxGeometry(0.9, 0.25, 0.4), noirMat, salle);
  marche.position.set(0.55, 0.125, -2.5);
  const texVelours = toile(textures, 1024, 64, velours);
  const rideauGeo = new THREE.PlaneGeometry(6.6, 3.9, 96, 1);
  const pos = rideauGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) pos.setZ(i, Math.sin(pos.getX(i) * 8.6) * 0.07);
  rideauGeo.computeVertexNormals();
  const rideau = mesh(rideauGeo, new THREE.MeshStandardMaterial({ map: texVelours, roughness: 0.62, metalness: 0.0 }), salle, false);
  rideau.position.set(3.4, 0.5 + 1.95, -4.93);

  // Les enceintes, le pupitre, le micro.
  for (const x of [0.5, 6.3]) {
    const enceinte = mesh(new RoundedBoxGeometry(0.62, 1.35, 0.55, 2, 0.04), noirMat, salle);
    enceinte.position.set(x, 0.5 + 0.675, -3.35);
    for (const [y, r] of [[1.42, 0.2], [0.88, 0.12]] as const) {
      const membrane = mesh(new THREE.CylinderGeometry(r, r, 0.02, 24), new THREE.MeshStandardMaterial({ color: "#2A2638", roughness: 0.4 }), salle, false);
      membrane.rotation.x = Math.PI / 2;
      membrane.position.set(x, y, -3.06);
    }
  }
  const texDiodes = toile(textures, 512, 200, diodes);
  const pupitre = mesh(new RoundedBoxGeometry(1.7, 1.0, 0.62, 2, 0.03), [noirMat], salle);
  pupitre.position.set(4.4, 1.0, -4.1);
  const facade = mesh(new THREE.PlaneGeometry(1.55, 0.8), new THREE.MeshBasicMaterial({ map: texDiodes, toneMapped: false }), salle, false);
  facade.position.set(4.4, 1.0, -3.785);
  const facadeMat = facade.material as THREE.MeshBasicMaterial;
  for (const x of [4.0, 4.8]) {
    const platine = mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.04, 28), metal, salle);
    platine.position.set(x, 1.52, -4.1);
  }
  const pied = mesh(new THREE.CylinderGeometry(0.014, 0.014, 1.45, 8), metal, salle);
  pied.position.set(MICRO.x, 0.5 + 0.725, MICRO.z);
  const embase = mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.03, 20), noirMat, salle);
  embase.position.set(MICRO.x, 0.515, MICRO.z);
  const micro = mesh(new THREE.CapsuleGeometry(0.045, 0.12, 4, 12), noirMat, salle);
  micro.position.set(MICRO.x, 0.5 + 1.5, MICRO.z + 0.05);
  micro.rotation.x = 0.9;

  // La structure des projecteurs, accrochée aux poutres.
  const tige = (a: THREE.Vector3, b: THREE.Vector3, r: number) => {
    const g = new THREE.CylinderGeometry(r, r, a.distanceTo(b), 6);
    g.translate(0, a.distanceTo(b) / 2, 0);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()));
    g.translate(a.x, a.y, a.z);
    return g.toNonIndexed();
  };
  const pieces: THREE.BufferGeometry[] = [];
  const yT = 3.95;
  const zT = -2.9;
  for (const [dy, dz] of [[0.14, 0.14], [0.14, -0.14], [-0.14, 0.14], [-0.14, -0.14]]) pieces.push(tige(new THREE.Vector3(0.3, yT + dy, zT + dz), new THREE.Vector3(6.6, yT + dy, zT + dz), 0.022));
  for (let x = 0.3; x < 6.55; x += 0.42) {
    pieces.push(tige(new THREE.Vector3(x, yT - 0.14, zT + 0.14), new THREE.Vector3(x + 0.42, yT + 0.14, zT + 0.14), 0.012));
    pieces.push(tige(new THREE.Vector3(x, yT - 0.14, zT - 0.14), new THREE.Vector3(x + 0.42, yT + 0.14, zT - 0.14), 0.012));
  }
  for (const x of [2.0, 5.6]) pieces.push(tige(new THREE.Vector3(x, yT + 0.14, zT), new THREE.Vector3(x, H - 0.24, zT), 0.012));
  mesh(mergeGeometries(pieces), metal, salle);
  pieces.forEach((g) => g.dispose());
  const sources: THREE.Vector3[] = [];
  const lentilles: THREE.MeshBasicMaterial[] = [];
  PROJECTEURS.forEach((x, i) => {
    const corps = mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.3, 14), noirMat, salle);
    corps.position.set(x, yT - 0.32, zT + 0.05);
    corps.rotation.x = 0.5;
    const lentille = new THREE.MeshBasicMaterial({ color: COULEURS_FAISCEAUX[i], toneMapped: false });
    const disque = mesh(new THREE.CircleGeometry(0.1, 16), lentille, salle, false);
    disque.position.set(x, yT - 0.46, zT + 0.13);
    disque.rotation.x = Math.PI / 2 + 0.5;
    lentilles.push(lentille);
    sources.push(new THREE.Vector3(x, yT - 0.46, zT + 0.12));
  });
  const faisceaux = sources.map((s, i) => {
    const m = matiereFaisceau(COULEURS_FAISCEAUX[i]);
    const g = new THREE.ConeGeometry(1, 1, 28, 1, true);
    const cone = new THREE.Mesh(g, m);
    cone.renderOrder = 3;
    salle.add(cone);
    const flaque = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), matiereFlaque(COULEURS_FAISCEAUX[i]));
    flaque.rotation.x = -Math.PI / 2;
    flaque.renderOrder = 2;
    salle.add(flaque);
    return { cone, flaque, source: s, phase: i * 1.7 };
  });

  // La boule à facettes et ses éclats sur les murs et le sol.
  const texFacettes = toile(textures, 512, 256, facettes);
  const boule = mesh(new THREE.IcosahedronGeometry(0.42, 3), new THREE.MeshStandardMaterial({ map: texFacettes, metalness: 1, roughness: 0.12, flatShading: true }), salle);
  boule.position.copy(BOULE);
  // une traverse entre deux poutres porte la boule
  const traverse = mesh(new THREE.BoxGeometry(3.6, 0.08, 0.08), noirMat, salle, false);
  traverse.position.set(3.8, H - 0.2, BOULE.z);
  const filBoule = mesh(new THREE.CylinderGeometry(0.008, 0.008, H - BOULE.y - 0.4, 4), metal, salle, false);
  filBoule.position.set(BOULE.x, (H + BOULE.y + 0.4) / 2, BOULE.z);
  const NB_ECLATS = ordinateur ? 140 : 80;
  const directions: THREE.Vector3[] = [];
  for (let i = 0; i < NB_ECLATS; i++) {
    const d = new THREE.Vector3(alea() - 0.5, alea() * 0.9 - 0.65, alea() - 0.5).normalize();
    directions.push(d);
  }
  const eclatsGeo = new THREE.BufferGeometry();
  eclatsGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(NB_ECLATS * 3), 3));
  eclatsGeo.setAttribute("taille", new THREE.BufferAttribute(new Float32Array(NB_ECLATS).fill(0.22), 1));
  eclatsGeo.setAttribute("force", new THREE.BufferAttribute(new Float32Array(NB_ECLATS), 1));
  const teintesEclats = new Float32Array(NB_ECLATS * 3);
  const cEclat = new THREE.Color();
  for (let i = 0; i < NB_ECLATS; i++) {
    cEclat.set(i % 5 === 0 ? ROSE : i % 7 === 0 ? BLEU : "#FFFFFF");
    teintesEclats.set([cEclat.r, cEclat.g, cEclat.b], i * 3);
  }
  eclatsGeo.setAttribute("teinte", new THREE.BufferAttribute(teintesEclats, 3));
  const matEclats = matiereHalos();
  const eclats = new THREE.Points(eclatsGeo, matEclats);
  eclats.frustumCulled = false;
  eclats.renderOrder = 4;
  salle.add(eclats);

  // Les guirlandes, de mur à poutre, en travers de la salle.
  const ampoules: THREE.Vector3[] = [];
  const fils: THREE.BufferGeometry[] = [];
  for (const z of [-3.4, -1.2, 1.1, 3.4]) {
    const appuis = [new THREE.Vector3(-7, H - 0.32, z), ...POUTRES.map((x) => new THREE.Vector3(x, H - 0.3, z))];
    for (let k = 0; k < appuis.length - 1; k++) {
      const pts = chainette(appuis[k], appuis[k + 1], 0.42 + alea() * 0.12, 18);
      fils.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.008, 4));
      const n = Math.round(appuis[k].distanceTo(appuis[k + 1]) / 0.5);
      for (let i = 1; i < n; i++) {
        const pt = chainette(appuis[k], appuis[k + 1], 0.42, n)[i];
        pt.y -= 0.05;
        ampoules.push(pt);
      }
    }
  }
  mesh(mergeGeometries(fils), noirMat, salle, false);
  fils.forEach((g) => g.dispose());
  const matAmpoule = new THREE.MeshBasicMaterial({ color: new THREE.Color(AMBRE).multiplyScalar(2.2), toneMapped: false });
  const ampoulesMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 8, 6), matAmpoule, ampoules.length);
  const m4 = new THREE.Matrix4();
  ampoules.forEach((a, i) => ampoulesMesh.setMatrixAt(i, m4.makeTranslation(a.x, a.y, a.z)));
  salle.add(ampoulesMesh);

  // Les halos : ceux des ampoules, puis ceux des suspensions (rallumées une à une).
  const nbHalos = ampoules.length + SUSPENSIONS.length;
  const halosGeo = new THREE.BufferGeometry();
  const posHalos = new Float32Array(nbHalos * 3);
  const tailleHalos = new Float32Array(nbHalos);
  const forceHalos = new Float32Array(nbHalos);
  const teinteHalos = new Float32Array(nbHalos * 3);
  const cAmbre = new THREE.Color(AMBRE);
  ampoules.forEach((a, i) => {
    posHalos.set([a.x, a.y, a.z], i * 3);
    tailleHalos[i] = ordinateur ? 0.45 : 0.7;
    forceHalos[i] = 0.5;
    teinteHalos.set([cAmbre.r, cAmbre.g, cAmbre.b], i * 3);
  });
  const cChaud = new THREE.Color("#FFD9A8");
  SUSPENSIONS.forEach(([x, z], k) => {
    const i = ampoules.length + k;
    posHalos.set([x, 3.25, z], i * 3);
    tailleHalos[i] = 1.25;
    teinteHalos.set([cChaud.r, cChaud.g, cChaud.b], i * 3);
  });
  halosGeo.setAttribute("position", new THREE.BufferAttribute(posHalos, 3));
  halosGeo.setAttribute("taille", new THREE.BufferAttribute(tailleHalos, 1));
  halosGeo.setAttribute("force", new THREE.BufferAttribute(forceHalos, 1));
  halosGeo.setAttribute("teinte", new THREE.BufferAttribute(teinteHalos, 3));
  const matHalos = matiereHalos();
  const halos = new THREE.Points(halosGeo, matHalos);
  halos.frustumCulled = false;
  halos.renderOrder = 5;
  salle.add(halos);

  // Les suspensions : un globe de verre opalin, son fil, et la flaque de lumière dessous.
  const globes = SUSPENSIONS.map(([x, z]) => {
    const mat = new THREE.MeshStandardMaterial({ color: "#3A3550", emissive: "#FFD9A8", emissiveIntensity: 0, roughness: 0.3 });
    const globe = mesh(new THREE.SphereGeometry(0.28, 24, 16), mat, salle, false);
    globe.position.set(x, 3.25, z);
    const fil = mesh(new THREE.CylinderGeometry(0.006, 0.006, H - 0.24 - 3.5, 4), noirMat, salle, false);
    fil.position.set(x, (H - 0.24 + 3.5) / 2, z);
    const flaque = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.2), matiereFlaque("#FFC98F"));
    flaque.rotation.x = -Math.PI / 2;
    flaque.position.set(x, 0.02, z);
    flaque.renderOrder = 2;
    salle.add(flaque);
    return { mat, flaque: flaque.material as THREE.ShaderMaterial };
  });

  // Les tables nappées, leurs assiettes, leurs verres, et les chaises autour.
  const verresPos: THREE.Vector3[] = [];
  const chaises: { pos: THREE.Vector3; angle: number; table: THREE.Vector3 }[] = [];
  for (const [x, z] of TABLES) {
    const t = mesh(new THREE.CylinderGeometry(0.82, 0.88, 0.76, 40), nappe, salle);
    t.position.set(x, 0.38, z);
    const pied = mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.06, 12), new THREE.MeshStandardMaterial({ color: ROSE, roughness: 0.5 }), salle);
    pied.position.set(x, 0.79, z);
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
      const assiette = mesh(new THREE.CylinderGeometry(0.15, 0.12, 0.02, 24), blanc, salle, false);
      assiette.position.set(x + Math.cos(a) * 0.52, 0.775, z + Math.sin(a) * 0.52);
      verresPos.push(new THREE.Vector3(x + Math.cos(a + 0.42) * 0.5, 0.765, z + Math.sin(a + 0.42) * 0.5));
      const cp = new THREE.Vector3(x + Math.cos(a) * 1.12, 0, z + Math.sin(a) * 1.12);
      chaises.push({ pos: cp, angle: Math.atan2(x - cp.x, z - cp.z), table: new THREE.Vector3(x, 0, z) });
    }
  }
  const chaisesMesh = new THREE.InstancedMesh(geometrieChaise(), new THREE.MeshStandardMaterial({ color: "#C8B38E", roughness: 0.32, metalness: 0.75 }), chaises.length);
  const q = new THREE.Quaternion();
  const un = new THREE.Vector3(1, 1, 1);
  const Y = new THREE.Vector3(0, 1, 0);
  chaises.forEach((c, i) => chaisesMesh.setMatrixAt(i, m4.compose(c.pos, q.setFromAxisAngle(Y, c.angle), un)));
  chaisesMesh.castShadow = ombres;
  salle.add(chaisesMesh);

  const verreGeo = geometrieVerre();
  const verres = new THREE.InstancedMesh(verreGeo, new THREE.MeshStandardMaterial({ color: "#E8EEFF", roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.38 }), verresPos.length);
  verresPos.forEach((v, i) => verres.setMatrixAt(i, m4.makeTranslation(v.x, v.y, v.z)));
  verres.renderOrder = 1;
  salle.add(verres);
  // Le sirop de grenadine : pas d'alcool à table, ni montré ni suggéré.
  const liquideGeo = new THREE.CylinderGeometry(0.06, 0.056, 1, 18);
  liquideGeo.translate(0, 0.5, 0);
  const liquides = new THREE.InstancedMesh(liquideGeo, new THREE.MeshStandardMaterial({ color: "#FF4F7E", roughness: 0.15, emissive: "#5A0A22", emissiveIntensity: 0.4 }), verresPos.length);
  liquides.frustumCulled = false;
  salle.add(liquides);

  // La table d'accueil et ses badges.
  const accueil = mesh(new RoundedBoxGeometry(1.9, 0.95, 0.62, 2, 0.03), nappe, salle);
  accueil.position.set(ACCUEIL.x, 0.475, ACCUEIL.z);
  for (let i = 0; i < 9; i++) {
    const badge = mesh(new THREE.BoxGeometry(0.11, 0.008, 0.075), new THREE.MeshStandardMaterial({ color: i % 3 === 0 ? ROSE : "#FFFFFF", roughness: 0.5 }), salle, false);
    badge.position.set(ACCUEIL.x - 0.7 + (i % 5) * 0.32 + (i > 4 ? 0.16 : 0), 0.955, ACCUEIL.z - 0.1 + (i > 4 ? 0.16 : 0));
    badge.rotation.y = (alea() - 0.5) * 0.3;
  }

  // Les canons à confettis, au pied de la scène.
  CANONS.forEach((c, i) => {
    const base = mesh(new RoundedBoxGeometry(0.34, 0.16, 0.34, 2, 0.03), noirMat, salle);
    base.position.set(c.x, 0.08, c.z);
    const tube = mesh(new THREE.CylinderGeometry(0.1, 0.085, 0.8, 18), new THREE.MeshStandardMaterial({ color: i ? "#E7E4F2" : ROSE, roughness: 0.35, metalness: 0.4 }), salle);
    tube.position.set(c.x + (i ? -0.13 : 0.13), 0.52, c.z + 0.1);
    tube.rotation.z = i ? 0.32 : -0.32;
    tube.rotation.x = 0.22;
    c.set(c.x + (i ? -0.26 : 0.26), 0.9, c.z + 0.18); // la bouche
  });

  /* ---------- les invités ---------- */
  const silhouette = geometrieSilhouette();
  const teintes = ["#EDEBF5", "#B9B4CC", "#3A3552", "#1E1B2C", ROSE, "#EDEBF5", "#8E88A8", "#2B2740", VIOLET, "#EDEBF5", "#B9B4CC", "#1E1B2C", AMBRE, "#5C5778", "#EDEBF5", ROSE];
  const dansePos: THREE.Vector3[] = [];
  while (dansePos.length < chaises.length) {
    const v = new THREE.Vector3(0.9 + alea() * 4.9, 0.03, -2.0 + alea() * 2.9);
    if (dansePos.every((d) => d.distanceTo(v) > 0.62) && v.distanceTo(new THREE.Vector3(BOULE.x, 0, BOULE.z)) > 0.4) dansePos.push(v);
  }
  const personnes: Personne[] = chaises.map((c, i) => {
    const chanteur = i === 6;
    const versTable = c.table.clone().sub(c.pos).normalize().multiplyScalar(0.06);
    return {
      couleur: new THREE.Color(teintes[i % teintes.length]),
      taille: 0.93 + alea() * 0.14,
      phase: alea() * Math.PI * 2,
      retard: alea() * 0.045,
      danse: chanteur ? new THREE.Vector3(MICRO.x, 0.5, MICRO.z - 0.42) : dansePos[i],
      chaise: c.pos.clone().add(versTable),
      table: c.table,
      accueil: new THREE.Vector3(-6.35 + (i % 8) * 0.42 + (i >= 8 ? 0.2 : 0), 0, -3.05 + (i >= 8 ? 0.55 : 0) + (alea() - 0.5) * 0.12),
      chanteur,
    };
  });
  // le DJ, à son pupitre jusqu'à la fin
  const NB = personnes.length + 1;
  const matInvites = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.0 });
  const corps = new THREE.InstancedMesh(silhouette, matInvites, NB);
  const tetes = new THREE.InstancedMesh(new THREE.SphereGeometry(0.135, 18, 14), matInvites, NB);
  for (const im of [corps, tetes]) {
    im.frustumCulled = false;
    im.castShadow = ombres;
    personnes.forEach((p, i) => im.setColorAt(i, p.couleur));
    im.setColorAt(NB - 1, new THREE.Color("#EDEBF5"));
    salle.add(im);
  }
  // Une ombre douce sous chaque invité : sur téléphone, c'est la seule.
  const texOmbre = toile(textures, 128, 128, (ctx, l) => {
    const g = ctx.createRadialGradient(l / 2, l / 2, 0, l / 2, l / 2, l / 2);
    g.addColorStop(0, "rgba(0,0,0,0.55)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, l, l);
  });
  const ombreGeo = new THREE.PlaneGeometry(0.75, 0.75);
  ombreGeo.rotateX(-Math.PI / 2);
  const ombresInvites = new THREE.InstancedMesh(ombreGeo, new THREE.MeshBasicMaterial({ map: texOmbre, transparent: true, depthWrite: false }), NB);
  ombresInvites.frustumCulled = false;
  ombresInvites.renderOrder = 1;
  salle.add(ombresInvites);

  /* ---------- les confettis ---------- */
  const NB_CONFETTIS = ordinateur ? 900 : 480;
  const confettis: Confetti[] = [];
  for (let i = 0; i < NB_CONFETTIS; i++) {
    const canon = CANONS[i % 2];
    confettis.push({
      bouche: canon.clone(),
      sol: new THREE.Vector3(-0.6 + alea() * 7.4, 0.035, -2.5 + alea() * 5.2),
      haut: 3.3 + alea() * 1.3,
      depart: alea() * 0.14,
      duree: 0.55 + alea() * 0.3,
      tour: new THREE.Vector3(4 + alea() * 9, 3 + alea() * 9, 2 + alea() * 6),
      angleSol: alea() * Math.PI * 2,
      phase: alea() * Math.PI * 2,
    });
  }
  const confettiGeo = new THREE.PlaneGeometry(0.075, 0.042);
  const matConfettis = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.45, metalness: 0.25 });
  const confettisMesh = new THREE.InstancedMesh(confettiGeo, matConfettis, NB_CONFETTIS);
  confettisMesh.frustumCulled = false;
  const couleursConfettis = [ROSE, VIOLET, "#FFFFFF", AMBRE, BLEU, ROSE, "#F4F3F8"];
  for (let i = 0; i < NB_CONFETTIS; i++) confettisMesh.setColorAt(i, new THREE.Color(couleursConfettis[i % couleursConfettis.length]));
  salle.add(confettisMesh);

  /* ---------- les ballons ---------- */
  const ballons: Ballon[] = [];
  TABLES.forEach(([x, z]) => {
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * Math.PI * 2 + alea();
      ballons.push({
        ancre: new THREE.Vector3(x, 0.82, z),
        ecart: new THREE.Vector3(Math.cos(a) * 0.2, 0, Math.sin(a) * 0.2),
        plafond: new THREE.Vector3(borne(x + (alea() - 0.5) * 2.6, -6.3, 6.3), H - 0.3 + alea() * 0.45, borne(z - 1.2 + (alea() - 0.5) * 2.2, -4.3, 2.2)),
        longueur: 1.45 + alea() * 0.25,
        retard: alea() * 0.05,
        phase: alea() * Math.PI * 2,
      });
    }
  });
  for (const x of [0.5, 6.3])
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * Math.PI * 2 + alea();
      ballons.push({
        ancre: new THREE.Vector3(x, 1.86, -3.35),
        ecart: new THREE.Vector3(Math.cos(a) * 0.22, 0, Math.sin(a) * 0.22),
        plafond: new THREE.Vector3(x + (alea() - 0.5) * 2.2, H - 0.2 + alea() * 0.5, -2.6 + alea() * 2),
        longueur: 1.0 + alea() * 0.2,
        retard: alea() * 0.05,
        phase: alea() * Math.PI * 2,
      });
    }
  const ballonGeo = new THREE.SphereGeometry(0.21, 20, 14);
  ballonGeo.scale(1, 1.18, 1);
  const matBallons = new THREE.MeshPhysicalMaterial({ roughness: 0.22, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.15 });
  const ballonsMesh = new THREE.InstancedMesh(ballonGeo, matBallons, ballons.length);
  ballonsMesh.frustumCulled = false;
  ballonsMesh.castShadow = ombres;
  const couleursBallons = [ROSE, "#F2F0FA", VIOLET, ROSE, "#C9C6D6", "#F2F0FA"];
  ballons.forEach((_, i) => ballonsMesh.setColorAt(i, new THREE.Color(couleursBallons[i % couleursBallons.length])));
  salle.add(ballonsMesh);
  const ficelles = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: "#E9E6F5", transparent: true, opacity: 0.55 }));
  ficelles.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(ballons.length * 6), 3));
  ficelles.frustumCulled = false;
  salle.add(ficelles);

  /* ============================ LE BUREAU, LUNDI 9 H ============================ */

  const W = 9;
  const D = 6.4;
  const HB = 3.4;
  const socleB = mesh(new THREE.BoxGeometry(W + 0.4, 0.5, D + 0.4), coupe, bureau, false);
  socleB.position.set(-0.2, -0.25, -0.2);
  const texChene = toile(textures, 1024, 1024, parquet(alea, [196, 160, 120], 26, "rgba(90,60,35,0.45)"));
  texChene.repeat.set(2.4, 1.7);
  const solB = mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshStandardMaterial({ map: texChene, roughness: 0.55 }), bureau, false);
  solB.rotation.x = -Math.PI / 2;
  solB.position.y = 0.001;
  const texEnduit = toile(textures, 512, 256, enduitClair);
  const murB = new THREE.MeshStandardMaterial({ map: texEnduit, roughness: 0.9 });
  // le mur du fond, percé d'une grande fenêtre à gauche
  const fx0 = -3.9;
  const fx1 = -0.6;
  const fy0 = 0.85;
  const fy1 = 2.95;
  const panB = (x0: number, x1: number, y0: number, y1: number) => {
    const b = mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, E), [coupe, coupe, coupe, coupe, murB, coupe], bureau);
    b.position.set((x0 + x1) / 2, (y0 + y1) / 2, -D / 2 - E / 2);
  };
  panB(-W / 2 - E, fx0, 0, HB);
  panB(fx1, W / 2, 0, HB);
  panB(fx0, fx1, 0, fy0);
  panB(fx0, fx1, fy1, HB);
  const ciel = mesh(new THREE.PlaneGeometry(9, 5), new THREE.MeshBasicMaterial({ map: toile(textures, 1024, 512, matin) }), bureau, false);
  ciel.position.set((fx0 + fx1) / 2, 1.9, -D / 2 - 2.5);
  const menuiserie = new THREE.MeshStandardMaterial({ color: "#2B2740", roughness: 0.5 });
  for (const x of [fx0, (fx0 + fx1) / 2, fx1]) {
    const m = mesh(new THREE.BoxGeometry(0.06, fy1 - fy0, 0.08), menuiserie, bureau);
    m.position.set(x, (fy0 + fy1) / 2, -D / 2 - 0.04);
  }
  for (const y of [fy0, fy1, 1.95]) {
    const m = mesh(new THREE.BoxGeometry(fx1 - fx0, 0.06, 0.08), menuiserie, bureau);
    m.position.set((fx0 + fx1) / 2, y, -D / 2 - 0.04);
  }
  const murBG = mesh(new THREE.BoxGeometry(E, HB, D + E), [coupe, murB, coupe, coupe, coupe, coupe], bureau);
  murBG.position.set(-W / 2 - E / 2, HB / 2, -E / 2);

  // Le comptoir, son plan de travail, l'étagère et ses tasses.
  const comptoir = mesh(new RoundedBoxGeometry(4.0, 0.9, 0.66, 2, 0.02), new THREE.MeshStandardMaterial({ color: "#2B2740", roughness: 0.45 }), bureau);
  comptoir.position.set(2.35, 0.45, -D / 2 + 0.34);
  const plan = mesh(new THREE.BoxGeometry(4.08, 0.05, 0.72), new THREE.MeshStandardMaterial({ color: "#EEECF4", roughness: 0.3, metalness: 0.05 }), bureau);
  plan.position.set(2.35, 0.925, -D / 2 + 0.36);
  const etagere = mesh(new THREE.BoxGeometry(2.4, 0.04, 0.3), new THREE.MeshStandardMaterial({ color: "#C8A27A", roughness: 0.6 }), bureau);
  etagere.position.set(1.6, 1.95, -D / 2 + 0.15);
  const tasseGeo = new THREE.CylinderGeometry(0.055, 0.045, 0.1, 16);
  tasseGeo.translate(0, 0.05, 0);
  const tasseMat = new THREE.MeshStandardMaterial({ color: "#F7F6FB", roughness: 0.35 });
  for (let i = 0; i < 6; i++) {
    const t = mesh(tasseGeo, i % 3 === 1 ? new THREE.MeshStandardMaterial({ color: ROSE, roughness: 0.4 }) : tasseMat, bureau);
    t.position.set(0.7 + i * 0.36, 1.97, -D / 2 + 0.15);
  }

  // La machine à café : inox brossé, deux groupes, un manomètre.
  const inox = new THREE.MeshStandardMaterial({ color: "#D8D6E2", roughness: 0.22, metalness: 1 });
  const machine = mesh(new RoundedBoxGeometry(0.78, 0.52, 0.5, 3, 0.05), inox, bureau);
  machine.position.set(2.15, 0.95 + 0.26, -D / 2 + 0.36);
  const capot = mesh(new RoundedBoxGeometry(0.8, 0.06, 0.52, 2, 0.02), new THREE.MeshStandardMaterial({ color: ROSE, roughness: 0.35, metalness: 0.2 }), bureau);
  capot.position.set(2.15, 1.5, -D / 2 + 0.36);
  for (const dx of [-0.18, 0.18]) {
    const groupe = mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.08, 18), inox, bureau);
    groupe.position.set(2.15 + dx, 1.03, -D / 2 + 0.64);
    const manche = mesh(new THREE.CapsuleGeometry(0.018, 0.16, 4, 8), noirMat, bureau);
    manche.position.set(2.15 + dx, 1.0, -D / 2 + 0.76);
    manche.rotation.x = Math.PI / 2;
    const tasse = mesh(tasseGeo, tasseMat, bureau);
    tasse.position.set(2.15 + dx, 0.955, -D / 2 + 0.66);
  }
  const mano = mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 24), new THREE.MeshStandardMaterial({ color: "#FBFAFE", roughness: 0.3 }), bureau);
  mano.rotation.x = Math.PI / 2;
  mano.position.set(2.15, 1.3, -D / 2 + 0.615);

  // Les croissants du lancement, sur une planche.
  const planche = mesh(new RoundedBoxGeometry(0.62, 0.035, 0.36, 2, 0.01), new THREE.MeshStandardMaterial({ color: "#B88A5E", roughness: 0.6 }), bureau);
  planche.position.set(3.55, 0.97, -D / 2 + 0.4);
  const croissantGeo = new THREE.TorusGeometry(0.075, 0.034, 10, 16, Math.PI * 1.15);
  croissantGeo.rotateX(Math.PI / 2);
  const croissantMat = new THREE.MeshStandardMaterial({ color: "#D99242", roughness: 0.55 });
  for (let i = 0; i < 4; i++) {
    const c = mesh(croissantGeo, croissantMat, bureau);
    c.position.set(3.38 + (i % 2) * 0.2, 1.02, -D / 2 + 0.32 + Math.floor(i / 2) * 0.16);
    c.rotation.y = i * 1.3;
    c.scale.set(1, 1, 0.9);
  }

  // L'horloge : lundi, 9 h.
  const horloge = mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.05, 40), [new THREE.MeshStandardMaterial({ color: NUIT, roughness: 0.4 }), new THREE.MeshStandardMaterial({ map: toile(textures, 256, 256, cadran), roughness: 0.4 }), new THREE.MeshStandardMaterial({ color: NUIT })], bureau, false);
  horloge.rotation.x = Math.PI / 2;
  horloge.rotation.y = Math.PI;
  horloge.position.set(3.55, 2.62, -D / 2 + 0.03);

  // La table haute où l'on se retrouve, à côté de la machine, ses tasses, et la plante
  // près de la fenêtre.
  const TX = 0.7;
  const TZ = -1.4;
  const tableHaute = mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.04, 32), new THREE.MeshStandardMaterial({ color: "#F7F6FB", roughness: 0.4 }), bureau);
  tableHaute.position.set(TX, 1.08, TZ);
  const fut = mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.06, 10), noirMat, bureau);
  fut.position.set(TX, 0.53, TZ);
  const piedHaut = mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.03, 24), noirMat, bureau);
  piedHaut.position.set(TX, 0.015, TZ);
  const tassesTable: THREE.Vector3[] = [];
  for (const [dx, dz, rose] of [[-0.18, 0.08, 1], [0.16, 0.14, 0], [0.04, -0.2, 0]] as const) {
    const t = mesh(tasseGeo, rose ? new THREE.MeshStandardMaterial({ color: ROSE, roughness: 0.4 }) : tasseMat, bureau);
    t.position.set(TX + dx, 1.1, TZ + dz);
    tassesTable.push(new THREE.Vector3(TX + dx + 60, 1.22, TZ + dz));
  }
  // Un tapis rond sous la table, une affiche au mur, une suspension éteinte (il fait jour).
  const tapis = mesh(new THREE.CircleGeometry(1.45, 48), new THREE.MeshStandardMaterial({ map: toile(textures, 512, 512, (ctx, l) => {
    ctx.fillStyle = "#CFC9E6";
    ctx.fillRect(0, 0, l, l);
    for (let r = l / 2; r > 20; r -= 26) {
      ctx.strokeStyle = r % 52 < 26 ? "rgba(255,255,255,0.35)" : "rgba(80,60,140,0.12)";
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.arc(l / 2, l / 2, r - 6, 0, Math.PI * 2);
      ctx.stroke();
    }
  }), roughness: 0.95 }), bureau, false);
  tapis.rotation.x = -Math.PI / 2;
  tapis.position.set(TX, 0.006, TZ);
  const affiche = mesh(new THREE.PlaneGeometry(1.1, 0.8), new THREE.MeshStandardMaterial({ map: toile(textures, 440, 320, (ctx, l, h) => {
    ctx.fillStyle = NUIT;
    ctx.fillRect(0, 0, l, h);
    ctx.fillStyle = ROSE;
    ctx.beginPath();
    ctx.arc(l * 0.62, h * 0.48, h * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#B9B4CC";
    ctx.lineWidth = 6;
    for (let k = 0; k < 4; k++) {
      ctx.beginPath();
      ctx.arc(l * 0.3, h * 1.05, h * (0.25 + k * 0.17), Math.PI, Math.PI * 1.75);
      ctx.stroke();
    }
    ctx.strokeStyle = "#FBFAFE";
    ctx.lineWidth = 18;
    ctx.strokeRect(0, 0, l, h);
  }), roughness: 0.5 }), bureau, false);
  affiche.position.set(1.55, 2.62, -D / 2 + 0.02);
  const abatJour = mesh(new THREE.ConeGeometry(0.32, 0.3, 32, 1, true), new THREE.MeshStandardMaterial({ color: NUIT, roughness: 0.5, side: THREE.DoubleSide }), bureau);
  abatJour.position.set(TX, 2.55, TZ);
  const cordon = mesh(new THREE.CylinderGeometry(0.006, 0.006, HB - 2.7, 4), noirMat, bureau, false);
  cordon.position.set(TX, (HB + 2.7) / 2, TZ);
  const pot = mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.5, 20), new THREE.MeshStandardMaterial({ color: "#E7E4F2", roughness: 0.7 }), bureau);
  pot.position.set(-3.9, 0.25, -2.55);
  const feuille = new THREE.MeshStandardMaterial({ color: "#3E7A55", roughness: 0.6 });
  for (let i = 0; i < 9; i++) {
    const f = mesh(new THREE.SphereGeometry(0.26, 10, 8), feuille, bureau);
    const a = (i / 9) * Math.PI * 2;
    f.scale.set(0.45, 1.25, 0.2);
    f.position.set(-3.9 + Math.cos(a) * 0.16, 0.85 + (i % 3) * 0.22, -2.55 + Math.sin(a) * 0.16);
    f.rotation.set(Math.sin(a) * 0.5, -a, Math.cos(a) * 0.5);
  }

  // La lumière du matin au sol, sous la fenêtre.
  const tache = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 2.1), new THREE.MeshBasicMaterial({ color: "#FFE9CC", transparent: true, opacity: 0.2, depthWrite: false, blending: THREE.AdditiveBlending }));
  tache.rotation.x = -Math.PI / 2;
  tache.position.set((fx0 + fx1) / 2 + 0.4, 0.01, -D / 2 + 2.0);
  bureau.add(tache);

  // Les trois collègues devant la machine, et leurs ombres.
  const collegues = [
    { pos: new THREE.Vector3(0.05, 0, -1.05), couleur: ROSE, phase: 0.3 },
    { pos: new THREE.Vector3(1.35, 0, -0.9), couleur: "#EDEBF5", phase: 1.9 },
    { pos: new THREE.Vector3(0.75, 0, -2.1), couleur: "#3A3552", phase: 3.4 },
  ];
  const corpsB = new THREE.InstancedMesh(silhouette, matInvites, 3);
  const tetesB = new THREE.InstancedMesh(tetes.geometry, matInvites, 3);
  const ombresB = new THREE.InstancedMesh(ombreGeo, ombresInvites.material, 3);
  for (const im of [corpsB, tetesB, ombresB]) {
    im.frustumCulled = false;
    bureau.add(im);
  }
  corpsB.castShadow = tetesB.castShadow = ombres;
  collegues.forEach((c, i) => {
    corpsB.setColorAt(i, new THREE.Color(c.couleur));
    tetesB.setColorAt(i, new THREE.Color(c.couleur));
    ombresB.setMatrixAt(i, m4.makeTranslation(c.pos.x, 0.012, c.pos.z));
  });

  // La vapeur des tasses : des volutes qui montent et s'effacent.
  const NB_VAPEUR = 42;
  const vapeurGeo = new THREE.BufferGeometry();
  vapeurGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(NB_VAPEUR * 3), 3));
  vapeurGeo.setAttribute("taille", new THREE.BufferAttribute(new Float32Array(NB_VAPEUR).fill(0.3), 1));
  vapeurGeo.setAttribute("force", new THREE.BufferAttribute(new Float32Array(NB_VAPEUR), 1));
  vapeurGeo.setAttribute("teinte", new THREE.BufferAttribute(new Float32Array(NB_VAPEUR * 3).fill(1), 3));
  const matVapeur = matiereHalos();
  matVapeur.blending = THREE.NormalBlending;
  const vapeur = new THREE.Points(vapeurGeo, matVapeur);
  vapeur.frustumCulled = false;
  vapeur.renderOrder = 6;
  racine.add(vapeur);
  const sourcesVapeur = [...tassesTable, new THREE.Vector3(60 + 2.15 - 0.18, 1.08, -D / 2 + 0.66), new THREE.Vector3(60 + 2.15 + 0.18, 1.08, -D / 2 + 0.66)];

  /* ============================ les lumières ============================ */

  const ambiante = new THREE.AmbientLight("#3B3363", 0.5);
  const ciel2 = new THREE.HemisphereLight("#8D7BFF", "#1A1426", 0.4);
  const cle = new THREE.DirectionalLight("#AFA8FF", 0.6);
  cle.castShadow = ombres;
  cle.shadow.mapSize.set(2048, 2048);
  cle.shadow.bias = -0.0005;
  cle.shadow.normalBias = 0.03;
  const oc = cle.shadow.camera;
  oc.left = oc.bottom = -9;
  oc.right = oc.top = 9;
  oc.near = 1;
  oc.far = 40;
  const rose = new THREE.PointLight(ROSE, 0, 9, 1.6);
  rose.position.set(1.8, 2.6, -1.2);
  const violet = new THREE.PointLight(VIOLET, 0, 9, 1.6);
  violet.position.set(5.2, 2.6, 0.4);
  const chaude = new THREE.PointLight("#FFB070", 0, 12, 1.4);
  chaude.position.set(-3.4, 3.0, 1.6);
  racine.add(ambiante, ciel2, cle, cle.target, rose, violet, chaude);

  const fondNuit = toile(textures, 32, 512, degrade("#07060F", "#1A1530"));
  const fondMatin = toile(textures, 32, 512, degrade("#DAD9E8", "#F6F5FB"));

  /* ============================ le temps ============================ */

  const COUPE_LUNDI = 0.8;
  const v = new THREE.Vector3();
  const w = new THREE.Vector3();
  const e = new THREE.Euler();
  const s = new THREE.Vector3();
  const regard = new THREE.Vector3();
  const cBlanc = new THREE.Color();

  /** Où est un invité, à l'instant p : position, angle, assis (0 à 1), marche (0 à 1), présent. */
  const invite = (pp: Personne, p: number) => {
    const r = pp.retard;
    // 23 h → 21 h : de la piste à la chaise, à reculons (le chanteur descend d'abord de scène)
    const a0 = (pp.chanteur ? 0.2 : 0.27) + r;
    const a1 = a0 + (pp.chanteur ? 0.16 : 0.1);
    // 21 h : assis ; 19 h : debout, à reculons jusqu'à l'accueil, puis sortie par la porte
    const s0 = a1 + 0.006;
    const s1 = s0 + 0.03;
    const b0 = 0.53 + r * 0.6;
    const b1 = b0 + 0.02;
    const c0 = b1 + 0.005;
    const c1 = c0 + 0.075;
    const d0 = 0.665 + r;
    const d1 = d0 + 0.06;
    const porte = w;
    let assis = 0;
    let marche = 0;
    let present = true;
    let angle: number;
    if (p < a1) {
      const t = doux(entre(a0, a1, p));
      v.copy(pp.danse).lerp(pp.chaise, t);
      if (pp.chanteur) v.y = mix(0.5, 0, lisse(0.35, 0.6, t));
      marche = t > 0 && t < 1 ? 1 : 0;
      regard.copy(pp.danse).sub(pp.chaise);
      const surPiste = pp.chanteur ? 0 : Math.PI + Math.sin(pp.phase * 3) * 0.9;
      angle = versAngle(surPiste, Math.atan2(regard.x, regard.z), entre(0, 0.15, t));
      if (t > 0.85) angle = versAngle(angle, Math.atan2(pp.table.x - pp.chaise.x, pp.table.z - pp.chaise.z), (t - 0.85) / 0.15);
    } else if (p < b1) {
      v.copy(pp.chaise);
      assis = lisse(s0, s1, p) * (1 - lisse(b0, b1, p));
      angle = Math.atan2(pp.table.x - pp.chaise.x, pp.table.z - pp.chaise.z);
    } else if (p < c1 || p < d0) {
      const t = doux(entre(c0, c1, p));
      v.copy(pp.chaise).lerp(pp.accueil, t);
      marche = t > 0 && t < 1 ? 1 : 0;
      regard.copy(pp.chaise).sub(pp.accueil);
      angle = t < 1 ? Math.atan2(regard.x, regard.z) : Math.PI;
      if (t >= 1) angle = Math.PI;
    } else {
      const t = entre(d0, d1, p);
      // en contournant la table d'accueil, jusqu'à la porte, puis dans le vestibule
      if (t < 0.45) v.copy(pp.accueil).lerp(w.set(-5.45, 0, -3.25), doux(t / 0.45));
      else if (t < 0.75) v.set(-5.45, 0, -3.25).lerp(porte.set(PORTE.x, 0, -4.6), (t - 0.45) / 0.3);
      else v.set(PORTE.x, 0, -4.6).lerp(w.set(PORTE.x, 0, -6.4), (t - 0.75) / 0.25);
      marche = t < 1 ? 1 : 0;
      angle = 0; // face à la salle : ils ressortent à reculons
      present = t < 1;
    }
    return { pos: v, angle, assis, marche, present };
  };

  const appliquer = (p: number, temps: number) => {
    const auBureau = p >= COUPE_LUNDI;
    salle.visible = !auBureau;
    bureau.visible = auBureau;

    /* ---------- la lumière ---------- */
    const fete = 1 - lisse(0.5, 0.66, p); // projecteurs, boule, néons
    const allumees = SUSPENSIONS.map((_, k) => {
      const t0 = 0.555 + k * 0.022;
      const t = entre(t0, t0 + 0.012, p);
      // un léger clignotement à l'allumage
      return t <= 0 ? 0 : t >= 1 ? 1 : t * (0.55 + 0.45 * Math.abs(Math.sin(t * 19)));
    });
    const salleAllumee = allumees.reduce((a, b) => a + b, 0) / SUSPENSIONS.length;

    if (!auBureau) {
      ambiante.color.set("#3B3363").lerp(cBlanc.set("#FFE4C8"), salleAllumee);
      ambiante.intensity = mix(0.55, 1.15, salleAllumee);
      ciel2.color.set("#8D7BFF").lerp(cBlanc.set("#FFF1DD"), salleAllumee);
      ciel2.groundColor.set("#1A1426");
      ciel2.intensity = mix(0.45, 1.45, salleAllumee);
      cle.color.set("#AFA8FF").lerp(cBlanc.set("#FFE6C8"), salleAllumee);
      cle.intensity = mix(0.55, 1.9, salleAllumee);
      cle.position.set(-2, 11, 6);
      cle.target.position.set(0, 0, -1);
      rose.intensity = 17 * fete;
      violet.intensity = 17 * fete;
      chaude.intensity = mix(6, 10, salleAllumee);
    } else {
      ambiante.color.set("#F3EEFF");
      ambiante.intensity = 0.4;
      ciel2.color.set("#EEF2FF");
      ciel2.groundColor.set("#B9A48F");
      ciel2.intensity = 0.95;
      cle.color.set("#FFE8CC");
      cle.intensity = 2.1;
      cle.position.set(60 - 5, 9, 7);
      cle.target.position.set(60 + 1, 0, -1);
      rose.intensity = violet.intensity = chaude.intensity = 0;
    }

    filetMat.color.set(ROSE).multiplyScalar(0.25 + 1.4 * fete);
    facadeMat.color.setScalar(0.2 + 0.9 * fete);
    murFond.emissiveIntensity = murGauche.emissiveIntensity = mix(1.0, 0.55, salleAllumee);
    lentilles.forEach((l, i) => l.color.set(COULEURS_FAISCEAUX[i]).multiplyScalar(0.15 + 1.6 * fete));

    // les faisceaux balaient la piste, puis s'éteignent
    faisceaux.forEach((f, i) => {
      const cible = v.set(3.3 + Math.sin(temps * 0.55 + f.phase) * 2.2, 0.03, -0.6 + Math.cos(temps * 0.42 + f.phase * 1.3) * 1.5);
      if (i === 1 || i === 2) {
        // pendant le karaoké, deux projecteurs se posent sur le chanteur
        const k = lisse(0.1, 0.16, p) * (1 - lisse(0.22, 0.28, p));
        cible.lerp(w.set(MICRO.x, 0.5, MICRO.z - 0.4), k);
      }
      const d = f.source.distanceTo(cible);
      f.cone.position.copy(f.source).add(cible).multiplyScalar(0.5);
      f.cone.quaternion.setFromUnitVectors(Y, s.copy(f.source).sub(cible).normalize());
      f.cone.scale.set(0.55, d, 0.55);
      (f.cone.material as THREE.ShaderMaterial).uniforms.force.value = fete;
      f.cone.visible = fete > 0.01;
      f.flaque.position.set(cible.x, cible.y + 0.012, cible.z);
      (f.flaque.material as THREE.ShaderMaterial).uniforms.force.value = 0.55 * fete;
      f.flaque.visible = fete > 0.01;
    });

    // la boule tourne ; ses éclats glissent sur les murs et le sol
    boule.rotation.y = temps * 0.35;
    const posE = eclatsGeo.attributes.position as THREE.BufferAttribute;
    const forE = eclatsGeo.attributes.force as THREE.BufferAttribute;
    for (let i = 0; i < NB_ECLATS; i++) {
      s.copy(directions[i]).applyAxisAngle(Y, temps * 0.35);
      // le premier plan rencontré : le sol, le mur du fond, le mur de gauche
      let t = Infinity;
      if (s.y < -0.01) t = Math.min(t, (0.02 - BOULE.y) / s.y);
      if (s.z < -0.01) t = Math.min(t, (-4.98 - BOULE.z) / s.z);
      if (s.x < -0.01) t = Math.min(t, (-6.98 - BOULE.x) / s.x);
      w.copy(BOULE).addScaledVector(s, t);
      const dedans = t < Infinity && w.x > -7 && w.x < 7 && w.z > -5 && w.z < 5 && w.y < H && w.y >= 0;
      if (dedans) posE.setXYZ(i, w.x, w.y, w.z);
      else posE.setXYZ(i, BOULE.x, BOULE.y, BOULE.z);
      forE.setX(i, dedans ? fete * (0.55 + 0.45 * Math.sin(temps * 3 + i)) : 0);
    }
    posE.needsUpdate = forE.needsUpdate = true;
    eclats.visible = fete > 0.01;

    // les guirlandes restent allumées ; les suspensions se rallument une à une
    const forH = halosGeo.attributes.force as THREE.BufferAttribute;
    for (let i = 0; i < ampoules.length; i++) forH.setX(i, (0.42 + 0.08 * Math.sin(temps * 2.1 + i * 1.7)) * mix(1, 0.65, salleAllumee));
    globes.forEach((g, k) => {
      g.mat.emissiveIntensity = allumees[k] * 0.75;
      g.mat.color.set(allumees[k] > 0.5 ? "#F2E6D4" : "#3A3550");
      g.flaque.uniforms.force.value = allumees[k] * 0.12;
      forH.setX(ampoules.length + k, allumees[k] * 0.2);
    });
    forH.needsUpdate = true;

    /* ---------- les confettis : ils remontent dans leurs canons ---------- */
    const u = 0.74 * (1 - doux(entre(0.04, 0.3, p)));
    for (let i = 0; i < NB_CONFETTIS; i++) {
      const c = confettis[i];
      const l = (u - c.depart) / c.duree;
      if (l <= 0) {
        m4.makeScale(0, 0, 0);
      } else if (l >= 1) {
        e.set(-Math.PI / 2, 0, c.angleSol);
        m4.compose(c.sol, q.setFromEuler(e), un);
      } else {
        const montee = 0.2;
        const y = l < montee ? mix(c.bouche.y, c.haut, 1 - (1 - l / montee) ** 2) : mix(c.haut, c.sol.y, ((l - montee) / (1 - montee)) ** 1.2);
        const h = 1 - (1 - l) ** 2.4;
        v.copy(c.bouche).lerp(c.sol, h);
        const chute = l > montee ? 1 - l : 0;
        v.x += Math.sin(l * 17 + c.phase) * 0.22 * chute;
        v.z += Math.cos(l * 13 + c.phase) * 0.18 * chute;
        // en suspens, la fête : les confettis flottent encore un peu
        v.y = y + (p < 0.05 ? Math.sin(temps * 1.4 + c.phase) * 0.05 * chute : 0);
        const vie = p < 0.05 ? temps * 0.5 : 0;
        e.set(l * c.tour.x + vie, l * c.tour.y + vie * 0.7, l * c.tour.z);
        if (l > 0.94) {
          const k = (l - 0.94) / 0.06;
          q.setFromEuler(e).slerp(new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, c.angleSol)), k);
        } else q.setFromEuler(e);
        m4.compose(v, q, un);
      }
      confettisMesh.setMatrixAt(i, m4);
    }
    confettisMesh.instanceMatrix.needsUpdate = true;

    /* ---------- les ballons : ils redescendent sur leurs tables ---------- */
    const posF = ficelles.geometry.attributes.position as THREE.BufferAttribute;
    ballons.forEach((b, i) => {
      const f = doux(entre(0.3 + b.retard, 0.47 + b.retard, p));
      const attache = w.copy(b.ancre).add(b.ecart);
      const bas = v.copy(attache);
      bas.y += b.longueur;
      const pos = s.copy(b.plafond).lerp(bas, f);
      pos.x += Math.sin(temps * 0.8 + b.phase) * 0.05;
      pos.y += Math.sin(temps * 1.1 + b.phase) * 0.04;
      m4.compose(pos, q.setFromEuler(e.set(Math.sin(temps * 0.7 + b.phase) * 0.08, 0, Math.cos(temps * 0.6 + b.phase) * 0.08)), un);
      ballonsMesh.setMatrixAt(i, m4);
      posF.setXYZ(i * 2, pos.x, pos.y - 0.24, pos.z);
      const k = lisse(0.8, 1, f);
      posF.setXYZ(i * 2 + 1, mix(pos.x + Math.sin(temps + b.phase) * 0.1, attache.x, k), mix(pos.y - b.longueur * 0.85, attache.y, k), mix(pos.z, attache.z, k));
    });
    ballonsMesh.instanceMatrix.needsUpdate = true;
    posF.needsUpdate = true;

    /* ---------- les verres : ils se remplissent ---------- */
    verresPos.forEach((vp, i) => {
      const f = doux(entre(0.36 + (i % 7) * 0.006, 0.5 + (i % 5) * 0.006, p));
      const niveau = mix(0.012, 0.13, f);
      m4.compose(w.set(vp.x, vp.y + 0.016, vp.z), q.identity(), s.set(1, niveau, 1));
      liquides.setMatrixAt(i, m4);
    });
    liquides.instanceMatrix.needsUpdate = true;

    /* ---------- les invités ---------- */
    const danse = 1 - lisse(0.18, 0.3, p);
    personnes.forEach((pp, i) => {
      const { pos, angle, assis, marche, present } = invite(pp, p);
      let y = pos.y;
      let penche = 0;
      if (danse > 0 && (!pp.chanteur || p < 0.2)) {
        const rythme = pp.chanteur ? 0.4 : 1;
        y += Math.abs(Math.sin(temps * 4.2 + pp.phase)) * 0.09 * danse * rythme;
        penche = Math.sin(temps * 2.1 + pp.phase) * 0.14 * danse * rythme;
      }
      if (marche) y += Math.abs(Math.sin(p * 900 + pp.phase)) * 0.05;
      y -= assis * 0.42;
      const k = pp.taille * (present ? 1 : 0);
      e.set(0, angle, penche);
      q.setFromEuler(e);
      m4.compose(w.set(pos.x, y, pos.z), q, s.set(k, k * (1 - assis * 0.12), k));
      corps.setMatrixAt(i, m4);
      // la tête suit le corps, un peu inclinée par la danse
      const hT = (1.42 - assis * 0.16) * pp.taille;
      const ecartTete = Math.sin(penche) * hT;
      m4.compose(w.set(pos.x - ecartTete * Math.cos(angle), y + hT * Math.cos(penche), pos.z + ecartTete * Math.sin(angle)), q, s.set(k, k, k));
      tetes.setMatrixAt(i, m4);
      m4.compose(w.set(pos.x, pos.y + 0.01, pos.z), q.identity(), s.setScalar(present ? 1 : 0));
      ombresInvites.setMatrixAt(i, m4);
    });
    // le DJ
    const dj = NB - 1;
    const djY = 0.5 + Math.abs(Math.sin(temps * 4.2)) * 0.05 * (0.4 + danse);
    m4.compose(w.set(4.4, djY, -4.66), q.setFromAxisAngle(Y, 0), s.set(1.02, 1.02, 1.02));
    corps.setMatrixAt(dj, m4);
    m4.compose(w.set(4.4, djY + 1.45, -4.66), q, s);
    tetes.setMatrixAt(dj, m4);
    m4.compose(w.set(4.4, 0.51, -4.66), q, s.setScalar(1));
    ombresInvites.setMatrixAt(dj, m4);
    corps.instanceMatrix.needsUpdate = tetes.instanceMatrix.needsUpdate = ombresInvites.instanceMatrix.needsUpdate = true;

    /* ---------- le bureau : on parle, la vapeur monte ---------- */
    collegues.forEach((c, i) => {
      const versTable = Math.atan2(0.7 - c.pos.x, -1.4 - c.pos.z);
      const y = Math.abs(Math.sin(temps * 1.3 + c.phase)) * (i === 0 ? 0.03 : 0.012);
      const pench = Math.sin(temps * 0.9 + c.phase) * 0.04;
      q.setFromEuler(e.set(0, versTable, pench));
      m4.compose(w.set(c.pos.x, y, c.pos.z), q, un);
      corpsB.setMatrixAt(i, m4);
      m4.compose(w.set(c.pos.x, y + 1.42, c.pos.z), q, un);
      tetesB.setMatrixAt(i, m4);
    });
    corpsB.instanceMatrix.needsUpdate = tetesB.instanceMatrix.needsUpdate = true;
    const posV = vapeurGeo.attributes.position as THREE.BufferAttribute;
    const forV = vapeurGeo.attributes.force as THREE.BufferAttribute;
    const tV = vapeurGeo.attributes.taille as THREE.BufferAttribute;
    for (let i = 0; i < NB_VAPEUR; i++) {
      const src = sourcesVapeur[i % sourcesVapeur.length];
      const age = (temps * 0.32 + i * 0.137) % 1;
      posV.setXYZ(i, src.x + Math.sin(age * 6 + i) * 0.05, src.y + age * 0.55, src.z + Math.cos(age * 5 + i) * 0.04);
      forV.setX(i, auBureau ? Math.sin(age * Math.PI) * 0.22 : 0);
      tV.setX(i, 0.12 + age * 0.35);
    }
    posV.needsUpdate = forV.needsUpdate = tV.needsUpdate = true;
    vapeur.visible = auBureau;
    // le halo de post-traitement : franc pendant la fête, discret à 19 h, éteint le lundi
    return { eclat: auBureau ? 0 : 0.3 + 0.3 * fete - 0.12 * salleAllumee };
  };

  /* ============================ la caméra ============================ */

  type Plan = { p: number; cible: [number, number, number]; az: number; el: number; dist: number };
  // Les plans de la salle, puis ceux du bureau. az : degrés autour de la verticale (0 : de face),
  // el : degrés au-dessus de l'horizon, dist : mètres. Un plan par chapitre, la caméra glisse
  // de l'un à l'autre.
  const PLANS: Record<Cadrage, Plan[]> = {
    paysage: [
      { p: 0.0, cible: [0.9, 1.0, -0.6], az: 27, el: 22, dist: 18.5 },
      { p: 0.08, cible: [1.2, 1.0, -0.8], az: 24, el: 21, dist: 17.5 },
      { p: 0.22, cible: [2.7, 1.2, -3.0], az: 14, el: 22, dist: 14 },
      { p: 0.44, cible: [-2.3, 0.9, 1.3], az: 30, el: 30, dist: 14.5 },
      { p: 0.64, cible: [-4.9, 1.2, -2.7], az: 5, el: 34, dist: 14 },
      { p: 0.74, cible: [-0.6, 1.2, -0.8], az: 20, el: 34, dist: 21 },
      { p: 0.8, cible: [-0.6, 1.2, -0.8], az: 14, el: 42, dist: 28 },
      { p: 0.8001, cible: [1.0, 1.2, -1.9], az: 30, el: 26, dist: 16 },
      { p: 0.9, cible: [0.5, 1.45, -2.0], az: 26, el: 13, dist: 10 },
      { p: 1.0, cible: [0.5, 1.45, -2.0], az: 23, el: 11, dist: 9.2 },
    ],
    portrait: [
      { p: 0.0, cible: [1.6, 1.0, -0.6], az: 20, el: 32, dist: 22 },
      { p: 0.08, cible: [1.8, 1.0, -0.8], az: 18, el: 30, dist: 21 },
      { p: 0.22, cible: [2.7, 1.3, -2.4], az: 10, el: 22, dist: 14.5 },
      { p: 0.44, cible: [-3.0, 0.9, 1.4], az: 26, el: 34, dist: 15 },
      { p: 0.64, cible: [-4.3, 1.1, -2.6], az: 4, el: 30, dist: 14 },
      { p: 0.74, cible: [-1.0, 1.2, -1.0], az: 18, el: 40, dist: 24 },
      { p: 0.8, cible: [-1.0, 1.2, -1.0], az: 12, el: 46, dist: 32 },
      { p: 0.8001, cible: [1.2, 1.1, -1.9], az: 26, el: 32, dist: 19 },
      { p: 0.9, cible: [1.2, 1.2, -1.9], az: 22, el: 22, dist: 13.5 },
      { p: 1.0, cible: [1.2, 1.2, -1.9], az: 20, el: 20, dist: 12.5 },
    ],
  };

  const camera = (p: number, cadrage: Cadrage, cible: THREE.Vector3, position: THREE.Vector3) => {
    const plans = PLANS[cadrage];
    let i = 0;
    while (i < plans.length - 2 && p > plans[i + 1].p) i++;
    const a = plans[i];
    const b = plans[i + 1];
    const t = doux(entre(a.p, b.p, p));
    const decal = p >= COUPE_LUNDI ? 60 : 0;
    cible.set(mix(a.cible[0], b.cible[0], t) + decal, mix(a.cible[1], b.cible[1], t), mix(a.cible[2], b.cible[2], t));
    const az = THREE.MathUtils.degToRad(mix(a.az, b.az, t));
    const el = THREE.MathUtils.degToRad(mix(a.el, b.el, t));
    const dist = mix(a.dist, b.dist, t);
    position.set(cible.x + Math.sin(az) * Math.cos(el) * dist, cible.y + Math.sin(el) * dist, cible.z + Math.cos(az) * Math.cos(el) * dist);
    return dist;
  };

  const liberer = () => {
    racine.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mats = m.material ? (Array.isArray(m.material) ? m.material : [m.material]) : [];
      for (const mat of mats) mat.dispose();
    });
    textures.forEach((t) => t.dispose());
  };

  return {
    racine,
    appliquer,
    camera,
    lumieres: [ambiante, ciel2, cle, rose, violet, chaude],
    halos: [matHalos, matEclats, matVapeur],
    fond: { nuit: fondNuit, matin: fondMatin },
    coupe: COUPE_LUNDI,
    liberer,
  };
}
