"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GTAOPass } from "three/examples/jsm/postprocessing/GTAOPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { aller, entreeDouce, libererGeometries, lisse, sortieDouce } from "./scene/batisseur";
import { INTERIEURS, creerAtelier, type Atelier, type Interieur } from "./scene/interieurs";
import { MAISONS, SOCLE, creerMatieresDehors, montrerVersion, type MaisonDehors } from "./scene/maisons";
import { fondStudio, solStudio } from "./scene/peintures";
import type { Modele } from "./donnees";

// Le carrousel des trois pavillons, et la visite. Dehors : les trois maquettes sur un
// plateau tournant, dans la pénombre d'un studio ; on les fait tourner du doigt, des
// flèches ou du clavier. « Entrer » : la caméra s'approche de la porte (ou de la porte
// du garage, ou de la fenêtre de la chambre), qui s'ouvre, et passe le seuil ; dedans,
// la maison est vue en coupe, et la bascule avant / après joue le travail de
// l'architecte. En ressortant, la maison montre sa deuxième version.
//
// Tout est construit et peint sur place (aucun fichier, aucun serveur tiers). Rien ne
// tourne quand la vue sort de l'écran ; avec « animations réduites », chaque état est
// montré directement, sans mouvement de caméra.

export type Props = {
  modeles: Modele[];
  index: number;
  dedans: boolean;
  /** La valeur avant / après de chaque maison, de 0 à 1. */
  etats: number[];
  /** La partie de l'écran que les textes laissent libre : on y cadre la maquette. */
  zone: React.RefObject<HTMLElement | null>;
  /** Le voile sombre qu'on traverse en passant le seuil. */
  voile: React.RefObject<HTMLElement | null>;
  onIndisponible: () => void;
  onPret: () => void;
  onGlisser: (sens: 1 | -1) => void;
  onToucher: () => void;
  onRegler: (t: number) => void;
};

/** Le rayon du plateau : sur un écran étroit, les voisines s'écartent pour laisser respirer le titre. */
const rayonDuPlateau = () => (window.innerWidth < 700 ? 29 : 19);
/** Chaque maison est tournée sur son socle : on la voit de trois quarts (façade et pignon droit, où
 * sont le perron et l'extension), le plateau de face. */
const BIAIS = -0.5;
const PAS = (Math.PI * 2) / 3;
const FOV_DEHORS = 30;
const FOV_DEDANS = 44;
const DUREE_TOUR = 1.15;
const ENTREE = { approche: 1.05, seuil: 0.5, dedans: 1.25 };
const SORTIE = { voile: 0.38, recul: 1.5 };

type Pose = { position: THREE.Vector3; cible: THREE.Vector3; fov: number };

export default function Pavillons3D(props: Props) {
  const conteneur = useRef<HTMLDivElement>(null);
  const dernier = useRef(props);
  useEffect(() => {
    dernier.current = props;
  });

  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;
    const p0 = dernier.current;
    // Sans WebGL, on le sait avant de construire quoi que ce soit : les dessins restent.
    const essai = document.createElement("canvas");
    if (!essai.getContext("webgl2") && !essai.getContext("webgl")) {
      p0.onIndisponible();
      return;
    }
    let rendu: THREE.WebGLRenderer;
    try {
      rendu = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      p0.onIndisponible();
      return;
    }
    const ordinateur = window.innerWidth >= 1024 && window.matchMedia("(pointer: fine)").matches;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const RAYON = rayonDuPlateau();
    rendu.setPixelRatio(Math.min(window.devicePixelRatio, ordinateur ? 1.75 : 2));
    rendu.shadowMap.enabled = true;
    rendu.shadowMap.type = THREE.PCFShadowMap;
    rendu.outputColorSpace = THREE.SRGBColorSpace;
    rendu.toneMapping = THREE.NeutralToneMapping;
    el.appendChild(rendu.domElement);
    Object.assign(rendu.domElement.style, { display: "block", width: "100%", height: "100%", touchAction: "pan-y" });

    /* ---------- la scène, la lumière ---------- */
    const scene = new THREE.Scene();
    const studio = fondStudio("#2b3036", "#111316");
    scene.background = studio;
    const brume = new THREE.Fog("#16191c", 60, 160);
    scene.fog = brume;
    const pmrem = new THREE.PMREMGenerator(rendu);
    const environnement = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environnement;

    const ciel = new THREE.HemisphereLight("#dfe7ee", "#4a4038", 1.1);
    const soleil = new THREE.DirectionalLight("#ffe2c0", 3);
    soleil.castShadow = true;
    soleil.shadow.mapSize.set(ordinateur ? 2048 : 1024, ordinateur ? 2048 : 1024);
    soleil.shadow.bias = -0.0005;
    soleil.shadow.normalBias = 0.025;
    // les plafonds ôtés des intérieurs (calque 1) portent encore leur ombre
    soleil.shadow.camera.layers.enable(1);
    const appoint = new THREE.DirectionalLight("#b9c8ff", 0.6);
    const ampoule = new THREE.PointLight("#ffb866", 0, 9, 1.6);
    scene.add(ciel, soleil, soleil.target, appoint, appoint.target, ampoule);

    const camera = new THREE.PerspectiveCamera(FOV_DEHORS, 1, 0.1, 400);

    // Sur ordinateur seulement : occlusion ambiante et halo léger sur les baies.
    let composer: EffectComposer | null = null;
    let halo: UnrealBloomPass | null = null;
    let ao: GTAOPass | null = null;
    if (ordinateur) {
      composer = new EffectComposer(rendu);
      composer.addPass(new RenderPass(scene, camera));
      ao = new GTAOPass(scene, camera, 512, 512);
      ao.blendIntensity = 0.7;
      composer.addPass(ao);
      halo = new UnrealBloomPass(new THREE.Vector2(512, 512), 0, 0.5, 0.86);
      composer.addPass(halo);
      composer.addPass(new OutputPass());
    }

    /* ---------- le plateau et ses trois maisons ---------- */
    const dehors = creerMatieresDehors();
    const plateau = new THREE.Group();
    const maisons: MaisonDehors[] = p0.modeles.map((m, i) => {
      const maison = MAISONS[m](dehors);
      const a = i * PAS;
      maison.groupe.position.set(Math.sin(a) * RAYON, 0, Math.cos(a) * RAYON);
      maison.groupe.rotation.y = a + BIAIS;
      plateau.add(maison.groupe);
      return maison;
    });
    const texSol = solStudio();
    const sol = new THREE.Mesh(new THREE.CircleGeometry(90, 64), new THREE.MeshStandardMaterial({ map: texSol, roughness: 1 }));
    sol.rotation.x = -Math.PI / 2;
    sol.position.y = -SOCLE.h;
    sol.receiveShadow = true;
    const monde = new THREE.Group();
    monde.add(plateau, sol);
    scene.add(monde);

    /* ---------- les intérieurs, construits à la demande ---------- */
    let atelier: Atelier | null = null;
    const interieurs = new Map<Modele, Interieur>();
    const interieurDe = (m: Modele) => {
      atelier ??= creerAtelier();
      let x = interieurs.get(m);
      if (!x) {
        x = INTERIEURS[m](atelier);
        x.groupe.visible = false;
        scene.add(x.groupe);
        interieurs.set(m, x);
      }
      return x;
    };

    /* ---------- l'état du moteur ---------- */
    const n = p0.modeles.length;
    const s = {
      phi: -p0.index * PAS,
      index: p0.index,
      continu: p0.index, // l'index sans modulo : le plateau tourne toujours par le plus court
      tour: null as null | { de: number; a: number; t0: number },
      mode: (p0.dedans ? "dedans" : "dehors") as "dehors" | "entre" | "dedans" | "sort",
      t0: 0,
      intro: reduit ? null : (performance.now() as number | null),
      glisse: null as null | { id: number; x0: number; y0: number; t0: number; phi0: number; val0: number; actif: boolean },
      vu: [] as number[],
      zone: { cx: 0, cy: 0, l: 1, h: 1, W: 1, H: 1 },
      aDessiner: true,
      interieur: null as Interieur | null,
      dejaPret: false,
    };
    const mod = (i: number) => ((i % n) + n) % n;

    /* ---------- cadrage ---------- */
    const mesurer = () => {
      const r = el.getBoundingClientRect();
      const z = dernier.current.zone.current?.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const zone = z && z.width > 40 && z.height > 40 ? z : r;
      const W = Math.round(r.width);
      const H = Math.round(r.height);
      const nouv = { cx: zone.left + zone.width / 2 - r.left, cy: zone.top + zone.height / 2 - r.top, l: zone.width, h: zone.height, W, H };
      const z0 = s.zone;
      if (Math.abs(nouv.cx - z0.cx) + Math.abs(nouv.cy - z0.cy) + Math.abs(nouv.l - z0.l) + Math.abs(nouv.h - z0.h) + Math.abs(W - z0.W) + Math.abs(H - z0.H) > 0.5) {
        if (W !== z0.W || H !== z0.H) {
          rendu.setSize(W, H, false);
          composer?.setSize(W, H);
        }
        s.zone = nouv;
        s.aDessiner = true;
      }
    };

    const melanger = (a: Pose, b: Pose, k: number): Pose => ({
      position: a.position.clone().lerp(b.position, k),
      cible: a.cible.clone().lerp(b.cible, k),
      fov: a.fov + (b.fov - a.fov) * k,
    });

    const direction = (az: number, el2: number) => new THREE.Vector3(Math.sin(az) * Math.cos(el2), Math.sin(el2), Math.cos(az) * Math.cos(el2));
    const HAUT = new THREE.Vector3(0, 1, 0);

    /**
     * La pose qui fait tenir une boîte (ses huit coins, dans le monde) dans la zone libre,
     * vue depuis `regard` (direction de la boîte vers la caméra), perspective comprise.
     */
    const cadrer = (boite: THREE.Box3, matrice: THREE.Matrix4, regard: THREE.Vector3, fov: number, recul = 1): Pose => {
      const coins: THREE.Vector3[] = [];
      for (let i = 0; i < 8; i++)
        coins.push(new THREE.Vector3(i & 1 ? boite.max.x : boite.min.x, i & 2 ? boite.max.y : boite.min.y, i & 4 ? boite.max.z : boite.min.z).applyMatrix4(matrice));
      const vers = regard.clone().normalize();
      const droite = new THREE.Vector3().crossVectors(HAUT, vers).normalize();
      const haut = new THREE.Vector3().crossVectors(vers, droite).normalize();
      const milieu = coins.reduce((m, c) => m.add(c), new THREE.Vector3()).multiplyScalar(1 / 8);
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const c of coins) {
        const d = c.clone().sub(milieu);
        x0 = Math.min(x0, d.dot(droite));
        x1 = Math.max(x1, d.dot(droite));
        y0 = Math.min(y0, d.dot(haut));
        y1 = Math.max(y1, d.dot(haut));
      }
      const cible = milieu.clone().addScaledVector(droite, (x0 + x1) / 2).addScaledVector(haut, (y0 + y1) / 2);
      const { l, h, H } = s.zone;
      const tan = Math.tan(THREE.MathUtils.degToRad(fov / 2));
      const tx = (tan * l * (l < 500 ? 0.97 : 0.92)) / H;
      const ty = (tan * h * 0.88) / H;
      let d = 0;
      for (const c of coins) {
        const v = c.clone().sub(cible);
        const z = v.dot(vers);
        d = Math.max(d, z + Math.abs(v.dot(droite)) / tx, z + Math.abs(v.dot(haut)) / ty);
      }
      return { position: cible.clone().addScaledVector(vers, d * recul), cible, fov };
    };

    /** Le repère de la maison de devant, plateau arrêté. */
    const devant = new THREE.Matrix4().makeTranslation(0, 0, RAYON).multiply(new THREE.Matrix4().makeRotationY(BIAIS));

    /** La pose de dehors : la maison de devant, de trois quarts, un peu de haut. */
    const poseDehors = (temps: number): Pose => {
      const f = -s.phi / PAS;
      const i0 = Math.floor(f);
      const k = f - i0;
      const bouge = reduit ? 0 : Math.sin(temps * 0.00021) * 0.06;
      const regard = direction(bouge, 0.31 + bouge * 0.2);
      // pendant un tour, la caméra recule pour montrer le plateau, puis revient sur la suivante
      const recul = 1 + Math.sin(Math.PI * k) * (s.zone.l < 600 ? 1.15 : 0.45);
      const a = cadrer(maisons[mod(i0)].boite, devant, regard, FOV_DEHORS, recul);
      const b = cadrer(maisons[mod(i0 + 1)].boite, devant, regard, FOV_DEHORS, recul);
      return melanger(a, b, k);
    };

    /** La pose de dedans : la coupe entière dans la zone libre. */
    const poseDedans = (x: Interieur, temps: number, recul = 1): Pose => {
      const bouge = reduit ? 0 : Math.sin(temps * 0.00025) * 0.05;
      const regard = x.regard.clone().applyAxisAngle(HAUT, bouge);
      return cadrer(x.boite, new THREE.Matrix4(), regard, FOV_DEDANS, recul);
    };

    /** Le seuil de la maison de devant, dans le monde. */
    const seuilDe = (maison: MaisonDehors) => {
      maison.groupe.updateWorldMatrix(true, false);
      const point = maison.seuil.point.clone().applyMatrix4(maison.groupe.matrixWorld);
      const normale = maison.seuil.normale.clone().transformDirection(maison.groupe.matrixWorld);
      return { point, normale };
    };


    /* ---------- dehors ou dedans : lumière et décor ---------- */
    const couleur = (a: string, b: string, k: number) => new THREE.Color(a).lerp(new THREE.Color(b), k);

    const lumiereDehors = () => {
      monde.visible = true;
      interieurs.forEach((x) => (x.groupe.visible = false));
      scene.background = studio;
      scene.fog = brume;
      ciel.color.set("#dfe7ee");
      ciel.groundColor.set("#4a4038");
      ciel.intensity = 1.15;
      soleil.color.set("#ffe2c0");
      soleil.intensity = 3.1;
      soleil.position.set(18, 24, RAYON + 13);
      soleil.target.position.set(0, 0, RAYON);
      const o = soleil.shadow.camera;
      o.left = o.bottom = -13;
      o.right = o.top = 13;
      o.near = 1;
      o.far = 80;
      o.updateProjectionMatrix();
      appoint.intensity = 0.55;
      appoint.position.set(-22, 10, RAYON - 6);
      appoint.target.position.set(0, 0, RAYON);
      ampoule.intensity = 0;
      scene.environmentIntensity = 0.55;
      rendu.toneMappingExposure = 1;
      if (halo) halo.strength = 0;
    };

    const lumiereDedans = (x: Interieur, t: number) => {
      monde.visible = false;
      interieurs.forEach((y) => (y.groupe.visible = y === x));
      scene.background = studio;
      scene.fog = null;
      const k = x.lumiere(t);
      ciel.color.copy(couleur("#8a7764", "#f2efe8", k));
      ciel.groundColor.copy(couleur("#3a2c20", "#b7aa95", k));
      ciel.intensity = 0.55 + 0.5 * k;
      soleil.color.copy(couleur("#ffcf9a", "#fff3e0", k));
      soleil.intensity = 1.3 + 2.5 * k;
      soleil.position.copy(x.soleil.position);
      soleil.target.position.copy(x.soleil.cible);
      const o = soleil.shadow.camera;
      o.left = o.bottom = -x.soleil.demi;
      o.right = o.top = x.soleil.demi;
      o.near = 1;
      o.far = 60;
      o.updateProjectionMatrix();
      appoint.intensity = 0.2 + 0.3 * k;
      const centre = x.boite.getCenter(new THREE.Vector3());
      appoint.position.copy(centre).addScaledVector(x.regard, 12).add(new THREE.Vector3(0, 6, 0));
      appoint.target.position.copy(centre);
      ampoule.position.copy(x.ampoule);
      ampoule.intensity = 7 * (1 - k);
      scene.environmentIntensity = 0.25 + 0.4 * k;
      rendu.toneMappingExposure = 0.95 + 0.07 * k;
      if (halo) halo.strength = 0.07 * k;
    };
    lumiereDehors();

    /* ---------- le geste : glisser pour tourner, ou pour transformer ---------- */
    const toile = rendu.domElement;
    const surAppui = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const p = dernier.current;
      s.glisse = { id: e.pointerId, x0: e.clientX, y0: e.clientY, t0: performance.now(), phi0: s.phi, val0: p.etats[p.index] ?? 0, actif: false };
    };
    const surMouvement = (e: PointerEvent) => {
      const g = s.glisse;
      if (!g || g.id !== e.pointerId) return;
      const dx = e.clientX - g.x0;
      const dy = e.clientY - g.y0;
      if (!g.actif) {
        if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
        if (s.mode === "entre" || s.mode === "sort") return;
        g.actif = true;
        toile.setPointerCapture(e.pointerId);
      }
      if (s.mode === "dehors") {
        s.tour = null;
        s.phi = g.phi0 + (dx / s.zone.W) * PAS * 1.2;
        s.aDessiner = true;
      } else if (s.mode === "dedans") {
        dernier.current.onRegler(Math.min(1, Math.max(0, g.val0 + dx / (s.zone.W * 0.7))));
      }
    };
    const surRelache = (e: PointerEvent) => {
      const g = s.glisse;
      if (!g || g.id !== e.pointerId) return;
      s.glisse = null;
      const dx = e.clientX - g.x0;
      const duree = performance.now() - g.t0;
      if (!g.actif) {
        if (e.type === "pointerup" && s.mode === "dehors" && Math.abs(dx) < 8 && duree < 400) dernier.current.onToucher();
        return;
      }
      if (s.mode !== "dehors") return;
      const vite = Math.abs(dx) / Math.max(1, duree) > 0.45;
      if (Math.abs(dx) > s.zone.W * 0.12 || (vite && Math.abs(dx) > 30)) dernier.current.onGlisser(dx < 0 ? 1 : -1);
      else s.tour = { de: s.phi, a: -s.continu * PAS, t0: performance.now() };
    };
    toile.addEventListener("pointerdown", surAppui);
    toile.addEventListener("pointermove", surMouvement);
    toile.addEventListener("pointerup", surRelache);
    toile.addEventListener("pointercancel", surRelache);

    /* ---------- la boucle ---------- */
    let image = 0;
    let visible = true;
    let precedente = 0;
    let poseCourante: Pose = poseDehors(0);

    const appliquerPose = (p: Pose) => {
      poseCourante = p;
      camera.position.copy(p.position);
      camera.fov = p.fov;
      camera.lookAt(p.cible);
      const { cx, cy, W, H } = s.zone;
      camera.aspect = W / H;
      camera.setViewOffset(W, H, W / 2 - cx, H / 2 - cy, W, H);
      camera.updateProjectionMatrix();
      if (scene.fog === brume) {
        const d = p.position.distanceTo(p.cible);
        brume.near = d * 1.08;
        brume.far = d * 2.1;
      }
    };

    const boucle = (maintenant: number) => {
      image = requestAnimationFrame(boucle);
      const p = dernier.current;
      const anime = s.intro !== null || s.tour !== null || s.mode === "entre" || s.mode === "sort" || !!s.glisse?.actif;
      // au repos, une trentaine d'images par seconde suffisent au léger mouvement de caméra
      if (!anime && maintenant - precedente < 32) return;
      precedente = maintenant;
      mesurer();

      // Les maisons, avant ou après, et ce qui a changé dans les réglages.
      p.etats.forEach((t, i) => {
        if (s.vu[i] !== t) {
          if (maisons[i]) montrerVersion(maisons[i], t);
          s.vu[i] = t;
          s.aDessiner = true;
          if (i === s.index && s.interieur && (s.mode === "dedans" || s.mode === "entre")) {
            s.interieur.appliquer(t);
            if (monde.visible === false) lumiereDedans(s.interieur, t);
          }
        }
      });

      // Changer de maison : le plateau tourne par le plus court.
      if (p.index !== s.index && s.mode === "dehors") {
        let pas = mod(p.index - s.index);
        if (pas === 2) pas = -1;
        s.continu += pas;
        s.index = p.index;
        s.aDessiner = true;
        if (reduit) {
          s.phi = -s.continu * PAS;
          s.tour = null;
        } else s.tour = { de: s.phi, a: -s.continu * PAS, t0: maintenant };
      }
      if (s.tour) {
        const k = Math.min(1, (maintenant - s.tour.t0) / (DUREE_TOUR * 1000));
        s.phi = s.tour.de + (s.tour.a - s.tour.de) * aller(k);
        if (k >= 1) s.tour = null;
      }

      // Entrer, sortir.
      const t = p.etats[s.index] ?? 0;
      const maison = maisons[s.index];
      if (p.dedans && (s.mode === "dehors" || s.mode === "sort") && s.index === p.index) {
        s.interieur = interieurDe(p.modeles[s.index]);
        s.interieur.appliquer(t);
        s.mode = "entre";
        s.t0 = maintenant;
        s.aDessiner = true;
        // on entre dans la maison de devant, même si le plateau finit de tourner
        s.tour = null;
        s.phi = -s.continu * PAS;
      } else if (!p.dedans && (s.mode === "dedans" || s.mode === "entre")) {
        s.mode = "sort";
        s.t0 = maintenant;
        s.aDessiner = true;
      }

      let pose: Pose;
      let voile = 0;
      const ecoule = (maintenant - s.t0) / 1000;
      if (s.mode === "entre" && s.interieur) {
        const x = s.interieur;
        const { approche, seuil: dureeSeuil, dedans } = ENTREE;
        if (reduit) {
          maison.ouvrir(0);
          lumiereDedans(x, t);
          pose = poseDedans(x, maintenant);
          s.mode = "dedans";
        } else if (ecoule < approche + dureeSeuil) {
          const { point, normale } = seuilDe(maison);
          const devant: Pose = { position: point.clone().addScaledVector(normale, 3.2).add(new THREE.Vector3(0, 0.12, 0)), cible: point, fov: 40 };
          const contre: Pose = { position: point.clone().addScaledVector(normale, 0.1), cible: point.clone().addScaledVector(normale, -1), fov: 46 };
          if (ecoule < approche) {
            const k = ecoule / approche;
            pose = melanger(poseDehors(maintenant), devant, aller(k));
            maison.ouvrir(lisse(0.3, 0.95, k));
          } else {
            const k = (ecoule - approche) / dureeSeuil;
            pose = melanger(devant, contre, entreeDouce(k));
            maison.ouvrir(1);
            voile = lisse(0.35, 0.95, k);
          }
        } else {
          if (monde.visible) {
            maison.ouvrir(0);
            lumiereDedans(x, t);
          }
          const k = Math.min(1, (ecoule - approche - dureeSeuil) / dedans);
          pose = melanger(poseDedans(x, maintenant, 1.55), poseDedans(x, maintenant), sortieDouce(k));
          voile = 1 - lisse(0, 0.5, k);
          if (k >= 1) s.mode = "dedans";
        }
      } else if (s.mode === "dedans" && s.interieur) {
        if (monde.visible) lumiereDedans(s.interieur, t);
        pose = poseDedans(s.interieur, maintenant);
      } else if (s.mode === "sort") {
        const x = s.interieur;
        if (reduit || !x) {
          lumiereDehors();
          montrerVersion(maison, t);
          maison.ouvrir(0);
          pose = poseDehors(maintenant);
          s.mode = "dehors";
        } else if (ecoule < SORTIE.voile && !monde.visible) {
          const k = ecoule / SORTIE.voile;
          pose = melanger(poseDedans(x, maintenant), poseDedans(x, maintenant, 1.35), entreeDouce(k));
          voile = lisse(0, 1, k);
        } else {
          if (!monde.visible) {
            lumiereDehors();
            montrerVersion(maison, t);
            s.t0 = maintenant - SORTIE.voile * 1000;
          }
          const k = Math.min(1, Math.max(0, (ecoule - SORTIE.voile) / SORTIE.recul));
          const { point, normale } = seuilDe(maison);
          const pres: Pose = { position: point.clone().addScaledVector(normale, 0.6), cible: point.clone().addScaledVector(normale, -1), fov: 46 };
          pose = melanger(pres, poseDehors(maintenant), aller(k));
          maison.ouvrir(1 - lisse(0.35, 0.9, k));
          voile = 1 - lisse(0, 0.28, k);
          if (k >= 1) s.mode = "dehors";
        }
      } else {
        pose = poseDehors(maintenant);
        if (s.intro !== null) {
          const k = Math.min(1, (maintenant - s.intro) / 2600);
          const e = aller(k);
          const loin: Pose = { position: pose.cible.clone().addScaledVector(direction(-0.15, 0.62), pose.position.distanceTo(pose.cible) * 1.45), cible: pose.cible.clone().add(new THREE.Vector3(0, 1.5, 0)), fov: FOV_DEHORS };
          pose = melanger(loin, pose, e);
          plateau.rotation.y = s.phi + (1 - e) * 0.9;
          if (k >= 1) s.intro = null;
        }
      }
      if (s.intro === null) plateau.rotation.y = s.phi;

      const v = dernier.current.voile.current;
      if (v) v.style.opacity = voile ? voile.toFixed(3) : "0";

      // Animations réduites et rien n'a changé : l'image reste celle d'avant.
      if (reduit && !anime && !s.aDessiner && s.dejaPret) return;
      appliquerPose(pose);
      if (composer) composer.render();
      else rendu.render(scene, camera);
      s.aDessiner = false;
      if (!s.dejaPret) {
        s.dejaPret = true;
        dernier.current.onPret();
      }
    };

    const relancer = () => {
      if (!image && visible) {
        precedente = 0;
        image = requestAnimationFrame(boucle);
      }
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
    const taille = new ResizeObserver(() => mesurer());
    taille.observe(el);
    mesurer();
    appliquerPose(poseCourante);
    relancer();

    // Les intérieurs se préparent pendant que le visiteur regarde les maisons.
    const preparation = window.setTimeout(() => {
      p0.modeles.forEach((m, i) => window.setTimeout(() => interieurDe(m), 400 * i));
    }, 2500);

    return () => {
      cancelAnimationFrame(image);
      clearTimeout(preparation);
      observateur.disconnect();
      taille.disconnect();
      toile.removeEventListener("pointerdown", surAppui);
      toile.removeEventListener("pointermove", surMouvement);
      toile.removeEventListener("pointerup", surRelache);
      toile.removeEventListener("pointercancel", surRelache);
      maisons.forEach((m) => libererGeometries(m.groupe));
      Object.values(dehors.matieres).forEach((m) => m.dispose());
      dehors.textures.forEach((t) => t.dispose());
      interieurs.forEach((x) => x.liberer());
      atelier?.liberer();
      sol.geometry.dispose();
      (sol.material as THREE.Material).dispose();
      texSol.dispose();
      studio.dispose();
      composer?.passes.forEach((pass) => pass.dispose());
      composer?.dispose();
      environnement.dispose();
      pmrem.dispose();
      rendu.dispose();
      rendu.domElement.remove();
    };
  }, []);

  return <div ref={conteneur} className="absolute inset-0 cursor-grab active:cursor-grabbing" />;
}
