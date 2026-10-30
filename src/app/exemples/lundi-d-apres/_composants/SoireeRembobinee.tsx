"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { getImageProps } from "next/image";
import { Bouton, Rembobine } from "./Blocs";
import { ACCUEIL, DOSSIER, THEMES } from "./donnees";
import s from "./Soiree.module.css";

// Le premier écran de l'accueil : la soirée rembobinée. Une soirée d'entreprise en
// maquette 3D, filmée à l'envers au fil du défilement — la fête d'abord, puis tout
// se rembobine : les confettis remontent dans leurs canons, les ballons redescendent
// sur les tables, les verres se remplissent, les invités reculent jusqu'à l'accueil et
// ressortent, les suspensions se rallument une à une… jusqu'au lundi, 9 h, devant la
// machine à café, où la question du site apparaît. « La soirée construite à l'envers »,
// au pied de la lettre.
//
// La section est haute (4,6 écrans sur ordinateur, 3,4 sur téléphone) et son image
// reste collée pendant qu'on la traverse. On n'y est jamais piégé : la molette, les
// flèches et l'espace la traversent comme une page ; le ruban des heures, en bas, saute
// à n'importe quel chapitre ; « Aller à la question » passe tout.
//
// La 3D se charge après la page. En attendant, ou sans WebGL, des affiches — des
// images fixes de la même scène — tiennent sa place, une par chapitre. Avec
// « animations réduites », la section devient une suite d'images fixes, sans rien
// de collé ni d'animé, et sans perdre une ligne de texte.

const Soiree3D = dynamic(() => import("./Soiree3D"), { ssr: false, loading: () => null });

const exemple = THEMES[0];

type Chapitre = {
  id: string;
  /** La part du défilement où le chapitre est à l'écran, de 0 à 1. */
  debut: number;
  fin: number;
  /** Où le ruban des heures envoie. */
  repere: number;
  ruban: string;
  heure: string;
  titre: string;
  texte: string;
  alt: string;
};

const CHAPITRES: Chapitre[] = [
  {
    id: "fete",
    debut: 0,
    fin: 0.12,
    repere: 0,
    ruban: "La fête",
    heure: "Vendredi soir",
    titre: "",
    texte: "On ne vend pas une soirée : on vend le lundi matin d'après, quand tout le monde en parle encore.",
    alt: "Maquette d'une soirée d'entreprise en pleine fête : confettis en l'air, ballons au plafond, projecteurs roses et violets sur la piste, guirlandes allumées.",
  },
  {
    id: "23h",
    debut: 0.12,
    fin: 0.33,
    repere: 0.2,
    ruban: exemple.moment.heure,
    heure: exemple.moment.heure,
    titre: exemple.moment.titre,
    texte: exemple.moment.texte,
    alt: "23 h : quelqu'un chante au micro sur la scène, deux projecteurs posés sur lui, la salle danse.",
  },
  {
    id: "21h",
    debut: 0.33,
    fin: 0.53,
    repere: 0.45,
    ruban: exemple.diner.heure,
    heure: exemple.diner.heure,
    titre: exemple.diner.titre,
    texte: exemple.diner.texte,
    alt: "21 h : les invités sont assis aux tables rondes, les verres pleins, les ballons attachés au centre des tables.",
  },
  {
    id: "19h",
    debut: 0.53,
    fin: 0.735,
    repere: 0.66,
    ruban: ACCUEIL.heure,
    heure: ACCUEIL.heure,
    titre: ACCUEIL.titre,
    texte: ACCUEIL.texte,
    alt: "19 h : la salle prête, toutes les lumières allumées, les invités devant la table d'accueil et ses badges.",
  },
  {
    id: "lundi",
    debut: 0.84,
    fin: 1.01,
    repere: 1,
    ruban: "Lundi",
    heure: "Lundi, 9 h",
    titre: "Le point de départ.",
    texte: "Nous, on part de lundi, et on remonte le temps.",
    alt: "Lundi, 9 h : trois collègues autour d'une table haute, devant la machine à café du bureau, la lumière du matin par la fenêtre.",
  },
];

/* ---------- le compteur du magnétoscope ---------- */

// Les heures de la soirée en minutes, posées sur le défilement : 23 h 47 au début,
// 23 h pendant le karaoké, 21 h au dîner, 19 h à l'accueil.
const HEURES: [number, number][] = [[0, 1427], [0.12, 1421], [0.33, 1380], [0.37, 1290], [0.53, 1260], [0.57, 1180], [0.735, 1140]];
const deux = (n: number) => String(n).padStart(2, "0");
function compteur(p: number) {
  if (p >= 0.84) return "LUN. 09:00";
  if (p > 0.735) return "◂◂ --:--";
  let i = 0;
  while (i < HEURES.length - 2 && p > HEURES[i + 1][0]) i++;
  const [p0, m0] = HEURES[i];
  const [p1, m1] = HEURES[i + 1];
  const m = Math.round(m0 + (m1 - m0) * Math.min(1, Math.max(0, (p - p0) / (p1 - p0))));
  return `VEN. ${deux(Math.floor(m / 60))}:${deux(m % 60)}`;
}

/* ---------- préférence « réduire les animations » ---------- */

const REQUETE = "(prefers-reduced-motion: reduce)";
const abonner = (rappel: () => void) => {
  const media = window.matchMedia(REQUETE);
  media.addEventListener("change", rappel);
  return () => media.removeEventListener("change", rappel);
};
const reduitNavigateur = () => window.matchMedia(REQUETE).matches;
const reduitServeur = () => false;

/* ---------- les affiches ---------- */

/** Une image fixe de la scène, en hauteur sur un écran en hauteur, en largeur sinon. */
function Affiche({ id, alt, className = "", prioritaire = false }: { id: string; alt: string; className?: string; prioritaire?: boolean }) {
  const commun = { alt, sizes: "100vw", quality: 75 };
  const {
    props: { srcSet: paysage },
  } = getImageProps({ ...commun, width: 1600, height: 1000, src: `${DOSSIER}/soiree/${id}-paysage.webp` });
  const {
    props: { srcSet: portrait, ...reste },
  } = getImageProps({ ...commun, width: 780, height: 1688, src: `${DOSSIER}/soiree/${id}-portrait.webp`, priority: prioritaire });
  return (
    <picture>
      <source media="(min-aspect-ratio: 9/10)" srcSet={paysage} />
      <source srcSet={portrait} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- le texte de remplacement est dans `reste` */}
      <img {...reste} className={`h-full w-full object-cover ${className}`} />
    </picture>
  );
}

/* ---------- le texte de chaque chapitre ---------- */

function Legende({ c, fixe = false }: { c: Chapitre; fixe?: boolean }) {
  if (c.id === "fete")
    return (
      <div className="space-y-5 lg:space-y-6">
        <p className="text-[15px] font-medium text-[#C9C5DC]">Lundi d&apos;Après, soirées d&apos;entreprise et mariages, DJ compris</p>
        <h1
          id="soiree-titre"
          className="font-[family-name:var(--titres)] text-[clamp(2.7rem,11.5vw,3.4rem)] font-semibold lowercase leading-[0.95] tracking-[-0.05em] lg:text-[clamp(3.4rem,5.3vw,5.4rem)]"
        >
          ce dont vous parlerez lundi.
        </h1>
        <p className="max-w-md text-[17px] leading-relaxed lg:text-lg">{c.texte}</p>
        {!fixe && (
          <a href={`${DOSSIER}#question`} className="inline-flex min-h-11 items-center gap-2 text-[15px] font-medium underline decoration-[#FF6B9C] decoration-2 underline-offset-[6px]">
            Aller à la question
          </a>
        )}
      </div>
    );
  if (c.id === "lundi")
    return (
      <div className="space-y-5 rounded-[28px] bg-[var(--fond)] p-6 text-[var(--encre)] shadow-[0_40px_80px_-40px_rgba(14,12,29,0.55)] sm:p-8 lg:p-10">
        <p className="text-[15px] font-medium text-[var(--doux)]">
          {c.heure}&nbsp;: {c.titre.charAt(0).toLowerCase() + c.titre.slice(1)}
        </p>
        <p className="font-[family-name:var(--titres)] text-[clamp(2.1rem,9vw,2.6rem)] font-semibold lowercase leading-[1] tracking-[-0.045em] lg:text-[clamp(2.8rem,4.2vw,4rem)]">
          lundi, vos équipes diront quoi&nbsp;?
        </p>
        <p className="max-w-md text-[17px] leading-relaxed text-[var(--doux)]">{c.texte}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Bouton href={`${DOSSIER}#question`} className="justify-center">Écrire notre phrase</Bouton>
          <Bouton href={`${DOSSIER}/samedis-libres`} variante="contour" className="justify-center">Voir les samedis libres</Bouton>
        </div>
      </div>
    );
  return (
    <div className="space-y-3 lg:space-y-4">
      <p className="font-[family-name:var(--titres)] text-[clamp(3.4rem,17vw,4.6rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-[#FF6B9C] lg:text-[7rem]">{c.heure}</p>
      <h2 className="font-[family-name:var(--titres)] text-[26px] font-semibold lowercase leading-[1.05] tracking-[-0.035em] lg:text-[2.4rem]">{c.titre}</h2>
      <p className="max-w-md text-[17px] leading-relaxed text-[#D7D4E6] lg:text-lg">{c.texte}</p>
    </div>
  );
}

/* ---------- la section ---------- */

export default function SoireeRembobinee() {
  const reduit = useSyncExternalStore(abonner, reduitNavigateur, reduitServeur);
  const section = useRef<HTMLElement>(null);
  const progres = useRef(0);
  const osd = useRef<HTMLSpanElement>(null);
  const sens = useRef<HTMLSpanElement>(null);
  const [actif, setActif] = useState(0);
  const [pret, setPret] = useState(false);
  const [sans3D, setSans3D] = useState(false);
  const surPret = useCallback(() => setPret(true), []);
  const indisponible = useCallback(() => setSans3D(true), []);

  useEffect(() => {
    if (reduit) return;
    const el = section.current;
    if (!el) return;
    let precedent = -1;
    let arret = 0;
    let rafale = 0;
    const mesurer = () => {
      const course = el.offsetHeight - window.innerHeight;
      const p = course > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / course)) : 0;
      progres.current = p;
      el.style.setProperty("--p", p.toFixed(4));
      // tant que la section n'a pas atteint le haut (le bandeau de démonstration au-dessus), l'image
      // collée dépasse en bas de l'écran : le texte et le ruban remontent d'autant
      el.style.setProperty("--haut", `${Math.max(0, Math.round(el.getBoundingClientRect().top))}px`);
      // rembobinage : monte de 0,735 à 0,79, retombe jusqu'à 0,84 ; l'éclair au passage, à 0,8
      const r = p < 0.735 || p > 0.86 ? 0 : p < 0.79 ? (p - 0.735) / 0.055 : Math.max(0, 1 - (p - 0.79) / 0.06);
      el.style.setProperty("--rembobine", r.toFixed(3));
      el.style.setProperty("--eclair", Math.max(0, 1 - Math.abs(p - 0.8) / 0.022).toFixed(3));
      el.style.setProperty("--nuit", (1 - Math.min(1, Math.max(0, (p - 0.79) / 0.05))).toFixed(3));
      el.style.setProperty("--secousse", r > 0.05 ? ((Math.random() - 0.5) * 10 * r).toFixed(1) : "0");
      const i = CHAPITRES.findIndex((c) => p >= c.debut && p < c.fin);
      setActif(i);
      if (osd.current) osd.current.textContent = compteur(p);
      // le signe du compteur : ◂◂ quand on descend (on rembobine), ▸▸ quand on remonte, ▸ à l'arrêt
      if (sens.current && precedent >= 0 && p !== precedent) {
        sens.current.textContent = p > precedent ? "◂◂" : "▸▸";
        clearTimeout(arret);
        arret = window.setTimeout(() => {
          if (sens.current) sens.current.textContent = "▸";
        }, 350);
      }
      precedent = p;
    };
    const surDefilement = () => {
      cancelAnimationFrame(rafale);
      rafale = requestAnimationFrame(mesurer);
    };
    mesurer();
    window.addEventListener("scroll", surDefilement, { passive: true });
    window.addEventListener("resize", surDefilement);
    return () => {
      window.removeEventListener("scroll", surDefilement);
      window.removeEventListener("resize", surDefilement);
      cancelAnimationFrame(rafale);
      clearTimeout(arret);
    };
  }, [reduit]);

  /** Fait défiler jusqu'à un instant de la soirée. */
  const allerA = (p: number) => {
    const el = section.current;
    if (!el) return;
    const haut = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: haut + (el.offsetHeight - window.innerHeight) * p, behavior: "smooth" });
  };

  /* ----- animations réduites : une suite d'images fixes ----- */
  if (reduit)
    return (
      <section aria-labelledby="soiree-titre" className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <ol className="mx-auto max-w-6xl space-y-16 px-6 pb-24 pt-28 lg:space-y-24 lg:pt-36">
          {CHAPITRES.map((c, i) => (
            <li key={c.id}>
              <figure className="grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-14">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#1A1530] sm:aspect-[16/10]">
                  {/* sur l'affiche en hauteur, la scène occupe le haut de l'image : on cadre dessus */}
                  <Affiche id={c.id} alt={c.alt} prioritaire={i === 0} className="object-[50%_18%]" />
                </div>
                <figcaption>
                  <Legende c={c} fixe />
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </section>
    );

  /* ----- la soirée rembobinée ----- */
  return (
    <section ref={section} data-rembobine="" aria-labelledby="soiree-titre" className="relative h-[340svh] bg-[var(--sombre)] text-[var(--sur-sombre)] lg:h-[460vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Les affiches : la première tient la place de la 3D le temps qu'elle arrive ; sans WebGL,
            chacune prend le relais à son chapitre. */}
        <div className={`absolute inset-0 ${s.image}`}>
          {CHAPITRES.map((c, i) => {
            const montree = sans3D ? Math.max(0, actif) === i || (actif === -1 && i === 3) : i === 0 && !pret;
            return (
              <div key={c.id} className={`absolute inset-0 transition-opacity duration-700 ${montree ? "opacity-100" : "opacity-0"}`}>
                {(i === 0 || sans3D) && <Affiche id={c.id} alt="" prioritaire={i === 0} />}
              </div>
            );
          })}
          {!sans3D && (
            <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-1000 ${pret ? "opacity-100" : "opacity-0"}`}>
              <Soiree3D progres={progres} onPret={surPret} onIndisponible={indisponible} />
            </div>
          )}
        </div>

        {/* Le magnétoscope : lignes de bande, éclair blanc au passage au lundi. */}
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${s.bandes}`} />
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${s.eclair}`} />

        {/* Les voiles : ils garantissent le contraste du texte, quoi que montre la 3D dessous. */}
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${s.voile}`}>
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0E0C1D]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 hidden h-[26%] bg-gradient-to-t from-[#0E0C1D]/80 to-transparent lg:block" />
          <div className="absolute inset-y-0 left-0 hidden w-[76%] bg-[linear-gradient(90deg,rgba(14,12,29,0.95)_0%,rgba(14,12,29,0.9)_62%,rgba(14,12,29,0.55)_80%,transparent_100%)] lg:block" />
        </div>

        {/* Le compteur, comme sur l'écran d'un caméscope. */}
        <p aria-hidden="true" className="pointer-events-none absolute left-6 top-[5.5rem] flex items-center gap-2.5 rounded-full bg-[#0E0C1D]/75 px-3.5 py-1.5 font-[family-name:var(--texte)] text-[13px] font-medium tabular-nums tracking-[0.12em] text-white backdrop-blur-md lg:left-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:top-28">
          <span ref={sens} className="w-5 text-[#FF6B9C]">▸</span>
          <span ref={osd}>VEN. 23:47</span>
        </p>

        {/* Le signe du rembobinage, au centre, entre 19 h et lundi. */}
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 grid place-items-center ${s.signe}`}>
          <div className="flex flex-col items-center gap-4 rounded-[2rem] bg-[#0E0C1D]/70 px-8 py-7 text-white backdrop-blur-sm">
            <Rembobine className="h-20 w-20 drop-shadow-[0_0_30px_rgba(255,61,127,0.8)] lg:h-28 lg:w-28" />
            <span className="font-[family-name:var(--titres)] text-2xl font-semibold lowercase tracking-[-0.03em] lg:text-4xl">on remonte le temps.</span>
          </div>
        </div>

        {/* Les légendes, une par chapitre ; seule celle de l'instant se montre. Sur téléphone, chacune
            porte son voile, qui part du bas de l'écran et monte juste au-dessus de son texte. Atteindre
            au clavier un lien d'un chapitre caché y fait défiler la page. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[var(--haut,0px)] pb-[5.5rem] lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:pb-0">
          <ol className="mx-auto grid max-w-6xl px-6">
            {CHAPITRES.map((c, i) => (
              <li
                key={c.id}
                onFocus={() => i !== actif && allerA(c.repere)}
                className={`relative isolate [grid-area:1/1] self-end transition-[opacity,translate] duration-500 ease-out lg:self-center ${
                  c.id === "lundi" ? "lg:max-w-[34rem]" : "lg:max-w-[36rem]"
                } ${i === actif ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
              >
                {c.id !== "lundi" && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-6 -bottom-[5.5rem] -top-24 -z-10 bg-[linear-gradient(to_top,#0E0C1D_0%,#0E0C1D_70%,rgba(14,12,29,0.92)_84%,rgba(14,12,29,0)_100%)] lg:hidden"
                  />
                )}
                <Legende c={c} />
              </li>
            ))}
          </ol>
        </div>

        {/* Le ruban des heures : où l'on en est, et un saut vers chaque chapitre. */}
        <nav
          aria-label="Chapitres de la soirée"
          className="absolute inset-x-0 bottom-[var(--haut,0px)] bg-gradient-to-t from-[#0E0C1D] from-60% to-transparent px-6 pb-5 pt-6 lg:bg-none lg:pb-8"
        >
          <div className="mx-auto max-w-6xl">
            <div className="relative lg:max-w-[30rem] lg:rounded-full lg:bg-[#0E0C1D]/85 lg:px-3 lg:backdrop-blur-md">
              <div aria-hidden="true" className="absolute inset-x-[10%] top-[1.1rem] h-px bg-white/25 lg:top-[1.35rem]">
                <div className={`absolute inset-0 bg-[#FF6B9C] ${s.ruban}`} />
              </div>
              <ul className="relative grid grid-cols-5">
                {CHAPITRES.map((c, i) => (
                  <li key={c.id} className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => allerA(c.repere)}
                      aria-current={i === actif ? "step" : undefined}
                      className="group flex min-h-11 flex-col items-center gap-1.5 rounded-full px-1 pb-1 text-[12px] font-medium tracking-[0.04em] text-[#C9C5DC] transition-colors hover:text-white aria-[current=step]:text-white lg:min-h-14 lg:text-[13px]"
                    >
                      <span aria-hidden="true" className="mt-[0.85rem] block h-2 w-2 rounded-full bg-[#C9C5DC] transition-transform group-aria-[current=step]:scale-150 group-aria-[current=step]:bg-[#FF6B9C] lg:mt-[1.1rem]" />
                      <span className="whitespace-nowrap">{c.ruban}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
