"use client";

import { useEffect, useRef, useState } from "react";
import { PHOTOS, type Arbre } from "./donnees";

const EXEMPLES = [PHOTOS.fenetreJardin.src, PHOTOS.olivier.src, PHOTOS.hiver.src];
const LEGENDES = ["De la fenêtre de la cuisine", "D'une autre fenêtre", "Celle que tu préfères"];

/**
 * « Une seule demande : trois photos de ton jardin, prises de ta fenêtre. » Les photos
 * choisies s'affichent ici, depuis ton téléphone : rien n'est envoyé, rien n'est
 * enregistré. Un bouton remplit les cases avec trois photos d'exemple.
 */
export function TroisPhotos() {
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);
  const [exemple, setExemple] = useState(false);
  const [envoye, setEnvoye] = useState(false);
  const locales = useRef<string[]>([]);

  useEffect(() => () => locales.current.forEach((u) => URL.revokeObjectURL(u)), []);

  const choisir = (i: number, fichier?: File) => {
    if (!fichier) return;
    const url = URL.createObjectURL(fichier);
    locales.current.push(url);
    setExemple(false);
    setEnvoye(false);
    setPhotos((p) => p.map((x, j) => (j === i ? url : x)));
  };
  const complet = photos.every(Boolean);

  return (
    <div className="space-y-4" data-film="trois-photos">
      <style>{`@keyframes vc-pose { from { opacity: 0; transform: scale(.8) rotate(-4deg); } to { opacity: 1; transform: none; } }`}</style>
      <div className="grid grid-cols-3 gap-2.5">
        {photos.map((src, i) => (
          <label key={i} className="group relative block cursor-pointer">
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => choisir(i, e.target.files?.[0])} aria-label={`Photo ${i + 1} : ${LEGENDES[i]}`} />
            <span className="relative block aspect-[3/4] overflow-hidden rounded-[14px] border-2 border-dashed border-[#9AA89C] bg-[#FBFAF5]">
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element -- semgrep-ok: une photo choisie sur le téléphone (blob:) ou d'exemple, affichée telle quelle, jamais optimisée côté serveur
                <img src={src} alt={`Ta photo ${i + 1}`} className="h-full w-full object-cover" style={exemple ? { animation: `vc-pose 450ms cubic-bezier(.2,.8,.2,1) ${i * 650}ms both` } : undefined} />
              ) : (
                <span className="grid h-full place-items-center text-[34px] font-light text-[#4F5B52]">+</span>
              )}
            </span>
            <span className="mt-1.5 block text-center text-[12px] leading-tight text-[var(--doux)]">{LEGENDES[i]}</span>
          </label>
        ))}
      </div>
      <button
        type="button"
        data-film="exemple-photos"
        onClick={() => { setPhotos(EXEMPLES); setExemple(true); setEnvoye(false); }}
        className="text-[14px] font-semibold underline underline-offset-4"
      >
        Voir avec trois photos d&apos;exemple
      </button>
      {envoye ? (
        <div role="status" className="rounded-[16px] bg-[var(--sombre)] p-4 text-[var(--sur-sombre)] space-y-1">
          <p className="font-[family-name:var(--titres)] text-[22px] font-bold">Trois photos, un croquis.</p>
          <p className="text-[15px]">Sur le vrai site, elles partiraient à l&apos;atelier, et on te rappellerait avec un croquis.</p>
          <p className="text-[14px] text-[#C9E0B8]">Démonstration : tes photos restent sur ton téléphone, rien n&apos;est envoyé ni enregistré.</p>
        </div>
      ) : (
        <button
          type="button"
          disabled={!complet}
          onClick={() => setEnvoye(true)}
          data-film="envoyer-photos"
          className="w-full rounded-full bg-[var(--accent)] px-6 py-4 text-[17px] font-semibold text-[var(--sur-accent)] disabled:cursor-not-allowed disabled:bg-[#9AA89C] disabled:text-[var(--encre)]"
        >
          {complet ? "Envoyer mes trois photos" : `Encore ${photos.filter((p) => !p).length} photo${photos.filter((p) => !p).length > 1 ? "s" : ""}`}
        </button>
      )}
    </div>
  );
}

/** Réserver la taille d'un arbre, à la semaine. Démonstration : rien n'est envoyé. */
export function ReserverTaille({ arbre }: { arbre: Arbre }) {
  const [semaine, setSemaine] = useState(0);
  const [fait, setFait] = useState(false);
  return (
    <div className="space-y-3 rounded-[22px] border-2 border-[var(--encre)] bg-[var(--carte)] p-5" data-film="reserver">
      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Ta taille · {arbre.saison}</p>
      <fieldset className="space-y-2">
        <legend className="sr-only">La semaine</legend>
        {arbre.semaines.map((s, i) => (
          <label key={s} className={`flex cursor-pointer items-center gap-3 rounded-[12px] border px-3 py-2.5 ${i === semaine ? "border-[var(--accent)] bg-[#E3EBDD]" : "border-[var(--trait)]"}`}>
            <input type="radio" name="semaine" checked={i === semaine} onChange={() => { setSemaine(i); setFait(false); }} className="h-4 w-4 accent-[var(--accent)]" />
            <span className="text-[16px] [font-variant-numeric:lining-nums]">{s}</span>
          </label>
        ))}
      </fieldset>
      <p className="text-[13px] text-[var(--doux)]">Semaines d&apos;exemple. Prix après visite, sur devis.</p>
      {fait ? (
        <div role="status" className="rounded-[14px] bg-[var(--sombre)] p-4 text-[var(--sur-sombre)] space-y-1">
          <p className="font-[family-name:var(--titres)] text-[22px] font-bold">Ta demande est prête</p>
          <p className="text-[15px] [font-variant-numeric:lining-nums]">Taille : {arbre.nom.toLowerCase()}, {arbre.semaines[semaine].toLowerCase()}. Sur le vrai site, ton jardinier te rappellerait pour confirmer.</p>
          <p className="text-[13px] text-[#C9E0B8]">Démonstration : rien n&apos;est envoyé ni enregistré.</p>
        </div>
      ) : (
        <button type="button" onClick={() => setFait(true)} data-film="reserver-taille" className="w-full rounded-full bg-[var(--accent)] px-6 py-4 text-[17px] font-semibold text-[var(--sur-accent)]">
          Réserver la taille
        </button>
      )}
    </div>
  );
}
