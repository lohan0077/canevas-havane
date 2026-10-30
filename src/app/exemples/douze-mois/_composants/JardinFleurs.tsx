"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ACCENT_SOMBRE, Bouton } from "./Blocs";
import Bouquet, { type TigeChoisie } from "./Bouquet";
import { DOSSIER, MOIS } from "./donnees";
import { ESPECE, couleurDans, deSaison, fleursDuMois, pasAvant, periode, prochainMois, type Espece } from "./fleurs";
import type { Groupe, Pilote } from "./Jardin3D";
import { useMoisCourant } from "./mois";
import PlanJardin from "./PlanJardin";

// Le premier écran de Douze Mois : le jardin des douze mois, où l'on se promène.
// Au survol (au toucher, au clavier) d'une fleur : son nom, le mois où elle fleurit
// en France, ce qu'elle dit dans le langage des fleurs. Un clic l'ajoute à la
// composition — si elle est de saison. Les autres se voient, et disent « pas avant ».
//
// La 3D (three.js) ne se charge qu'ici, à la demande. En attendant, ou sans 3D, le
// plan du jardin la remplace, et la liste des fleurs sous le jardin fait tout ce que
// fait la souris. Rien n'est envoyé : la composition vit dans la page.

const Jardin3D = dynamic(() => import("./Jardin3D"), { ssr: false, loading: () => null });

const MAX_TIGES = 12;

/** Les boutons de marche : un pas, ou un quart de tour. */
const PAS = [
  { libelle: "Tourner à gauche", signe: "↺", avance: 0, tour: -0.4, col: "col-start-1 row-start-2" },
  { libelle: "Avancer", signe: "↑", avance: 1.1, tour: 0, col: "col-start-2 row-start-1" },
  { libelle: "Reculer", signe: "↓", avance: -1.1, tour: 0, col: "col-start-2 row-start-2" },
  { libelle: "Tourner à droite", signe: "↻", avance: 0, tour: 0.4, col: "col-start-3 row-start-2" },
];

const ecouteLarge = (rappel: () => void) => {
  const m = window.matchMedia("(min-width: 1024px)");
  m.addEventListener("change", rappel);
  return () => m.removeEventListener("change", rappel);
};
const estLarge = () => window.matchMedia("(min-width: 1024px)").matches;

type Actif = { g: Groupe; source: "survol" | "toucher" | "liste"; ecran?: { x: number; y: number }; place?: { left: number; top: number } | null };

type Rect = { x: number; y: number; l: number; h: number };
const touche = (a: Rect, b: Rect) => a.x < b.x + b.l && b.x < a.x + a.l && a.y < b.y + b.h && b.y < a.y + a.h;

/**
 * La place de la fiche qui suit la souris (ordinateur) : à droite du pointeur, sinon
 * à sa gauche, au-dessus ou au-dessous — la première qui ne couvre ni la colonne de
 * texte ni la carte de la composition. `null` : aucune, la fiche se range en bas.
 */
function placerFiche(p: { x: number; y: number }, scene: DOMRect, interdits: Rect[]) {
  const l = 304;
  const h = 236;
  const essais = [
    { x: p.x + 28, y: p.y - 110 },
    { x: p.x - 28 - l, y: p.y - 110 },
    { x: p.x - l / 2, y: p.y - h - 28 },
    { x: p.x - l / 2, y: p.y + 32 },
  ];
  for (const e of essais) {
    const r = { x: e.x, y: Math.max(96, Math.min(e.y, scene.height - 112 - h)), l, h };
    if (r.x < 16 || r.x + l > scene.width - 16) continue;
    if (interdits.some((i) => touche(r, i))) continue;
    return { left: r.x, top: r.y };
  }
  return null;
}

/** « 3 asters, 2 dahlias et des graminées » */
function resume(tiges: TigeChoisie[]) {
  const compte = new Map<string, number>();
  tiges.forEach((t) => compte.set(t.espece, (compte.get(t.espece) ?? 0) + 1));
  const parts = [...compte].map(([e, n]) => {
    const f = ESPECE[e as Espece["id"]];
    return n === 1 ? `1 ${f.nom.toLowerCase()}` : `${n} ${f.pluriel}`;
  });
  return parts.length > 1 ? `${parts.slice(0, -1).join(", ")} et ${parts[parts.length - 1]}` : (parts[0] ?? "");
}

/** La fiche d'une fleur : nom, saison, langage des fleurs, et ce qu'on peut en faire. */
function Fiche({ espece, courant, mois, avecBouton, onAjouter, onFermer, plein }: { espece: Espece; courant: number; mois: number; avecBouton: boolean; onAjouter: () => void; onFermer?: () => void; plein: boolean }) {
  const saison = deSaison(espece, courant);
  return (
    <div className="space-y-2.5 rounded-2xl bg-[var(--fond)] p-4 text-[var(--encre)] shadow-[0_24px_60px_-20px_rgba(10,6,24,0.75)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-baseline gap-2.5">
          <span aria-hidden="true" className="h-3 w-3 shrink-0 translate-y-[-2px] rounded-full" style={{ background: couleurDans(espece, mois) }} />
          <span className="font-[family-name:var(--titres)] text-[1.9rem] leading-none">{espece.nom}</span>
        </p>
        {onFermer && (
          <button type="button" onClick={onFermer} className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--doux)] hover:bg-[var(--trait)]" aria-label="Fermer la fiche">
            <span aria-hidden="true">×</span>
          </button>
        )}
      </div>
      <p className="text-[14px] leading-snug text-[var(--doux)]">Fleurit en France {periode(espece)}</p>
      <p className="text-[15px] leading-snug">
        {espece.signification ? (
          <>
            Dans le langage des fleurs&nbsp;: <span className="font-[family-name:var(--titres)] text-[1.2rem] italic">{espece.signification}.</span>
          </>
        ) : (
          "Le langage des fleurs ne leur donne pas de sens : elles portent le bouquet."
        )}
      </p>
      {saison ? (
        avecBouton ? (
          <button type="button" onClick={onAjouter} disabled={plein} className="mt-1 inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-full bg-[var(--accent)] px-5 text-[15px] font-semibold text-[var(--sur-accent)] transition-transform active:scale-[0.98] disabled:opacity-60">
            {plein ? "Le bouquet est complet" : "Ajouter à la composition"}
            <span aria-hidden="true">+</span>
          </button>
        ) : (
          <p className="text-[14px] font-semibold text-[var(--encre)]">De saison&nbsp;: clique pour l&apos;ajouter.</p>
        )
      ) : (
        <p className="text-[15px] font-semibold text-[var(--accent-texte)]">
          {pasAvant(espece, courant).replace(/^p/, "P")}. <span className="font-normal text-[var(--doux)]">Ce mois-ci, on ne la vend pas.</span>
        </p>
      )}
    </div>
  );
}

export default function JardinFleurs() {
  const courant = useMoisCourant();
  const large = useSyncExternalStore(ecouteLarge, estLarge, () => false);
  const [tiges, setTiges] = useState<TigeChoisie[]>([]);
  const [actif, setActif] = useState<Actif | null>(null);
  const [viser, setViser] = useState<(Groupe & { n: number }) | null>(null);
  const [sans3D, setSans3D] = useState(false);
  const [pret, setPret] = useState(false);
  const [touche, setTouche] = useState(false);
  const [annonce, setAnnonce] = useState("");
  const pilote = useRef<Pilote | null>(null);
  const compteur = useRef(0);
  // L'état courant, lu par les gestes du jardin (qui arrivent hors du rendu).
  const memoire = useRef({ tiges, actif });
  useEffect(() => {
    memoire.current = { tiges, actif };
  });

  const mois = MOIS[courant - 1];
  const duMois = fleursDuMois(courant);

  // La liste des fleurs, dans l'ordre où elles reviennent : celles du mois d'abord.
  const liste = useMemo(() => {
    const vues = new Set<string>();
    const sortie: { espece: Espece; mois: number }[] = [];
    for (let k = 0; k < 12; k++) {
      const n = ((courant - 1 + k) % 12) + 1;
      for (const e of fleursDuMois(n)) {
        if (vues.has(e.id)) continue;
        vues.add(e.id);
        sortie.push({ espece: e, mois: n });
      }
    }
    return sortie;
  }, [courant]);

  const ajouter = useCallback(
    (g: Groupe) => {
      const e = ESPECE[g.espece];
      if (!deSaison(e, courant)) {
        setAnnonce(`${e.nom} : ${pasAvant(e, courant)}.`);
        return;
      }
      const avant = memoire.current.tiges;
      if (avant.length >= MAX_TIGES) {
        setAnnonce("Le bouquet est complet : retire une tige pour en changer.");
        return;
      }
      compteur.current += 1;
      const couleur = couleurDans(e, g.mois, avant.filter((t) => t.espece === e.id).length);
      const suite = [...avant, { cle: `t${compteur.current}`, espece: e.id, couleur }];
      memoire.current.tiges = suite;
      setTiges(suite);
      setAnnonce(`Ajouté au bouquet : ${e.nom.toLowerCase()}. ${suite.length} tige${suite.length > 1 ? "s" : ""}.`);
    },
    [courant],
  );

  // La fiche flottante ne couvre ni le texte ni la composition : on les mesure au survol.
  const section = useRef<HTMLElement>(null);
  const texte = useRef<HTMLDivElement>(null);
  const carte = useRef<HTMLDivElement>(null);
  const placer = useCallback((ecran?: { x: number; y: number }) => {
    const s = section.current?.getBoundingClientRect();
    if (!ecran || !s || !estLarge()) return null;
    const relatif = (el: HTMLElement | null): Rect | null => {
      const r = el?.getBoundingClientRect();
      return r && r.width ? { x: r.left - s.left - 12, y: r.top - s.top - 12, l: r.width + 24, h: r.height + 24 } : null;
    };
    return placerFiche(ecran, s, [relatif(texte.current), relatif(carte.current)].filter((r): r is Rect => Boolean(r)));
  }, []);
  const surSurvol = useCallback(
    (g: Groupe | null, ecran?: { x: number; y: number }) => {
      setActif((a) => {
        if (!g) return a?.source === "survol" ? null : a;
        return { g, source: "survol", ecran, place: placer(ecran) };
      });
    },
    [placer],
  );
  const surToucher = useCallback(
    (g: Groupe, ecran: { x: number; y: number }) => {
      setTouche(true);
      // un second toucher sur la même fleur l'ajoute
      const a = memoire.current.actif;
      if (a && a.g.espece === g.espece && a.g.mois === g.mois && a.source === "toucher") ajouter(g);
      setActif({ g, source: "toucher", ecran });
    },
    [ajouter],
  );
  const surChoix = useCallback(
    (g: Groupe, ecran: { x: number; y: number }) => {
      setTouche(true);
      ajouter(g);
      setActif({ g, source: "survol", ecran, place: placer(ecran) });
    },
    [ajouter, placer],
  );
  const surPret = useCallback(() => setPret(true), []);
  const surGeste = useCallback(() => setTouche(true), []);
  const indisponible = useCallback(() => setSans3D(true), []);

  const regarder = (g: Groupe) => {
    setActif({ g, source: "liste" });
    setViser((v) => ({ ...g, n: (v?.n ?? 0) + 1 }));
  };

  const marcher = (avance: number, tour: number) => {
    setTouche(true);
    if (avance) pilote.current?.avancer(avance);
    if (tour) pilote.current?.tourner(tour);
  };

  const retirer = (cle: string) => setTiges((t) => t.filter((x) => x.cle !== cle));
  const especeActive = actif ? ESPECE[actif.g.espece] : null;
  const plein = tiges.length >= MAX_TIGES;

  // La fiche : près de la fleur sur ordinateur (au-dessus d'elle, sans sortir du
  // jardin), en bas de l'écran sur téléphone.
  const ficheFlottante = large && actif?.source === "survol" && actif.place ? actif.place : null;

  return (
    <section ref={section} aria-labelledby="titre-accueil" className="relative isolate h-[calc(100svh-2.9rem)] min-h-[640px] overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)] sm:h-[calc(100svh-2rem)] lg:min-h-[720px]">
      {/* ---------- La scène : le plan tout de suite, la 3D par-dessus quand elle est prête ---------- */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_68%_32%,#5b4596_0%,#2b2056_45%,var(--sombre)_80%)]">
        <div className={`absolute inset-0 grid place-items-center transition-opacity duration-700 lg:pl-[38%] ${pret && !sans3D ? "opacity-0" : "opacity-100"}`}>
          <PlanJardin courant={courant} actif={actif?.g ?? null} className="mt-[6svh] h-[min(92vw,58svh)] w-[min(92vw,58svh)] lg:mt-0 lg:h-[min(74svh,46vw)] lg:w-[min(74svh,46vw)]" />
        </div>
        {!sans3D && (
          <div className={`absolute inset-0 transition-opacity duration-700 ${pret ? "opacity-100" : "opacity-0"}`}>
            <Jardin3D
              moisCourant={courant}
              actif={actif?.g ?? null}
              viser={viser}
              decalage={large ? 0.1 : 0}
              pilote={pilote}
              surSurvol={surSurvol}
              surChoix={surChoix}
              surToucher={surToucher}
              surPret={surPret}
              surGeste={surGeste}
              onIndisponible={indisponible}
            />
          </div>
        )}
      </div>

      {/* ---------- Les voiles : le texte ne se pose jamais sur la 3D nue ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[330px] bg-[linear-gradient(180deg,var(--sombre)_0%,var(--sombre)_74%,transparent_100%)] lg:hidden" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-[max(44%,calc((100vw-72rem)/2+33rem))] bg-[var(--sombre)] lg:block" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[max(44%,calc((100vw-72rem)/2+33rem))] hidden w-[22rem] bg-[linear-gradient(90deg,var(--sombre)_0%,transparent_100%)] lg:block" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] bg-[linear-gradient(0deg,var(--sombre)_0%,var(--sombre)_55%,transparent_100%)] lg:h-[150px]" />

      {/* ---------- Le nom, l'heure limite ---------- */}
      <div className="pointer-events-none relative z-10 mx-auto max-w-6xl px-5 pt-[84px] sm:px-6 lg:pt-[max(8rem,16svh)]">
        <div ref={texte} className="max-w-[30rem] space-y-3 lg:max-w-[31rem] lg:space-y-6">
          <p className="hidden text-[15px] font-medium text-[var(--sur-sombre)] lg:block">Fleurs de saison, rien d&apos;autre.</p>
          {/* Le nom de la boutique, composé comme son logo : « Mois » en italique. */}
          <h1 className="whitespace-nowrap text-[clamp(3.9rem,17vw,7rem)] font-normal leading-[0.86] tracking-[-0.02em]">
            Douze <span className={ACCENT_SOMBRE}>Mois</span>
          </h1>
          <p
            id="heure"
            className="max-w-[22rem] scroll-mt-24 font-[family-name:var(--titres)] text-[clamp(1.55rem,2.6vw,2.4rem)] font-normal leading-[1.05] [font-variant-numeric:lining-nums] lg:max-w-[28rem]"
          >
            {/* Sur ordinateur, l'heure limite et la promesse, une ligne chacune. */}
            Commandé avant 14&nbsp;h, <br className="hidden lg:inline" />
            livré aujourd&apos;hui.
          </p>
          <div className="hidden space-y-7 pt-2 lg:block">
            <p className="max-w-[26rem] text-lg leading-relaxed">
              Promène-toi dans le jardin : chaque massif est un mois. Ce qui fleurit en France en {mois.nom.toLowerCase()} se cueille ; le reste attend son tour.
            </p>
            <div className="pointer-events-auto flex flex-wrap gap-3">
              <Bouton href={`${DOSSIER}#choix`}>Commander un bouquet</Bouton>
              <Bouton href={`${DOSSIER}#calendrier`} variante="contour">Feuilleter le calendrier</Bouton>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Ce qu'on peut faire, dit une fois ---------- */}
      {/* Sur ordinateur, la consigne flotte en haut du jardin ; sur téléphone, elle est
          dans la barre de la composition, pour ne rien poser sur les fleurs. */}
      {!touche && !actif && large && (
        <p className="pointer-events-none absolute right-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] top-[max(7.5rem,15svh)] z-10 whitespace-nowrap rounded-full bg-[#251C45] px-4 py-2 text-[13px] font-medium text-[var(--sur-sombre)] shadow-lg">
          {sans3D ? "Choisis une fleur dans la liste" : "Glisse pour marcher, clique sur une fleur du mois"}
        </p>
      )}

      {/* ---------- La fiche de la fleur ---------- */}
      {especeActive && actif && (
        <div
          className={ficheFlottante ? "pointer-events-none absolute z-20 w-[19rem]" : "absolute inset-x-3 bottom-[60px] z-20 sm:left-auto sm:right-6 sm:w-[22rem] lg:bottom-[6.75rem] lg:right-[calc(max(1.5rem,(100vw-72rem)/2+1.5rem)+18.5rem)]"}
          style={ficheFlottante ?? undefined}
        >
          <Fiche
            espece={especeActive}
            courant={courant}
            mois={actif.g.mois}
            plein={plein}
            avecBouton={actif.source !== "survol"}
            onAjouter={() => {
              ajouter(actif.g);
              // sur téléphone, la fiche se range : la barre du bouquet, dessous, montre la tige arriver
              if (!large) setActif(null);
            }}
            onFermer={actif.source === "survol" ? undefined : () => setActif(null)}
          />
        </div>
      )}

      {/* ---------- Le bas : la composition, la marche, la liste des fleurs ---------- */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto max-w-6xl px-3 pb-3 sm:px-6 lg:pb-5">
          {/* La composition, en barre sur téléphone */}
          <div className="mb-2.5 flex items-center gap-3 rounded-2xl bg-[#251C45] p-2 pr-3 lg:hidden" data-film="composition">
            <Bouquet tiges={tiges} className="h-[74px] w-[60px] shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium text-[#C9BDEA]">Ta composition</p>
              {tiges.length ? (
                <p className="truncate text-[15px] leading-snug">{resume(tiges)}</p>
              ) : (
                <p className="text-[14px] leading-snug">
                  {sans3D ? "Choisis" : "Glisse pour regarder, touche"} {duMois.map((f) => f.nom.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " ou $1")}.
                </p>
              )}
            </div>
            {tiges.length > 0 && (
              <>
                <button type="button" onClick={() => setTiges((t) => t.slice(0, -1))} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 text-[18px]" aria-label="Retirer la dernière tige">
                  <span aria-hidden="true">↶</span>
                </button>
                <Link href={`${DOSSIER}#choix`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[18px] font-semibold text-[var(--sur-accent)]" aria-label="Choisir le message">
                  <span aria-hidden="true">→</span>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-end gap-3">
            {/* La marche au clavier ou au bouton (ordinateur) */}
            {!sans3D && (
              <div role="group" aria-label="Marcher dans le jardin" className="hidden shrink-0 grid-cols-3 gap-1 lg:grid">
                {PAS.map((b) => (
                  <button key={b.libelle} type="button" aria-label={b.libelle} onClick={() => marcher(b.avance, b.tour)} className={`${b.col} grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#251C45] text-[15px] hover:border-[var(--accent)]`}>
                    <span aria-hidden="true">{b.signe}</span>
                  </button>
                ))}
              </div>
            )}

            {/* La liste des fleurs : la même chose que le jardin, au doigt et au clavier */}
            <div className="min-w-0 flex-1">
              <p id="liste-fleurs" className="mb-2 hidden text-[15px] font-medium text-[#C9BDEA] lg:block">
                Les fleurs du jardin, de saison en {mois.nom.toLowerCase()}
              </p>
              <ul aria-label="Les fleurs du jardin" className="-mx-3 flex snap-x gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0 lg:[mask-image:linear-gradient(90deg,#000_88%,transparent)]">
                {liste.map(({ espece, mois: m }) => {
                  const saison = deSaison(espece, courant);
                  const choisi = actif?.g.espece === espece.id;
                  return (
                    <li key={espece.id} className="snap-start">
                      <button
                        type="button"
                        data-fleur={espece.id}
                        data-de-saison={saison ? "oui" : "non"}
                        aria-label={`${espece.nom}, fleurit ${periode(espece)} : ${saison ? "de saison, ajouter à la composition" : pasAvant(espece, courant)}`}
                        onFocus={() => regarder({ espece: espece.id, mois: m })}
                        onClick={() => {
                          setTouche(true);
                          regarder({ espece: espece.id, mois: m });
                          if (saison) ajouter({ espece: espece.id, mois: m });
                        }}
                        className={`flex h-10 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 text-[14px] transition-colors ${
                          saison ? "border-[var(--accent)] bg-[#251C45] font-semibold text-[var(--sur-sombre)]" : "border-white/15 bg-[#251C45] text-[#C9BDEA]"
                        } ${choisi ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--sombre)]" : ""}`}
                      >
                        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: couleurDans(espece, m) }} />
                        {espece.nom}
                        <span aria-hidden="true" className={saison ? "text-[var(--accent)]" : ""}>{saison ? "+" : `en ${MOIS[prochainMois(espece, courant) - 1].court.toLowerCase()}`}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- La composition, en carte sur ordinateur ---------- */}
      <div ref={carte} className="absolute bottom-[6.75rem] right-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] z-10 hidden w-[17.5rem] rounded-3xl border border-white/10 bg-[#221A3D] p-5 lg:block" data-film="composition-carte">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[15px] font-medium text-[#C9BDEA]">Ta composition</p>
          <p className="font-[family-name:var(--titres)] text-lg italic">{mois.nom}</p>
        </div>
        <Bouquet tiges={tiges} className={`mx-auto -mb-1 mt-1 w-[176px] transition-[height] duration-500 ${tiges.length ? "h-[220px]" : "h-[120px]"}`} />
        {tiges.length ? (
          <>
            <ul className="mt-1 flex flex-wrap gap-1.5" aria-label="Les tiges du bouquet">
              {tiges.map((t) => (
                <li key={t.cle}>
                  <button type="button" onClick={() => retirer(t.cle)} className="flex h-8 items-center gap-1.5 rounded-full border border-white/15 px-2.5 text-[13px] hover:border-white/50" aria-label={`Retirer ${ESPECE[t.espece].nom.toLowerCase()}`}>
                    <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: t.couleur }} />
                    {ESPECE[t.espece].nom}
                    <span aria-hidden="true" className="text-[#C9BDEA]">×</span>
                  </button>
                </li>
              ))}
            </ul>
            <Link href={`${DOSSIER}#choix`} className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 text-[14px] font-semibold text-[var(--sur-accent)]">
              Choisir le message
            </Link>
            <button type="button" onClick={() => setTiges([])} className="mt-2.5 w-full text-center text-[13px] text-[#C9BDEA] underline underline-offset-4">Tout défaire</button>
          </>
        ) : (
          <p className="mt-1 text-[14px] leading-relaxed text-[#C9BDEA]">
            {sans3D ? "Choisis" : "Clique sur"} {duMois.map((f) => f.pluriel).join(", ").replace(/, ([^,]*)$/, " ou $1")} : ce qui fleurit en {mois.nom.toLowerCase()}. Rien n&apos;est envoyé.
          </p>
        )}
      </div>

      <p aria-live="polite" className="sr-only">{annonce}</p>
    </section>
  );
}
