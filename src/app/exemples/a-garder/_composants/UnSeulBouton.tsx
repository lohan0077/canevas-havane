"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Facade, { type StyleEnseigne } from "./Facade";
import Comparaison from "./Comparaison";
import { DOSSIER } from "./donnees";
import styles from "./Facade.module.css";

type Etape = "photo" | "enseigne" | "montage";

const STYLES: { id: StyleEnseigne; libelle: string }[] = [
  { id: "dorees", libelle: "Lettres dorées" },
  { id: "caisson", libelle: "Caisson lumineux" },
  { id: "blanches", libelle: "Lettres blanches" },
];

// L'enseigne posée sur la photo du visiteur : un bandeau, à la hauteur qu'il choisit.
const BANDE: Record<StyleEnseigne, string> = {
  dorees: "bg-[#1F3B2D] text-[#E9C46A]",
  caisson: "bg-[#F7F2E6] text-[#1B2433] ring-4 ring-[#2A2F3A]",
  blanches: "bg-[#2C3A33] text-[#FFFFFF]",
};

function SurLaPhoto({ photo, nom, style, hauteur }: { photo: string; nom: string; style: StyleEnseigne; hauteur: number }) {
  return (
    <div className="relative">
      <Image src={photo} alt="" width={1200} height={900} unoptimized className="block h-auto w-full" />
      <div
        className={`absolute inset-x-[7%] grid place-items-center rounded-[4px] px-2 py-[2.4%] text-center font-[family-name:var(--titres)] font-bold uppercase tracking-[0.12em] leading-none shadow-[0_8px_24px_rgba(0,0,0,.35)] text-[clamp(14px,5.4vw,30px)] ${BANDE[style]}`}
        style={{ top: `${hauteur}%` }}
      >
        {nom || "Ton enseigne"}
      </div>
    </div>
  );
}

/**
 * Le seul bouton de l'accueil : « Envoyer ma photo ». Il ouvre une feuille qui monte
 * du bas de l'écran — la photo de la façade (ou une façade d'exemple), le nom et le
 * style de l'enseigne, puis le montage avant / après. Tout reste dans le navigateur :
 * la photo est lue sur place, jamais envoyée, et la feuille le dit.
 */
export default function UnSeulBouton() {
  const [ouvert, setOuvert] = useState(false);
  const [etape, setEtape] = useState<Etape>("photo");
  const [photo, setPhoto] = useState<string | null>(null);
  const [nom, setNom] = useState("Boulangerie");
  const [style, setStyle] = useState<StyleEnseigne>("dorees");
  const [hauteur, setHauteur] = useState(28);
  const [nuit, setNuit] = useState(false);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    if (!ouvert) return;
    const racine = document.documentElement;
    const avant = racine.style.overflow;
    racine.style.overflow = "hidden";
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    document.addEventListener("keydown", touche);
    return () => {
      racine.style.overflow = avant;
      document.removeEventListener("keydown", touche);
    };
  }, [ouvert]);

  const lire = (fichier: File | undefined) => {
    if (!fichier) return;
    if (!fichier.type.startsWith("image/")) {
      setErreur("Ce fichier n'est pas une image : choisis une photo.");
      return;
    }
    const lecteur = new FileReader();
    lecteur.onload = () => {
      setPhoto(String(lecteur.result));
      setErreur("");
      setEtape("enseigne");
    };
    lecteur.readAsDataURL(fichier);
  };

  const recommencer = () => {
    setEtape("photo");
    setPhoto(null);
    setNuit(false);
  };

  return (
    <>
      <button
        id="fa-envoyer"
        type="button"
        onClick={() => setOuvert(true)}
        className="inline-flex min-h-[58px] items-center gap-3 rounded-full bg-[var(--accent)] px-8 text-lg font-bold text-[var(--sur-accent)] shadow-[0_0_40px_rgba(242,181,68,.35)] transition-transform hover:scale-[1.02]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
          <circle cx="12" cy="13" r="3.6" />
        </svg>
        Envoyer ma photo
      </button>

      {ouvert && (
        <div className="fixed inset-0 z-[60]">
          <button type="button" aria-label="Fermer" onClick={() => setOuvert(false)} className={`absolute inset-0 bg-[rgba(4,6,12,.72)] ${styles.voile}`} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="fa-feuille-titre"
            data-film="feuille"
            className={`absolute inset-x-0 bottom-0 mx-auto max-h-[88svh] max-w-xl overflow-y-auto rounded-t-[28px] border-t border-[var(--trait)] bg-[var(--carte)] px-5 pb-8 pt-3 text-[var(--encre)] ${styles.feuille}`}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[var(--trait)]" aria-hidden="true" />
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">
                {etape === "photo" ? "1 · Ta façade" : etape === "enseigne" ? "2 · Ton enseigne" : "3 · Ton montage"}
              </p>
              <button type="button" onClick={() => setOuvert(false)} className="min-h-[40px] rounded-full border border-[var(--trait)] px-4 text-sm font-semibold">
                Fermer
              </button>
            </div>

            {etape === "photo" && (
              <div className="space-y-5">
                <h2 id="fa-feuille-titre" className="text-4xl">Envoie ta façade.</h2>
                <label className="flex cursor-pointer flex-col items-center gap-3 rounded-[22px] border-2 border-dashed border-[var(--accent)] bg-[var(--fond)] px-5 py-8 text-center">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 text-[var(--accent-texte)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                    <circle cx="12" cy="13" r="3.6" />
                  </svg>
                  <span className="text-lg font-bold">Choisir ou prendre une photo</span>
                  <span className="text-sm text-[var(--doux)]">Une photo prise du trottoir d&apos;en face suffit.</span>
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => lire(e.target.files?.[0])} />
                </label>
                {erreur && <p role="alert" className="text-sm font-bold text-[var(--accent-texte)]">{erreur}</p>}
                <ul className="space-y-2 text-[var(--doux)]">
                  <li>· De jour, sans voiture garée devant si possible.</li>
                  <li>· Toute la largeur de la boutique, le bandeau compris.</li>
                  <li>· Bien de face : on redresse, mais pas les miracles.</li>
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setPhoto(null);
                    setEtape("enseigne");
                  }}
                  className="w-full min-h-[52px] rounded-full border-2 border-[var(--trait)] px-5 font-semibold"
                >
                  Essayer avec une façade d&apos;exemple
                </button>
                <p className="text-xs text-[var(--doux)]">
                  Démonstration : ta photo reste sur ton téléphone. Rien n&apos;est envoyé, rien n&apos;est enregistré.
                </p>
              </div>
            )}

            {etape === "enseigne" && (
              <div className="space-y-5">
                <p role="status" className="inline-flex items-center gap-2 rounded-full bg-[var(--fond)] px-4 py-2 text-sm font-bold">
                  <span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span> Photo reçue
                </p>
                <h2 id="fa-feuille-titre" className="text-4xl">Ton enseigne.</h2>
                {photo ? (
                  <SurLaPhoto photo={photo} nom={nom} style={style} hauteur={hauteur} />
                ) : (
                  <figure className="overflow-hidden rounded-[18px] border border-[var(--trait)]">
                    <Facade id="fa-apercu" enseigne={nom || "Ton enseigne"} style={style} />
                    <figcaption className="sr-only">La façade d&apos;exemple, avec ton enseigne</figcaption>
                  </figure>
                )}
                <label className="block space-y-2">
                  <span className="text-sm font-bold">Le nom sur l&apos;enseigne</span>
                  <input
                    type="text"
                    value={nom}
                    maxLength={22}
                    autoComplete="off"
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-lg font-semibold text-[var(--encre)] outline-none focus:border-[var(--accent)]"
                  />
                </label>
                <fieldset className="space-y-2">
                  <legend className="text-sm font-bold">Le style</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {STYLES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={style === s.id}
                        onClick={() => setStyle(s.id)}
                        className={`min-h-[52px] rounded-2xl border-2 px-2 text-sm font-semibold leading-tight ${style === s.id ? "border-[var(--accent)] bg-[var(--fond)]" : "border-[var(--trait)]"}`}
                      >
                        {s.libelle}
                      </button>
                    ))}
                  </div>
                </fieldset>
                {photo && (
                  <label className="block space-y-2">
                    <span className="text-sm font-bold">Hauteur du bandeau sur ta photo</span>
                    <input type="range" min={4} max={80} value={hauteur} onChange={(e) => setHauteur(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
                  </label>
                )}
                <button
                  type="button"
                  onClick={() => setEtape("montage")}
                  className="w-full min-h-[56px] rounded-full bg-[var(--accent)] px-6 text-lg font-bold text-[var(--sur-accent)]"
                >
                  Poser mon enseigne
                </button>
              </div>
            )}

            {etape === "montage" && (
              <div className="space-y-5">
                <h2 id="fa-feuille-titre" className="text-4xl">Avant, après.</h2>
                {photo ? (
                  <Comparaison
                    id="fa-curseur-feuille"
                    depart={40}
                    etiquette="Glisser pour comparer ta façade avant et après"
                    avant={<Image src={photo} alt="" width={1200} height={900} unoptimized className="block h-auto w-full" />}
                    apres={<SurLaPhoto photo={photo} nom={nom} style={style} hauteur={hauteur} />}
                  />
                ) : (
                  <>
                    <Comparaison
                      id="fa-curseur-feuille"
                      depart={40}
                      etiquette="Glisser pour comparer la façade avant et après"
                      avant={<Facade id="fa-f-avant" nuit={nuit} />}
                      apres={<Facade id="fa-f-apres" enseigne={nom || "Ton enseigne"} style={style} nuit={nuit} />}
                    />
                    <div className="grid grid-cols-2 gap-2" role="group" aria-label="Moment de la journée">
                      {[false, true].map((n) => (
                        <button
                          key={String(n)}
                          type="button"
                          aria-pressed={nuit === n}
                          onClick={() => setNuit(n)}
                          className={`min-h-[48px] rounded-full border-2 font-semibold ${nuit === n ? "border-[var(--accent)] bg-[var(--fond)]" : "border-[var(--trait)]"}`}
                        >
                          {n ? "Le soir" : "De jour"}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <div role="status" className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--fond)] p-4 space-y-1">
                  <p className="font-bold">Montage prêt : {nom || "ton enseigne"}, posée sur ta façade.</p>
                  <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
                </div>
                <p className="text-sm leading-relaxed text-[var(--doux)]">
                  Ce montage, la façade avec et sans l&apos;enseigne, est aussi une pièce du dossier
                  quand l&apos;enseigne doit être autorisée (Code de l&apos;environnement, art. R. 581-16).
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href={`${DOSSIER}/dossier`} onClick={() => setOuvert(false)} className="inline-flex min-h-[48px] items-center rounded-full bg-[var(--accent)] px-5 font-bold text-[var(--sur-accent)]">
                    Voir le dossier en mairie
                  </Link>
                  <button type="button" onClick={recommencer} className="min-h-[48px] rounded-full border-2 border-[var(--trait)] px-5 font-semibold">
                    Recommencer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
