"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { Jardin, Rect } from "./jardin-geometrie";

// Le jardin du visiteur en 3D, d'après les principes du configurateur de Kéo
// (`Kéo/Code/Projet 3D création de maison`) : un bassin à coins arrondis avec ses
// margelles, un sol texturé dessiné à la volée, une terrasse en bois. Écrit avec
// three.js seul — sans les surcouches React de Kéo, dont les éclairages tout faits
// se téléchargent sur un serveur tiers que la politique de sécurité bloque. Aucun
// fichier n'est chargé : toutes les textures sont peintes sur un canevas.
//
// On ne dessine que quand l'image change (la caméra bouge, le jardin change), et la
// boucle s'arrête quand la vue sort de l'écran.

type Props = {
  jardin: Jardin;
  /** Appelé si le navigateur ne sait pas faire de 3D : le parent garde le plan. */
  onIndisponible: () => void;
};

/* ---------- textures peintes ---------- */

function texturePelouse() {
  const taille = 256;
  const toile = document.createElement("canvas");
  toile.width = toile.height = taille;
  const ctx = toile.getContext("2d")!;
  ctx.fillStyle = "#5c9450";
  ctx.fillRect(0, 0, taille, taille);
  // bandes de tonte, puis taches claires et sombres
  for (let i = 0; i < taille; i += 32) {
    ctx.fillStyle = i % 64 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
    ctx.fillRect(i, 0, 32, taille);
  }
  for (let i = 0; i < 900; i++) {
    const v = Math.random() < 0.5 ? 0 : 255;
    ctx.fillStyle = `rgba(${v},${v},${v},${0.03 + Math.random() * 0.05})`;
    ctx.beginPath();
    ctx.ellipse(Math.random() * taille, Math.random() * taille, 1 + Math.random() * 6, 1 + Math.random() * 3, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  const t = new THREE.CanvasTexture(toile);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function textureLames() {
  const toile = document.createElement("canvas");
  toile.width = 256;
  toile.height = 64;
  const ctx = toile.getContext("2d")!;
  for (let i = 0; i < 4; i++) {
    const teinte = 120 + Math.floor(Math.random() * 25);
    ctx.fillStyle = `rgb(${teinte + 20},${teinte - 10},${teinte - 45})`;
    ctx.fillRect(0, i * 16, 256, 15);
    ctx.fillStyle = "rgba(40,25,10,0.55)";
    ctx.fillRect(0, i * 16 + 15, 256, 1);
  }
  const t = new THREE.CanvasTexture(toile);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ---------- géométrie du bassin (reprise de Kéo, `canvas/Pool.tsx`) ---------- */

function rectangleArrondi(l: number, p: number, r: number, trou = false) {
  const forme = trou ? new THREE.Path() : new THREE.Shape();
  const rayon = Math.max(0, Math.min(r, l / 2 - 0.01, p / 2 - 0.01));
  if (!trou) {
    forme.moveTo(l / 2, -p / 2 + rayon);
    forme.lineTo(l / 2, p / 2 - rayon);
    forme.absarc(l / 2 - rayon, p / 2 - rayon, rayon, 0, Math.PI / 2, false);
    forme.lineTo(-l / 2 + rayon, p / 2);
    forme.absarc(-l / 2 + rayon, p / 2 - rayon, rayon, Math.PI / 2, Math.PI, false);
    forme.lineTo(-l / 2, -p / 2 + rayon);
    forme.absarc(-l / 2 + rayon, -p / 2 + rayon, rayon, Math.PI, (3 * Math.PI) / 2, false);
    forme.lineTo(l / 2 - rayon, -p / 2);
    forme.absarc(l / 2 - rayon, -p / 2 + rayon, rayon, (3 * Math.PI) / 2, 2 * Math.PI, false);
  } else {
    forme.moveTo(-l / 2, p / 2 - rayon);
    forme.absarc(-l / 2 + rayon, p / 2 - rayon, rayon, Math.PI, Math.PI / 2, true);
    forme.lineTo(l / 2 - rayon, p / 2);
    forme.absarc(l / 2 - rayon, p / 2 - rayon, rayon, Math.PI / 2, 0, true);
    forme.lineTo(l / 2, -p / 2 + rayon);
    forme.absarc(l / 2 - rayon, -p / 2 + rayon, rayon, 0, -Math.PI / 2, true);
    forme.lineTo(-l / 2 + rayon, -p / 2);
    forme.absarc(-l / 2 + rayon, -p / 2 + rayon, rayon, -Math.PI / 2, -Math.PI, true);
  }
  forme.closePath();
  return forme;
}

function construireBassin(r: Rect) {
  const groupe = new THREE.Group();
  const l = r.largeur;
  const p = r.profondeur;
  const coin = 0.45;
  const margelle = 0.3;

  const contour = rectangleArrondi(l + 2 * margelle, p + 2 * margelle, coin + margelle) as THREE.Shape;
  contour.holes.push(rectangleArrondi(l, p, coin, true) as THREE.Path);
  const geoMargelle = new THREE.ExtrudeGeometry(contour, { depth: 0.08, bevelEnabled: false });
  geoMargelle.rotateX(-Math.PI / 2);
  const margelles = new THREE.Mesh(geoMargelle, new THREE.MeshStandardMaterial({ color: "#ece3d3", roughness: 0.55 }));
  margelles.position.y = 0.02;
  margelles.castShadow = true;
  margelles.receiveShadow = true;
  groupe.add(margelles);

  // Le fond, puis l'eau : deux plans à la forme du bassin, l'eau translucide au-dessus.
  const geoBassin = new THREE.ShapeGeometry(rectangleArrondi(l, p, coin) as THREE.Shape);
  geoBassin.rotateX(-Math.PI / 2);
  const fond = new THREE.Mesh(geoBassin, new THREE.MeshStandardMaterial({ color: "#1f6f93", roughness: 0.7 }));
  fond.position.y = 0.012;
  groupe.add(fond);
  const eau = new THREE.Mesh(
    geoBassin.clone(),
    new THREE.MeshStandardMaterial({ color: "#59cbe8", roughness: 0.08, metalness: 0.15, transparent: true, opacity: 0.72 }),
  );
  eau.position.y = 0.06;
  eau.receiveShadow = true;
  groupe.add(eau);

  groupe.position.set(r.x, 0, r.z);
  return groupe;
}

/* ---------- la scène ---------- */

function construireJardin(j: Jardin, textures: { pelouse: THREE.Texture; lames: THREE.Texture }) {
  const groupe = new THREE.Group();

  // Les abords, puis la pelouse du jardin.
  const abords = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), new THREE.MeshStandardMaterial({ color: "#26352b", roughness: 1 }));
  abords.rotation.x = -Math.PI / 2;
  abords.position.y = -0.02;
  abords.receiveShadow = true;
  groupe.add(abords);

  const pelouse = textures.pelouse.clone();
  pelouse.repeat.set(j.largeur / 4, j.profondeur / 4);
  pelouse.needsUpdate = true;
  const sol = new THREE.Mesh(new THREE.PlaneGeometry(j.largeur, j.profondeur), new THREE.MeshStandardMaterial({ map: pelouse, roughness: 0.95 }));
  sol.rotation.x = -Math.PI / 2;
  sol.receiveShadow = true;
  groupe.add(sol);

  // La haie, sur les trois côtés libres du jardin.
  const haie = new THREE.MeshStandardMaterial({ color: "#2f5b36", roughness: 0.9 });
  const h = 1.1;
  const e = 0.6;
  const cotes: Rect[] = [];
  const maisonEnHaut = j.maison.z < -j.profondeur / 2;
  const maisonAGauche = j.maison.x < -j.largeur / 2;
  const maisonADroite = j.maison.x > j.largeur / 2;
  if (!maisonEnHaut) cotes.push({ x: 0, z: -j.profondeur / 2 - e / 2, largeur: j.largeur + 2 * e, profondeur: e });
  cotes.push({ x: 0, z: j.profondeur / 2 + e / 2, largeur: j.largeur + 2 * e, profondeur: e });
  if (!maisonAGauche) cotes.push({ x: -j.largeur / 2 - e / 2, z: 0, largeur: e, profondeur: j.profondeur });
  if (!maisonADroite) cotes.push({ x: j.largeur / 2 + e / 2, z: 0, largeur: e, profondeur: j.profondeur });
  for (const c of cotes) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(c.largeur, h, c.profondeur), haie);
    m.position.set(c.x, h / 2, c.z);
    m.castShadow = true;
    groupe.add(m);
  }

  // La maison : un volume enduit, un toit plat sombre, des baies côté jardin.
  const m = j.maison;
  const hauteur = 6;
  const corps = new THREE.Mesh(new THREE.BoxGeometry(m.largeur, hauteur, m.profondeur), new THREE.MeshStandardMaterial({ color: "#e6dfd4", roughness: 0.85 }));
  corps.position.set(m.x, hauteur / 2, m.z);
  corps.castShadow = true;
  corps.receiveShadow = true;
  groupe.add(corps);
  const toit = new THREE.Mesh(new THREE.BoxGeometry(m.largeur + 0.6, 0.35, m.profondeur + 0.6), new THREE.MeshStandardMaterial({ color: "#3a3f46", roughness: 0.7 }));
  toit.position.set(m.x, hauteur + 0.17, m.z);
  toit.castShadow = true;
  groupe.add(toit);
  const vitre = new THREE.MeshStandardMaterial({ color: "#1b2733", roughness: 0.2, metalness: 0.3 });
  const facadeLongueur = maisonEnHaut ? m.largeur : m.profondeur;
  const nbBaies = Math.max(2, Math.floor(facadeLongueur / 3.2));
  for (let i = 0; i < nbBaies; i++) {
    const position = -facadeLongueur / 2 + (facadeLongueur / nbBaies) * (i + 0.5);
    const baie = new THREE.Mesh(new THREE.BoxGeometry(maisonEnHaut ? 1.8 : 0.08, i % 2 ? 2.4 : 1.6, maisonEnHaut ? 0.08 : 1.8), vitre);
    if (maisonEnHaut) baie.position.set(m.x + position, i % 2 ? 1.3 : 3.9, m.z + m.profondeur / 2 + 0.04);
    else baie.position.set(m.x + (maisonAGauche ? m.largeur / 2 + 0.04 : -m.largeur / 2 - 0.04), i % 2 ? 1.3 : 3.9, m.z + position);
    groupe.add(baie);
  }

  // La terrasse en bois, contre la maison.
  if (j.terrasse) {
    const lames = textures.lames.clone();
    const r = j.terrasse;
    lames.repeat.set(r.largeur / 2, r.profondeur / 0.6);
    if (!maisonEnHaut) {
      lames.rotation = Math.PI / 2;
      lames.repeat.set(r.profondeur / 2, r.largeur / 0.6);
    }
    lames.needsUpdate = true;
    const terrasse = new THREE.Mesh(new THREE.BoxGeometry(r.largeur, 0.06, r.profondeur), new THREE.MeshStandardMaterial({ map: lames, roughness: 0.8 }));
    terrasse.position.set(r.x, 0.03, r.z);
    terrasse.receiveShadow = true;
    groupe.add(terrasse);
  }

  if (j.bassin) groupe.add(construireBassin(j.bassin));
  return groupe;
}

function liberer(objet: THREE.Object3D) {
  objet.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      const materiaux = Array.isArray(o.material) ? o.material : [o.material];
      materiaux.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial && mat.map) mat.map.dispose();
        mat.dispose();
      });
    }
  });
}

export default function Jardin3D({ jardin, onIndisponible }: Props) {
  const conteneur = useRef<HTMLDivElement>(null);
  const moteur = useRef<{
    rendu: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controles: OrbitControls;
    textures: { pelouse: THREE.Texture; lames: THREE.Texture };
    jardin: THREE.Group | null;
    redessiner: () => void;
  } | null>(null);

  // Le moteur : créé une fois, détruit au départ.
  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;
    let rendu: THREE.WebGLRenderer;
    try {
      rendu = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
    } catch {
      onIndisponible();
      return;
    }
    rendu.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendu.shadowMap.enabled = true;
    rendu.shadowMap.type = THREE.PCFSoftShadowMap;
    rendu.outputColorSpace = THREE.SRGBColorSpace;
    rendu.toneMapping = THREE.ACESFilmicToneMapping;
    el.appendChild(rendu.domElement);
    rendu.domElement.style.display = "block";
    rendu.domElement.style.width = "100%";
    rendu.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0f19");
    scene.fog = new THREE.Fog("#0a0f19", 60, 140);
    scene.add(new THREE.HemisphereLight("#dcebff", "#30402f", 1.1));
    const soleil = new THREE.DirectionalLight("#fff1dc", 2.4);
    soleil.position.set(18, 30, 14);
    soleil.castShadow = true;
    soleil.shadow.mapSize.set(1024, 1024);
    soleil.shadow.camera.left = soleil.shadow.camera.bottom = -30;
    soleil.shadow.camera.right = soleil.shadow.camera.top = 30;
    soleil.shadow.bias = -0.0005;
    scene.add(soleil);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.5, 300);
    const controles = new OrbitControls(camera, rendu.domElement);
    controles.enableDamping = true;
    controles.enablePan = false;
    controles.minPolarAngle = 0.25;
    controles.maxPolarAngle = 1.2;

    let aDessiner = true;
    const redessiner = () => {
      aDessiner = true;
    };
    controles.addEventListener("change", redessiner);

    let image = 0;
    let visible = true;
    const boucle = () => {
      image = requestAnimationFrame(boucle);
      const bouge = controles.update();
      if (bouge || aDessiner) {
        rendu.render(scene, camera);
        aDessiner = false;
      }
    };
    const relancer = () => {
      if (!image && visible) image = requestAnimationFrame(boucle);
    };
    const observateur = new IntersectionObserver(([entree]) => {
      visible = entree.isIntersecting;
      if (visible) relancer();
      else {
        cancelAnimationFrame(image);
        image = 0;
      }
    });
    observateur.observe(el);

    const taille = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      rendu.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      redessiner();
    });
    taille.observe(el);

    moteur.current = {
      rendu,
      scene,
      camera,
      controles,
      textures: { pelouse: texturePelouse(), lames: textureLames() },
      jardin: null,
      redessiner,
    };
    relancer();

    return () => {
      cancelAnimationFrame(image);
      observateur.disconnect();
      taille.disconnect();
      controles.dispose();
      const m = moteur.current;
      if (m?.jardin) liberer(m.jardin);
      m?.textures.pelouse.dispose();
      m?.textures.lames.dispose();
      rendu.dispose();
      rendu.domElement.remove();
      moteur.current = null;
    };
  }, [onIndisponible]);

  // Le jardin : reconstruit à chaque réglage, la caméra recadrée sur sa taille.
  useEffect(() => {
    const m = moteur.current;
    if (!m) return;
    if (m.jardin) {
      m.scene.remove(m.jardin);
      liberer(m.jardin);
    }
    m.jardin = construireJardin(jardin, m.textures);
    m.scene.add(m.jardin);

    // On cadre l'ensemble jardin + maison, vu depuis le fond du jardin.
    const mz = jardin.maison;
    const minX = Math.min(-jardin.largeur / 2, mz.x - mz.largeur / 2);
    const maxX = Math.max(jardin.largeur / 2, mz.x + mz.largeur / 2);
    const minZ = Math.min(-jardin.profondeur / 2, mz.z - mz.profondeur / 2);
    const maxZ = Math.max(jardin.profondeur / 2, mz.z + mz.profondeur / 2);
    const cible = new THREE.Vector3((minX + maxX) / 2, 1, (minZ + maxZ) / 2);
    const etendue = Math.max(maxX - minX, (maxZ - minZ) * 1.4) + 4;
    const distance = etendue * 1.05;
    m.camera.position.set(cible.x + distance * 0.28, distance * 0.7, cible.z + distance * 0.72);
    m.controles.target.copy(cible);
    m.controles.minDistance = etendue * 0.6;
    m.controles.maxDistance = etendue * 2.2;
    m.controles.update();
    m.redessiner();
  }, [jardin]);

  return <div ref={conteneur} className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y" />;
}
