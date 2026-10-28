"use client";

import { useEffect, useRef, useState } from "react";
import Apparition from "../../_kit/Apparition";
import { Huit, LignePrix, euros } from "./Blocs";
import { DEVIS, PHOTOS, plantesPour, type Arbre, type Expo, type Sol } from "./donnees";

const SOLS: [Sol, string][] = [["leger", "Léger, caillouteux"], ["ordinaire", "Ordinaire"], ["lourd", "Lourd, argileux"]];
const EXPOS: [Expo, string][] = [["soleil", "Plein soleil"], ["mi-ombre", "Mi-ombre"]];

function Puce({ actif, onClick, children }: { actif: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={actif}
      onClick={onClick}
      className={`min-h-11 rounded-full border-2 px-4 text-[14px] font-bold transition-colors ${
        actif ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-white/25 text-[var(--sur-sombre)] hover:border-white/60"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * L'outil de la marque, mis en scène comme une application : « Tu tapes ta commune, et
 * il te montre les plantes adaptées à l'été chez toi. » Ici, le climat est un exemple
 * (été chaud et sec) : un vrai site s'appuierait sur les normales climatiques
 * officielles de la commune, et le dirait. Rien n'est envoyé.
 */
export function Commune() {
  const [commune, setCommune] = useState("");
  const [sol, setSol] = useState<Sol>("ordinaire");
  const [expo, setExpo] = useState<Expo>("soleil");
  const [vu, setVu] = useState<{ commune: string; sol: Sol; expo: Expo } | null>(null);
  const plantes = vu ? plantesPour(vu.sol, vu.expo) : [];

  return (
    <div data-film="commune" className="overflow-hidden rounded-[2.5rem] bg-[#2B4127] text-[var(--sur-sombre)] shadow-[0_50px_90px_-50px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-3 border-b border-white/15 px-6 py-4 sm:px-8">
        <span className="flex items-center gap-3">
          <Huit />
          <span className="font-[family-name:var(--titres)] text-lg font-extrabold">Chez toi, l&apos;été</span>
        </span>
        <span className="rounded-full border border-white/25 px-3 py-1 text-[13px]">Rien n&apos;est envoyé</span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (commune.trim()) setVu({ commune: commune.trim(), sol, expo });
        }}
        className="space-y-5 px-6 py-6 sm:px-8"
      >
        <label className="block space-y-2">
          <span className="font-[family-name:var(--titres)] text-[15px] font-bold">Ta commune</span>
          <span className="flex items-center gap-3 rounded-[1.25rem] border-2 border-white/25 bg-[var(--sombre)] px-4 focus-within:border-[var(--accent)]">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 fill-none stroke-[var(--accent)] stroke-2">
              <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            <input
              type="text"
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              placeholder="Annonay, Valence, Lyon…"
              autoComplete="off"
              data-film="saisie-commune"
              className="min-w-0 flex-1 bg-transparent py-3.5 font-[family-name:var(--titres)] text-[20px] font-bold text-[var(--sur-sombre)] outline-none placeholder:font-normal placeholder:text-[var(--sur-sombre)]"
            />
          </span>
        </label>
        <fieldset className="space-y-2">
          <legend className="mb-2 font-[family-name:var(--titres)] text-[15px] font-bold">Ton sol</legend>
          <div className="flex flex-wrap gap-2">
            {SOLS.map(([v, l]) => <Puce key={v} actif={sol === v} onClick={() => setSol(v)}>{l}</Puce>)}
          </div>
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="mb-2 font-[family-name:var(--titres)] text-[15px] font-bold">L&apos;exposition</legend>
          <div className="flex flex-wrap gap-2">
            {EXPOS.map(([v, l]) => <Puce key={v} actif={expo === v} onClick={() => setExpo(v)}>{l}</Puce>)}
          </div>
        </fieldset>
        <button
          type="submit"
          data-film="voir-plantes"
          className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 font-[family-name:var(--titres)] text-[17px] font-extrabold text-[var(--sur-accent)] transition-transform hover:scale-[1.01]"
        >
          Voir mes plantes
        </button>
      </form>

      <div aria-live="polite">
        {vu && (
          <div key={`${vu.commune}-${vu.sol}-${vu.expo}`} data-film="plantes" className="space-y-3 border-t border-white/15 bg-[var(--sombre)] px-6 pb-7 pt-6 sm:px-8">
            <Apparition>
              <p className="font-[family-name:var(--titres)] text-[1.6rem] font-extrabold leading-tight">
                À {vu.commune}, <span className="font-[family-name:var(--texte)] font-normal italic text-[var(--accent)]">l&apos;été</span>
              </p>
              <p className="text-[15px]">Climat d&apos;exemple : chaud et sec, peu de pluie en juillet et en août.</p>
            </Apparition>
            <ul className="space-y-2">
              {plantes.map((p, i) => (
                <Apparition as="li" key={p.nom} de="droite" delai={150 + i * 160} className="flex items-center gap-3 rounded-[1.25rem] bg-[#2B4127] p-3">
                  <span aria-hidden="true" className="h-12 w-12 shrink-0 rounded-full" style={{ background: `radial-gradient(circle at 35% 35%, #fff6, transparent 60%), ${p.teinte}` }} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-[family-name:var(--titres)] text-[17px] font-extrabold leading-tight">{p.nom}</span>
                    <span className="block text-[13px]"><i>{p.latin}</i> · {p.hauteur} · fleurs {p.fleurs}</span>
                    <span className="mt-1.5 inline-block rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[12px] font-bold text-[var(--sur-accent)]">arrosage : 1<sup>re</sup> année</span>
                  </span>
                </Apparition>
              ))}
            </ul>
            <p className="pt-1 text-[14px] leading-relaxed">
              Selon ton sol et ton exposition. Sur un vrai site, la réponse s&apos;appuierait sur les normales climatiques
              officielles de ta commune ; ici, le climat est un exemple.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Le devis d'exemple, avec « la ligne que personne ne met » : l'arrosage qu'il faudra,
 * l'été. Un bouton en déplie le détail.
 */
export function Devis() {
  const [detail, setDetail] = useState(false);
  const ht = DEVIS.postes.reduce((t, p) => t + p.ht, 0);
  const tva = Math.round(ht * DEVIS.tva);
  return (
    <div className="space-y-4 rounded-[1rem] bg-white p-6 text-[#2F4A2C] shadow-[0_40px_80px_-40px_rgba(47,74,44,0.7)] sm:p-8" data-film="devis">
      <div className="flex items-start justify-between gap-3 border-b-2 border-[#2F4A2C] pb-3">
        <div>
          <p className="font-[family-name:var(--titres)] text-[12px] font-bold uppercase tracking-[0.16em]">Devis n° {DEVIS.numero} · exemple</p>
          <p className="font-[family-name:var(--titres)] text-[21px] font-extrabold leading-tight">{DEVIS.titre}</p>
        </div>
        <Huit />
      </div>
      <div className="space-y-2">
        {DEVIS.postes.map((p) => <LignePrix key={p.libelle} libelle={p.libelle} montant={p.ht} />)}
      </div>
      <div className="rounded-[1rem] border-2 border-[#84432C] bg-[#F8EEDB] p-4" data-film="ligne-arrosage">
        <p className="font-[family-name:var(--titres)] text-[12px] font-bold uppercase tracking-[0.16em] text-[#84432C]">Arrosage à prévoir</p>
        <p className="font-[family-name:var(--titres)] text-[22px] font-extrabold leading-tight">La 1<sup>re</sup> année, l&apos;été</p>
        <p className="text-[14px]">Ensuite : en cas de canicule · estimation</p>
        <button type="button" onClick={() => setDetail((d) => !d)} aria-expanded={detail} className="mt-2 text-[14px] font-bold underline underline-offset-4">
          {detail ? "Masquer le détail" : "Le détail"}
        </button>
        {detail && (
          <ul className="mt-2 space-y-1 text-[14px] leading-snug">
            <li>De juin à août : un arrosage profond par semaine sans pluie, au pied, le soir.</li>
            <li>À l&apos;automne suivant : on arrête.</li>
            <li>Toujours dans le respect des restrictions de ta commune.</li>
          </ul>
        )}
      </div>
      <div className="space-y-1 border-t border-[#DCD2BC] pt-3">
        <LignePrix libelle="Total HT" montant={ht} />
        <LignePrix libelle="TVA 20 % · exemple" montant={tva} />
        <LignePrix libelle="Total TTC · exemple" montant={ht + tva} fort />
      </div>
      <p className="text-[12px] text-[#55573F]">Devis d&apos;exemple : postes, quantités, taux et prix inventés. {euros(ht + tva)} TTC.</p>
    </div>
  );
}

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
  const reste = photos.filter((p) => !p).length;

  return (
    <div data-film="trois-photos" className="overflow-hidden rounded-[2.5rem] bg-[var(--carte)] shadow-[0_40px_80px_-46px_rgba(34,52,31,0.7)] ring-1 ring-[var(--trait)]">
      <style>{`@keyframes va-pose { from { opacity: 0; transform: scale(.8) rotate(-4deg); } to { opacity: 1; transform: none; } }`}</style>
      <div className="flex items-center justify-between gap-3 border-b border-[var(--trait)] px-6 py-4 sm:px-8">
        <span className="font-[family-name:var(--titres)] text-lg font-extrabold">Ta vue, en trois photos</span>
        <span className="rounded-full bg-[var(--fond)] px-3 py-1 text-[13px] font-bold tabular-nums">{3 - reste} / 3</span>
      </div>
      <div className="space-y-5 p-6 sm:p-8">
        <div className="grid grid-cols-3 gap-2.5">
          {photos.map((src, i) => (
            <label key={i} className="group relative block cursor-pointer">
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => choisir(i, e.target.files?.[0])} aria-label={`Photo ${i + 1} : ${LEGENDES[i]}`} />
              <span className="relative block aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[1rem] border-2 border-dashed border-[#B9AD8E] bg-[var(--fond)]">
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element -- semgrep-ok: une photo choisie sur le téléphone (blob:) ou d'exemple, affichée telle quelle, jamais optimisée côté serveur
                  <img src={src} alt={`Ta photo ${i + 1}`} className="h-full w-full object-cover" style={exemple ? { animation: `va-pose 450ms cubic-bezier(.2,.8,.2,1) ${i * 650}ms both` } : undefined} />
                ) : (
                  <span className="grid h-full place-items-center font-[family-name:var(--titres)] text-[34px] font-light">+</span>
                )}
              </span>
              <span className="mt-1.5 block text-center text-[13px] leading-tight">{LEGENDES[i]}</span>
            </label>
          ))}
        </div>
        <button
          type="button"
          data-film="exemple-photos"
          onClick={() => {
            setPhotos(EXEMPLES);
            setExemple(true);
            setEnvoye(false);
          }}
          className="font-[family-name:var(--titres)] text-[15px] font-bold text-[var(--accent-texte)] underline underline-offset-4"
        >
          Voir avec trois photos d&apos;exemple
        </button>
        {envoye ? (
          <div role="status" className="space-y-1 rounded-[1.25rem] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
            <p className="font-[family-name:var(--titres)] text-[22px] font-extrabold">Trois photos, un croquis.</p>
            <p className="text-[15px]">Sur le vrai site, elles partiraient à l&apos;atelier, et on te renverrait un croquis cet hiver.</p>
            <p className="text-[14px]">Démonstration : tes photos restent sur ton téléphone, rien n&apos;est envoyé ni enregistré.</p>
          </div>
        ) : (
          <button
            type="button"
            disabled={!complet}
            onClick={() => setEnvoye(true)}
            data-film="envoyer-photos"
            className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--sombre)] px-6 font-[family-name:var(--titres)] text-[17px] font-extrabold text-[var(--sur-sombre)] disabled:cursor-not-allowed disabled:bg-[#D9CFB8] disabled:text-[var(--encre)]"
          >
            {complet ? "Envoyer mes trois photos" : `Encore ${reste} photo${reste > 1 ? "s" : ""}`}
          </button>
        )}
      </div>
    </div>
  );
}

/** Réserver la taille d'un arbre, à la semaine. Démonstration : rien n'est envoyé. */
export function ReserverTaille({ arbre }: { arbre: Arbre }) {
  const [semaine, setSemaine] = useState(0);
  const [fait, setFait] = useState(false);
  return (
    <div className="space-y-4 rounded-[2rem] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] sm:p-8" data-film="reserver">
      <p className="font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Ta taille · {arbre.saison}</p>
      <fieldset className="space-y-2">
        <legend className="sr-only">La semaine</legend>
        {arbre.semaines.map((s, i) => (
          <label key={s} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-[1rem] border-2 px-4 ${i === semaine ? "border-[var(--accent)] bg-[#2B4127]" : "border-white/20"}`}>
            <input type="radio" name="semaine" checked={i === semaine} onChange={() => { setSemaine(i); setFait(false); }} className="h-4 w-4 accent-[#E0B85C]" />
            <span className="text-[16px]">{s}</span>
          </label>
        ))}
      </fieldset>
      <p className="text-[14px]">Semaines d&apos;exemple. Prix après visite, sur devis.</p>
      {fait ? (
        <div role="status" className="space-y-1 rounded-[1.25rem] bg-[var(--fond)] p-4 text-[var(--encre)]">
          <p className="font-[family-name:var(--titres)] text-[22px] font-extrabold">Ta demande est prête</p>
          <p className="text-[15px]">Taille : {arbre.nom.toLowerCase()}, {arbre.semaines[semaine].toLowerCase()}. Sur le vrai site, ton jardinier te rappellerait pour confirmer.</p>
          <p className="text-[13px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé ni enregistré.</p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setFait(true)}
          data-film="reserver-taille"
          className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 font-[family-name:var(--titres)] text-[17px] font-extrabold text-[var(--sur-accent)]"
        >
          Réserver la taille
        </button>
      )}
    </div>
  );
}
