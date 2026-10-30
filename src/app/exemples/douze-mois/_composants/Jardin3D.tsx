"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { MOIS } from "./donnees";
import { ESPECE, fleursDuMois, type Forme } from "./fleurs";
import { hasard, touffe } from "./modeles-fleurs";

// Le jardin des douze mois, en 3D : un jardin rond comme un cadran, douze massifs
// bordés de buis — un par mois, à la place de l'heure —, un cadran solaire au milieu,
// une haie d'ifs autour, le ciel du soir. Chaque massif porte les fleurs que le
// calendrier du site donne à son mois. On s'y promène : glisser tourne la tête et
// avance (à la souris), les flèches du clavier aussi ; toucher le sol y emmène.
//
// Tout est construit et peint ici : aucun fichier, aucun serveur tiers. Sur
// ordinateur seulement : ombres portées et halo. La boucle s'arrête quand le jardin
// sort de l'écran ; avec « animations réduites », rien ne bouge seul : le jardin est
// déjà fleuri, la caméra déjà posée, et l'image ne change qu'à la main.

export type Groupe = { espece: Forme; mois: number };

export type Pilote = {
  avancer: (pas: number) => void;
  tourner: (angle: number) => void;
};

type Props = {
  moisCourant: number;
  /** La touffe éclairée (survolée, touchée ou choisie au clavier). */
  actif: Groupe | null;
  /** Un ordre de la page : aller voir cette touffe. `n` change à chaque demande. */
  viser: (Groupe & { n: number }) | null;
  /** Décalage du centre de l'image, en fraction de largeur (la colonne de texte). */
  decalage: number;
  pilote: React.Ref<Pilote>;
  surSurvol: (g: Groupe | null, ecran?: { x: number; y: number }) => void;
  surChoix: (g: Groupe, ecran: { x: number; y: number }) => void;
  surToucher: (g: Groupe, ecran: { x: number; y: number }) => void;
  surPret: () => void;
  /** La première fois qu'on marche ou qu'on tourne : la page retire sa consigne. */
  surGeste: () => void;
  onIndisponible: () => void;
};

/* ============================ le plan du jardin ============================ */

const R_IN = 2.2;
const R_OUT = 4.7;
const ALLEE = 0.5;
const BORDURE = 0.16;
const R_HAIE = 6.0;
const EP_HAIE = 0.8;
const HAUT_HAIE = 1.7;
const R_MARCHE = 5.35;

/** L'azimut d'un mois, comme l'heure sur un cadran : décembre à midi, juin à six heures. */
const azimut = (m: number) => (m % 12) * (Math.PI / 6);
/** Direction d'un azimut, vue du dessus (le nord est -Z). */
const versAzimut = (a: number) => new THREE.Vector3(Math.sin(a), 0, -Math.cos(a));

/** Le contour d'un massif, en coordonnées de dessin (x, -z) : deux arcs et deux allées droites. */
function contourMassif(m: number, rIn: number, rOut: number, allee: number) {
  const phi = azimut(m);
  const pts: THREE.Vector2[] = [];
  const arc = (r: number, sens: 1 | -1) => {
    const demi = Math.PI / 12 - Math.asin(allee / 2 / r);
    for (let k = 0; k <= 14; k++) {
      const t = sens === 1 ? k / 14 : 1 - k / 14;
      const a = phi - demi + 2 * demi * t;
      pts.push(new THREE.Vector2(r * Math.sin(a), r * Math.cos(a)));
    }
  };
  arc(rOut, 1);
  arc(rIn, -1);
  return pts;
}

/** Un point au hasard dans une bande d'un massif (entre deux rayons, dans une part de sa largeur). */
function dansMassif(m: number, r0: number, r1: number, part: [number, number], h: () => number) {
  const r = Math.sqrt(r0 * r0 + (r1 * r1 - r0 * r0) * h());
  const demi = Math.PI / 12 - Math.asin((ALLEE / 2 + BORDURE + 0.12) / r);
  const t = part[0] + (part[1] - part[0]) * h();
  return versAzimut(azimut(m) - demi + 2 * demi * t).multiplyScalar(r);
}

/* ============================ textures peintes ============================ */

function toile(l: number, h: number, dessin: (ctx: CanvasRenderingContext2D) => void, repete = true) {
  const c = document.createElement("canvas");
  c.width = l;
  c.height = h;
  const ctx = c.getContext("2d")!;
  dessin(ctx);
  const t = new THREE.CanvasTexture(c);
  // pour repeindre une gravure quand la police du site a fini d'arriver
  t.userData.repeindre = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, l, h);
    dessin(ctx);
    t.needsUpdate = true;
  };
  if (repete) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function grains(ctx: CanvasRenderingContext2D, l: number, h: number, n: number, teinte: () => string, rayon: () => number) {
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = teinte();
    ctx.beginPath();
    ctx.arc(Math.random() * l, Math.random() * h, rayon(), 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Gravier clair des allées. Un motif = 1 m. */
const textureGravier = () =>
  toile(256, 256, (ctx) => {
    ctx.fillStyle = "#8c849c";
    ctx.fillRect(0, 0, 256, 256);
    grains(ctx, 256, 256, 5200, () => ["#b2aabe", "#7a7289", "#a198b0", "#665e75", "#c2bace"][Math.floor(Math.random() * 5)], () => 0.5 + Math.random() * 1.3);
  });

/** Le sol des massifs : un tapis de petites feuilles, la terre paillée entre elles. */
const textureTerre = () =>
  toile(256, 256, (ctx) => {
    ctx.fillStyle = "#2c2524";
    ctx.fillRect(0, 0, 256, 256);
    grains(ctx, 256, 256, 900, () => ["#4a3330", "#241a1e", "#5a4234"][Math.floor(Math.random() * 3)], () => 0.8 + Math.random() * 2.2);
    for (let i = 0; i < 1500; i++) {
      ctx.fillStyle = ["#253f24", "#2f5129", "#3a6232", "#1d331d", "#45703a"][Math.floor(Math.random() * 5)];
      ctx.save();
      ctx.translate(Math.random() * 256, Math.random() * 256);
      ctx.rotate(Math.random() * Math.PI);
      ctx.beginPath();
      ctx.ellipse(0, 0, 4 + Math.random() * 3, 1.8 + Math.random(), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  });

/** Feuillage taillé (buis, if) : un fourmillement de petites feuilles. */
const textureFeuillage = (fond: string, clairs: string[]) =>
  toile(256, 256, (ctx) => {
    ctx.fillStyle = fond;
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2600; i++) {
      ctx.fillStyle = clairs[Math.floor(Math.random() * clairs.length)];
      ctx.save();
      ctx.translate(Math.random() * 256, Math.random() * 256);
      ctx.rotate(Math.random() * Math.PI);
      ctx.beginPath();
      ctx.ellipse(0, 0, 2.6, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  });

/** Une tache ronde, claire au centre : lueurs, halos, ombres au sol. */
const textureTache = (interieur: string, exterieur: string) =>
  toile(
    128,
    128,
    (ctx) => {
      const d = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      d.addColorStop(0, interieur);
      d.addColorStop(1, exterieur);
      ctx.fillStyle = d;
      ctx.fillRect(0, 0, 128, 128);
    },
    false,
  );

/** L'anneau qui marque la touffe désignée, au sol. */
const textureAnneau = () =>
  toile(
    256,
    256,
    (ctx) => {
      const d = ctx.createRadialGradient(128, 128, 70, 128, 128, 126);
      d.addColorStop(0, "rgba(255,255,255,0)");
      d.addColorStop(0.62, "rgba(255,255,255,0.9)");
      d.addColorStop(0.7, "rgba(255,255,255,0.35)");
      d.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = d;
      ctx.fillRect(0, 0, 256, 256);
    },
    false,
  );

/** Le cadran solaire : douze chiffres romains, un par massif, et le nom de la maison. */
const textureCadran = (police: string) =>
  toile(
    512,
    512,
    (ctx) => {
      ctx.fillStyle = "#cfc6d8";
      ctx.fillRect(0, 0, 512, 512);
      grains(ctx, 512, 512, 2400, () => (Math.random() < 0.5 ? "rgba(60,40,80,0.08)" : "rgba(255,255,255,0.12)"), () => 0.6 + Math.random() * 1.8);
      ctx.translate(256, 256);
      ctx.strokeStyle = "rgba(40,28,60,0.55)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 238, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 176, 0, Math.PI * 2);
      ctx.stroke();
      const romains = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
      ctx.fillStyle = "rgba(36,24,54,0.85)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let k = 0; k < 12; k++) {
        const a = (k * Math.PI) / 6;
        ctx.save();
        ctx.rotate(a);
        ctx.font = `44px ${police}`;
        ctx.fillText(romains[k], 0, -206);
        ctx.restore();
        ctx.save();
        ctx.rotate(a + Math.PI / 12);
        ctx.beginPath();
        ctx.moveTo(0, -176);
        ctx.lineTo(0, -238);
        ctx.stroke();
        ctx.restore();
      }
      ctx.font = `italic 46px ${police}`;
      ctx.fillText("Douze Mois", 0, 70);
    },
    false,
  );

/** Les plaques gravées des massifs : douze étiquettes sur une même toile. */
const texturePlaques = (police: string) =>
  toile(
    1024,
    512,
    (ctx) => {
      for (let k = 0; k < 12; k++) {
        const x = (k % 4) * 256;
        const y = Math.floor(k / 4) * 170;
        ctx.fillStyle = "#c9c0d3";
        ctx.fillRect(x, y, 256, 170);
        grains(ctx, 256, 170, 300, () => "rgba(50,30,70,0.08)", () => 0.6 + Math.random() * 1.5);
        ctx.strokeStyle = "rgba(36,24,54,0.5)";
        ctx.lineWidth = 3;
        ctx.strokeRect(x + 12, y + 12, 232, 146);
        ctx.fillStyle = "rgba(30,20,46,0.9)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `64px ${police}`;
        ctx.fillText(MOIS[k].nom, x + 128, y + 76);
        ctx.font = `30px ${police}`;
        ctx.fillText(String(k + 1).padStart(2, "0"), x + 128, y + 128);
      }
    },
    false,
  );

/* ============================ les matières ============================ */

type Uniformes = { temps: { value: number }; vent: { value: number }; lueur: { value: number } };

/**
 * La matière des fleurs : la couleur de l'instance ne prend que sur les pétales
 * (`teinte`), le vent les berce (plus fort en haut), une touffe désignée s'éclaire
 * (`eclat`), et les pétales gardent un peu de lumière propre — ils sont fins, le
 * soleil du soir les traverse.
 */
function matiereFleurs(u: Uniformes) {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.66, metalness: 0 });
  m.onBeforeCompile = (s) => {
    s.uniforms.uTemps = u.temps;
    s.uniforms.uVent = u.vent;
    s.uniforms.uLueur = u.lueur;
    s.vertexShader = s.vertexShader
      .replace(
        "#include <common>",
        "#include <common>\nattribute float teinte;\nattribute float eclat;\nvarying float vTeinte;\nvarying float vEclat;\nuniform float uTemps;\nuniform float uVent;",
      )
      // la couleur de l'instance ne prend que sur les pétales (les chunks ne sont pas
      // encore dépliés ici : on remplace l'include entier)
      .replace(
        "#include <color_vertex>",
        `vColor = vec4( 1.0 );
	vColor.rgb *= color;
#ifdef USE_INSTANCING_COLOR
	vColor.rgb = mix( vColor.rgb, vColor.rgb * instanceColor.rgb, teinte );
#endif`,
      )
      .replace(
        "#include <project_vertex>",
        `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
	float hauteurVent = max( mvPosition.y, 0.0 );
	float phaseVent = uTemps * 1.5 + mvPosition.x * 0.8 + mvPosition.z * 0.6;
	mvPosition.xz += vec2( sin( phaseVent ), sin( phaseVent * 0.77 + 1.3 ) ) * uVent * hauteurVent * hauteurVent;
	vTeinte = teinte;
	vEclat = eclat;
	mvPosition = modelViewMatrix * mvPosition;
	gl_Position = projectionMatrix * mvPosition;`,
      );
    s.fragmentShader = s.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying float vTeinte;\nvarying float vEclat;\nuniform float uLueur;")
      .replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\n\ttotalEmissiveRadiance += diffuseColor.rgb * ( vTeinte * uLueur + vEclat * 0.42 );");
  };
  return m;
}

/* ============================ le ciel ============================ */

function ciel(soleil: THREE.Vector3) {
  const g = new THREE.SphereGeometry(90, 32, 16);
  const m = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      zenith: { value: new THREE.Color("#140f2c") },
      milieu: { value: new THREE.Color("#3e2f78") },
      horizon: { value: new THREE.Color("#a58bc4") },
      sol: { value: new THREE.Color("#4b3c6a") },
      halo: { value: new THREE.Color("#ffc995") },
      dirSoleil: { value: soleil.clone().normalize() },
    },
    vertexShader: `varying vec3 vDir;
void main() {
  vDir = normalize( position );
  vec4 p = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  gl_Position = p.xyww;
}`,
    fragmentShader: `uniform vec3 zenith; uniform vec3 milieu; uniform vec3 horizon; uniform vec3 sol; uniform vec3 halo; uniform vec3 dirSoleil;
varying vec3 vDir;
void main() {
  vec3 d = normalize( vDir );
  float h = d.y;
  vec3 c = mix( horizon, milieu, smoothstep( 0.0, 0.28, h ) );
  c = mix( c, zenith, smoothstep( 0.22, 0.8, h ) );
  float s = max( dot( d, dirSoleil ), 0.0 );
  c += halo * ( pow( s, 18.0 ) * 0.9 + pow( s, 4.0 ) * 0.28 ) * ( 1.0 - smoothstep( 0.0, 0.45, h ) );
  c = mix( c, sol, smoothstep( 0.0, -0.08, h ) );
  gl_FragColor = vec4( c, 1.0 );
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
  });
  const maille = new THREE.Mesh(g, m);
  maille.frustumCulled = false;
  maille.renderOrder = -1;
  return maille;
}

/* ============================ la construction ============================ */

/** Les touffes de chaque fleur, groupées par massif. */
type Plantation = { espece: Forme; maille: THREE.InstancedMesh; eclat: THREE.InstancedBufferAttribute; matrices: THREE.Matrix4[]; mois: number[] };
type Touffe = { groupe: number; plantation: number; indice: number };
type GroupeConstruit = Groupe & { centre: THREE.Vector3; rayon: number; hauteur: number; touffes: Touffe[] };

/** Ce que pèse une touffe dans le budget d'un massif, en triangles. */
const BUDGET_PRINCIPAL = 5400;
const BUDGET_COMPAGNE = 2300;
/** L'écart entre deux touffes, en mètres. */
const ECART: Partial<Record<Forme, number>> = { mimosa: 0.85, lilas: 0.8, rose: 0.7, hortensia: 0.72, camelia: 0.72, tournesol: 0.36, pivoine: 0.42, lavande: 0.42, graminees: 0.4 };

function construireJardin(moisCourant: number, police: string, ordinateur: boolean, uniformes: Uniformes) {
  const groupe = new THREE.Group();
  const jetables: { dispose: () => void }[] = [];
  const garder = <T extends { dispose: () => void }>(x: T) => {
    jetables.push(x);
    return x;
  };

  /* --- le sol : gravier, massifs, bordures de buis, haie --- */
  const gravier = garder(textureGravier());
  gravier.repeat.set(9, 9);
  const sol = new THREE.Mesh(garder(new THREE.CircleGeometry(R_HAIE + 0.2, 72)), garder(new THREE.MeshStandardMaterial({ map: gravier, roughness: 0.95, color: "#ffffff" })));
  sol.rotation.x = -Math.PI / 2;
  sol.receiveShadow = true;
  groupe.add(sol);
  // au-delà de la haie, une prairie dans la pénombre
  const prairie = new THREE.Mesh(garder(new THREE.CircleGeometry(70, 48)), garder(new THREE.MeshStandardMaterial({ color: "#2a3330", roughness: 1 })));
  prairie.rotation.x = -Math.PI / 2;
  prairie.position.y = -0.02;
  groupe.add(prairie);

  const terre = garder(textureTerre());
  terre.repeat.set(1.3, 1.3);
  const buis = garder(textureFeuillage("#1f3a22", ["#2f5a30", "#3b6b37", "#284c29", "#4a7a40"]));
  buis.repeat.set(2.4, 2.4);
  const matTerre = garder(new THREE.MeshStandardMaterial({ map: terre, roughness: 1 }));
  const matBuis = garder(new THREE.MeshStandardMaterial({ map: buis, roughness: 0.9 }));
  for (let m = 1; m <= 12; m++) {
    const exterieur = new THREE.Shape(contourMassif(m, R_IN, R_OUT, ALLEE));
    const interieur = contourMassif(m, R_IN + BORDURE, R_OUT - BORDURE, ALLEE + BORDURE * 2);
    exterieur.holes.push(new THREE.Path(interieur));
    const bord = garder(new THREE.ExtrudeGeometry(exterieur, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 2, curveSegments: 4 }));
    bord.rotateX(-Math.PI / 2);
    bord.scale(1, 1, 1);
    const bordure = new THREE.Mesh(bord, matBuis);
    bordure.castShadow = ordinateur;
    bordure.receiveShadow = true;
    groupe.add(bordure);
    const plate = garder(new THREE.ShapeGeometry(new THREE.Shape(interieur)));
    plate.rotateX(-Math.PI / 2);
    const massif = new THREE.Mesh(plate, matTerre);
    massif.position.y = 0.05;
    massif.receiveShadow = true;
    groupe.add(massif);
  }

  // La haie d'ifs taillés qui ferme le jardin.
  const anneau = new THREE.Shape();
  anneau.absarc(0, 0, R_HAIE + EP_HAIE, 0, Math.PI * 2, false);
  const trou = new THREE.Path();
  trou.absarc(0, 0, R_HAIE, 0, Math.PI * 2, true);
  anneau.holes.push(trou);
  const geoHaie = garder(new THREE.ExtrudeGeometry(anneau, { depth: HAUT_HAIE, bevelEnabled: true, bevelThickness: 0.18, bevelSize: 0.16, bevelSegments: 3, curveSegments: 96 }));
  geoHaie.rotateX(-Math.PI / 2);
  const ifs = garder(textureFeuillage("#132a1c", ["#1d3d27", "#25492e", "#183322", "#2f5634"]));
  ifs.repeat.set(1.4, 1.4);
  const haie = new THREE.Mesh(geoHaie, garder(new THREE.MeshStandardMaterial({ map: ifs, roughness: 0.95 })));
  haie.receiveShadow = true;
  groupe.add(haie);

  // Des arbres derrière la haie : des silhouettes contre le ciel.
  const h = hasard(12);
  const couronnes = garder(new THREE.IcosahedronGeometry(1, 1));
  const matArbres = garder(new THREE.MeshStandardMaterial({ color: "#16211f", roughness: 1 }));
  const arbres = new THREE.InstancedMesh(couronnes, matArbres, 66);
  const ifsHauts = new THREE.InstancedMesh(garder(new THREE.SphereGeometry(1, 12, 10).scale(0.55, 2.2, 0.55)), matArbres, 10);
  const mat = new THREE.Matrix4();
  let n = 0;
  for (let k = 0; k < 22; k++) {
    const a = (k / 22) * Math.PI * 2 + h() * 0.2;
    const r = 11 + h() * 5;
    const base = versAzimut(a).multiplyScalar(r);
    for (let b = 0; b < 3; b++) {
      const s = 1.8 + h() * 1.6;
      mat.compose(new THREE.Vector3(base.x + (h() - 0.5) * 2, 2.6 + b * 1.4 + h() * 1.5, base.z + (h() - 0.5) * 2), new THREE.Quaternion(), new THREE.Vector3(s, s * 0.9, s));
      arbres.setMatrixAt(n++, mat);
    }
  }
  for (let k = 0; k < 10; k++) {
    const a = ((k + 0.5) / 10) * Math.PI * 2;
    mat.compose(versAzimut(a).multiplyScalar(9.2).setY(1.9), new THREE.Quaternion(), new THREE.Vector3(1, 1, 1));
    ifsHauts.setMatrixAt(k, mat);
  }
  groupe.add(arbres, ifsHauts);

  /* --- le cadran solaire, au centre --- */
  const pierre = garder(new THREE.MeshStandardMaterial({ color: "#bdb4c8", roughness: 0.85 }));
  const marche = new THREE.Mesh(garder(new THREE.CylinderGeometry(0.78, 0.82, 0.12, 48)), pierre);
  marche.position.y = 0.06;
  marche.receiveShadow = true;
  const pied = new THREE.Mesh(
    garder(new THREE.LatheGeometry([[0, 0], [0.3, 0], [0.3, 0.08], [0.22, 0.14], [0.16, 0.24], [0.13, 0.5], [0.16, 0.72], [0.24, 0.8], [0.3, 0.86], [0, 0.86]].map(([x, y]) => new THREE.Vector2(x, y)), 32)),
    pierre,
  );
  pied.position.y = 0.12;
  pied.castShadow = ordinateur;
  const table = new THREE.Mesh(garder(new THREE.CylinderGeometry(0.46, 0.46, 0.05, 48)), pierre);
  table.position.y = 1.0;
  table.castShadow = ordinateur;
  // la face gravée : son haut (le XII) regarde le nord, le massif de décembre
  const cadranTex = garder(textureCadran(police));
  const face = new THREE.Mesh(garder(new THREE.CircleGeometry(0.44, 48).rotateX(-Math.PI / 2)), garder(new THREE.MeshStandardMaterial({ map: cadranTex, roughness: 0.8 })));
  face.position.y = 1.026;
  const style = new THREE.Shape([new THREE.Vector2(-0.16, 0), new THREE.Vector2(0.16, 0), new THREE.Vector2(-0.16, 0.19)]);
  const gnomon = new THREE.Mesh(garder(new THREE.ExtrudeGeometry(style, { depth: 0.01, bevelEnabled: false }).translate(0, 0, -0.005)), garder(new THREE.MeshStandardMaterial({ color: "#b08a50", metalness: 0.75, roughness: 0.32 })));
  gnomon.position.set(0, 1.026, 0);
  gnomon.rotation.y = Math.PI / 2;
  gnomon.castShadow = ordinateur;
  groupe.add(marche, pied, table, face, gnomon);

  /* --- les plaques des mois, au bout de chaque massif --- */
  const plaquesTex = garder(texturePlaques(police));
  const matPlaques = garder(new THREE.MeshStandardMaterial({ map: plaquesTex, roughness: 0.8 }));
  for (let m = 1; m <= 12; m++) {
    const geo = new THREE.PlaneGeometry(0.5, 0.33);
    const k = m - 1;
    const u0 = (k % 4) / 4;
    const v1 = 1 - (Math.floor(k / 4) * 170) / 512;
    const v0 = v1 - 170 / 512;
    const uv = geo.getAttribute("uv");
    for (let i = 0; i < uv.count; i++) uv.setXY(i, u0 + uv.getX(i) * 0.25, v0 + uv.getY(i) * (v1 - v0));
    garder(geo);
    const plaque = new THREE.Mesh(geo, matPlaques);
    const dir = versAzimut(azimut(m));
    plaque.position.copy(dir.clone().multiplyScalar(R_IN - 0.16)).setY(0.21);
    // tournée vers le cadran, inclinée comme un pupitre
    plaque.lookAt(0, 1.2, 0);
    groupe.add(plaque);
    const socle = new THREE.Mesh(garder(new THREE.BoxGeometry(0.4, 0.2, 0.1)), pierre);
    socle.position.copy(dir.clone().multiplyScalar(R_IN - 0.1)).setY(0.1);
    socle.lookAt(0, 0.12, 0);
    groupe.add(socle);
  }

  /* --- la lanterne du mois en cours --- */
  // sur l'allée, à l'entrée du massif du mois
  const dirCourant = versAzimut(azimut(moisCourant) - Math.PI / 12);
  const poteau = new THREE.Mesh(garder(new THREE.CylinderGeometry(0.025, 0.03, 1.15, 8)), garder(new THREE.MeshStandardMaterial({ color: "#2b2233", roughness: 0.6, metalness: 0.4 })));
  poteau.position.copy(dirCourant.clone().multiplyScalar(R_OUT + 0.22)).setY(0.575);
  const verre = new THREE.Mesh(garder(new THREE.BoxGeometry(0.13, 0.18, 0.13)), garder(new THREE.MeshStandardMaterial({ color: "#ffd9a0", emissive: "#ffb766", emissiveIntensity: 2.4 })));
  verre.position.copy(poteau.position).setY(1.24);
  const toit = new THREE.Mesh(garder(new THREE.ConeGeometry(0.12, 0.1, 4)), poteau.material);
  toit.position.copy(verre.position).setY(1.38);
  toit.rotation.y = Math.PI / 4;
  const lampe = new THREE.PointLight("#ffbf7a", 3.2, 7, 1.6);
  lampe.position.copy(verre.position);
  groupe.add(poteau, verre, toit, lampe);

  /* --- les fleurs --- */
  const matFleurs = garder(matiereFleurs(uniformes));
  const geometries = new Map<Forme, THREE.BufferGeometry>();
  const geometrie = (e: Forme) => {
    let g = geometries.get(e);
    if (!g) {
      g = garder(touffe(e, ESPECE[e].hauteur, 3 + e.length));
      geometries.set(e, g);
    }
    return g;
  };

  type Pose = { espece: Forme; pos: THREE.Vector3; tour: number; echelle: number; couleur: THREE.Color; groupe: number };
  const poses: Pose[] = [];
  const groupes: GroupeConstruit[] = [];
  const hp = hasard(2026);

  for (let m = 1; m <= 12; m++) {
    const fleurs = fleursDuMois(m);
    const bandes: { r0: number; r1: number; part: [number, number]; budget: number }[] =
      fleurs.length >= 3
        ? [
            { r0: R_IN + 0.26, r1: 3.45, part: [0.03, 0.97], budget: BUDGET_PRINCIPAL },
            { r0: 3.55, r1: R_OUT - 0.26, part: [0.02, 0.5], budget: BUDGET_COMPAGNE },
            { r0: 3.55, r1: R_OUT - 0.26, part: [0.5, 0.98], budget: BUDGET_COMPAGNE },
          ]
        : [
            { r0: R_IN + 0.26, r1: 3.45, part: [0.03, 0.97], budget: BUDGET_PRINCIPAL },
            { r0: 3.55, r1: R_OUT - 0.26, part: [0.04, 0.96], budget: BUDGET_COMPAGNE * 2 },
          ];
    fleurs.slice(0, bandes.length).forEach((espece, i) => {
      const bande = bandes[i];
      const geo = geometrie(espece.id);
      const triangles = (geo.index?.count ?? 0) / 3;
      const ecart = ECART[espece.id] ?? 0.36;
      const voulu = THREE.MathUtils.clamp(Math.round(bande.budget / Math.max(1, triangles)), 2, 9);
      const indiceGroupe = groupes.length;
      const places: THREE.Vector3[] = [];
      for (let essai = 0; essai < 260 && places.length < voulu; essai++) {
        const p = dansMassif(m, bande.r0, bande.r1, bande.part, hp);
        if (places.every((q) => q.distanceTo(p) > ecart)) places.push(p);
      }
      // une ou deux couleurs par massif, comme on plante en vrai : par taches
      const premiere = (m + i * 2) % espece.couleurs.length;
      const seconde = (premiere + 1) % espece.couleurs.length;
      const centre = new THREE.Vector3();
      places.forEach((p) => centre.add(p));
      centre.divideScalar(Math.max(1, places.length));
      const rayon = Math.max(0.4, ...places.map((p) => p.distanceTo(centre) + ecart * 0.5));
      groupes.push({ espece: espece.id, mois: m, centre, rayon, hauteur: espece.hauteur, touffes: [] });
      places.forEach((p) => {
        const versCentre = Math.atan2(-p.x, -p.z);
        poses.push({
          espece: espece.id,
          pos: p.setY(0.05),
          tour: espece.id === "tournesol" ? versCentre : hp() * Math.PI * 2,
          echelle: 0.95 + hp() * 0.25,
          couleur: new THREE.Color(espece.couleurs[hp() < 0.72 ? premiere : seconde]),
          groupe: indiceGroupe,
        });
      });
    });
  }

  const plantations: Plantation[] = [];
  const parEspece = new Map<Forme, Pose[]>();
  for (const p of poses) parEspece.set(p.espece, [...(parEspece.get(p.espece) ?? []), p]);
  for (const [espece, liste] of parEspece) {
    const maille = new THREE.InstancedMesh(geometrie(espece), matFleurs, liste.length);
    const eclat = new THREE.InstancedBufferAttribute(new Float32Array(liste.length), 1);
    eclat.setUsage(THREE.DynamicDrawUsage);
    maille.geometry.setAttribute("eclat", eclat);
    const matrices: THREE.Matrix4[] = [];
    const mois: number[] = [];
    liste.forEach((p, i) => {
      const m4 = new THREE.Matrix4().compose(p.pos, new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), p.tour), new THREE.Vector3(p.echelle, p.echelle, p.echelle));
      matrices.push(m4);
      mois.push(groupes[p.groupe].mois);
      maille.setMatrixAt(i, m4);
      maille.setColorAt(i, p.couleur);
      groupes[p.groupe].touffes.push({ groupe: p.groupe, plantation: plantations.length, indice: i });
    });
    maille.castShadow = ordinateur;
    maille.receiveShadow = ordinateur;
    maille.frustumCulled = false;
    plantations.push({ espece, maille, eclat, matrices, mois });
    groupe.add(maille);
  }

  // Les ombres au pied des touffes : une tache sombre, peinte au sol (le téléphone n'a
  // pas d'ombres portées, et sur ordinateur elles ancrent la plante).
  const tache = garder(textureTache("rgba(10,6,18,0.55)", "rgba(10,6,18,0)"));
  const ombres = new THREE.InstancedMesh(garder(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2)), garder(new THREE.MeshBasicMaterial({ map: tache, transparent: true, depthWrite: false })), poses.length);
  poses.forEach((p, i) => {
    const s = (ECART[p.espece] ?? 0.36) * 1.15 * p.echelle;
    ombres.setMatrixAt(i, mat.compose(p.pos.clone().setY(0.062), new THREE.Quaternion(), new THREE.Vector3(s, 1, s)));
  });
  groupe.add(ombres);

  // Les cibles : un cylindre invisible par touffe, que vise le pointeur.
  const cibles = new THREE.InstancedMesh(garder(new THREE.CylinderGeometry(1, 1, 1, 8).translate(0, 0.5, 0)), garder(new THREE.MeshBasicMaterial()), poses.length);
  const cibleGroupe: number[] = [];
  poses.forEach((p, i) => {
    const r = (ECART[p.espece] ?? 0.36) * 0.62;
    cibles.setMatrixAt(i, mat.compose(p.pos, new THREE.Quaternion(), new THREE.Vector3(r, ESPECE[p.espece].hauteur * p.echelle * 1.08, r)));
    cibleGroupe.push(p.groupe);
  });
  cibles.updateMatrixWorld(true);

  // L'anneau de la touffe désignée.
  const anneauTex = garder(textureAnneau());
  const marque = new THREE.Mesh(garder(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2)), garder(new THREE.MeshBasicMaterial({ map: anneauTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: "#d4f36b" })));
  marque.visible = false;
  groupe.add(marque);

  return {
    groupe,
    gravures: [cadranTex, plaquesTex],
    plantations,
    groupes,
    cibles,
    cibleGroupe,
    marque,
    sol,
    jetables,
  };
}

/* ============================ les poussières dorées ============================ */

function poussieres(n: number) {
  const pos = new Float32Array(n * 3);
  const graines = new Float32Array(n * 3);
  const h = hasard(5);
  for (let i = 0; i < n; i++) {
    const a = h() * Math.PI * 2;
    const r = Math.sqrt(h()) * R_OUT;
    graines[i * 3] = Math.sin(a) * r;
    graines[i * 3 + 1] = 0.25 + h() * 1.6;
    graines[i * 3 + 2] = -Math.cos(a) * r;
  }
  pos.set(graines);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const tex = textureTache("rgba(255,236,200,1)", "rgba(255,236,200,0)");
  const mat = new THREE.PointsMaterial({ map: tex, size: 0.06, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: "#ffe2b8", opacity: 0.85 });
  const points = new THREE.Points(geo, mat);
  const bouger = (t: number) => {
    for (let i = 0; i < n; i++) {
      pos[i * 3] = graines[i * 3] + Math.sin(t * 0.21 + i) * 0.35;
      pos[i * 3 + 1] = graines[i * 3 + 1] + Math.sin(t * 0.33 + i * 1.7) * 0.18;
      pos[i * 3 + 2] = graines[i * 3 + 2] + Math.cos(t * 0.17 + i * 0.6) * 0.35;
    }
    geo.attributes.position.needsUpdate = true;
  };
  return { points, bouger, jeter: () => (geo.dispose(), mat.dispose(), tex.dispose()) };
}

/* ============================ le composant ============================ */

const lisser = (t: number) => t * t * (3 - 2 * t);
const versLe = (a: number, b: number) => {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d;
};

type Moteur = {
  jardin: ReturnType<typeof construireJardin>;
  aller: (x: number, z: number, cap: number, tangage?: number) => void;
  eclairer: (g: Groupe | null) => void;
  recadrer: () => void;
} & Pilote;

export default function Jardin3D(props: Props) {
  const conteneur = useRef<HTMLDivElement>(null);
  const moteur = useRef<Moteur | null>(null);
  const rappels = useRef(props);
  useEffect(() => {
    rappels.current = props;
  });
  const { moisCourant, decalage, pilote, onIndisponible } = props;

  // Les boutons de marche de la page passent par ici.
  useImperativeHandle(
    pilote,
    () => ({
      avancer: (pas: number) => moteur.current?.avancer(pas),
      tourner: (angle: number) => moteur.current?.tourner(angle),
    }),
    [],
  );

  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;
    // Sans WebGL, on le sait avant de lancer three.js (qui l'écrirait en erreur dans la
    // console) : le plan du jardin reste, et la liste des fleurs fait le reste.
    const essai = document.createElement("canvas");
    if (!(essai.getContext("webgl2") ?? essai.getContext("webgl"))) {
      onIndisponible();
      return;
    }
    let rendu: THREE.WebGLRenderer;
    try {
      rendu = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      onIndisponible();
      return;
    }
    const ordinateur = window.innerWidth >= 1024 && !window.matchMedia("(pointer: coarse)").matches;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rendu.setPixelRatio(Math.min(window.devicePixelRatio, ordinateur ? 1.75 : 1.5));
    rendu.outputColorSpace = THREE.SRGBColorSpace;
    rendu.toneMapping = THREE.NeutralToneMapping;
    rendu.toneMappingExposure = 1.2;
    if (ordinateur) {
      rendu.shadowMap.enabled = true;
      rendu.shadowMap.type = THREE.PCFShadowMap;
    }
    el.appendChild(rendu.domElement);
    Object.assign(rendu.domElement.style, { display: "block", width: "100%", height: "100%" });

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#6f5c8e", 8, 30);
    const pmrem = new THREE.PMREMGenerator(rendu);
    const environnement = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environnement;
    scene.environmentIntensity = 0.32;

    // On arrive par l'allée du tour, devant le massif du mois, en regardant le cadran :
    // le massif au premier plan, le cadran, les autres mois derrière, la haie, le ciel.
    // Le soleil du soir est bas, derrière l'épaule gauche : il prend les fleurs de
    // trois quarts ; quand on se retourne, il allume le ciel au-dessus de la haie.
    const cap = azimut(moisCourant) + Math.PI;
    const soleilDir = versAzimut(cap + Math.PI + 0.75).setY(0.42).normalize();
    const voute = ciel(soleilDir);
    scene.add(voute);
    const hemi = new THREE.HemisphereLight("#e6e2ff", "#403848", 1.25);
    const soleil = new THREE.DirectionalLight("#ffc79e", 3.4);
    soleil.position.copy(soleilDir.clone().multiplyScalar(22));
    soleil.target.position.set(0, 0, 0);
    if (ordinateur) {
      soleil.castShadow = true;
      soleil.shadow.mapSize.set(2048, 2048);
      const o = soleil.shadow.camera;
      o.left = o.bottom = -7;
      o.right = o.top = 7;
      o.near = 1;
      o.far = 50;
      soleil.shadow.bias = -0.0005;
      soleil.shadow.normalBias = 0.02;
    }
    const contre = new THREE.DirectionalLight("#8ea0ff", 0.55);
    contre.position.copy(soleilDir.clone().multiplyScalar(-20)).setY(10);
    scene.add(hemi, soleil, soleil.target, contre);

    // La police des titres du site (sa variable CSS, résolue), pour graver le cadran et
    // les plaques ; repeintes quand elle a fini de charger.
    const police = getComputedStyle(el).getPropertyValue("--titres").trim() || "serif";
    const uniformes: Uniformes = { temps: { value: 0 }, vent: { value: reduit ? 0 : 0.045 }, lueur: { value: 0.18 } };
    const jardin = construireJardin(moisCourant, police, ordinateur, uniformes);
    scene.add(jardin.groupe);
    let detruit = false;
    document.fonts?.load(`44px ${police}`).then(() => {
      if (detruit) return;
      jardin.gravures.forEach((t) => t.userData.repeindre?.());
      reveiller();
    });
    // Le poids de la scène, lisible par les tests : tous les triangles, instances comprises.
    let triangles = 0;
    scene.traverse((o) => {
      if (!(o instanceof THREE.Mesh) || o === voute) return;
      const g = o.geometry as THREE.BufferGeometry;
      const n = (g.index ? g.index.count : g.getAttribute("position").count) / 3;
      triangles += n * (o instanceof THREE.InstancedMesh ? o.count : 1);
    });
    el.dataset.triangles = String(Math.round(triangles));
    const poussiere = reduit ? null : poussieres(ordinateur ? 140 : 80);
    if (poussiere) scene.add(poussiere.points);

    // L'état de la boucle de rendu (déclaré tôt : la marche et le pointeur la réveillent).
    let image = 0;
    let visible = true;
    let precedent = performance.now();
    let aDessiner = true;
    const reveiller = () => {
      aDessiner = true;
      if (!image && visible) {
        precedent = performance.now();
        image = requestAnimationFrame(boucle);
      }
    };

    const camera = new THREE.PerspectiveCamera(50, 1, 0.08, 140);
    let composer: EffectComposer | null = null;
    if (ordinateur) {
      composer = new EffectComposer(rendu);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new UnrealBloomPass(new THREE.Vector2(512, 512), 0.32, 0.5, 0.82));
      composer.addPass(new OutputPass());
    }

    /* --- la marche : position, cap, hauteur des yeux, regard --- */
    const yeux = ordinateur ? 1.6 : 1.75;
    const regard = ordinateur ? -0.3 : -0.36;
    const depart = versAzimut(azimut(moisCourant)).multiplyScalar(R_MARCHE - 0.05);
    const etat = { x: depart.x, z: depart.z, cap, y: yeux, tangage: regard };
    const cible = { x: depart.x, z: depart.z, cap, tangage: regard };
    // L'ouverture : vu d'en haut, le jardin est un cadran ; la caméra descend vers le
    // mois en cours pendant que les massifs fleurissent l'un après l'autre.
    let ouverture = reduit ? 1 : 0;
    const DUREE_OUVERTURE = 3.6;
    const haut = { y: ordinateur ? 12.5 : 16, tangage: -1.38 };

    const borner = () => {
      const r = Math.hypot(cible.x, cible.z);
      if (r > R_MARCHE) {
        cible.x *= R_MARCHE / r;
        cible.z *= R_MARCHE / r;
      }
      // ne pas entrer dans le cadran
      const r2 = Math.hypot(cible.x, cible.z);
      if (r2 < 0.7) {
        const k = r2 < 1e-3 ? 0 : 0.7 / r2;
        cible.x = r2 < 1e-3 ? 0.7 : cible.x * k;
        cible.z *= k;
      }
    };
    const avancer = (pas: number) => {
      cible.tangage = regard;
      cible.x += Math.sin(cible.cap) * pas;
      cible.z -= Math.cos(cible.cap) * pas;
      borner();
      reveiller();
    };
    const tourner = (angle: number) => {
      cible.tangage = regard;
      cible.cap += angle;
      reveiller();
    };

    const placerCamera = () => {
      const t = lisser(Math.min(1, ouverture));
      const t2 = lisser(THREE.MathUtils.clamp((ouverture - 0.15) / 0.85, 0, 1));
      const y = THREE.MathUtils.lerp(haut.y, etat.y, t);
      const tangage = THREE.MathUtils.lerp(haut.tangage, etat.tangage, t2);
      // vu d'en haut, le jardin est au milieu de l'image ; on glisse vers l'allée
      const recul = haut.y * 0.2;
      const x0 = -Math.sin(etat.cap) * recul;
      const z0 = Math.cos(etat.cap) * recul;
      camera.position.set(THREE.MathUtils.lerp(x0, etat.x, t), y, THREE.MathUtils.lerp(z0, etat.z, t));
      const d = new THREE.Vector3(Math.sin(etat.cap) * Math.cos(tangage), Math.sin(tangage), -Math.cos(etat.cap) * Math.cos(tangage));
      camera.lookAt(camera.position.clone().add(d));
      voute.position.copy(camera.position);
    };

    /* --- les fleurs qui poussent à l'ouverture, massif après massif --- */
    const tmp = new THREE.Matrix4();
    const pousse = (o: number) => {
      for (const p of jardin.plantations) {
        p.matrices.forEach((m4, i) => {
          const rang = (p.mois[i] - moisCourant + 12) % 12;
          const debut = 0.08 + rang * 0.045;
          const k = THREE.MathUtils.clamp((o - debut) / 0.3, 0, 1);
          const s = k === 0 ? 0.0001 : 1 - Math.pow(1 - k, 3) + Math.sin(k * Math.PI) * 0.08;
          tmp.copy(m4).multiply(new THREE.Matrix4().makeScale(s, s, s));
          p.maille.setMatrixAt(i, tmp);
        });
        p.maille.instanceMatrix.needsUpdate = true;
      }
    };
    if (!reduit) pousse(0);

    /* --- désigner une touffe --- */
    let eclaire = -1;
    const eclairer = (g: Groupe | null) => {
      const i = g ? jardin.groupes.findIndex((x) => x.espece === g.espece && x.mois === g.mois) : -1;
      if (i === eclaire) return;
      for (const gr of [jardin.groupes[eclaire], jardin.groupes[i]]) {
        if (!gr) continue;
        for (const t of gr.touffes) {
          const p = jardin.plantations[t.plantation];
          p.eclat.setX(t.indice, gr === jardin.groupes[i] ? 1 : 0);
          p.eclat.needsUpdate = true;
        }
      }
      eclaire = i;
      const gr = jardin.groupes[i];
      jardin.marque.visible = Boolean(gr);
      if (gr) {
        jardin.marque.position.copy(gr.centre).setY(0.075);
        jardin.marque.scale.setScalar(gr.rayon * 2.4);
      }
      reveiller();
    };

    const aller = (x: number, z: number, vers: number, tangage = regard) => {
      cible.x = x;
      cible.z = z;
      cible.cap = versLe(cible.cap, vers);
      cible.tangage = tangage;
      borner();
      if (reduit) Object.assign(etat, { x: cible.x, z: cible.z, cap: cible.cap, tangage: cible.tangage });
      reveiller();
    };
    moteur.current = { jardin, aller, eclairer, avancer, tourner, recadrer: () => {} };

    /* --- le pointeur --- */
    const rayon = new THREE.Raycaster();
    const souris = new THREE.Vector2();
    const viser = (cx: number, cy: number) => {
      const r = el.getBoundingClientRect();
      souris.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
      rayon.setFromCamera(souris, camera);
      const touche = rayon.intersectObject(jardin.cibles, false)[0];
      if (touche && touche.instanceId !== undefined) {
        const g = jardin.groupes[jardin.cibleGroupe[touche.instanceId]];
        return { groupe: { espece: g.espece, mois: g.mois } as Groupe, sol: null, ecran: { x: cx - r.left, y: cy - r.top } };
      }
      const sol = rayon.intersectObject(jardin.sol, false)[0];
      return { groupe: null, sol: sol?.point ?? null, ecran: { x: cx - r.left, y: cy - r.top } };
    };

    let appui: { x: number; y: number; id: number; type: string; glisse: boolean; cap: number; px: number; pz: number } | null = null;
    let dernierSurvol = "";
    const surAppui = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      appui = { x: e.clientX, y: e.clientY, id: e.pointerId, type: e.pointerType, glisse: false, cap: cible.cap, px: cible.x, pz: cible.z };
      if (e.pointerType === "mouse") el.setPointerCapture(e.pointerId);
    };
    const surDeplacement = (e: PointerEvent) => {
      if (appui && appui.id === e.pointerId) {
        const dx = e.clientX - appui.x;
        const dy = e.clientY - appui.y;
        if (!appui.glisse && Math.hypot(dx, dy) > 6) {
          appui.glisse = true;
          rappels.current.surSurvol(null);
          rappels.current.surGeste();
          dernierSurvol = "";
          el.dataset.glisse = "";
        }
        if (appui.glisse) {
          // On attrape le jardin : glisser vers la droite tourne la tête à gauche ;
          // à la souris, glisser vers le haut fait avancer.
          cible.tangage = regard;
          cible.cap = appui.cap - dx * (appui.type === "mouse" ? 0.0042 : 0.0065);
          if (appui.type === "mouse") {
            const pas = -dy * 0.014;
            cible.x = appui.px + Math.sin(cible.cap) * pas;
            cible.z = appui.pz - Math.cos(cible.cap) * pas;
            borner();
          }
          reveiller();
        }
        return;
      }
      if (e.pointerType !== "mouse") return;
      const v = viser(e.clientX, e.clientY);
      const cle = v.groupe ? `${v.groupe.espece}-${v.groupe.mois}` : "";
      el.style.cursor = v.groupe ? "pointer" : "grab";
      if (cle !== dernierSurvol || v.groupe) {
        dernierSurvol = cle;
        rappels.current.surSurvol(v.groupe, v.ecran);
      }
    };
    const surRelache = (e: PointerEvent) => {
      if (!appui || appui.id !== e.pointerId) return;
      const etaitGlisse = appui.glisse;
      const type = appui.type;
      appui = null;
      delete el.dataset.glisse;
      if (etaitGlisse) return;
      const v = viser(e.clientX, e.clientY);
      if (v.groupe) {
        if (type === "mouse") rappels.current.surChoix(v.groupe, v.ecran);
        else rappels.current.surToucher(v.groupe, v.ecran);
      } else if (v.sol) {
        // toucher le sol : on y va, en s'arrêtant un pas avant
        const d = new THREE.Vector3(v.sol.x - etat.x, 0, v.sol.z - etat.z);
        const l = d.length();
        if (l > 0.4) {
          const arret = Math.max(0, l - 0.9) / l;
          aller(etat.x + d.x * arret, etat.z + d.z * arret, Math.atan2(d.x, -d.z));
        }
        rappels.current.surSurvol(null);
        rappels.current.surGeste();
      }
    };
    const surAnnule = () => {
      appui = null;
      delete el.dataset.glisse;
    };
    const surSortie = () => {
      if (dernierSurvol) rappels.current.surSurvol(null);
      dernierSurvol = "";
    };
    el.addEventListener("pointerdown", surAppui);
    el.addEventListener("pointermove", surDeplacement);
    el.addEventListener("pointerup", surRelache);
    el.addEventListener("pointercancel", surAnnule);
    el.addEventListener("pointerleave", surSortie);

    /* --- le clavier : les flèches marchent, quand le jardin a le focus --- */
    const touches = new Set<string>();
    const surTouche = (e: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
      e.preventDefault();
      if (!touches.size) rappels.current.surGeste();
      touches.add(e.key);
      reveiller();
    };
    const surLache = (e: KeyboardEvent) => touches.delete(e.key);
    const surFlou = () => touches.clear();
    el.addEventListener("keydown", surTouche);
    el.addEventListener("keyup", surLache);
    el.addEventListener("blur", surFlou);

    /* --- la boucle --- */
    let horloge = 0;
    let premiere = true;
    const cadence = ordinateur ? 15 : 31;
    const boucle = (maintenant: number) => {
      image = requestAnimationFrame(boucle);
      if (maintenant - precedent < cadence) return;
      const dt = Math.min(0.08, (maintenant - precedent) / 1000);
      precedent = maintenant;

      if (touches.size) {
        const vitesse = 2.2 * dt;
        if (touches.has("ArrowUp")) avancer(vitesse);
        if (touches.has("ArrowDown")) avancer(-vitesse);
        if (touches.has("ArrowLeft")) tourner(-1.5 * dt);
        if (touches.has("ArrowRight")) tourner(1.5 * dt);
      }
      // la caméra rejoint sa cible en douceur (d'un coup, sans animations)
      const k = reduit ? 1 : 1 - Math.exp(-dt * 5.5);
      const avant = etat.x + etat.z + etat.cap + etat.tangage;
      etat.x += (cible.x - etat.x) * k;
      etat.z += (cible.z - etat.z) * k;
      etat.cap += (cible.cap - etat.cap) * k;
      etat.tangage += (cible.tangage - etat.tangage) * k;
      let bouge = Math.abs(etat.x + etat.z + etat.cap + etat.tangage - avant) > 1e-5;

      if (ouverture < 1) {
        ouverture = Math.min(1, ouverture + dt / DUREE_OUVERTURE);
        pousse(ouverture * 1.25);
        bouge = true;
      }
      if (!reduit) {
        horloge += dt;
        uniformes.temps.value = horloge;
        poussiere?.bouger(horloge);
        if (jardin.marque.visible) (jardin.marque.material as THREE.MeshBasicMaterial).opacity = 0.75 + Math.sin(horloge * 3) * 0.25;
        bouge = true;
      }
      if (bouge || aDessiner) {
        placerCamera();
        if (composer) composer.render();
        else rendu.render(scene, camera);
        aDessiner = false;
        if (premiere) {
          premiere = false;
          rappels.current.surPret();
        }
      } else if (reduit && !touches.size) {
        // rien ne bouge seul : la boucle s'endort jusqu'au prochain geste
        cancelAnimationFrame(image);
        image = 0;
      }
    };
    const observateur = new IntersectionObserver(([entree]) => {
      visible = entree.isIntersecting;
      if (visible) reveiller();
      else {
        cancelAnimationFrame(image);
        image = 0;
      }
    });
    observateur.observe(el);

    const recadrer = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      rendu.setSize(width, height, false);
      composer?.setSize(width, height);
      camera.aspect = width / height;
      // Un téléphone tenu droit garde un champ assez large pour voir le massif entier.
      camera.fov = camera.aspect < 1 ? 74 : 50;
      const d = rappels.current.decalage;
      if (d) camera.setViewOffset(width, height, -d * width, 0, width, height);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
      reveiller();
    };
    const taille = new ResizeObserver(recadrer);
    taille.observe(el);
    moteur.current.recadrer = recadrer;
    reveiller();

    return () => {
      detruit = true;
      cancelAnimationFrame(image);
      observateur.disconnect();
      taille.disconnect();
      el.removeEventListener("pointerdown", surAppui);
      el.removeEventListener("pointermove", surDeplacement);
      el.removeEventListener("pointerup", surRelache);
      el.removeEventListener("pointercancel", surAnnule);
      el.removeEventListener("pointerleave", surSortie);
      el.removeEventListener("keydown", surTouche);
      el.removeEventListener("keyup", surLache);
      el.removeEventListener("blur", surFlou);
      moteur.current = null;
      jardin.jetables.forEach((j) => j.dispose());
      jardin.plantations.forEach((p) => p.maille.dispose());
      poussiere?.jeter();
      voute.geometry.dispose();
      (voute.material as THREE.Material).dispose();
      composer?.passes.forEach((p) => (p as { dispose?: () => void }).dispose?.());
      composer?.dispose();
      environnement.dispose();
      pmrem.dispose();
      rendu.dispose();
      rendu.domElement.remove();
    };
  }, [moisCourant, onIndisponible]);

  // La touffe désignée s'éclaire.
  useEffect(() => {
    moteur.current?.eclairer(props.actif);
  }, [props.actif]);

  // Aller voir une touffe demandée par la page : se poster entre elle et le cadran.
  const viser = props.viser;
  useEffect(() => {
    const m = moteur.current;
    if (!m || !viser) return;
    const g = m.jardin.groupes.find((x) => x.espece === viser.espece && x.mois === viser.mois);
    if (!g) return;
    // On se poste à deux pas, côté cadran, et on baisse les yeux vers la touffe.
    const versCadran = g.centre.clone().setY(0).normalize().multiplyScalar(-1);
    const recul = 1.7 + g.rayon * 0.6;
    const poste = g.centre.clone().addScaledVector(versCadran, recul);
    const tangage = -Math.atan2(1.6 - g.hauteur * 0.75, recul);
    m.aller(poste.x, poste.z, Math.atan2(g.centre.x - poste.x, -(g.centre.z - poste.z)), tangage);
  }, [viser]);

  // Le décalage de l'image suit la mise en page (colonne de texte sur ordinateur).
  useEffect(() => {
    moteur.current?.recadrer();
  }, [decalage]);

  return (
    <div
      ref={conteneur}
      tabIndex={0}
      role="application"
      aria-roledescription="jardin en 3D"
      aria-label="Le jardin des douze mois. Flèches haut et bas : avancer, reculer. Flèches gauche et droite : tourner. Les fleurs sont aussi dans la liste sous le jardin."
      data-film="jardin-fleurs"
      className="absolute inset-0 cursor-grab touch-pan-y outline-none data-[glisse]:cursor-grabbing focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]"
    />
  );
}
