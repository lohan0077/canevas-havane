"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { APPELS, angle, hauteur, heureDe, production } from "./horloge";

// Le toit-horloge : la maison posée au centre d'une grande horloge couchée, celle de la
// photo du site (le cadre d'émail vert, le cadran blanc, les chiffres noirs, la trotteuse
// rouge). L'aiguille pointe vers le soleil ; le soleil fait le tour de la maison, les
// ombres tournent sur le cadran, les panneaux du toit s'allument selon ce qu'ils
// reçoivent, la pompe à chaleur souffle doucement, et la nuit les fenêtres s'allument.
// Autour de la maison, peinte sur le cadran, la cloche dorée de « Ton toit, heure par
// heure » : la forme indicative de la journée d'un toit plein sud, en été.
//
// Tout est construit et peint ici : aucun fichier chargé, aucun serveur tiers. Le ciel
// n'est pas dans la 3D : c'est le fond du cadre (Ouverture), que la toile laisse voir.
// L'heure vient du parent ; la toile ne fait que la montrer, et lui renvoie celle que
// le visiteur désigne en glissant sur le cadran. La boucle s'arrête hors de l'écran ;
// avec « animations réduites », rien ne bouge de soi-même.

type Props = {
  /** L'heure que montre l'aiguille, de 0 à 24. */
  heure: number;
  /** L'heure désignée en glissant sur le cadran. */
  surGlisse: (h: number, etape: "debut" | "glisse" | "fin") => void;
  /** Première image dessinée : le parent peut retirer le cadran 2D. */
  onPret: () => void;
  /** Pas de 3D dans ce navigateur : le parent garde le cadran 2D. */
  onIndisponible: () => void;
};

const R = 7; // le rayon du cadran blanc
const R_BORD = 8; // le bord extérieur du cadre d'émail
const PLATEAU = 3.0; // le rond de pelouse où la maison est posée
const ELEVATION = 50; // la hauteur du regard, en degrés

/* ============================ textures peintes ============================ */

function toile(l: number, h: number, dessin: (ctx: CanvasRenderingContext2D) => void, srgb = true) {
  const c = document.createElement("canvas");
  c.width = l;
  c.height = h;
  dessin(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function grain(ctx: CanvasRenderingContext2D, l: number, h: number, n: number, teinte: () => string, taille = 1.6) {
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = teinte();
    ctx.fillRect(Math.random() * l, Math.random() * h, taille, taille);
  }
}

/**
 * Le cadran : émail blanc, la cloche dorée de la journée autour de la maison, les
 * heures d'appel en pastilles vertes, les traits et les chiffres. Peint dans le sens où
 * on le regarde : le haut de l'image est le fond du cadran.
 */
function peindreCadran(S: number, police: string) {
  return toile(S, S, (ctx) => {
    const c = S / 2;
    const k = S / (2 * R);
    const P = (r: number, h: number): [number, number] => {
      const a = angle(h);
      return [c + r * k * Math.sin(a), c + r * k * Math.cos(a)];
    };
    const fond = ctx.createRadialGradient(c, c, 0, c, c, c);
    fond.addColorStop(0, "#FFFFFF");
    fond.addColorStop(0.82, "#F8F8F4");
    fond.addColorStop(1, "#E7E8E2");
    ctx.fillStyle = fond;
    ctx.fillRect(0, 0, S, S);
    grain(ctx, S, S, 9000, () => `rgba(60,60,40,${Math.random() * 0.035})`);

    // La cloche de la journée, enroulée autour de la maison : un trait par quart
    // d'heure, aussi long que ce que le toit donne à ce moment-là (forme indicative,
    // la même que sur la page du toit).
    const r0 = 3.28;
    const L = 1.12;
    ctx.lineCap = "round";
    for (let q = 0; q < 96; q++) {
      const t = q / 4;
      const n = production(t);
      if (n < 0.015) continue;
      const [x0, y0] = P(r0, t);
      const [x1, y1] = P(r0 + 0.06 + L * n, t);
      const d = ctx.createLinearGradient(x0, y0, x1, y1);
      d.addColorStop(0, "#FFD772");
      d.addColorStop(1, n > 0.6 ? "#EC8A1C" : "#F4AC3A");
      ctx.strokeStyle = d;
      ctx.lineWidth = (q % 4 === 0 ? 0.13 : 0.09) * k;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }
    ctx.lineCap = "butt";

    // L'anneau des heures : deux cercles fins, les quarts, les heures, les chiffres.
    ctx.strokeStyle = "#101512";
    ctx.lineWidth = 0.045 * k;
    for (const r of [6.62, 4.62]) {
      ctx.beginPath();
      ctx.arc(c, c, r * k, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let q = 0; q < 96; q++) {
      const h = q / 4;
      const heurePleine = q % 4 === 0;
      const principale = heurePleine && h % 3 === 0;
      const [x0, y0] = P(principale ? 5.95 : heurePleine ? 6.12 : 6.36, h);
      const [x1, y1] = P(6.62, h);
      ctx.lineWidth = (principale ? 0.13 : heurePleine ? 0.07 : 0.035) * k;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }
    ctx.fillStyle = "#101512";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let h = 0; h < 24; h += 3) {
      const [x, y] = P(5.3, h);
      ctx.font = `800 ${0.86 * k}px ${police}`;
      ctx.fillText(String(h === 0 ? 24 : h), x, y + 0.04 * k);
    }
    for (let h = 1; h < 24; h++) {
      if (h % 3 === 0) continue;
      const [x, y] = P(5.42, h);
      ctx.font = `600 ${0.4 * k}px ${police}`;
      ctx.fillText(String(h), x, y + 0.02 * k);
    }

    // Les heures d'appel : une pastille d'émail vert sur l'anneau.
    for (const a of APPELS) {
      const [x, y] = P(4.62, a.valeur);
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(x, y, 0.27 * k, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2E7A32";
      ctx.beginPath();
      ctx.arc(x, y, 0.2 * k, 0, Math.PI * 2);
      ctx.fill();
    }

    // Le nom, au fond du cadran, comme sur les vieilles horloges.
    ctx.fillStyle = "#101512";
    ctx.font = `700 ${0.34 * k}px ${police}`;
    if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${0.06 * k}px`;
    ctx.fillText("L'HEURE DITE", c, c - 4.05 * k);
  });
}

/** L'émail vert du cadre, un peu marbré comme celui de la photo. */
const peindreEmail = () =>
  toile(256, 256, (ctx) => {
    ctx.fillStyle = "#33722A";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 120; i++) {
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 10 + Math.random() * 30);
      const clair = Math.random() < 0.5;
      g.addColorStop(0, clair ? "rgba(140,190,90,0.07)" : "rgba(20,50,10,0.07)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.save();
      ctx.translate(Math.random() * 256, Math.random() * 256);
      ctx.fillStyle = g;
      ctx.fillRect(-30, -30, 60, 60);
      ctx.restore();
    }
  });

/** Pelouse tondue en bandes. */
const peindrePelouse = () =>
  toile(512, 512, (ctx) => {
    ctx.fillStyle = "#6FA548";
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 ? "rgba(255,255,200,0.08)" : "rgba(0,40,0,0.07)";
      ctx.fillRect(i * 64, 0, 64, 512);
    }
    grain(ctx, 512, 512, 7000, () => (Math.random() < 0.5 ? "rgba(20,60,15,0.2)" : "rgba(200,240,150,0.16)"), 1.4);
  });

/** Les tuiles du toit : des rangs, des joints décalés. */
const peindreTuiles = () =>
  toile(512, 512, (ctx) => {
    ctx.fillStyle = "#353B41";
    ctx.fillRect(0, 0, 512, 512);
    for (let y = 0; y < 512; y += 32) {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, y + 28, 512, 4);
      const dec = (y / 32) % 2 ? 24 : 0;
      for (let x = -dec; x < 512; x += 48) {
        ctx.fillStyle = `rgba(255,255,255,${0.02 + Math.random() * 0.05})`;
        ctx.fillRect(x + 2, y, 44, 28);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(x, y, 2, 28);
      }
    }
  });

/**
 * Les quatorze panneaux du toit (deux rangs de sept), en une seule image : cadres
 * d'alu, cellules bleu nuit. Et leur double lumineux : les cellules seules, qui
 * s'allument selon ce que le toit reçoit.
 */
const COLONNES = 7;
const RANGS = 2;
function peindrePanneaux(lumiere: boolean) {
  const l = 1024;
  const h = 512;
  return toile(l, h, (ctx) => {
    ctx.fillStyle = lumiere ? "#000000" : "#D7DCE0";
    ctx.fillRect(0, 0, l, h);
    const marge = 6;
    const pl = l / COLONNES;
    const ph = h / RANGS;
    for (let i = 0; i < COLONNES; i++)
      for (let j = 0; j < RANGS; j++) {
        const x = i * pl + marge;
        const y = j * ph + marge;
        const w = pl - 2 * marge;
        const hh = ph - 2 * marge;
        if (!lumiere) {
          const d = ctx.createLinearGradient(x, y, x + w, y + hh);
          d.addColorStop(0, "#22345A");
          d.addColorStop(1, "#111C33");
          ctx.fillStyle = d;
          ctx.fillRect(x, y, w, hh);
        }
        // 6 × 10 cellules
        for (let a = 0; a < 6; a++)
          for (let b = 0; b < 10; b++) {
            const cx = x + (a * w) / 6;
            const cy = y + (b * hh) / 10;
            ctx.fillStyle = lumiere ? `rgba(255,255,255,${0.75 + Math.random() * 0.25})` : `rgba(70,110,170,${0.18 + Math.random() * 0.12})`;
            ctx.fillRect(cx + 1.5, cy + 1.5, w / 6 - 3, hh / 10 - 3);
          }
      }
  });
}

/** Une tache de lumière ronde, claire au centre : halo du soleil, bouffées d'air. */
const peindreTache = (r: number, v: number, b: number, a = 1) =>
  toile(128, 128, (ctx) => {
    const d = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    // La même teinte jusqu'au bord, seule l'opacité tombe : sinon le dégradé passe par
    // un brun sale à mi-chemin.
    d.addColorStop(0, `rgba(${r},${v},${b},${a})`);
    d.addColorStop(0.45, `rgba(${r},${v},${b},${a * 0.35})`);
    d.addColorStop(1, `rgba(${r},${v},${b},0)`);
    ctx.fillStyle = d;
    ctx.fillRect(0, 0, 128, 128);
  });

/* ============================ la scène ============================ */

const lisse = (a: number, b: number, t: number) => {
  const x = THREE.MathUtils.clamp((t - a) / (b - a), 0, 1);
  return x * x * (3 - 2 * x);
};

type Scene = {
  aiguille: THREE.Group;
  trotteuse: THREE.Group;
  perle: THREE.Mesh;
  halo: THREE.Sprite;
  soleil: THREE.DirectionalLight;
  lune: THREE.DirectionalLight;
  ciel: THREE.HemisphereLight;
  veilleuse: THREE.PointLight;
  helice: THREE.Group;
  bouffees: THREE.Sprite[];
  couronne: THREE.Group;
  m: Record<"vitre" | "panneaux" | "perle", THREE.MeshPhysicalMaterial | THREE.MeshBasicMaterial>;
};

function boite(l: number, h: number, p: number, mat: THREE.Material, x: number, y: number, z: number, ombre = true) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(l, h, p), mat);
  m.position.set(x, y, z);
  m.castShadow = ombre;
  m.receiveShadow = true;
  return m;
}

function construire(scene: THREE.Scene, police: string, ordinateur: boolean, a_liberer: { textures: THREE.Texture[]; matieres: THREE.Material[] }): Scene {
  const tex = <T extends THREE.Texture>(t: T) => (a_liberer.textures.push(t), t);
  const mat = <T extends THREE.Material>(m: T) => (a_liberer.matieres.push(m), m);

  /* --- l'horloge --- */
  const cadran = new THREE.Mesh(
    new THREE.CircleGeometry(R + 0.05, 128),
    mat(new THREE.MeshPhysicalMaterial({ map: tex(peindreCadran(ordinateur ? 2048 : 1536, police)), roughness: 0.34, clearcoat: 0.7, clearcoatRoughness: 0.14 })),
  );
  cadran.rotation.x = -Math.PI / 2;
  cadran.receiveShadow = true;
  scene.add(cadran);

  // Le cadre d'émail : un bourrelet rond, comme celui de la photo, tourné autour du cadran.
  const profil = [
    [R - 0.02, -0.05],
    [R, 0.22],
    [R + 0.12, 0.48],
    [R + 0.38, 0.66],
    [R + 0.66, 0.66],
    [R + 0.9, 0.5],
    [R_BORD, 0.18],
    [R_BORD - 0.02, -0.25],
    [R_BORD - 0.25, -0.42],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const email = tex(peindreEmail());
  email.wrapS = email.wrapT = THREE.RepeatWrapping;
  email.repeat.set(3, 1);
  const cadre = new THREE.Mesh(
    new THREE.LatheGeometry(profil, 160),
    mat(new THREE.MeshPhysicalMaterial({ map: email, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.08, side: THREE.DoubleSide })),
  );
  cadre.castShadow = true;
  cadre.receiveShadow = true;
  scene.add(cadre);

  // La lunette de laiton, entre le cadre et le cadran.
  const laiton = mat(new THREE.MeshStandardMaterial({ color: "#C9A55B", metalness: 1, roughness: 0.3 }));
  const lunette = new THREE.Mesh(new THREE.TorusGeometry(R + 0.02, 0.07, 10, 160), laiton);
  lunette.rotation.x = -Math.PI / 2;
  lunette.position.y = 0.05;
  scene.add(lunette);

  // Son ombre portée sur le ciel du cadre, douce, pour qu'elle ne flotte pas.
  const ombreSol = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    mat(new THREE.MeshBasicMaterial({ map: tex(peindreTache(10, 18, 36, 0.42)), transparent: true, depthWrite: false })),
  );
  ombreSol.rotation.x = -Math.PI / 2;
  ombreSol.position.set(0, -1.05, 0.6);
  ombreSol.scale.setScalar(R_BORD * 2.5);
  ombreSol.renderOrder = -1;
  scene.add(ombreSol);

  // Le dessous, pour que l'horloge ait une épaisseur vue de près.
  const dessous = new THREE.Mesh(new THREE.CylinderGeometry(R_BORD - 0.25, R_BORD - 0.6, 0.5, 96, 1, true), mat(new THREE.MeshStandardMaterial({ color: "#1F3A16", roughness: 0.6 })));
  dessous.position.y = -0.67;
  scene.add(dessous);

  /* --- les aiguilles, couchées sur le cadran, pivot sous la maison --- */
  const noir = mat(new THREE.MeshStandardMaterial({ color: "#0E1110", roughness: 0.38, metalness: 0.35 }));
  const forme = new THREE.Shape();
  forme.moveTo(-0.19, 0);
  forme.lineTo(-0.14, 4.3);
  forme.lineTo(0, 4.78);
  forme.lineTo(0.14, 4.3);
  forme.lineTo(0.19, 0);
  forme.lineTo(-0.19, 0);
  const lame = new THREE.ExtrudeGeometry(forme, { depth: 0.05, bevelEnabled: false });
  lame.rotateX(Math.PI / 2); // la lame, couchée, part vers +z
  const aiguille = new THREE.Group();
  const lameMesh = new THREE.Mesh(lame, noir);
  lameMesh.position.y = 0.09;
  lameMesh.castShadow = true;
  aiguille.add(lameMesh);
  scene.add(aiguille);

  const rouge = mat(new THREE.MeshStandardMaterial({ color: "#D8392B", roughness: 0.45, metalness: 0.1 }));
  const trotteuse = new THREE.Group();
  const tige = boite(0.07, 0.03, 7.6, rouge, 0, 0.17, 2.3);
  trotteuse.add(tige);
  scene.add(trotteuse);

  /* --- le rond de pelouse et sa bordure de laiton --- */
  const pelouse = tex(peindrePelouse());
  pelouse.wrapS = pelouse.wrapT = THREE.RepeatWrapping;
  pelouse.repeat.set(2, 2);
  const plateau = new THREE.Mesh(
    new THREE.CylinderGeometry(PLATEAU, PLATEAU + 0.08, 0.34, 96),
    [laiton, mat(new THREE.MeshStandardMaterial({ map: pelouse, roughness: 0.95 })), laiton],
  );
  plateau.position.y = 0.17;
  plateau.castShadow = true;
  plateau.receiveShadow = true;
  scene.add(plateau);

  /* --- la maison --- */
  const sol = 0.34;
  const maison = new THREE.Group();
  maison.position.y = sol;
  scene.add(maison);

  const enduit = mat(new THREE.MeshStandardMaterial({ color: "#EFEBE3", roughness: 0.92 }));
  const L = 3.4; // longueur, est-ouest
  const P = 2.34; // profondeur, nord-sud
  const H = 1.55; // hauteur des murs
  const F = 0.86; // hauteur du pignon
  const pignon = new THREE.Shape();
  pignon.moveTo(-P / 2, 0);
  pignon.lineTo(P / 2, 0);
  pignon.lineTo(P / 2, H);
  pignon.lineTo(0, H + F);
  pignon.lineTo(-P / 2, H);
  pignon.lineTo(-P / 2, 0);
  const corps = new THREE.ExtrudeGeometry(pignon, { depth: L, bevelEnabled: false });
  corps.translate(0, 0, -L / 2);
  corps.rotateY(Math.PI / 2);
  const murs = new THREE.Mesh(corps, enduit);
  murs.castShadow = true;
  murs.receiveShadow = true;
  maison.add(murs);

  // Le toit : deux pans d'ardoise, avec débord.
  const tuiles = tex(peindreTuiles());
  tuiles.wrapS = tuiles.wrapT = THREE.RepeatWrapping;
  tuiles.repeat.set(3, 1.4);
  const toitMat = mat(new THREE.MeshStandardMaterial({ map: tuiles, roughness: 0.72 }));
  const pente = Math.atan2(F, P / 2);
  const rampant = Math.hypot(P / 2, F) + 0.32;
  const epaisseur = 0.09;
  let panSud: THREE.Mesh | null = null;
  for (const cote of [1, -1]) {
    const pan = new THREE.Mesh(new THREE.BoxGeometry(L + 0.34, epaisseur, rampant), toitMat);
    pan.castShadow = true;
    pan.receiveShadow = true;
    // milieu du rampant, décalé vers le bas du débord
    const milieu = rampant / 2;
    pan.position.set(0, H + F - Math.sin(pente) * milieu + Math.cos(pente) * (epaisseur / 2), cote * Math.cos(pente) * milieu + Math.sin(pente) * (epaisseur / 2) * cote);
    pan.rotation.x = cote * pente;
    maison.add(pan);
    if (cote === 1) panSud = pan;
  }
  // Le faîtage
  maison.add(boite(L + 0.36, 0.1, 0.16, toitMat, 0, H + F + 0.06, 0));

  // Les panneaux, sur le pan sud : deux rangs de sept.
  const panneauxMat = mat(
    new THREE.MeshPhysicalMaterial({
      map: tex(peindrePanneaux(false)),
      emissiveMap: tex(peindrePanneaux(true)),
      emissive: new THREE.Color("#2F86FF"),
      emissiveIntensity: 0,
      roughness: 0.2,
      metalness: 0.25,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
    }),
  );
  const champ = new THREE.Mesh(new THREE.BoxGeometry(2.72, 0.035, 1.2), panneauxMat);
  champ.position.set(0, epaisseur / 2 + 0.02, -0.06);
  champ.castShadow = true;
  panSud?.add(champ);

  // Fenêtres et portes : une vitre sombre dans un cadre noir ; la nuit, la vitre s'allume.
  const vitre = mat(new THREE.MeshPhysicalMaterial({ color: "#26323C", roughness: 0.06, metalness: 0.1, emissive: new THREE.Color("#FFB766"), emissiveIntensity: 0 }));
  const cadreNoir = mat(new THREE.MeshStandardMaterial({ color: "#161A18", roughness: 0.5 }));
  const fenetre = (l: number, h: number, x: number, y: number, z: number, rot = 0) => {
    const g = new THREE.Group();
    g.add(boite(l + 0.08, h + 0.08, 0.04, cadreNoir, 0, 0, 0, false));
    g.add(boite(l, h, 0.05, vitre, 0, 0, 0.01, false));
    g.add(boite(l + 0.14, 0.04, 0.12, cadreNoir, 0, -h / 2 - 0.05, 0.04, false)); // l'appui
    g.position.set(x, y, z);
    g.rotation.y = rot;
    maison.add(g);
  };
  const avant = P / 2 + 0.01;
  fenetre(0.86, 1.12, -0.9, 0.6, avant); // la baie du séjour
  fenetre(0.6, 0.64, 0.3, 0.88, avant);
  fenetre(0.52, 0.58, -L / 2 - 0.01, 0.88, 0.3, -Math.PI / 2); // à l'ouest
  fenetre(0.52, 0.58, L / 2 + 0.01, 0.88, -0.3, Math.PI / 2); // à l'est
  fenetre(0.36, 0.36, L / 2 + 0.01, 1.86, 0, Math.PI / 2); // sous le pignon est
  fenetre(0.6, 0.64, 0.3, 0.88, -avant, Math.PI);
  fenetre(0.6, 0.64, -0.9, 0.88, -avant, Math.PI);
  // La porte d'entrée, en émail vert, comme le cadre.
  const porteMat = mat(new THREE.MeshPhysicalMaterial({ color: "#2E7A32", roughness: 0.38, clearcoat: 0.8 }));
  maison.add(boite(0.48, 1.04, 0.05, porteMat, 1.12, 0.52, avant, false));
  maison.add(boite(0.03, 0.03, 0.06, laiton, 1.28, 0.52, avant + 0.03, false));
  // L'allée, de la porte au bord du rond.
  const allee = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 1.35), mat(new THREE.MeshStandardMaterial({ color: "#DCD5C8", roughness: 0.9 })));
  allee.position.set(1.12, sol + 0.01, P / 2 + 0.68);
  allee.receiveShadow = true;
  scene.add(allee);

  // La lumière qui sort des fenêtres le soir, sur la pelouse devant.
  const veilleuse = new THREE.PointLight("#FFB15E", 0, 6, 1.6);
  veilleuse.position.set(-0.4, 0.9, P / 2 + 0.7);
  maison.add(veilleuse);

  /* --- la pompe à chaleur, contre le mur est, face au jardin --- */
  const pac = new THREE.Group();
  pac.position.set(2.28, sol, 0.78);
  pac.scale.setScalar(1.12);
  scene.add(pac);
  const tole = mat(new THREE.MeshStandardMaterial({ color: "#E7EAEA", roughness: 0.42, metalness: 0.2 }));
  const sombre = mat(new THREE.MeshStandardMaterial({ color: "#222726", roughness: 0.55, metalness: 0.3 }));
  pac.add(boite(0.86, 0.62, 0.34, tole, 0, 0.37, 0));
  pac.add(boite(0.08, 0.06, 0.3, sombre, -0.32, 0.03, 0));
  pac.add(boite(0.08, 0.06, 0.3, sombre, 0.32, 0.03, 0));
  const grilleRond = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.022, 8, 40), sombre);
  grilleRond.position.set(-0.12, 0.37, 0.18);
  pac.add(grilleRond);
  const fondGrille = new THREE.Mesh(new THREE.CircleGeometry(0.22, 32), sombre);
  fondGrille.position.set(-0.12, 0.37, 0.165);
  pac.add(fondGrille);
  const helice = new THREE.Group();
  helice.position.set(-0.12, 0.37, 0.175);
  for (let i = 0; i < 3; i++) {
    const pale = boite(0.07, 0.19, 0.01, tole, 0, 0.1, 0, false);
    const bras = new THREE.Group();
    bras.add(pale);
    bras.rotation.z = (i * Math.PI * 2) / 3;
    helice.add(bras);
  }
  pac.add(helice);
  for (let i = 0; i < 5; i++) pac.add(boite(0.22, 0.012, 0.01, sombre, 0.25, 0.22 + i * 0.07, 0.175, false));

  // Ce qu'elle souffle : quelques bouffées d'air, à peine teintées.
  const souffle = tex(peindreTache(176, 206, 230, 0.9));
  const bouffees: THREE.Sprite[] = [];
  for (let i = 0; i < 7; i++) {
    const s = new THREE.Sprite(mat(new THREE.SpriteMaterial({ map: souffle, transparent: true, depthWrite: false, opacity: 0 })));
    s.userData.phase = i / 7;
    pac.add(s);
    bouffees.push(s);
  }

  /* --- un arbre au fond, deux massifs devant --- */
  const feuillage = mat(new THREE.MeshStandardMaterial({ color: "#4D8B3B", roughness: 0.85, flatShading: true }));
  const arbre = new THREE.Group();
  arbre.position.set(-2.1, sol, -1.7);
  scene.add(arbre);
  const tronc = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 1.0, 8), mat(new THREE.MeshStandardMaterial({ color: "#6A533F", roughness: 0.9 })));
  tronc.position.y = 0.5;
  tronc.castShadow = true;
  arbre.add(tronc);
  const couronne = new THREE.Group();
  couronne.position.y = 1.0;
  arbre.add(couronne);
  for (const [x, y, z, r] of [
    [0, 0.45, 0, 0.62],
    [0.3, 0.2, 0.15, 0.42],
    [-0.28, 0.25, -0.1, 0.45],
  ]) {
    const boule = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), feuillage);
    boule.position.set(x, y, z);
    boule.castShadow = true;
    boule.receiveShadow = true;
    couronne.add(boule);
  }
  for (const [x, z, r] of [
    [-2.15, 1.4, 0.32],
    [-1.6, 1.95, 0.24],
    [0.3, 1.9, 0.22],
  ]) {
    const massif = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), feuillage);
    massif.position.set(x, sol + r * 0.7, z);
    massif.scale.y = 0.8;
    massif.castShadow = true;
    scene.add(massif);
  }

  /* --- le soleil : une perle posée sur le cadre, au bout de l'aiguille --- */
  const perleMat = mat(new THREE.MeshBasicMaterial({ color: "#FFD45A" }));
  const perle = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 16), perleMat);
  scene.add(perle);
  const halo = new THREE.Sprite(mat(new THREE.SpriteMaterial({ map: tex(peindreTache(255, 210, 110)), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false })));
  halo.scale.setScalar(3.4);
  scene.add(halo);

  /* --- les lumières --- */
  const ciel = new THREE.HemisphereLight("#DCEBFF", "#5E5A48", 0.5);
  const soleil = new THREE.DirectionalLight("#FFF3DF", 3.4);
  soleil.castShadow = true;
  soleil.shadow.mapSize.set(ordinateur ? 2048 : 1024, ordinateur ? 2048 : 1024);
  soleil.shadow.bias = -0.0005;
  soleil.shadow.normalBias = 0.025;
  soleil.shadow.radius = ordinateur ? 4 : 2;
  const o = soleil.shadow.camera;
  o.left = o.bottom = -R_BORD - 0.6;
  o.right = o.top = R_BORD + 0.6;
  o.near = 1;
  o.far = 80;
  o.updateProjectionMatrix();
  const lune = new THREE.DirectionalLight("#9FB5FF", 0);
  lune.position.set(-10, 18, -14);
  scene.add(ciel, soleil, soleil.target, lune);

  return {
    aiguille,
    trotteuse,
    perle,
    halo,
    soleil,
    lune,
    ciel,
    veilleuse,
    helice,
    bouffees,
    couronne,
    m: { vitre, panneaux: panneauxMat, perle: perleMat },
  };
}

const JOUR_SOLEIL = new THREE.Color("#FFF3DF");
const AUBE_SOLEIL = new THREE.Color("#FF8F52");
const PERLE_JOUR = new THREE.Color("#FFD45A");
const PERLE_NUIT = new THREE.Color("#DDE6FF");
const CIEL_JOUR = new THREE.Color("#DCEBFF");
const CIEL_NUIT = new THREE.Color("#33457A");

/** Tout ce qui dépend de l'heure : l'aiguille, le soleil, les ombres, le toit, les fenêtres. */
function montrerHeure(s: Scene, scene: THREE.Scene, h: number) {
  const a = angle(h);
  const e = hauteur(h);
  const jour = lisse(-3, 6, e);
  s.aiguille.rotation.y = a;

  const eR = THREE.MathUtils.degToRad(Math.max(e, 2));
  s.soleil.position.set(Math.cos(eR) * Math.sin(a), Math.sin(eR), Math.cos(eR) * Math.cos(a)).multiplyScalar(40);
  s.soleil.intensity = 3.6 * jour;
  s.soleil.color.copy(AUBE_SOLEIL).lerp(JOUR_SOLEIL, lisse(3, 24, e));
  // Peu de lumière d'ambiance le jour, sinon les ombres disparaissent ; la nuit, juste
  // de quoi lire le cadran sous la lune.
  s.lune.intensity = 0.55 * (1 - jour);
  s.ciel.intensity = 0.16 + 0.34 * jour;
  s.ciel.color.copy(CIEL_NUIT).lerp(CIEL_JOUR, jour);
  scene.environmentIntensity = 0.1 + 0.32 * jour;

  // La perle du soleil, sur le cadre ; la nuit, une perle de lune, pâle et sans halo.
  const r = R + 0.52;
  s.perle.position.set(r * Math.sin(a), 0.98, r * Math.cos(a));
  s.halo.position.copy(s.perle.position);
  s.halo.material.opacity = 0.95 * jour;
  s.perle.scale.setScalar(0.72 + 0.28 * jour);
  (s.m.perle as THREE.MeshBasicMaterial).color.copy(PERLE_NUIT).lerp(PERLE_JOUR, jour);

  const nuit = 1 - lisse(-6, 3, e);
  (s.m.vitre as THREE.MeshPhysicalMaterial).emissiveIntensity = 1.5 * nuit;
  s.veilleuse.intensity = 5 * nuit;
  (s.m.panneaux as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.62 * production(h);
}

/* ============================ le composant ============================ */

export default function ToitHorloge3D({ heure, surGlisse, onPret, onIndisponible }: Props) {
  const conteneur = useRef<HTMLDivElement>(null);
  const etat = useRef<{ scene: THREE.Scene; s: Scene; redessiner: () => void } | null>(null);
  const rappels = useRef({ surGlisse, onPret });
  const heureCourante = useRef(heure);
  useEffect(() => {
    rappels.current = { surGlisse, onPret };
  }, [surGlisse, onPret]);

  // Le moteur : créé une fois, détruit au départ.
  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;
    let rendu: THREE.WebGLRenderer;
    try {
      rendu = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      onIndisponible();
      return;
    }
    const ordinateur = window.innerWidth >= 1024 && window.matchMedia("(pointer: fine)").matches;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rendu.setPixelRatio(Math.min(window.devicePixelRatio, ordinateur ? 1.75 : 2));
    rendu.setClearColor(0x000000, 0);
    rendu.shadowMap.enabled = true;
    rendu.shadowMap.type = THREE.PCFShadowMap;
    rendu.outputColorSpace = THREE.SRGBColorSpace;
    rendu.toneMapping = THREE.NeutralToneMapping;
    rendu.toneMappingExposure = 1.05;
    el.appendChild(rendu.domElement);
    Object.assign(rendu.domElement.style, { display: "block", width: "100%", height: "100%" });
    const perdu = (e: Event) => {
      e.preventDefault();
      onIndisponible();
    };
    rendu.domElement.addEventListener("webglcontextlost", perdu);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(rendu);
    const environnement = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environnement;

    const a_liberer = { textures: [] as THREE.Texture[], matieres: [] as THREE.Material[] };
    // La police des titres de la marque, pour les chiffres du cadran.
    const police = getComputedStyle(el).getPropertyValue("--titres").trim() || "sans-serif";
    let s: Scene | null = null;
    let detruit = false;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 200);
    const visee = new THREE.Vector3(0, 0.4, 0.75);
    // Sur ordinateur, le regard suit un peu la souris : de quoi sentir le relief.
    const parallaxe = { x: 0, y: 0, cx: 0, cy: 0 };
    const cadrer = () => {
      const demiV = THREE.MathUtils.degToRad(camera.fov / 2);
      const demiH = Math.atan(Math.tan(demiV) * camera.aspect);
      // Le cadran entier tient dans le champ, en largeur comme en hauteur.
      const d = Math.max((R_BORD + 0.5) / Math.sin(demiH), (R_BORD * 0.86 + 0.6) / Math.sin(demiV));
      const el2 = THREE.MathUtils.degToRad(ELEVATION + parallaxe.cy * 4);
      const az = THREE.MathUtils.degToRad(parallaxe.cx * 6);
      camera.position.set(Math.sin(az) * Math.cos(el2) * d, Math.sin(el2) * d, Math.cos(az) * Math.cos(el2) * d).add(visee);
      camera.lookAt(visee);
    };
    const taille = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      rendu.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      cadrer();
      aDessiner = true;
    });

    let aDessiner = true;
    let image = 0;
    let visible = true;
    let precedent = 0;
    let horloge = 0;
    let premiere = true;
    const boucle = (maintenant: number) => {
      image = requestAnimationFrame(boucle);
      if (!s) return;
      const dt = Math.min(0.1, (maintenant - (precedent || maintenant)) / 1000);
      precedent = maintenant;
      let bouge = aDessiner;
      if (!reduit) {
        horloge += dt;
        // La trotteuse : un pas par seconde, avec un petit rebond.
        const sec = new Date().getSeconds() + (Date.now() % 1000) / 1000;
        const pasEntier = Math.floor(sec);
        const f = Math.min(1, (sec - pasEntier) / 0.18);
        const rebond = 1 + 2.2 * (f - 1) ** 3 + 1.2 * (f - 1) ** 2;
        s.trotteuse.rotation.y = Math.PI - ((pasEntier + rebond) / 60) * Math.PI * 2;
        s.helice.rotation.z -= dt * 7;
        for (const b of s.bouffees) {
          const t = (horloge * 0.32 + (b.userData.phase as number)) % 1;
          b.position.set(-0.12 + Math.sin(t * 5 + (b.userData.phase as number) * 9) * 0.06, 0.4 + t * 0.55, 0.3 + t * 1.25);
          b.scale.setScalar(0.22 + t * 0.75);
          b.material.opacity = 0.42 * Math.sin(Math.PI * t) ** 1.5;
        }
        s.couronne.rotation.z = Math.sin(horloge * 1.1) * 0.035;
        s.couronne.rotation.x = Math.sin(horloge * 0.8 + 1.3) * 0.025;
        s.halo.scale.setScalar(3.4 + Math.sin(horloge * 1.6) * 0.18);
        bouge = true;
      }
      if (ordinateur) {
        const ax = parallaxe.x - parallaxe.cx;
        const ay = parallaxe.y - parallaxe.cy;
        if (Math.abs(ax) + Math.abs(ay) > 0.0005) {
          parallaxe.cx += ax * Math.min(1, dt * 4);
          parallaxe.cy += ay * Math.min(1, dt * 4);
          cadrer();
          bouge = true;
        }
      }
      if (bouge) {
        rendu.render(scene, camera);
        aDessiner = false;
        if (premiere) {
          premiere = false;
          rappels.current.onPret();
        }
      }
    };
    const relancer = () => {
      if (!image && visible && !detruit) image = requestAnimationFrame(boucle);
    };
    const observateur = new IntersectionObserver(([entree]) => {
      visible = entree.isIntersecting;
      if (visible) relancer();
      else {
        cancelAnimationFrame(image);
        image = 0;
      }
    });

    /* --- glisser sur le cadran --- */
    const rayon = new THREE.Raycaster();
    const solPlan = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.1);
    const point = new THREE.Vector3();
    const heureSous = (e: PointerEvent): number | null => {
      const b = rendu.domElement.getBoundingClientRect();
      rayon.setFromCamera(new THREE.Vector2(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1), camera);
      if (!rayon.ray.intersectPlane(solPlan, point)) return null;
      const r = Math.hypot(point.x, point.z);
      // Sur le cadran seulement, et pas au ras de l'axe, où l'angle n'a pas de sens.
      if (r > R_BORD + 1.2 || r < 0.6) return null;
      return heureDe(point.x, point.z);
    };
    // À la souris, on prend l'aiguille tout de suite. Au doigt, on attend de savoir si le
    // geste est horizontal : vertical, c'est la page qui défile (touch-action: pan-y), et
    // l'aiguille ne doit pas sauter sous le doigt. Une simple touche y amène l'aiguille.
    let geste: { id: number; x: number; y: number; actif: boolean; doigt: boolean } | null = null;
    const toile = rendu.domElement;
    const appui = (e: PointerEvent) => {
      if (e.button !== 0 || heureSous(e) === null) return;
      const doigt = e.pointerType !== "mouse";
      geste = { id: e.pointerId, x: e.clientX, y: e.clientY, actif: !doigt, doigt };
      if (!doigt) {
        toile.setPointerCapture(e.pointerId);
        const h = heureSous(e);
        if (h !== null) rappels.current.surGlisse(h, "debut");
        toile.style.cursor = "grabbing";
      }
    };
    const deplacement = (e: PointerEvent) => {
      if (ordinateur && !geste) {
        const b = toile.getBoundingClientRect();
        parallaxe.x = ((e.clientX - b.left) / b.width) * 2 - 1;
        parallaxe.y = ((e.clientY - b.top) / b.height) * 2 - 1;
        relancer();
      }
      if (!geste) {
        toile.style.cursor = heureSous(e) !== null ? "grab" : "default";
        return;
      }
      if (e.pointerId !== geste.id) return;
      if (!geste.actif) {
        if (Math.abs(e.clientX - geste.x) < 6) return;
        geste.actif = true;
        toile.setPointerCapture(e.pointerId);
        const h0 = heureSous(e);
        if (h0 !== null) rappels.current.surGlisse(h0, "debut");
        return;
      }
      const h = heureSous(e);
      if (h !== null) rappels.current.surGlisse(h, "glisse");
    };
    const lacher = (e: PointerEvent) => {
      if (!geste || e.pointerId !== geste.id) return;
      const h = heureSous(e);
      if (geste.actif) rappels.current.surGlisse(h ?? -1, "fin");
      else if (h !== null) {
        // Une touche sans glissé : l'aiguille va là où le doigt s'est posé.
        rappels.current.surGlisse(h, "debut");
        rappels.current.surGlisse(h, "fin");
      }
      geste = null;
      toile.style.cursor = "grab";
    };
    const annuler = (e: PointerEvent) => {
      if (geste && e.pointerId === geste.id) {
        if (geste.actif) rappels.current.surGlisse(-1, "fin");
        geste = null;
      }
    };
    const sortie = () => {
      parallaxe.x = 0;
      parallaxe.y = 0;
      relancer();
    };
    toile.addEventListener("pointerdown", appui);
    toile.addEventListener("pointermove", deplacement);
    toile.addEventListener("pointerup", lacher);
    toile.addEventListener("pointercancel", annuler);
    toile.addEventListener("pointerleave", sortie);

    // Les chiffres du cadran sont peints avec la police de la marque : on l'attend.
    const pret = document.fonts?.load ? document.fonts.load(`800 40px ${police}`).catch(() => undefined) : Promise.resolve();
    void pret.then(() => {
      if (detruit) return;
      s = construire(scene, police, ordinateur, a_liberer);
      // La trotteuse, quand rien ne bouge : à 9 heures, comme sur la photo.
      s.trotteuse.rotation.y = -Math.PI / 2;
      etat.current = { scene, s, redessiner: () => ((aDessiner = true), relancer()) };
      montrerHeure(s, scene, heureCourante.current);
      taille.observe(el);
      observateur.observe(el);
      relancer();
    });

    return () => {
      detruit = true;
      cancelAnimationFrame(image);
      observateur.disconnect();
      taille.disconnect();
      toile.removeEventListener("pointerdown", appui);
      toile.removeEventListener("pointermove", deplacement);
      toile.removeEventListener("pointerup", lacher);
      toile.removeEventListener("pointercancel", annuler);
      toile.removeEventListener("pointerleave", sortie);
      toile.removeEventListener("webglcontextlost", perdu);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
      a_liberer.textures.forEach((t) => t.dispose());
      a_liberer.matieres.forEach((m) => m.dispose());
      environnement.dispose();
      pmrem.dispose();
      rendu.dispose();
      toile.remove();
      etat.current = null;
    };
  }, [onIndisponible]);

  // L'heure : à chaque changement, la scène suit, et on redessine.
  useEffect(() => {
    heureCourante.current = heure;
    const e = etat.current;
    if (!e) return;
    montrerHeure(e.s, e.scene, heure);
    e.redessiner();
  }, [heure]);

  return <div ref={conteneur} className="absolute inset-0 touch-pan-y select-none" />;
}
