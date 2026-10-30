"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { construireSoiree, type Cadrage } from "./soiree-scene";

// Le moteur de la soirée rembobinée : il lit la position de défilement (écrite par la
// section dans `progres`, de 0 à 1), la lisse pour que le temps glisse au lieu de sauter,
// pose la scène à cet instant et la filme. Sur ordinateur, un halo de post-traitement
// fait briller les ampoules et les projecteurs, les ombres sont calculées, et la caméra
// suit à peine la souris ; un téléphone garde les halos peints, sans post-traitement.
// La boucle s'arrête quand la section sort de l'écran. Ce composant n'est jamais monté
// quand le visiteur limite les animations : la section montre alors des images fixes.

type Props = {
  progres: React.RefObject<number>;
  /** Appelé une fois la première image dessinée : l'affiche peut s'effacer. */
  onPret: () => void;
  /** Appelé si le navigateur ne sait pas faire de 3D : les affiches restent. */
  onIndisponible: () => void;
};

export default function Soiree3D({ progres, onPret, onIndisponible }: Props) {
  const conteneur = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;
    // Sans WebGL, on le sait avant de créer le moteur (qui l'écrirait en erreur dans la console).
    const essai = document.createElement("canvas");
    if (!essai.getContext("webgl2") && !essai.getContext("webgl")) {
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
    rendu.setPixelRatio(Math.min(window.devicePixelRatio, ordinateur ? 1.5 : 1.75));
    rendu.outputColorSpace = THREE.SRGBColorSpace;
    rendu.toneMapping = THREE.ACESFilmicToneMapping;
    rendu.toneMappingExposure = 1.05;
    rendu.shadowMap.enabled = ordinateur;
    rendu.shadowMap.type = THREE.PCFShadowMap;
    el.appendChild(rendu.domElement);
    Object.assign(rendu.domElement.style, { display: "block", width: "100%", height: "100%" });

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(rendu);
    const environnement = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environnement;
    const soiree = construireSoiree({ ordinateur });
    scene.add(soiree.racine);

    const camera = new THREE.PerspectiveCamera(30, 1, 0.3, 200);
    let composer: EffectComposer | null = null;
    let halo: UnrealBloomPass | null = null;
    if (ordinateur) {
      composer = new EffectComposer(rendu);
      composer.addPass(new RenderPass(scene, camera));
      halo = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.6, 0.5, 0.9);
      composer.addPass(halo);
      composer.addPass(new OutputPass());
    }

    // Le cadrage suit la forme de l'écran : en hauteur, la scène monte dans le haut de
    // l'image pour laisser le bas aux légendes ; en largeur, elle glisse vers la droite.
    let cadrage: Cadrage = "paysage";
    const taille = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      rendu.setSize(width, height, false);
      composer?.setSize(width, height);
      halo?.resolution.set(width / 2, height / 2);
      cadrage = width / height < 0.9 ? "portrait" : "paysage";
      camera.aspect = width / height;
      camera.fov = cadrage === "portrait" ? 42 : 30;
      if (cadrage === "portrait") camera.setViewOffset(width, height, 0, height * 0.13, width, height);
      else camera.setViewOffset(width, height, -width * 0.1, 0, width, height);
      camera.updateProjectionMatrix();
      const echelle = (height * rendu.getPixelRatio()) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
      for (const m of soiree.halos) m.uniforms.echelle.value = echelle;
    });
    taille.observe(el);

    // Sur ordinateur, la caméra suit très légèrement la souris.
    let sx = 0;
    let sy = 0;
    let lx = 0;
    let ly = 0;
    const surPointeur = (e: PointerEvent) => {
      sx = e.clientX / window.innerWidth - 0.5;
      sy = e.clientY / window.innerHeight - 0.5;
    };
    if (ordinateur) window.addEventListener("pointermove", surPointeur, { passive: true });

    const cible = new THREE.Vector3();
    const debut = performance.now();
    let p = progres.current ?? 0;
    let image = 0;
    let visible = true;
    let precedent = 0;
    let pret = false;
    const boucle = (maintenant: number) => {
      image = requestAnimationFrame(boucle);
      const ecart = maintenant - precedent;
      // une quarantaine d'images par seconde suffisent sur téléphone, et ménagent la batterie
      if (!ordinateur && ecart < 22) return;
      const dt = Math.min(0.1, ecart / 1000);
      precedent = maintenant;
      const voulu = progres.current ?? 0;
      // le temps glisse vers la position de défilement ; il ne s'attarde pas au passage au bureau
      const franchit = (p < soiree.coupe) !== (voulu < soiree.coupe) && Math.abs(voulu - p) > 0.12;
      p = franchit ? voulu : p + (voulu - p) * (1 - Math.exp(-dt * 7));
      if (Math.abs(voulu - p) < 0.0003) p = voulu;
      const temps = (maintenant - debut) / 1000;

      const { eclat } = soiree.appliquer(p, temps);
      soiree.camera(p, cadrage, cible, camera.position);
      if (ordinateur) {
        lx += (sx - lx) * Math.min(1, dt * 3);
        ly += (sy - ly) * Math.min(1, dt * 3);
        camera.position.x += lx * 0.9;
        camera.position.y -= ly * 0.5;
      }
      camera.lookAt(cible);

      const auBureau = p >= soiree.coupe;
      scene.background = auBureau ? soiree.fond.matin : soiree.fond.nuit;
      scene.environmentIntensity = auBureau ? 0.55 : 0.32;
      rendu.toneMappingExposure = auBureau ? 0.95 : 1.08;
      if (halo) {
        halo.enabled = eclat > 0.01;
        halo.strength = eclat;
      }

      if (composer) composer.render();
      else rendu.render(scene, camera);
      if (!pret) {
        pret = true;
        onPret();
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
    relancer();

    return () => {
      cancelAnimationFrame(image);
      observateur.disconnect();
      taille.disconnect();
      window.removeEventListener("pointermove", surPointeur);
      soiree.liberer();
      composer?.passes.forEach((passe) => passe.dispose());
      composer?.dispose();
      environnement.dispose();
      pmrem.dispose();
      rendu.dispose();
      rendu.domElement.remove();
    };
  }, [progres, onPret, onIndisponible]);

  return <div ref={conteneur} className="absolute inset-0" />;
}
