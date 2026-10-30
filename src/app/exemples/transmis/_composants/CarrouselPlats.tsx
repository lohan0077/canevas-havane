"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { PLATS_CARROUSEL } from "./donnees";
import s from "./Carrousel.module.css";

/** Le temps passé sur chaque plat, en lecture automatique. Lent : on a le temps d'avoir faim. */
const DUREE = 7000;

const BOUTON_ROND =
  "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10 lg:h-11 lg:w-11";

// « Animations réduites » : lu dans le navigateur, faux côté serveur.
const MOUVEMENT_REDUIT = "(prefers-reduced-motion: reduce)";
const abonner = (rappel: () => void) => {
  const m = window.matchMedia(MOUVEMENT_REDUIT);
  m.addEventListener("change", rappel);
  return () => m.removeEventListener("change", rappel);
};
const mouvementReduit = () => window.matchMedia(MOUVEMENT_REDUIT).matches;

/**
 * Le premier écran de Transmis : les plats de famille du site, en grand, l'un après
 * l'autre. Chaque plat s'ouvre comme un rideau et respire ; il reste sept secondes,
 * puis le suivant. Flèches, onglets, balayage au doigt, flèches du clavier ; pause au
 * survol de la photo, au clavier dans le carrousel, quand l'écran n'est plus visible, et
 * par le bouton. Avec « animations réduites », rien ne défile tout seul.
 *
 * Le titre et les actions (combien d'invités, envoyer sa recette) sont rendus par la
 * page et posés par-dessus : ils ne changent pas avec le plat. Un clic sur la photo, ou
 * sur le nom du plat, mène à la page qui en parle. Les photos sont toutes servies d'ici.
 */
export default function CarrouselPlats({ titre, invites, appel }: { titre: React.ReactNode; invites: React.ReactNode; appel: React.ReactNode }) {
  const plats = PLATS_CARROUSEL;
  const total = plats.length;
  const routeur = useRouter();
  const reduit = useSyncExternalStore(abonner, mouvementReduit, () => false);

  const [actif, setActif] = useState(0);
  const [sortant, setSortant] = useState<number | null>(null);
  const [sens, setSens] = useState<"suivant" | "precedent">("suivant");
  const [lecture, setLecture] = useState(true);
  const [survol, setSurvol] = useState(false);
  const [focusClavier, setFocusClavier] = useState(false);
  const [visible, setVisible] = useState(true);
  const section = useRef<HTMLElement>(null);
  const geste = useRef<{ x: number; y: number; glisse: boolean } | null>(null);

  // Changer de plat : l'ancien reste dessous le temps du rideau, le sens suit le geste.
  const aller = (cible: number, vers?: "suivant" | "precedent") => {
    const n = ((cible % total) + total) % total;
    if (n === actif) return;
    setSortant(actif);
    setSens(vers ?? (n > actif ? "suivant" : "precedent"));
    setActif(n);
  };
  const suivant = () => aller(actif + 1, "suivant");
  const precedent = () => aller(actif - 1, "precedent");

  // Le carrousel s'arrête quand on ne le voit plus : défiler plus bas, changer d'onglet.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && e.intersectionRatio > 0.35), { threshold: [0, 0.35, 0.6] });
    obs.observe(el);
    const onglet = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onglet);
    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onglet);
    };
  }, []);

  const automatique = !reduit && lecture;
  const enLecture = automatique && !survol && !focusClavier && visible;
  const plat = plats[actif];

  return (
    <section
      ref={section}
      aria-roledescription="carrousel"
      aria-label="Les plats de famille de Transmis"
      data-lecture={enLecture ? "oui" : "non"}
      className="relative isolate flex min-h-[calc(100svh-2.875rem)] touch-pan-y flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)] sm:min-h-[calc(100svh-2.125rem)]"
      style={{ "--duree": `${DUREE}ms` } as React.CSSProperties}
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).closest("input, textarea")) return;
        if (e.key === "ArrowRight") { e.preventDefault(); suivant(); }
        if (e.key === "ArrowLeft") { e.preventDefault(); precedent(); }
      }}
      onFocus={(e) => setFocusClavier((e.target as HTMLElement).matches(":focus-visible"))}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusClavier(false); }}
      // Le balayage : au doigt surtout, à la souris aussi. Horizontal, au moins 48 px.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest("a, button, input")) return;
        geste.current = { x: e.clientX, y: e.clientY, glisse: false };
      }}
      onPointerMove={(e) => {
        const g = geste.current;
        if (g && Math.abs(e.clientX - g.x) > 10) g.glisse = true;
      }}
      onPointerUp={(e) => {
        const g = geste.current;
        if (!g) return;
        const dx = e.clientX - g.x;
        const dy = e.clientY - g.y;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) (dx < 0 ? suivant : precedent)();
        // Le clic qui suit un glissé ne doit pas ouvrir la page du plat.
        window.setTimeout(() => { geste.current = null; }, 0);
      }}
      onPointerCancel={() => { geste.current = null; }}
    >
      {/* ---------- Les photos : plein cadre sur téléphone, la moitié droite sur ordinateur ---------- */}
      <div
        className="kit-grain absolute inset-x-0 top-0 h-[72%] cursor-pointer after:z-[4] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[58%]"
        onPointerEnter={(e) => e.pointerType === "mouse" && setSurvol(true)}
        onPointerLeave={() => setSurvol(false)}
        onClick={() => { if (!geste.current?.glisse) routeur.push(plat.lien); }}
      >
        {plats.map((p, i) => {
          const etat = i === actif ? "actif" : i === sortant ? "sortant" : "cache";
          return (
            <div key={p.id} className={s.diapo} data-etat={etat} data-sens={sens} aria-hidden={i !== actif}>
              <div className={s.cadre} style={{ "--monte-tel": p.monteTel, "--monte-ordi": p.monteOrdi } as React.CSSProperties}>
                <Image
                  src={p.photo.src}
                  alt={p.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  preload={i === 0}
                  loading="eager"
                  fetchPriority={i === 0 ? "high" : "low"}
                  className={`${s.photo} object-cover`}
                  style={{ "--tel": p.tel, "--ordi": p.ordi } as React.CSSProperties}
                />
              </div>
            </div>
          );
        })}
        {/* Les voiles. Sur téléphone, le titre et le bas de l'écran portent chacun le leur
            (plus bas) : ici, seulement un léger fondu. Sur ordinateur, la photo se fond à
            gauche dans l'aubergine, et s'assombrit en bas sous la légende. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(31,16,25,0.5)_0%,rgba(31,16,25,0)_30%,rgba(31,16,25,0)_70%,rgba(31,16,25,1)_100%)] lg:bg-[linear-gradient(90deg,rgba(31,16,25,1)_0%,rgba(31,16,25,0.72)_22%,rgba(31,16,25,0.1)_55%,rgba(31,16,25,0)_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] hidden bg-[linear-gradient(0deg,rgba(31,16,25,0.97)_0%,rgba(31,16,25,0.9)_36%,rgba(31,16,25,0.55)_52%,rgba(31,16,25,0)_68%),linear-gradient(180deg,rgba(31,16,25,0.55)_0%,rgba(31,16,25,0)_22%)] lg:block" />
      </div>

      {/* ---------- Par-dessus : le titre, la légende du plat, les actions, les commandes ----------
          Une seule grille (Carrousel.module.css, .scene) : sur téléphone, les traits de
          progression coiffent la légende et les flèches se rangent à côté du bouton ; sur
          ordinateur, titre et actions à gauche, légende et onglets nommés sur la photo. */}
      <div className={`${s.scene} pointer-events-none relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 pb-4 pt-[5.75rem] sm:px-6 lg:pb-9 lg:pt-32`}>
        {/* Sur téléphone, le titre et le bas de l'écran ont chacun leur fond : quelle que
            soit la photo dessous (une crème, une tarte claire), ils restent lisibles. */}
        <div aria-hidden="true" className={`${s.fondHaut} -mx-5 -mt-[5.75rem] sm:-mx-6 lg:hidden`} />
        <div aria-hidden="true" className={`${s.fondBas} -mx-5 -mb-4 sm:-mx-6 lg:hidden`} />

        <div className={`${s.titre} pointer-events-auto`}>{titre}</div>

        {/* Les onglets : un trait par plat qui se remplit, son nom sur ordinateur. */}
        <ol className={`${s.onglets} pointer-events-auto flex gap-1.5 lg:gap-3`} aria-label="Choisir un plat" onPointerEnter={(e) => e.pointerType === "mouse" && setSurvol(true)}
          onPointerLeave={() => setSurvol(false)}>
          {plats.map((p, i) => (
            <li key={p.id} className="flex-1">
              <button
                type="button"
                className={`${s.onglet} group flex w-full flex-col gap-2 py-2.5 text-left lg:py-2`}
                data-actif={i === actif ? "" : undefined}
                aria-current={i === actif ? "true" : undefined}
                aria-label={`Plat ${i + 1} sur ${total} : ${p.nom}`}
                onClick={() => aller(i)}
              >
                <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-white/25">
                  <span
                    className={`${s.jauge} absolute inset-0 rounded-full bg-[#E7A574]`}
                    data-rempli={i < actif || (i === actif && !automatique) ? "" : undefined}
                    onAnimationEnd={(e) => { if (e.target === e.currentTarget && i === actif && automatique) suivant(); }}
                  />
                </span>
                <span aria-hidden="true" className={`hidden whitespace-nowrap text-[13px] leading-tight transition-colors lg:block ${i === actif ? "text-[#E7A574]" : "text-[var(--sur-sombre)]"}`}>
                  {p.court}
                </span>
              </button>
            </li>
          ))}
        </ol>

        {/* La légende du plat en cours : annoncée quand le carrousel ne tourne pas tout seul. */}
        <div className={`${s.legende} pointer-events-auto`} aria-live={enLecture ? "off" : "polite"} aria-atomic="true" onPointerEnter={(e) => e.pointerType === "mouse" && setSurvol(true)}
          onPointerLeave={() => setSurvol(false)}>
          <div key={plat.id} className="space-y-2 lg:space-y-2.5">
            <p className={`${s.ligne} text-[14px] text-[#E7A574] lg:text-[15px]`} style={{ "--i": 0 } as React.CSSProperties}>
              <span className="sr-only">Plat {actif + 1} sur {total}, </span>
              {plat.carte}
            </p>
            <p className={`${s.ligne} font-[family-name:var(--titres)] text-[clamp(1.75rem,7.2vw,2.9rem)] italic leading-[1.04] text-balance`} style={{ "--i": 1 } as React.CSSProperties}>
              {/* Souligné d'emblée sur téléphone, où la ligne « Voir ce mariage » est masquée :
                  c'est lui qui dit que le nom s'ouvre. */}
              <Link href={plat.lien} className="underline decoration-[#E7A574] decoration-1 underline-offset-[6px] sm:no-underline sm:hover:underline">
                {plat.nom}
              </Link>
            </p>
            <p className={`${s.ligne} max-w-md text-[15px] leading-snug text-[var(--sur-sombre)] [@media(max-height:700px)]:hidden lg:text-[17px] lg:leading-relaxed`} style={{ "--i": 2 } as React.CSSProperties}>
              {plat.legende}{" "}
              <Link href={plat.lien} className="hidden whitespace-nowrap font-medium underline decoration-[#E7A574] underline-offset-4 sm:inline">
                {plat.libelleLien}
              </Link>
            </p>
          </div>
        </div>

        <div className={`${s.invites} pointer-events-auto`}>{invites}</div>
        <div className={`${s.appel} pointer-events-auto`}>{appel}</div>

        {/* Les flèches et la pause. */}
        <div className={`${s.commandes} pointer-events-auto flex items-center gap-1.5`} onPointerEnter={(e) => e.pointerType === "mouse" && setSurvol(true)}
          onPointerLeave={() => setSurvol(false)}>
          <button type="button" onClick={precedent} aria-label="Plat précédent" className={BOUTON_ROND}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={suivant} aria-label="Plat suivant" className={BOUTON_ROND}>
            <span aria-hidden="true">→</span>
          </button>
          {!reduit && (
            <button type="button" onClick={() => setLecture((l) => !l)} aria-label={lecture ? "Mettre le défilement en pause" : "Reprendre le défilement"} className={BOUTON_ROND}>
              {lecture ? (
                <svg aria-hidden="true" width="12" height="14" viewBox="0 0 12 14" fill="currentColor"><rect x="1" width="3.2" height="14" rx="1" /><rect x="7.8" width="3.2" height="14" rx="1" /></svg>
              ) : (
                <svg aria-hidden="true" width="12" height="14" viewBox="0 0 12 14" fill="currentColor"><path d="M1.5 1.2v11.6a.8.8 0 0 0 1.2.7l9-5.8a.8.8 0 0 0 0-1.4l-9-5.8a.8.8 0 0 0-1.2.7Z" /></svg>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
