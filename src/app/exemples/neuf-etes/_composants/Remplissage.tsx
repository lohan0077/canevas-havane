"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DOSSIER } from "./donnees";

// Le premier écran de l'accueil : la piscine qui se remplit au défilement. 96 images
// rendues dans Blender (outils/blender/piscine-neuf-etes.py) : le bassin vide en fin de
// journée, l'eau qui monte pendant que l'on descend vers elle, le bassin plein et calme.
// Le défilement choisit l'image ; l'écran reste collé le temps de l'histoire, puis le
// site continue. Deux cadrages : ordinateur (paysage) et téléphone (portrait).
//
// Pourquoi des images et pas une vidéo : une vidéo ne va vite qu'à ses images clés et
// recule mal ; une suite d'images va n'importe où, tout de suite. Elles arrivent par
// étapes (une sur huit, puis une sur quatre…) : l'histoire se lit dès les premières.
// Avec « animations réduites », pas de défilement collé : la piscine pleine, fixe.

const IMAGES = 96;
const PISCINE = `${DOSSIER}/piscine`;
const nom = (i: number) => `${String(i + 1).padStart(4, "0")}.webp`;

/** L'ordre de chargement : 0, 8, 16… puis 4, 12… puis 2, 6… puis le reste. */
function ordre() {
  const vus = new Set<number>();
  const liste: number[] = [];
  for (const pas of [8, 4, 2, 1])
    for (let i = 0; i < IMAGES; i += pas)
      if (!vus.has(i)) {
        vus.add(i);
        liste.push(i);
      }
  return liste;
}

export default function Remplissage() {
  const racine = useRef<HTMLElement>(null);
  const toile = useRef<HTMLCanvasElement>(null);
  const [debut, setDebut] = useState(true);

  useEffect(() => {
    const section = racine.current;
    const canvas = toile.current;
    if (!section || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Même règle que les images d'attente (portrait / paysage).
    const cadrage = window.innerWidth < window.innerHeight ? "telephone" : "ordinateur";
    const images: (HTMLImageElement | null)[] = Array(IMAGES).fill(null);
    let voulue = 0;
    let dessinee = -1;
    let attente = 0;
    let fini = false;

    // L'image la plus proche de celle voulue parmi celles déjà arrivées.
    const proche = (i: number) => {
      for (let d = 0; d < IMAGES; d++) {
        if (images[i - d]) return i - d;
        if (images[i + d]) return i + d;
      }
      return -1;
    };
    const dessiner = () => {
      attente = 0;
      const i = proche(voulue);
      if (i < 0 || i === dessinee) return;
      const img = images[i]!;
      const { width: l, height: h } = canvas;
      const echelle = Math.max(l / img.naturalWidth, h / img.naturalHeight);
      const lw = img.naturalWidth * echelle;
      const lh = img.naturalHeight * echelle;
      ctx.drawImage(img, (l - lw) / 2, (h - lh) / 2, lw, lh);
      dessinee = i;
    };
    const demander = () => {
      if (!attente) attente = requestAnimationFrame(dessiner);
    };

    const taille = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      dessinee = -1;
      demander();
    };
    const defilement = () => {
      const r = section.getBoundingClientRect();
      const course = r.height - window.innerHeight;
      const p = course > 0 ? Math.min(1, Math.max(0, -r.top / course)) : 0;
      voulue = Math.round(p * (IMAGES - 1));
      setDebut(p < 0.04);
      demander();
    };

    // Les images arrivent l'une après l'autre, dans l'ordre qui rend l'histoire lisible
    // le plus vite ; la première est attendue avant tout le reste.
    const file = ordre();
    const suivante = () => {
      const i = file.shift();
      if (i === undefined || fini) return;
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        if (fini) return;
        images[i] = img;
        demander();
        suivante();
      };
      img.onerror = () => suivante();
      img.src = `${PISCINE}/${cadrage}/${nom(i)}`;
    };
    suivante();
    suivante();

    taille();
    defilement();
    const observateur = new ResizeObserver(taille);
    observateur.observe(canvas);
    window.addEventListener("scroll", defilement, { passive: true });
    return () => {
      fini = true;
      cancelAnimationFrame(attente);
      observateur.disconnect();
      window.removeEventListener("scroll", defilement);
    };
  }, []);

  return (
    <section
      ref={racine}
      id="ouverture"
      aria-label="Neuf Étés"
      className="relative h-[230svh] bg-[var(--sombre)] text-[var(--sur-sombre)] motion-reduce:h-auto"
    >
      <div className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden">
        {/* L'image d'attente : le bassin vide, ou plein si rien ne bouge. Un cadrage par
            forme d'écran. */}
        <div className="absolute inset-0" role="img" aria-label="Une piscine de jardin qui se remplit, en fin de journée d'été, devant une maison blanche">
          <Image src={`${PISCINE}/ordinateur/${nom(0)}`} alt="" fill priority sizes="100vw" className="object-cover motion-reduce:hidden portrait:hidden" />
          <Image src={`${PISCINE}/telephone/${nom(0)}`} alt="" fill priority sizes="100vw" className="object-cover motion-reduce:hidden landscape:hidden" />
          <Image src={`${PISCINE}/ordinateur/${nom(IMAGES - 1)}`} alt="" fill sizes="100vw" className="hidden object-cover motion-reduce:block motion-reduce:portrait:hidden" />
          <Image src={`${PISCINE}/telephone/${nom(IMAGES - 1)}`} alt="" fill sizes="100vw" className="hidden object-cover motion-reduce:landscape:hidden motion-reduce:portrait:block" />
          <canvas ref={toile} aria-hidden="true" className="absolute inset-0 h-full w-full motion-reduce:hidden" />
        </div>

        {/* Deux voiles : le texte reste lisible sur la pierre claire de la plage. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0D3446]/70 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#0A2A38] via-[#0D3446]/90 via-55% to-transparent lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-[62%] lg:bg-gradient-to-r lg:via-[#0D3446]/80" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-28 md:pb-16 lg:pb-20">
          <h1 className="text-[2.6rem] font-normal leading-[1.02] tracking-[-0.01em] text-white sm:text-6xl lg:text-7xl">
            Il te reste
            <br />
            combien d&apos;étés&nbsp;?
          </h1>
          {/* Sur téléphone, une ligne courte laisse voir l'eau ; la phrase entière ensuite. */}
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#E4EEF1] md:text-lg">
            <span className="sm:hidden">Piscines familiales en Drôme-Ardèche.</span>
            <span className="hidden sm:inline">
              Entre l&apos;âge de tes enfants : le site compte les étés qu&apos;il te reste avec eux, à la maison.
              Neuf Étés construit l&apos;endroit où ils vont se passer : des piscines familiales, en Drôme-Ardèche.
            </span>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#etes"
              data-film="appel-ouverture"
              className="rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-[var(--sur-accent)] shadow-[0_10px_30px_rgba(246,196,69,.25)] transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Compter mes étés
            </Link>
            <Link
              href="#prix"
              className="rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Calculer pour mon jardin
            </Link>
          </div>
          <p
            className={`mt-6 hidden text-sm text-[#CFE6EE] transition-opacity duration-500 motion-reduce:hidden sm:block ${debut ? "opacity-100" : "opacity-0"}`}
            aria-hidden="true"
          >
            Fais défiler : la piscine se remplit.
          </p>
        </div>
      </div>
    </section>
  );
}
