"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import s from "./Ouverture.module.css";
import { Symbole } from "./Logo";

// Le premier écran de l'accueil, construit sur le modèle « Monolith Hero » de
// MotionSites : un décor vidéo qui change avec le chapitre choisi, des libellés qui
// se décodent, un titre qui monte hors d'un masque. Les vidéos sont celles du
// modèle, servies depuis notre domaine — la politique de sécurité du site bloque
// tout média venu d'ailleurs, et un hébergeur tiers recevrait l'IP des visiteurs.

type Chapitre = {
  id: string;
  libelle: string;
  video: string;
  titre: [string, string];
  lignes: string[];
};

const DOSSIER = "/exemples/premier-plongeon";

// Quatre lignes posées à la main par chapitre, comme dans le modèle : sous 548 px
// les retours à la ligne s'effacent et le texte trouve sa propre mesure.
// L'espace finale de la première ligne de titre sert quand les deux lignes se
// rejoignent sur téléphone.
const CHAPITRES: Chapitre[] = [
  {
    id: "ete",
    libelle: "L'ÉTÉ",
    video: `${DOSSIER}/ete.mp4`,
    titre: ["Le premier plongeon ", "se prépare en avril"],
    lignes: [
      "Le premier dimanche de juillet, toute la famille saute en même temps.",
      "Pour que ce jour-là arrive à l'heure, le chantier se cale au printemps :",
      "on voit ton jardin, on te dit la piscine qui rentre, et tu choisis",
      "toi-même ta semaine de travaux.",
    ],
  },
  {
    id: "plan",
    libelle: "LE PLAN",
    video: `${DOSSIER}/plan.mp4`,
    titre: ["Ton jardin d'abord, ", "la piscine ensuite"],
    lignes: [
      "On part de ce qui ne bouge pas : la surface, l'accès pour la grue et la",
      "nature du sol. La piscine qui rentre se décide là, pas sur catalogue.",
      "Plus bas, le curseur te la montre à l'échelle de ton jardin, avec son",
      "prix pose comprise.",
    ],
  },
  {
    id: "chantier",
    libelle: "LE CHANTIER",
    video: `${DOSSIER}/chantier.mp4`,
    titre: ["Trois semaines, ", "jour par jour"],
    lignes: [
      "Terrassement, pose de la coque, remblai, local technique, plage : chaque",
      "chantier a sa page, avec ce qui a été fait chaque jour. C'est ce que tu",
      "cherches avant d'appeler un pisciniste, alors on le montre avant que tu",
      "aies à le demander.",
    ],
  },
  {
    id: "mise-en-eau",
    libelle: "LA MISE EN EAU",
    video: `${DOSSIER}/mise-en-eau.mp4`,
    titre: ["Et puis un matin, ", "l'eau est là"],
    lignes: [
      "Le dernier jour, on remplit le bassin, on règle la filtration et on",
      "t'explique tout au bord de l'eau, le temps qu'il faut. Il ne reste plus",
      "qu'à attendre le premier dimanche de juillet, et à décider qui saute",
      "en premier.",
    ],
  },
];

const PREMIER = CHAPITRES[0];

/* ---------- préférence « réduire les animations » ---------- */

const REQUETE_MOUVEMENT = "(prefers-reduced-motion: reduce)";
const abonnerMouvement = (rappel: () => void) => {
  const media = window.matchMedia(REQUETE_MOUVEMENT);
  media.addEventListener("change", rappel);
  return () => media.removeEventListener("change", rappel);
};
const mouvementReduit = () =>
  typeof window !== "undefined" && window.matchMedia(REQUETE_MOUVEMENT).matches;

/* ---------- les libellés qui se décodent ----------
   Chaque libellé se résout de gauche à droite en 400 ms, quelle que soit sa
   longueur, précédé d'une bande de 3,6 lettres tirées au hasard. Sa largeur est
   mesurée et figée d'abord : le décodage ne fait jamais bouger la ligne. Le texte
   est écrit dans le nœud texte que React a posé, jamais à côté : React continue
   de le reconnaître et peut le remplacer quand le libellé change. */

const LETTRES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DUREE = 400;
const enCours = new WeakMap<HTMLElement, { image: number; filet: number }>();

function ecrire(el: HTMLElement, valeur: string) {
  const n = el.firstChild;
  if (n && n.nodeType === Node.TEXT_NODE) n.nodeValue = valeur;
}

function poser(el: HTMLElement) {
  const c = enCours.get(el);
  if (c) {
    cancelAnimationFrame(c.image);
    clearTimeout(c.filet);
    enCours.delete(el);
  }
  ecrire(el, el.dataset.texte ?? "");
}

function decoder(el: HTMLElement | null) {
  if (!el) return;
  poser(el);
  if (mouvementReduit()) return;
  const cible = el.dataset.texte ?? "";
  const n = cible.length;
  const debut = performance.now();
  let dernierTirage = 0;
  const tirage: string[] = [];
  const tirer = () => {
    for (let i = 0; i < n; i++) tirage[i] = LETTRES.charAt(Math.floor(Math.random() * 26));
  };
  tirer();
  const pas = (maintenant: number) => {
    const p = Math.min(1, (maintenant - debut) / DUREE);
    const front = p * n;
    if (maintenant - dernierTirage > 45) {
      tirer();
      dernierTirage = maintenant;
    }
    let sortie = "";
    for (let i = 0; i < n; i++) {
      const car = cible.charAt(i);
      if (i < front) sortie += car;
      else if (i < front + 3.6) sortie += car === " " ? " " : tirage[i];
      else break;
    }
    ecrire(el, sortie);
    if (p < 1) {
      const c = enCours.get(el);
      if (c) c.image = requestAnimationFrame(pas);
    } else poser(el);
  };
  // Si les images sont ralenties (onglet en arrière-plan), le libellé se pose
  // quand même de lui-même plutôt que de rester à moitié décodé.
  enCours.set(el, { image: requestAnimationFrame(pas), filet: window.setTimeout(() => poser(el), DUREE + 500) });
}

function reserver(libelles: HTMLElement[]) {
  libelles.forEach((el) => (el.style.width = ""));
  const largeurs = libelles.map((el) => el.getBoundingClientRect().width);
  libelles.forEach((el, i) => (el.style.width = `${Math.ceil(largeurs[i] * 100) / 100}px`));
}

function Libelle({ texte }: { texte: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const precedent = useRef(texte);
  useEffect(() => {
    const el = ref.current;
    if (!el || precedent.current === texte) return;
    precedent.current = texte;
    reserver([el]);
    decoder(el);
  }, [texte]);
  return (
    <span ref={ref} className={s.t} data-texte={texte}>
      {texte}
    </span>
  );
}

/* ---------- l'ouverture ---------- */

export default function Ouverture() {
  const racine = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const navigation = useRef<HTMLDivElement>(null);
  const boutonMenu = useRef<HTMLButtonElement>(null);
  const videos = useRef(new Map<string, HTMLVideoElement>());
  const choisiRef = useRef(PREMIER.id);
  const enPauseRef = useRef(false);
  const minuteurBascule = useRef(0);

  const reduit = useSyncExternalStore(abonnerMouvement, mouvementReduit, () => false);
  const [entree, setEntree] = useState(true);
  const [choisi, setChoisi] = useState(PREMIER.id);
  const [affiche, setAffiche] = useState(PREMIER.id);
  const [visible, setVisible] = useState(PREMIER.id);
  const [bascule, setBascule] = useState(false);
  const [pauseVoulue, setPauseVoulue] = useState<boolean | null>(null);
  const [menuOuvert, setMenuOuvert] = useState(false);

  // Sans choix du visiteur, la vidéo ne démarre pas s'il a demandé moins
  // d'animations : le décor reste l'image fixe, et « Lecture » la lance.
  const enPause = pauseVoulue ?? reduit;
  const chapitre = CHAPITRES.find((c) => c.id === affiche) ?? PREMIER;

  // La vidéo affichée suit l'état lecture / pause. `muted` est reposé à la main :
  // c'est lui qui autorise la lecture sans geste du visiteur, et l'attribut seul
  // ne suffit pas toujours après l'hydratation.
  useEffect(() => {
    enPauseRef.current = enPause;
    const v = videos.current.get(visible);
    if (!v) return;
    v.muted = true;
    if (enPause) v.pause();
    else v.play().catch(() => undefined);
  }, [enPause, visible]);

  // Démarrage : largeurs figées une fois la police prête, puis un passage de
  // décodage calé sur l'entrée CSS. Tout est posé à 2,6 s : aucun mouvement ne
  // survit à la séquence.
  useEffect(() => {
    const el = racine.current;
    if (!el) return;
    const minuteurs: number[] = [];
    const tous = () => Array.from(el.querySelectorAll<HTMLElement>(`.${s.t}`));
    const a = (selecteur: string, depart: number, ecart = 0) =>
      el.querySelectorAll<HTMLElement>(selecteur).forEach((lib, i) => {
        minuteurs.push(window.setTimeout(() => decoder(lib), depart + i * ecart));
      });
    let annule = false;
    document.fonts.ready.then(() => {
      if (annule) return;
      reserver(tous());
      if (mouvementReduit()) return;
      a(`.${s.date} .${s.t}, .${s.menu} .${s.t}`, 390);
      a(`.${s.liens} .${s.t}`, 360, 45);
      a(`.${s.actif} .${s.t}`, 660);
      a(`.${s.chapitres} li:not(.${s.actif}) .${s.t}`, 720, 55);
      a(`.${s.appel} .${s.t}`, 900);
      a(`.${s.socle} .${s.t}`, 1000, 60);
      minuteurs.push(window.setTimeout(() => tous().forEach(poser), 2600));
    });
    minuteurs.push(window.setTimeout(() => setEntree(false), 2200));

    // Survoler un lien ou un bouton relance le décodage de son libellé.
    const survol = (e: PointerEvent) => {
      const cible = (e.target as Element).closest("a, button");
      if (!cible || !el.contains(cible) || cible.contains(e.relatedTarget as Node | null)) return;
      decoder(cible.querySelector<HTMLElement>(`.${s.t}`));
    };
    el.addEventListener("pointerover", survol);

    let redim = 0;
    const auRedimensionnement = () => {
      clearTimeout(redim);
      redim = window.setTimeout(() => reserver(tous()), 160);
    };
    window.addEventListener("resize", auRedimensionnement);

    return () => {
      annule = true;
      minuteurs.forEach(clearTimeout);
      clearTimeout(redim);
      el.removeEventListener("pointerover", survol);
      window.removeEventListener("resize", auRedimensionnement);
      tous().forEach(poser);
    };
  }, []);

  // Le décor dérive à l'opposé du pointeur, sur une longue inertie, et s'agrandit
  // à peine quand le pointeur descend. Souris seulement : rien au toucher.
  useEffect(() => {
    const el = racine.current;
    const bg = scene.current;
    if (!el || !bg) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, image = 0;
    const tic = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      const { width: w, height: h } = el.getBoundingClientRect();
      const dx = -cx * w * 0.0156;
      const dy = -cy * h * 0.015;
      const couverture = 2 * Math.max(Math.abs(dx) / w, Math.abs(dy) / h);
      const echelle = 1 + couverture + 0.014 * Math.max(0, cy);
      bg.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) scale(${echelle.toFixed(4)})`;
      if (Math.abs(tx - cx) < 0.0004 && Math.abs(ty - cy) < 0.0004) {
        image = 0;
        return;
      }
      image = requestAnimationFrame(tic);
    };
    const reveiller = () => {
      if (!image && !mouvementReduit()) image = requestAnimationFrame(tic);
    };
    const bouge = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      reveiller();
    };
    const sort = () => {
      tx = 0;
      ty = 0;
      reveiller();
    };
    el.addEventListener("pointermove", bouge, { passive: true });
    el.addEventListener("pointerleave", sort);
    return () => {
      cancelAnimationFrame(image);
      el.removeEventListener("pointermove", bouge);
      el.removeEventListener("pointerleave", sort);
    };
  }, []);

  // Le menu replié : Échap, un clic dehors, un lien choisi ou un écran qui
  // s'élargit le referment.
  useEffect(() => {
    if (!menuOuvert) return;
    const premierLien = navigation.current?.querySelector<HTMLElement>("a");
    const image = requestAnimationFrame(() => premierLien?.focus());
    const touche = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOuvert(false);
      boutonMenu.current?.focus();
    };
    const clic = (e: MouseEvent) => {
      const cible = e.target as Node;
      if (navigation.current?.contains(cible) || boutonMenu.current?.contains(cible)) return;
      setMenuOuvert(false);
    };
    const largeur = () => {
      if (window.innerWidth > 830) setMenuOuvert(false);
    };
    document.addEventListener("keydown", touche);
    document.addEventListener("click", clic);
    window.addEventListener("resize", largeur);
    return () => {
      cancelAnimationFrame(image);
      document.removeEventListener("keydown", touche);
      document.removeEventListener("click", clic);
      window.removeEventListener("resize", largeur);
    };
  }, [menuOuvert]);

  // Changer de chapitre : la vidéo se charge à la demande et apparaît en fondu
  // quand elle peut jouer ; le texte redescend, change, et remonte. Le dernier
  // choix l'emporte toujours sur un chargement ou une bascule en cours.
  const choisir = (id: string) => {
    if (id === choisiRef.current) return;
    choisiRef.current = id;
    setChoisi(id);

    const v = videos.current.get(id);
    if (v) {
      if (!v.getAttribute("src") && v.dataset.source) {
        v.preload = "auto";
        v.src = v.dataset.source;
        v.load();
      }
      const montrer = () => {
        if (choisiRef.current !== id) return;
        v.currentTime = 0;
        v.muted = true;
        if (!enPauseRef.current) v.play().catch(() => undefined);
        setVisible(id);
        videos.current.forEach((autre, idAutre) => {
          if (idAutre === id) return;
          window.setTimeout(() => {
            if (choisiRef.current !== idAutre) autre.pause();
          }, 950);
        });
      };
      if (v.readyState >= 3) montrer();
      else v.addEventListener("canplay", montrer, { once: true });
    }

    clearTimeout(minuteurBascule.current);
    setBascule(true);
    minuteurBascule.current = window.setTimeout(() => {
      setAffiche(id);
      setBascule(false);
    }, reduit ? 0 : 500);
  };

  const classes = [s.ouverture, entree && s.entree, bascule && s.bascule, menuOuvert && s.menuOuvert]
    .filter(Boolean)
    .join(" ");

  return (
    <header ref={racine} className={classes}>
      <div ref={scene} className={s.scene} role="img" aria-label="Un cube de pierre percé d'une arche éclairée, posé dans une eau immobile, à la nuit tombée">
        <div className={s.fond} />
        {CHAPITRES.map((c) => (
          <video
            key={c.id}
            ref={(el) => {
              if (el) videos.current.set(c.id, el);
              else videos.current.delete(c.id);
            }}
            className={`${s.video} ${visible === c.id ? s.visible : ""}`}
            src={c.id === PREMIER.id ? c.video : undefined}
            data-source={c.video}
            poster={c.id === PREMIER.id ? `${DOSSIER}/fond.webp` : undefined}
            preload={c.id === PREMIER.id ? "auto" : "none"}
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ))}
      </div>
      <div className={s.voile} aria-hidden="true" />
      <div className={s.voileHaut} aria-hidden="true" />
      <div className={s.voileGauche} aria-hidden="true" />

      <div className={s.cadre}>
        <span className={`${s.trait} ${s.traitHaut}`} aria-hidden="true" />
        <span className={`${s.trait} ${s.traitBas}`} aria-hidden="true" />
        <span className={`${s.trait} ${s.traitGauche}`} aria-hidden="true" />
        <span className={`${s.trait} ${s.traitDroit}`} aria-hidden="true" />
        <span className={`${s.coin} ${s.coinHG}`} aria-hidden="true" />
        <span className={`${s.coin} ${s.coinHD}`} aria-hidden="true" />
        <span className={`${s.coin} ${s.coinBG}`} aria-hidden="true" />
        <span className={`${s.coin} ${s.coinBD}`} aria-hidden="true" />

        <Link href={DOSSIER} className={s.logo} aria-label="Premier Plongeon, accueil">
          <span className={s.marque}>
            <Symbole />
            <span>PREMIER PLONGEON</span>
          </span>
        </Link>

        <nav className={s.entete} aria-label="Principale">
          <div
            ref={navigation}
            id="pp-navigation"
            className={s.navigation}
            onClick={(e) => {
              if ((e.target as Element).closest("a")) setMenuOuvert(false);
            }}
          >
            <div className={`${s.liens} ${s.libelle}`}>
              <a href="#prix"><Libelle texte="LE PRIX" /></a>
              <a href="#ete"><Libelle texte="L'ÉTÉ" /></a>
              <a href="#chantiers"><Libelle texte="LES CHANTIERS" /></a>
            </div>
            <a className={`${s.pastille} ${s.date} ${s.libelle}`} href="#date">
              <IconeCarres />
              <Libelle texte="MA DATE" />
            </a>
          </div>
          <button
            ref={boutonMenu}
            type="button"
            className={`${s.pastille} ${s.menu} ${s.libelle}`}
            aria-expanded={menuOuvert}
            aria-controls="pp-navigation"
            onClick={() => setMenuOuvert((o) => !o)}
          >
            <IconeCarres />
            <Libelle texte={menuOuvert ? "FERMER" : "MENU"} />
          </button>
        </nav>

        <ul className={s.chapitres} aria-label="Chapitres">
          {CHAPITRES.map((c) => (
            <li key={c.id} className={choisi === c.id ? s.actif : undefined}>
              <button type="button" aria-pressed={choisi === c.id} onClick={() => choisir(c.id)}>
                <Libelle texte={c.libelle} />
              </button>
            </li>
          ))}
        </ul>

        <div className={s.heros}>
          <h1 className={s.titre}>
            <span className={s.ligne}><span className={s.monte}>{chapitre.titre[0]}</span></span>
            <span className={s.ligne}><span className={s.monte}>{chapitre.titre[1]}</span></span>
          </h1>
          <p className={s.chapeau}>
            {chapitre.lignes.map((ligne, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {i > 0 && " "}
                {ligne}
              </span>
            ))}
          </p>
          <a className={`${s.appel} ${s.libelle}`} href="#prix">
            <span className={s.verre} aria-hidden="true" />
            <svg className={s.bord} viewBox="0 0 190 41" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3.5.5 H179.5 L189.5 10.5 V37.5 L186.5 40.5 H10.5 L.5 30.5 V3.5 Z" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className={s.dedans}>
              <svg viewBox="0 0 7 11" aria-hidden="true">
                <rect x="0" y="0" width="4" height="5" />
                <rect x="3" y="4" width="4" height="4" />
                <rect x="0" y="7" width="4" height="4" />
              </svg>
              <Libelle texte="COMBIEN POUR MON JARDIN" />
            </span>
          </a>
        </div>

        <div className={s.socle}>
          <span className={s.filet} aria-hidden="true" />
          <span className={`${s.separation} ${s.separationG}`} aria-hidden="true" />
          <span className={`${s.separation} ${s.separationD}`} aria-hidden="true" />

          <button
            type="button"
            className={`${s.pause} ${s.libelle} ${enPause ? s.enPause : ""}`}
            onClick={() => setPauseVoulue(!enPause)}
          >
            <svg viewBox="0 0 11 11" aria-hidden="true">
              <g className={s.barres}>
                <rect x="1.5" y="0.5" width="2.6" height="10" />
                <rect x="6.9" y="0.5" width="2.6" height="10" />
              </g>
              <path className={s.triangle} d="M2 0.5 L10.5 5.5 L2 10.5 Z" />
            </svg>
            <Libelle texte={enPause ? "LECTURE" : "PAUSE"} />
          </button>

          <a className={`${s.descendre} ${s.libelle}`} href="#prix">
            <svg viewBox="0 0 5 7" aria-hidden="true">
              <path d="M0 0 H5 L2.5 3 Z" />
              <path d="M0 4 H5 L2.5 7 Z" />
            </svg>
            <Libelle texte="DESCENDRE" />
          </a>

          <Link className={`${s.chantier} ${s.libelle}`} href={`${DOSSIER}/chantiers/coque-8x4`}>
            <Libelle texte="VOIR UN CHANTIER" />
            <svg viewBox="0 0 14 11" aria-hidden="true">
              <path d="M1 5.5 H12.5 M8 1 L12.5 5.5 L8 10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

function IconeCarres() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <rect x="0" y="0" width="4" height="4" rx=".8" />
      <rect x="6" y="0" width="4" height="4" rx=".8" />
      <rect x="0" y="6" width="4" height="4" rx=".8" />
      <rect x="6" y="6" width="4" height="4" rx=".8" />
    </svg>
  );
}
