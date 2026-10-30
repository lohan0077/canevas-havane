"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { APRES } from "./Blocs";
import Maison from "./Maison";
import { DOSSIER, PROJETS, agence } from "./donnees";
import { SEUILS } from "./scene/etapes";

// Le premier écran de Pavillon Bis : « Ta maison, deuxième version. » Les trois
// pavillons des années 70 (plain-pied, sur sous-sol, à étage) tournent sur un plateau ;
// on choisit le sien, on entre, et la bascule avant / après montre ce que l'architecte
// en a fait — puis la page du projet, « ce qu'on a fait de la même ».
//
// La 3D (three.js) n'arrive qu'après le premier affichage, à la demande. En attendant,
// ou si le navigateur ne sait pas faire de 3D, les dessins de la maison la remplacent,
// et tout reste utilisable : flèches, bascule, curseur, lien vers le projet.

const Pavillons3D = dynamic(() => import("./Pavillons3D"), { ssr: false, loading: () => null });

const MODELES = PROJETS.map((p) => p.modele);
const reduit = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Carrousel() {
  const [index, setIndex] = useState(0);
  const [dedans, setDedans] = useState(false);
  const [etats, setEtats] = useState<number[]>(() => MODELES.map(() => 0));
  const [sans3D, setSans3D] = useState(false);
  const [pret, setPret] = useState(false);
  const [annonce, setAnnonce] = useState("");
  const zone = useRef<HTMLDivElement>(null);
  const voile = useRef<HTMLDivElement>(null);
  const boutonEntrer = useRef<HTMLButtonElement>(null);
  const bascule = useRef<HTMLDivElement>(null);
  const lecture = useRef(0);
  const p = PROJETS[index];
  const t = etats[index];
  const seuils = SEUILS[p.modele];

  const regler = useCallback((i: number, v: number) => {
    setEtats((e) => (e[i] === v ? e : e.map((x, k) => (k === i ? v : x))));
  }, []);

  /** La bascule joue la transformation en trois secondes (d'un coup si l'on limite les animations). */
  const jouer = (cible: number) => {
    cancelAnimationFrame(lecture.current);
    const i = index;
    const depart = etats[i];
    if (reduit() || depart === cible) return regler(i, cible);
    const duree = 3200 * Math.abs(cible - depart);
    const t0 = performance.now();
    const pas = (maintenant: number) => {
      const k = Math.min(1, (maintenant - t0) / duree);
      const lisse = k * k * (3 - 2 * k);
      regler(i, depart + (cible - depart) * (0.35 * lisse + 0.65 * k));
      if (k < 1) lecture.current = requestAnimationFrame(pas);
    };
    lecture.current = requestAnimationFrame(pas);
    setAnnonce(cible ? `Après : ${p.apres}` : `Avant, ${p.annee} : ${p.avant}`);
  };
  useEffect(() => () => cancelAnimationFrame(lecture.current), []);

  const aller = useCallback(
    (sens: 1 | -1) => {
      if (dedans) return;
      const i = (index + sens + MODELES.length) % MODELES.length;
      setIndex(i);
      setAnnonce(`Maison ${i + 1} sur ${MODELES.length} : ${PROJETS[i].nom}, ${PROJETS[i].annee}`);
    },
    [dedans, index],
  );
  const choisir = (i: number) => {
    setIndex(i);
    setAnnonce(`Maison ${i + 1} sur ${MODELES.length} : ${PROJETS[i].nom}, ${PROJETS[i].annee}`);
  };
  const entrer = useCallback(() => {
    setDedans(true);
    setAnnonce(`Dans la maison : ${PROJETS[index].avant}. La bascule montre l'après.`);
  }, [index]);
  const sortir = () => {
    cancelAnimationFrame(lecture.current);
    setDedans(false);
    setAnnonce(`Dehors : ${p.nom}, ${p.annee}`);
  };

  // Le focus suit la visite : la bascule en entrant, le bouton « Entrer » en sortant.
  const etaitDedans = useRef(dedans);
  useEffect(() => {
    if (etaitDedans.current === dedans) return;
    etaitDedans.current = dedans;
    if (dedans) bascule.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus({ preventScroll: true });
    else boutonEntrer.current?.focus({ preventScroll: true });
  }, [dedans]);

  const clavier = (e: React.KeyboardEvent) => {
    const cible = e.target as HTMLElement;
    if (dedans && e.key === "Escape") {
      e.preventDefault();
      sortir();
      return;
    }
    if (cible.closest("input, [role=radiogroup]")) return;
    if (!dedans && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      e.preventDefault();
      aller(e.key === "ArrowRight" ? 1 : -1);
    }
  };

  const valeur = Math.round(t * 100);
  const apres = t >= 0.5;
  const faites = seuils.filter((x) => t >= x).length;

  return (
    <section
      data-film="carrousel-3d"
      aria-roledescription="carrousel"
      aria-label="Trois pavillons des années 70"
      onKeyDown={clavier}
      className="relative isolate flex h-[calc(100svh-46px)] [&_:is(a,button,input):focus-visible]:outline-2 [&_:is(a,button,input):focus-visible]:outline-offset-2 [&_:is(a,button,input):focus-visible]:outline-[var(--accent-clair)] min-h-[640px] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)] sm:h-[calc(100svh-33px)] sm:min-h-[680px]"
    >
      {/* La maquette, et le voile qu'on traverse en passant le seuil. */}
      {!sans3D && (
        <div className="absolute inset-0" aria-hidden="true">
          <Pavillons3D
            modeles={MODELES}
            index={index}
            dedans={dedans}
            etats={etats}
            zone={zone}
            voile={voile}
            onIndisponible={() => setSans3D(true)}
            onPret={() => setPret(true)}
            onGlisser={aller}
            onToucher={entrer}
            onRegler={(v) => {
              cancelAnimationFrame(lecture.current);
              regler(index, v);
            }}
          />
        </div>
      )}
      <div ref={voile} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] bg-[var(--sombre)] opacity-0" />
      {/* Les voiles qui gardent les textes lisibles, quoi que montre la maquette. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-[50%] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--sombre)_97%,transparent)_0%,color-mix(in_oklab,var(--sombre)_90%,transparent)_74%,transparent_100%)] lg:h-[40%]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-[6] hidden w-[54%] bg-[linear-gradient(90deg,color-mix(in_oklab,var(--sombre)_95%,transparent)_0%,color-mix(in_oklab,var(--sombre)_92%,transparent)_68%,transparent_100%)] lg:block" />

      <div className="pointer-events-none relative z-10 mx-auto grid h-full w-full max-w-6xl grid-rows-[auto_minmax(0,1fr)_auto] px-4 pb-3 pt-[5.3rem] sm:px-6 sm:pb-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-x-12 lg:pb-12 lg:pt-32">
        {/* ---------- En haut : le titre, ou la maison où l'on est ---------- */}
        <header className="pointer-events-auto lg:col-start-1 lg:row-start-1">
          <div className={dedans ? "hidden" : "space-y-3 lg:space-y-6"}>
            <h1 className="font-[family-name:var(--titres)] text-[clamp(2.3rem,10.4vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.045em] lg:max-w-[11ch] lg:text-[clamp(3.6rem,5.4vw,5.6rem)] lg:leading-[0.95]">
              {agence.signature}
            </h1>
            <p className="max-w-[24rem] text-[14px] leading-snug text-[var(--doux-sombre)] sm:text-[17px] sm:leading-relaxed lg:text-lg">
              Agence d&apos;architecture : on ne fait que les pavillons des années 70. Le tien a déjà une jumelle qu&apos;on a transformée.
            </p>
          </div>
          {dedans && (
            <div className="space-y-2.5 lg:space-y-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <button
                  type="button"
                  onClick={sortir}
                  className="inline-flex min-h-10 items-center rounded-full border border-white/20 bg-[color-mix(in_oklab,var(--sombre)_88%,transparent)] px-4 text-[14px] font-medium transition-colors hover:bg-white/10"
                >
                  Sortir
                </button>
                <p className="text-[14px] text-[var(--doux-sombre)]">
                  {p.nom}, {p.annee} (exemple)
                </p>
              </div>
              <p className="font-[family-name:var(--titres)] text-[clamp(1.45rem,6.4vw,2.1rem)] font-medium leading-[1.04] tracking-[-0.035em] lg:text-[clamp(2.2rem,3.2vw,3rem)]">
                {p.titre}
              </p>
            </div>
          )}
        </header>

        {/* ---------- Au milieu : la place de la maquette (et ses dessins, en attendant) ---------- */}
        <div ref={zone} className="relative min-h-0 lg:col-start-2 lg:row-span-3 lg:row-start-1">
          <div
            aria-hidden={pret && !sans3D ? true : undefined}
            className={`absolute inset-0 grid place-items-center transition-opacity duration-700 ${pret && !sans3D ? "opacity-0" : "opacity-100"}`}
          >
            <figure className="relative w-full max-w-[34rem] px-2">
              <div className="relative overflow-hidden rounded-[1.25rem] bg-[#262b31]">
                <Maison modele={p.modele} decor className="block h-auto w-full" libelle={`Avant, ${p.annee} : ${p.avant}`} />
                <div className="absolute inset-0 bg-[#2c333b]" style={{ clipPath: `inset(0 0 0 ${100 - valeur}%)` }}>
                  <Maison modele={p.modele} apres decor className="block h-auto w-full" libelle={`Après : ${p.apres}`} />
                </div>
              </div>
            </figure>
          </div>
        </div>

        {/* ---------- En bas : choisir sa maison, ou la transformer ---------- */}
        <div className="pointer-events-auto lg:col-start-1 lg:row-start-3">
          <div className="rounded-[1.4rem] border border-white/10 bg-[color-mix(in_oklab,var(--sombre)_94%,transparent)] p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-5">
            {!dedans ? (
              <div className="space-y-3.5 sm:space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-1">
                    <p className="text-[14px] text-[var(--doux-sombre)] sm:text-[15px]">
                      Ta maison ressemble à laquelle&nbsp;?
                    </p>
                    <p className="font-[family-name:var(--titres)] text-[1.6rem] font-medium leading-tight tracking-[-0.03em]">
                      {p.nom}, {p.annee}
                    </p>
                    <p className="text-[14px] leading-snug text-[var(--doux-sombre)]">{p.avant}</p>
                  </div>
                  <p aria-hidden="true" className="shrink-0 pt-0.5 font-[family-name:var(--titres)] text-[13px] font-medium tabular-nums text-[var(--doux-sombre)]">
                    {index + 1} sur {MODELES.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => aller(-1)} aria-label="Maison précédente" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 text-lg transition-colors hover:bg-white/10">
                    <span aria-hidden="true">←</span>
                  </button>
                  <button
                    ref={boutonEntrer}
                    type="button"
                    data-film="entrer"
                    onClick={entrer}
                    className="inline-flex h-12 min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-[var(--accent)] px-4 text-[15px] font-semibold text-[var(--sur-accent)] transition-transform hover:scale-[1.02]"
                  >
                    Entrer dans la maison
                  </button>
                  <button type="button" onClick={() => aller(1)} aria-label="Maison suivante" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 text-lg transition-colors hover:bg-white/10">
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
                <div className="-my-1 flex items-center justify-between gap-3">
                  <div className="flex gap-1">
                    {PROJETS.map((x, i) => (
                      <button
                        key={x.modele}
                        type="button"
                        onClick={() => choisir(i)}
                        aria-label={`Maison ${i + 1} : ${x.nom}, ${x.annee}`}
                        aria-current={i === index ? "true" : undefined}
                        className="grid h-8 min-w-8 place-items-center"
                      >
                        <span aria-hidden="true" className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-7 bg-[var(--sur-sombre)]" : "w-1.5 bg-white/35"}`} />
                      </button>
                    ))}
                  </div>
                  <p className="text-[13px] text-[var(--doux-sombre)]">{sans3D ? "Flèches ou clavier" : "Glisse pour tourner"}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    ref={bascule}
                    role="radiogroup"
                    aria-label="Avant ou après"
                    data-film="avant-apres-bascule"
                    onKeyDown={(e) => {
                      if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(e.key)) {
                        e.preventDefault();
                        const versApres = e.key === "ArrowRight" || e.key === "ArrowDown";
                        jouer(versApres ? 1 : 0);
                        bascule.current?.querySelectorAll<HTMLButtonElement>("[role=radio]")[versApres ? 1 : 0]?.focus();
                      }
                    }}
                    className="grid flex-1 grid-cols-2 rounded-full border border-white/15 p-1"
                  >
                    {[false, true].map((cote) => {
                      const coche = apres === cote;
                      return (
                        <button
                          key={String(cote)}
                          type="button"
                          role="radio"
                          aria-checked={coche}
                          tabIndex={coche ? 0 : -1}
                          onClick={() => jouer(cote ? 1 : 0)}
                          className={`h-11 rounded-full text-[15px] font-semibold transition-colors duration-300 ${coche ? (cote ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "bg-[var(--sur-sombre)] text-[var(--sombre)]") : "text-[var(--sur-sombre)] hover:bg-white/10"}`}
                        >
                          {cote ? "Après" : `Avant, ${p.annee}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <label className="block space-y-2">
                  <span className="sr-only">Avant, après : glisser pour comparer</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={valeur}
                    data-film="avant-apres-curseur"
                    aria-valuetext={valeur === 0 ? `Avant, ${p.annee}` : valeur === 100 ? "Après" : `${valeur} % du chemin vers l'après`}
                    onChange={(e) => {
                      cancelAnimationFrame(lecture.current);
                      regler(index, Number(e.target.value) / 100);
                    }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[var(--accent)] [&::-moz-range-thumb]:bg-[var(--sur-sombre)] [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[var(--accent)] [&::-webkit-slider-thumb]:bg-[var(--sur-sombre)]"
                    style={{ background: `linear-gradient(90deg, var(--accent) ${valeur}%, rgba(255,255,255,0.18) ${valeur}%)` }}
                  />
                  <span aria-hidden="true" className="hidden items-baseline justify-between text-[14px] text-[var(--doux-sombre)] sm:flex">
                    <span>{p.annee}</span>
                    <span className={`${APRES} text-[17px] text-[var(--accent-clair)]`}>deuxième version</span>
                  </span>
                </label>
                {/* Sur téléphone, une seule ligne : l'étape où en est la maison. */}
                <p aria-hidden="true" className="flex min-h-[2.6em] gap-3 text-[14px] leading-snug sm:hidden">
                  <span className="shrink-0 font-[family-name:var(--titres)] font-semibold tabular-nums text-[var(--accent-clair)]">
                    {faites ? `${faites}/${p.detail.length}` : p.annee}
                  </span>
                  <span>{faites ? p.detail[faites - 1] : p.avant}</span>
                </p>
                <ol className="hidden space-y-1.5 sm:block">
                  {p.detail.map((d, i) => {
                    const fait = t >= seuils[i];
                    return (
                      <li key={d} className={`flex gap-3 text-[14px] leading-snug transition-colors duration-500 sm:text-[15px] ${fait ? "text-[var(--sur-sombre)]" : "text-[var(--doux-sombre)]"}`}>
                        <span aria-hidden="true" className={`mt-[0.3em] grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${fait ? "border-[var(--accent-clair)] bg-[var(--accent-clair)]" : "border-white/35"}`} />
                        <span>
                          <span className="sr-only">{fait ? "Fait : " : "À venir : "}</span>
                          {d}
                        </span>
                      </li>
                    );
                  })}
                </ol>
                <Link
                  href={`${DOSSIER}/projets/${p.slug}`}
                  data-film="projet-meme"
                  className="block rounded-2xl bg-white/[0.06] px-4 py-2.5 transition-colors hover:bg-white/10 sm:py-3"
                >
                  <span className="block text-[15px] font-semibold underline decoration-white/30 underline-offset-4">Voir ce qu&apos;on a fait de la même</span>
                  <span className="block text-[13px] text-[var(--doux-sombre)]">{p.budget}, {p.duree} (exemple)</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{annonce}</p>
    </section>
  );
}
