"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { N_TACHES, construireMannequin, creerMatieres } from "./mannequin-bois";
import { VUES, type IdZone } from "./mannequin-forme";

// Le mannequin de bois du premier écran, en 3D, éclairé comme une photo de studio : une
// lumière principale chaude en hauteur, une douce en face, deux contre-jours froids qui
// détachent la silhouette du fond bleu, et les reflets d'un intérieur (RoomEnvironment)
// sur le vernis. Le fond lui-même est en CSS, derrière une toile transparente : la
// page et la scène ne font qu'un.
//
// On le fait tourner du doigt (ou des flèches, depuis le parent) ; on touche une zone,
// elle s'éclaire doucement et le mannequin se tourne pour la montrer. Au chargement, la
// lumière monte : les contre-jours d'abord, puis la lumière principale. Avec « animations
// réduites », tout est en place d'emblée et rien ne bouge seul. La boucle s'arrête
// quand la scène sort de l'écran ; tout est libéré au départ.

export type Pilote = { tourner: (radians: number) => void };

type Props = {
  zone: IdZone | null;
  onChoisir: (zone: IdZone) => void;
  /** La première image est dessinée : le parent peut montrer la toile. */
  onPret: () => void;
  /** Pas de 3D dans ce navigateur : le parent garde le plan 2D. */
  onIndisponible: () => void;
  /** L'angle du mannequin quand il s'immobilise, pour le curseur accessible. */
  onAngle: (radians: number) => void;
  /** Donne au parent de quoi tourner le mannequin (boutons, flèches) ; null au départ. */
  onPilote: (pilote: Pilote | null) => void;
};

const TOUR = Math.PI * 2;
/** Le même angle, ramené au plus près d'un autre (pour tourner par le plus court). */
const auPlusPres = (angle: number, depuis: number) => angle + Math.round((depuis - angle) / TOUR) * TOUR;
const lisse = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function Mannequin3D({ zone, onChoisir, onPret, onIndisponible, onAngle, onPilote }: Props) {
  const conteneur = useRef<HTMLDivElement>(null);
  const rappels = useRef({ onChoisir, onPret, onIndisponible, onAngle, onPilote });
  const zoneVoulue = useRef<IdZone | null>(zone);
  const appliquerZone = useRef<((z: IdZone | null) => void) | null>(null);

  useEffect(() => {
    rappels.current = { onChoisir, onPret, onIndisponible, onAngle, onPilote };
  }, [onChoisir, onPret, onIndisponible, onAngle, onPilote]);

  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;
    // Sans WebGL 2, on le sait avant de construire le moteur : three.js écrirait sinon
    // trois erreurs dans la console pour dire la même chose.
    const essai = document.createElement("canvas").getContext("webgl2");
    if (!essai) {
      rappels.current.onIndisponible();
      return;
    }
    essai.getExtension("WEBGL_lose_context")?.loseContext();
    let rendu: THREE.WebGLRenderer;
    try {
      rendu = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      rappels.current.onIndisponible();
      return;
    }
    const ordinateur = window.innerWidth >= 1024 && window.matchMedia("(pointer: fine)").matches;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rendu.setPixelRatio(Math.min(window.devicePixelRatio, ordinateur ? 2 : 1.75));
    rendu.setClearColor(0x000000, 0);
    rendu.outputColorSpace = THREE.SRGBColorSpace;
    rendu.toneMapping = THREE.NeutralToneMapping;
    rendu.toneMappingExposure = 1.02;
    rendu.shadowMap.enabled = true;
    rendu.shadowMap.type = THREE.PCFShadowMap;
    el.appendChild(rendu.domElement);
    Object.assign(rendu.domElement.style, { display: "block", width: "100%", height: "100%", touchAction: "pan-y" });

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(rendu);
    const piece = new RoomEnvironment();
    const environnement = pmrem.fromScene(piece, 0.04).texture;
    piece.dispose();
    scene.environment = environnement;
    scene.environmentIntensity = 0.22;

    // L'éclairage de studio. Les intensités « pleines » ; l'allumage les multiplie.
    const ciel = new THREE.HemisphereLight("#B9C3FF", "#161C55", 0.26);
    const cle = new THREE.DirectionalLight("#FFF0DC", 3.6);
    cle.position.set(-2.1, 5.4, 2.7);
    cle.castShadow = true;
    cle.shadow.mapSize.set(ordinateur ? 2048 : 1024, ordinateur ? 2048 : 1024);
    Object.assign(cle.shadow.camera, { left: -1.5, right: 1.5, top: 1.6, bottom: -1.4, near: 1, far: 12 });
    cle.shadow.radius = ordinateur ? 5 : 3;
    cle.shadow.bias = -0.0004;
    cle.shadow.normalBias = 0.012;
    cle.target.position.set(0, 0.9, 0);
    const douce = new THREE.DirectionalLight("#D6DDFF", 0.5);
    douce.position.set(3.2, 1.4, 2.4);
    const contreG = new THREE.DirectionalLight("#C6D0FF", 3.8);
    contreG.position.set(-2.8, 2.5, -3.0);
    const contreD = new THREE.DirectionalLight("#EEF0FF", 3.0);
    contreD.position.set(2.9, 3.1, -2.4);
    scene.add(ciel, cle, cle.target, douce, contreG, contreD);
    const pleines = new Map<THREE.Light, number>([ciel, cle, douce, contreG, contreD].map((l) => [l, l.intensity]));

    // Le sol n'existe que par son ombre : le fond reste celui de la page.
    const geoSol = new THREE.PlaneGeometry(8, 8);
    const matSol = new THREE.ShadowMaterial({ color: "#02051A", opacity: 0.5 });
    const sol = new THREE.Mesh(geoSol, matSol);
    sol.rotation.x = -Math.PI / 2;
    sol.position.y = -0.07;
    sol.receiveShadow = true;
    scene.add(sol);

    const matieres = creerMatieres();
    const mannequin = construireMannequin(matieres, ordinateur);
    scene.add(mannequin.plateau);
    for (const h of mannequin.halos) scene.add(h.sprite);

    const camera = new THREE.PerspectiveCamera(27, 1, 0.1, 40);
    const centreY = (mannequin.hauteur - 0.07) / 2;
    let distanceBase = 5;

    /* ------------------------------- l'état ------------------------------- */
    const zoneDepart = zoneVoulue.current;
    const vueDepart = zoneDepart ? VUES[zoneDepart] : 0.3;
    let angle = reduit ? vueDepart : vueDepart - 1.25;
    let angleCible = vueDepart;
    let vitesse = 0; // radians par seconde, après un lancer du doigt
    let mode: "cible" | "elan" | "main" = "cible";
    let allumage = reduit ? 1 : 0;
    let horloge = 0;
    let derniereMain = -10;
    const forces: Record<IdZone, number> = { tete: 0, epaules: 0, dos: 0, ventre: 0, basDuDos: 0 };
    const cibles: Record<IdZone, number> = { tete: 0, epaules: 0, dos: 0, ventre: 0, basDuDos: 0 };
    let choisie: IdZone | null = zoneDepart;
    let survolee: IdZone | null = null;
    const cadre = { y: centreY, recul: 1 };
    const cadreCible = { y: centreY, recul: 1 };
    let aDessiner = true;
    let immobileSignale = false;

    const viser = (z: IdZone | null) => {
      for (const k of Object.keys(cibles) as IdZone[]) cibles[k] = k === z ? 1 : k === survolee ? 0.4 : 0;
    };
    const cadrerSur = (z: IdZone | null) => {
      if (!z) {
        cadreCible.y = centreY;
        cadreCible.recul = 1;
        return;
      }
      const t = mannequin.taches.find((x) => x.zone === z)!;
      const p = t.objet.getWorldPosition(new THREE.Vector3());
      // À peine : le mannequin et son socle restent entiers dans l'image.
      cadreCible.y = centreY + (p.y - centreY) * 0.08;
      cadreCible.recul = 0.98;
    };
    appliquerZone.current = (z) => {
      choisie = z;
      viser(z);
      cadrerSur(z);
      if (z) {
        angleCible = auPlusPres(VUES[z], angle);
        mode = "cible";
        vitesse = 0;
      }
      if (reduit) {
        angle = angleCible;
        for (const k of Object.keys(forces) as IdZone[]) forces[k] = cibles[k];
        Object.assign(cadre, cadreCible);
      }
      immobileSignale = false;
      aDessiner = true;
    };
    viser(choisie);
    cadrerSur(choisie);
    if (reduit) {
      for (const k of Object.keys(forces) as IdZone[]) forces[k] = cibles[k];
      Object.assign(cadre, cadreCible);
    } else {
      cadre.recul = 1.14;
    }

    rappels.current.onPilote({
      tourner: (d) => {
        angleCible = (mode === "cible" ? angleCible : angle) + d;
        mode = "cible";
        vitesse = 0;
        derniereMain = horloge;
        if (reduit) angle = angleCible;
        immobileSignale = false;
        aDessiner = true;
      },
    });

    /* ------------------------------ le cadrage ------------------------------ */
    const taille = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      rendu.setSize(width, height, false);
      camera.aspect = width / height;
      // Le mannequin et son socle tiennent dans l'image, en hauteur comme en largeur.
      const demiV = THREE.MathUtils.degToRad(camera.fov / 2);
      const demiH = Math.atan(Math.tan(demiV) * camera.aspect);
      const hauteur = mannequin.hauteur + 0.07;
      distanceBase = Math.max((hauteur * 0.56) / Math.tan(demiV), 0.62 / Math.tan(demiH));
      camera.updateProjectionMatrix();
      aDessiner = true;
    });
    taille.observe(el);

    /* --------------------------- la main du visiteur --------------------------- */
    const rayon = new THREE.Raycaster();
    const pointeur = new THREE.Vector2();
    const tempo = new THREE.Vector3();
    const versObjectif = new THREE.Vector3();
    const zoneSous = (x: number, y: number): IdZone | null => {
      const r = rendu.domElement.getBoundingClientRect();
      pointeur.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
      rayon.setFromCamera(pointeur, camera);
      const touche = rayon.intersectObjects(mannequin.corps, false)[0];
      if (!touche) return null;
      let meilleure: IdZone | null = null;
      let ecart = 1.08;
      for (const t of mannequin.taches) {
        const e = touche.point.distanceTo(t.objet.getWorldPosition(tempo)) / t.rayon;
        if (e < ecart) {
          ecart = e;
          meilleure = t.zone;
        }
      }
      return meilleure;
    };

    let appui: { id: number; x: number; y: number; t: number; dernierX: number; dernierT: number; glisse: boolean } | null = null;
    const toile = rendu.domElement;
    const surAppui = (e: PointerEvent) => {
      if (e.button !== 0) return;
      appui = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), dernierX: e.clientX, dernierT: performance.now(), glisse: false };
      vitesse = 0;
      derniereMain = horloge;
    };
    const surMouvement = (e: PointerEvent) => {
      if (appui && e.pointerId === appui.id) {
        const dx = e.clientX - appui.dernierX;
        if (!appui.glisse && Math.abs(e.clientX - appui.x) > 6) {
          appui.glisse = true;
          mode = "main";
          try {
            toile.setPointerCapture(e.pointerId);
          } catch {
            // le pointeur est déjà relâché : rien à capturer
          }
        }
        if (appui.glisse) {
          const parPixel = (Math.PI * 1.25) / Math.max(320, toile.clientWidth);
          const maintenant = performance.now();
          const dt = Math.max(1, maintenant - appui.dernierT) / 1000;
          angle += dx * parPixel;
          vitesse = vitesse * 0.6 + ((dx * parPixel) / dt) * 0.4;
          appui.dernierX = e.clientX;
          appui.dernierT = maintenant;
          derniereMain = horloge;
          aDessiner = true;
        }
        return;
      }
      if (e.pointerType !== "mouse") return;
      const z = zoneSous(e.clientX, e.clientY);
      toile.style.cursor = z ? "pointer" : "grab";
      if (z !== survolee) {
        survolee = z;
        viser(choisie);
        aDessiner = true;
      }
    };
    const surRelache = (e: PointerEvent) => {
      if (!appui || e.pointerId !== appui.id) return;
      const tape = !appui.glisse && performance.now() - appui.t < 600;
      if (appui.glisse) {
        mode = reduit ? "cible" : "elan";
        if (reduit) angleCible = angle;
      } else if (tape) {
        const z = zoneSous(e.clientX, e.clientY);
        if (z) rappels.current.onChoisir(z);
      }
      appui = null;
      immobileSignale = false;
    };
    const surAnnule = () => {
      if (appui?.glisse) {
        mode = reduit ? "cible" : "elan";
        if (reduit) angleCible = angle;
      }
      appui = null;
    };
    const surSortie = () => {
      if (survolee) {
        survolee = null;
        viser(choisie);
        aDessiner = true;
      }
    };
    toile.addEventListener("pointerdown", surAppui);
    toile.addEventListener("pointermove", surMouvement);
    toile.addEventListener("pointerup", surRelache);
    toile.addEventListener("pointercancel", surAnnule);
    toile.addEventListener("pointerleave", surSortie);
    toile.style.cursor = "grab";

    /* ------------------------------- la boucle ------------------------------- */
    let image = 0;
    let visible = true;
    let precedent = performance.now();
    let premiere = true;
    const boucle = (maintenant: number) => {
      image = requestAnimationFrame(boucle);
      const dt = Math.min(0.05, (maintenant - precedent) / 1000);
      // Au repos, trente images par seconde suffisent à la respiration de la lumière.
      const auRepos = mode === "cible" && Math.abs(angleCible - angle) < 1e-3 && allumage >= 1 && !appui;
      if (auRepos && !aDessiner && (reduit || maintenant - precedent < 31)) return;
      precedent = maintenant;
      horloge += dt;

      // L'allumage du studio.
      if (allumage < 1) {
        allumage = Math.min(1, allumage + dt / 2.1);
        aDessiner = true;
      }
      const contre = lisse(0, 0.45, allumage);
      const principale = lisse(0.2, 0.95, allumage);
      ciel.intensity = pleines.get(ciel)! * (0.25 + 0.75 * principale);
      cle.intensity = pleines.get(cle)! * principale;
      douce.intensity = pleines.get(douce)! * principale;
      contreG.intensity = pleines.get(contreG)! * contre;
      contreD.intensity = pleines.get(contreD)! * contre;
      scene.environmentIntensity = 0.22 * principale;

      // La rotation : visée, élan ou main.
      if (mode === "cible") {
        const ecart = angleCible - angle;
        angle += ecart * (1 - Math.exp(-dt * (allumage < 1 ? 2.2 : 4.2)));
        if (Math.abs(ecart) < 1e-3) angle = angleCible;
        else aDessiner = true;
      } else if (mode === "elan") {
        angle += vitesse * dt;
        vitesse *= Math.exp(-dt * 3.2);
        aDessiner = true;
        if (Math.abs(vitesse) < 0.03) {
          mode = "cible";
          angleCible = angle;
        }
      }
      // Au repos depuis un moment : un balancement à peine visible, comme sur une sellette.
      const balance = reduit || horloge - derniereMain < 5 ? 0 : Math.sin((horloge - derniereMain - 5) * 0.45) * 0.045 * lisse(5, 8, horloge - derniereMain);
      mannequin.plateau.rotation.y = angle + balance;

      if (mode === "cible" && Math.abs(angleCible - angle) < 1e-3 && !immobileSignale) {
        immobileSignale = true;
        rappels.current.onAngle(angle);
      }

      // Le cadrage suit la zone choisie, en douceur.
      const kc = reduit ? 1 : 1 - Math.exp(-dt * 2.6);
      cadre.y += (cadreCible.y - cadre.y) * kc;
      cadre.recul += (cadreCible.recul - cadre.recul) * kc;
      const d = distanceBase * cadre.recul;
      camera.position.set(0, cadre.y + 0.22, d);
      camera.lookAt(0, cadre.y, 0);

      // La lumière des zones.
      const respire = reduit ? 1 : 0.9 + 0.1 * Math.sin(horloge * 1.7);
      const debut = lisse(0.55, 1, allumage);
      const lueur = matieres.lueur;
      mannequin.taches.forEach((t, i) => {
        if (i >= N_TACHES) return;
        t.objet.getWorldPosition(tempo);
        lueur.uTaches.value[i].set(tempo.x, tempo.y, tempo.z, t.rayon);
      });
      for (const k of Object.keys(forces) as IdZone[]) {
        const ecart = cibles[k] - forces[k];
        if (Math.abs(ecart) > 1e-3) {
          forces[k] += reduit ? ecart : ecart * (1 - Math.exp(-dt * 3));
          aDessiner = true;
        } else forces[k] = cibles[k];
      }
      mannequin.taches.forEach((t, i) => {
        if (i < N_TACHES) lueur.uForces.value[i] = forces[t.zone] * debut * (t.zone === choisie ? respire : 1);
      });
      // Les repères : présents sur les zones libres, effacés sur la zone allumée. Une
      // seule matière pour les cinq : leur présence passe par l'échelle et la visibilité.
      for (const r of mannequin.reperes) {
        const allume = r.zone === choisie;
        const pulse = reduit ? 1 : 1 + 0.12 * Math.sin(horloge * 2.4 + r.zone.length);
        const voulu = (allume ? 0 : r.zone === survolee ? 1 : 0.85) * debut;
        r.sprite.userData.o = (r.sprite.userData.o ?? 0) + (voulu - (r.sprite.userData.o ?? 0)) * (reduit ? 1 : 1 - Math.exp(-dt * 6));
        r.sprite.visible = r.sprite.userData.o > 0.02;
        const s = 0.022 * pulse * (0.6 + 0.4 * r.sprite.userData.o);
        r.sprite.scale.set(s, s, 1);
      }
      // Le halo de la zone allumée, entre elle et l'objectif : caché par le corps quand
      // la zone tourne le dos.
      for (const h of mannequin.halos) {
        const o = forces[h.zone] * debut * (h.zone === choisie ? respire : 1);
        h.sprite.visible = o > 0.01;
        if (!h.sprite.visible) continue;
        h.ancre.getWorldPosition(tempo);
        versObjectif.copy(camera.position).sub(tempo).normalize();
        h.sprite.position.copy(tempo).addScaledVector(versObjectif, h.rayon * 0.9);
        h.sprite.scale.setScalar(h.rayon * 3.4);
        h.sprite.material.opacity = 0.3 * o;
      }

      rendu.render(scene, camera);
      aDessiner = false;
      if (premiere) {
        premiere = false;
        rappels.current.onPret();
      }
    };
    const relancer = () => {
      if (!image && visible) {
        precedent = performance.now();
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
    relancer();

    return () => {
      cancelAnimationFrame(image);
      observateur.disconnect();
      taille.disconnect();
      toile.removeEventListener("pointerdown", surAppui);
      toile.removeEventListener("pointermove", surMouvement);
      toile.removeEventListener("pointerup", surRelache);
      toile.removeEventListener("pointercancel", surAnnule);
      toile.removeEventListener("pointerleave", surSortie);
      rappels.current.onPilote(null);
      appliquerZone.current = null;
      mannequin.liberer();
      matieres.liberer();
      geoSol.dispose();
      matSol.dispose();
      environnement.dispose();
      pmrem.dispose();
      rendu.dispose();
      toile.remove();
    };
  }, []);

  // La zone choisie (par le doigt, la liste ou le clavier) : la scène la montre.
  useEffect(() => {
    zoneVoulue.current = zone;
    appliquerZone.current?.(zone);
  }, [zone]);

  return <div ref={conteneur} className="absolute inset-0" />;
}
