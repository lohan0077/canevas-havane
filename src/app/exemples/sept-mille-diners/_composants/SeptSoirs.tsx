"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./Soirs.module.css";
import { SOIRS } from "./donnees";

const DUREE = 7000; // un soir à l'écran, en millisecondes
const FONDU = 1600; // le fondu enchaîné d'un plan au suivant
const N = SOIRS.length;

/**
 * Le premier écran de Sept Mille Dîners : une semaine de dîners, du lundi au dimanche,
 * chacun dans une autre cuisine. Plein cadre, fondu enchaîné et travelling lent ; la
 * légende dit le jour, l'heure et la cuisine. Le titre et le bouton de la page passent
 * en `children`, posés par-dessus sous un voile qui garantit leur contraste.
 *
 * Commandes : balayage au doigt, flèches (boutons et touches ← →), un jour par bouton,
 * pause au survol et au focus clavier, bouton pause. Le défilement s'arrête aussi hors
 * de l'écran et onglet caché. « Animations réduites » : rien ne part tout seul, le
 * premier soir est là, fixe ; les jours se choisissent à la main, sans fondu.
 * Les photos se chargent à la demande : le soir affiché et le suivant.
 */
export default function SeptSoirs({ children }: { children: React.ReactNode }) {
  const [actif, setActif] = useState(0);
  const [sortant, setSortant] = useState<number | null>(null);
  const [tour, setTour] = useState(0);
  const [lecture, setLecture] = useState<boolean | null>(null); // null : selon « animations réduites »
  const [survol, setSurvol] = useState(false);
  const [focus, setFocus] = useState(false);
  const [aLEcran, setALEcran] = useState(true);
  const [cache, setCache] = useState(false);
  const [reduit, setReduit] = useState(false);
  const [charges, setCharges] = useState<ReadonlySet<number>>(() => new Set([0, 1]));
  const [hauteur, setHauteur] = useState<string | undefined>(undefined);

  const racine = useRef<HTMLElement>(null);
  const actifRef = useRef(0);
  const fondu = useRef<number | undefined>(undefined);
  const toucher = useRef<{ x: number; y: number } | null>(null);
  const horloge = useRef({ cle: "", restant: DUREE });

  const joue = lecture ?? !reduit;
  const enPause = !joue || survol || focus || !aLEcran || cache;

  const aller = useCallback((i: number) => {
    const n = (i + N) % N;
    const avant = actifRef.current;
    if (n === avant) return;
    actifRef.current = n;
    setSortant(avant);
    setActif(n);
    setTour((t) => t + 1);
    setCharges((c) => (c.has(n) && c.has((n + 1) % N) ? c : new Set([...c, n, (n + 1) % N])));
    window.clearTimeout(fondu.current);
    fondu.current = window.setTimeout(() => setSortant(null), FONDU);
  }, []);

  const precharger = (i: number) => setCharges((c) => (c.has(i) ? c : new Set([...c, i])));

  // Le minuteur : il garde le temps restant quand on met en pause, et repart d'où il était.
  useEffect(() => {
    const cle = `${actif}-${tour}`;
    if (horloge.current.cle !== cle) horloge.current = { cle, restant: DUREE };
    if (enPause) return;
    const debut = performance.now();
    const t = window.setTimeout(() => aller(actifRef.current + 1), horloge.current.restant);
    return () => {
      window.clearTimeout(t);
      if (horloge.current.cle === cle) horloge.current.restant = Math.max(0, horloge.current.restant - (performance.now() - debut));
    };
  }, [enPause, actif, tour, aller]);

  // Animations réduites, carrousel à l'écran, onglet visible.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lire = () => setReduit(mq.matches);
    lire();
    mq.addEventListener("change", lire);
    const visibilite = () => setCache(document.hidden);
    document.addEventListener("visibilitychange", visibilite);
    const el = racine.current;
    const obs = el ? new IntersectionObserver(([e]) => setALEcran(e.isIntersecting), { threshold: 0.2 }) : null;
    if (el && obs) obs.observe(el);
    return () => {
      mq.removeEventListener("change", lire);
      document.removeEventListener("visibilitychange", visibilite);
      obs?.disconnect();
      window.clearTimeout(fondu.current);
    };
  }, []);

  // Le premier écran tient dans la fenêtre, bandeau de démonstration compris : sa hauteur
  // est l'écran moins ce qui est au-dessus de lui (mesuré une fois, puis au redimensionnement).
  useEffect(() => {
    const mesurer = () => {
      const el = racine.current;
      if (!el) return;
      const haut = el.getBoundingClientRect().top + window.scrollY;
      setHauteur(`calc(100svh - ${Math.round(haut)}px)`);
    };
    mesurer();
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, []);

  const soir = SOIRS[actif];

  return (
    <section
      ref={racine}
      data-film="ouverture"
      data-pause={enPause ? "" : undefined}
      aria-roledescription="carrousel"
      aria-label="Une semaine de dîners, sept cuisines"
      style={{ height: hauteur, "--duree": `${DUREE}ms`, "--duree-plan": `${DUREE + 2 * FONDU}ms` } as React.CSSProperties}
      className="relative isolate flex h-[calc(100svh-46px)] min-h-[620px] touch-pan-y flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)] sm:h-[calc(100svh-33px)]"
      onPointerEnter={(e) => e.pointerType === "mouse" && setSurvol(true)}
      // Aussi au premier mouvement : un pointeur déjà posé avant l'hydratation n'a pas « entré ».
      onPointerMove={(e) => e.pointerType === "mouse" && !survol && setSurvol(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setSurvol(false)}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") return;
        toucher.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const t = toucher.current;
        toucher.current = null;
        if (!t) return;
        const dx = e.clientX - t.x;
        const dy = e.clientY - t.y;
        if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.3) aller(actifRef.current + (dx < 0 ? 1 : -1));
      }}
      onPointerCancel={() => (toucher.current = null)}
      onFocus={(e) => (e.target as HTMLElement).matches(":focus-visible") && setFocus(true)}
      onBlur={(e) => !racine.current?.contains(e.relatedTarget as Node) && setFocus(false)}
    >
      {/* ---------- Les plans, l'un sur l'autre ---------- */}
      <div className="kit-grain absolute inset-0 -z-10">
        {SOIRS.map((p, i) => {
          const etat = i === actif ? "actif" : i === sortant ? "sortant" : "repos";
          return (
            <div
              key={p.src}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${p.jour}, ${i + 1} sur ${N}`}
              aria-hidden={i !== actif}
              data-etat={etat}
              className={`absolute inset-0 overflow-hidden ${
                etat === "actif"
                  ? "z-20 opacity-100 transition-opacity duration-[1600ms] ease-out motion-reduce:transition-none"
                  : etat === "sortant"
                    ? "z-10 opacity-100"
                    : "z-0 opacity-0"
              }`}
            >
              <div
                className={`absolute -inset-[4%] ${s.plan}`}
                style={{
                  "--de-x": `${p.de[0]}%`, "--de-y": `${p.de[1]}%`, "--de-s": p.de[2],
                  "--a-x": `${p.a[0]}%`, "--a-y": `${p.a[1]}%`, "--a-s": p.a[2],
                  "--pos-mobile": p.mobile, "--pos-bureau": p.bureau,
                } as React.CSSProperties}
              >
                {charges.has(i) && (
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    priority={i === 0}
                    sizes={p.portrait ? "(max-aspect-ratio: 2/3) 72vh, 108vw" : "(max-aspect-ratio: 3/2) 162vh, 108vw"}
                    className="object-cover [filter:saturate(0.86)_contrast(1.05)_brightness(0.96)] [object-position:var(--pos-mobile)] lg:[object-position:var(--pos-bureau)]"
                  />
                )}
              </div>
            </div>
          );
        })}
        {/* Les voiles : en haut pour l'en-tête et la légende, en bas et à gauche pour le
            titre et les commandes. Ils garantissent le contraste du texte quel que soit le
            plan dessous : mesuré pixel par pixel sur les sept soirs, au début et à la fin
            du travelling, le 30/10/2026 (600 mesures, 0 sous le seuil). Changer une photo
            ou un voile, c'est refaire cette mesure. */}
        <div aria-hidden="true" className="absolute inset-0 z-30 bg-[linear-gradient(180deg,rgba(11,11,12,0.8)_0%,rgba(11,11,12,0.55)_13%,rgba(11,11,12,0.12)_24%,rgba(11,11,12,0.1)_34%,rgba(11,11,12,0.55)_41%,rgba(11,11,12,0.82)_48%,rgba(11,11,12,0.92)_60%,rgba(11,11,12,0.97)_100%)] lg:bg-[linear-gradient(180deg,rgba(11,11,12,0.6)_0%,rgba(11,11,12,0.12)_18%,rgba(11,11,12,0)_40%,rgba(11,11,12,0.45)_58%,rgba(11,11,12,0.8)_74%,rgba(11,11,12,0.95)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 z-30 bg-[radial-gradient(120%_22%_at_0%_15%,rgba(11,11,12,0.72)_0%,rgba(11,11,12,0.45)_55%,rgba(11,11,12,0)_100%)] lg:bg-[radial-gradient(40%_35%_at_86%_82%,rgba(11,11,12,0.6)_0%,rgba(11,11,12,0)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 z-30 hidden bg-[linear-gradient(90deg,rgba(11,11,12,0.9)_0%,rgba(11,11,12,0.74)_30%,rgba(11,11,12,0.46)_48%,rgba(11,11,12,0.12)_62%,rgba(11,11,12,0)_74%)] lg:block" />
      </div>

      {/* ---------- Le texte de la page, et la légende du soir ---------- */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-6 pb-6 pt-24 sm:pb-8">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div>{children}</div>
          <div aria-live={enPause ? "polite" : "off"} className="absolute left-6 right-6 top-[5.5rem] lg:static">
            <div key={actif} className={`${s.legende} space-y-1.5 lg:border-l lg:border-[var(--accent)] lg:pl-5`}>
              <p className="font-[family-name:var(--titres)] text-[1.6rem] italic leading-tight text-[var(--accent-texte)] lg:text-[2.1rem]">
                {soir.jour}, {soir.heure}.
              </p>
              <p className="max-w-[17rem] text-[15px] leading-snug lg:text-[17px]">{soir.cuisine}</p>
            </div>
          </div>
        </div>

        {/* ---------- Les commandes ---------- */}
        <div
          className="mt-6 flex items-center gap-2 sm:gap-3 lg:mt-12"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); aller(actifRef.current + 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); aller(actifRef.current - 1); }
          }}
        >
          <BoutonRond libelle="Soir précédent" onClick={() => aller(actifRef.current - 1)}>
            <path d="M14.5 6 8.5 12l6 6" />
          </BoutonRond>
          <ol className="flex min-w-0 flex-1 gap-1 sm:gap-2" aria-label="Les sept soirs">
            {SOIRS.map((p, i) => (
              <li key={p.jour} className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => aller(i)}
                  onPointerEnter={() => precharger(i)}
                  aria-label={`${p.jour}, ${p.heure} : ${p.cuisine}`}
                  aria-current={i === actif ? "true" : undefined}
                  className="group flex min-h-11 w-full flex-col justify-center gap-2 rounded-md px-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <span aria-hidden="true" className="relative block h-[2px] w-full overflow-hidden bg-white/25">
                    {i < actif && <span className="absolute inset-0 bg-[var(--sur-sombre)]" />}
                    {i === actif && <span key={`${actif}-${tour}`} className={`absolute inset-0 bg-[var(--accent)] ${s.remplissage}`} />}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`text-center text-[12px] font-semibold transition-colors sm:text-[13px] ${
                      i === actif ? "text-[var(--sur-sombre)]" : "text-[var(--doux)] group-hover:text-[var(--sur-sombre)]"
                    }`}
                  >
                    <span className="sm:hidden">{p.jour[0]}</span>
                    <span className="hidden sm:inline">{p.jour.slice(0, 3)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <BoutonRond libelle="Soir suivant" onClick={() => aller(actifRef.current + 1)}>
            <path d="M9.5 6l6 6-6 6" />
          </BoutonRond>
          <BoutonRond libelle={joue ? "Mettre le défilement en pause" : "Relancer le défilement"} onClick={() => setLecture(!joue)}>
            {joue ? <path d="M9 6.5v11M15 6.5v11" /> : <path d="M8.5 6.2v11.6L18 12z" fill="currentColor" />}
          </BoutonRond>
        </div>
      </div>
    </section>
  );
}

/** Un bouton rond de 44 px, cerclé d'un filet clair, une icône au trait. */
function BoutonRond({ libelle, onClick, children }: { libelle: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={libelle}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 text-[var(--sur-sombre)] transition-colors hover:border-[var(--accent)] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}
