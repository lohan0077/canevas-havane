"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { Ceremonie, cadrage, entreeSortie, sceneEnvironnement } from "./ceremonie-scene";

// Le premier écran en 3D : la cérémonie sous la pluie, et les parapluies jaunes qui
// s'ouvrent un à un. La scène est décrite dans ceremonie-scene.ts ; ici, la boucle,
// la caméra et le cycle de vie. Rien n'est chargé d'ailleurs.
//
// Téléphone : pas de post-traitement, reflets en demi-résolution, une trentaine
// d'images par seconde. Ordinateur : halo léger autour des flammes et de la grange,
// la caméra suit un peu le pointeur. « Animations réduites » : l'état final, une seule
// image, rien ne bouge. La boucle s'arrête quand le premier écran sort de la vue.

type Props = {
  /** La pluie et la vague en pause (bouton du premier écran). */
  pause: boolean;
  /** Incrémenté pour rejouer l'ouverture des parapluies. */
  rejouer: number;
  /** Appelé après la première image : le parent fait apparaître la scène. */
  onPret: () => void;
  /** Appelé si le navigateur ne sait pas faire de 3D : le parent garde l'affiche. */
  onIndisponible: () => void;
};

type Moteur = { ceremonie: Ceremonie; pause: boolean; redessiner: () => void; relancer: () => void };

export default function Ceremonie3D({ pause, rejouer, onPret, onIndisponible }: Props) {
  const conteneur = useRef<HTMLDivElement>(null);
  const moteur = useRef<Moteur | null>(null);
  const rappels = useRef({ onPret, onIndisponible });
  useEffect(() => {
    rappels.current = { onPret, onIndisponible };
  }, [onPret, onIndisponible]);

  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;
    // Sans WebGL 2, on n'essaie même pas : three écrirait une erreur dans la console.
    const essai = document.createElement("canvas").getContext("webgl2");
    if (!essai) {
      rappels.current.onIndisponible();
      return;
    }
    essai.getExtension("WEBGL_lose_context")?.loseContext();
    let rendu: THREE.WebGLRenderer;
    try {
      rendu = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      rappels.current.onIndisponible();
      return;
    }
    const ordinateur = window.innerWidth >= 1024 && !window.matchMedia("(pointer: coarse)").matches;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rendu.setPixelRatio(Math.min(window.devicePixelRatio, ordinateur ? 1.75 : 1.5));
    rendu.outputColorSpace = THREE.SRGBColorSpace;
    rendu.toneMapping = THREE.NeutralToneMapping;
    rendu.toneMappingExposure = 1.05;
    el.appendChild(rendu.domElement);
    Object.assign(rendu.domElement.style, { display: "block", width: "100%", height: "100%" });

    const ceremonie = new Ceremonie({ ordinateur, reduit });
    const { scene } = ceremonie;
    const pmrem = new THREE.PMREMGenerator(rendu);
    const decorReflets = sceneEnvironnement();
    const environnement = pmrem.fromScene(decorReflets, 0.02).texture;
    scene.environment = environnement;
    scene.environmentIntensity = 0.6;

    const camera = new THREE.PerspectiveCamera(50, 1, 0.2, 400);
    camera.layers.enable(1);
    // Les reflets ne montrent pas la pluie : elle est sur le calque 1, qu'ils ignorent.
    ceremonie.sceneReflet.getReflectionCamera(camera).layers.set(0);

    let composer: EffectComposer | null = null;
    if (ordinateur) {
      composer = new EffectComposer(rendu);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new UnrealBloomPass(new THREE.Vector2(512, 512), 0.32, 0.55, 0.9));
      composer.addPass(new OutputPass());
    }

    // Le cadrage dépend de la forme de l'écran ; la grue part un peu plus bas et plus
    // près, et se lève pendant que les parapluies s'ouvrent.
    let cadre = cadrage(1);
    const pointeur = new THREE.Vector2();
    const pointeurLisse = new THREE.Vector2();
    const placerCamera = () => {
      // la grue suit le temps écoulé, pas la vague : rejouer ne la fait pas redescendre
      const g = entreeSortie(Math.min(1, ceremonie.ecoule / 8.5));
      camera.position.copy(cadre.position);
      camera.position.y -= (1 - g) * 0.9;
      camera.position.z -= (1 - g) * 1.6;
      camera.position.x += pointeurLisse.x * 0.35;
      camera.position.y += pointeurLisse.y * 0.18;
      camera.lookAt(cadre.cible);
    };

    let aDessiner = true;
    const redessiner = () => {
      aDessiner = true;
    };

    const taille = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      rendu.setSize(width, height, false);
      composer?.setSize(width, height);
      cadre = cadrage(width / height);
      camera.aspect = width / height;
      camera.fov = cadre.fov;
      camera.setViewOffset(width, height, cadre.decalX * width, cadre.decalY * height, width, height);
      camera.updateProjectionMatrix();
      const ratio = rendu.getPixelRatio();
      const pixels = (height * ratio) / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const facteur = ordinateur ? 0.7 : 0.5;
      ceremonie.regler(pixels, Math.round(width * ratio * facteur), Math.round(height * ratio * facteur));
      redessiner();
    });
    taille.observe(el);

    const surPointeur = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointeur.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    };
    if (ordinateur && !reduit) window.addEventListener("pointermove", surPointeur, { passive: true });

    const dessiner = () => {
      placerCamera();
      if (composer) composer.render();
      else rendu.render(scene, camera);
    };

    let image = 0;
    let visible = true;
    let precedent = 0;
    let premiere = true;
    const boucle = (maintenant: number) => {
      image = requestAnimationFrame(boucle);
      const ecart = maintenant - precedent;
      // une trentaine d'images par seconde sur téléphone, toutes sur ordinateur
      if (!ordinateur && ecart < 30) return;
      // la mise en scène suit l'horloge réelle, même si les images se font attendre ;
      // la pluie, elle, avance à petits pas pour ne pas traverser les toiles
      const dt = Math.min(0.25, ecart / 1000);
      precedent = maintenant;
      const m = moteur.current;
      if (!m) return;
      const joue = !reduit && !m.pause;
      if (joue) {
        ceremonie.avancer(premiere ? 0 : dt);
        pointeurLisse.lerp(pointeur, 0.04);
      }
      if (joue || aDessiner) {
        dessiner();
        aDessiner = false;
        if (premiere) {
          premiere = false;
          rappels.current.onPret();
        }
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

    const perdu = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(image);
      image = 0;
      rappels.current.onIndisponible();
    };
    rendu.domElement.addEventListener("webglcontextlost", perdu);

    moteur.current = { ceremonie, pause: false, redessiner, relancer };
    relancer();

    return () => {
      cancelAnimationFrame(image);
      observateur.disconnect();
      taille.disconnect();
      window.removeEventListener("pointermove", surPointeur);
      rendu.domElement.removeEventListener("webglcontextlost", perdu);
      ceremonie.liberer();
      decorReflets.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose();
        (mesh.material as THREE.Material | undefined)?.dispose();
      });
      composer?.passes.forEach((p) => p.dispose());
      composer?.dispose();
      environnement.dispose();
      pmrem.dispose();
      rendu.dispose();
      rendu.domElement.remove();
      moteur.current = null;
    };
  }, []);

  useEffect(() => {
    const m = moteur.current;
    if (!m) return;
    m.pause = pause;
    m.redessiner();
  }, [pause]);

  useEffect(() => {
    const m = moteur.current;
    if (!m || rejouer === 0) return;
    m.ceremonie.rejouer();
    m.redessiner();
  }, [rejouer]);

  return <div ref={conteneur} className="absolute inset-0" />;
}
