"use client";

import { useEffect, useState } from "react";
import { PAGE_EXEMPLE } from "./donnees";
import s from "./Transmis.module.css";

/**
 * « Envoie ta recette de famille. En photo. » Un seul bouton : on choisit la photo de
 * la page du cahier (elle s'affiche, mais reste dans le navigateur), ou l'on essaie
 * avec la page de Mamie Jo, en exemple. Puis « Envoyer ma recette » : rien ne part,
 * la confirmation le dit.
 */
export default function EnvoiRecette() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [exemple, setExemple] = useState(false);
  const [plat, setPlat] = useState("");
  const [qui, setQui] = useState("");
  const [envoyee, setEnvoyee] = useState(false);

  // L'aperçu de la photo choisie : une adresse locale, libérée quand elle change.
  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo); }, [photo]);

  const prete = photo || exemple;

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (prete) setEnvoyee(true);
      }}
    >
      <div id="cadre-photo" className="relative h-[330px] overflow-hidden rounded-2xl border border-dashed border-[var(--doux)]/40 bg-[var(--carte)]">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- aperçu local (adresse blob:), next/image ne s'applique pas
          <img src={photo} alt="Ta page de cahier, en aperçu" className={`${s.tombe} absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] object-contain`} />
        ) : exemple ? (
          <div className={`${s.tombe} ${s.cahier} absolute inset-x-5 top-5 bottom-5 rounded-[4px] shadow-[0_18px_30px_-16px_rgba(31,59,45,.55)] pl-[52px] pr-5 pt-[6px]`}>
            <p className="font-[family-name:var(--f-caveat)] text-[27px] leading-[32px] text-[#1E3A6E] whitespace-nowrap">{PAGE_EXEMPLE.plat}</p>
            <ul className="font-[family-name:var(--f-caveat)] text-[23px] leading-[32px] text-[#1E3A6E]">
              {PAGE_EXEMPLE.lignes.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <span aria-hidden="true" className={`${s.tache} absolute right-6 bottom-10 h-24 w-28 rounded-[48%_52%_44%_56%] bg-[radial-gradient(circle_at_40%_40%,#D8A35A_0%,#C68A3E_55%,transparent_72%)]`} />
          </div>
        ) : (
          <label htmlFor="photo-recette" className="absolute inset-0 grid cursor-pointer place-items-center text-center">
            <span className="space-y-2">
              <span aria-hidden="true" className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)] text-3xl text-[var(--sur-accent)]">+</span>
              <span className="block font-[family-name:var(--titres)] text-[24px] font-normal">Ajouter une photo</span>
              <span className="block text-[14px] text-[var(--doux)]">La page du cahier, telle qu&apos;elle est.</span>
            </span>
          </label>
        )}
      </div>

      <input
        id="photo-recette"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          setPhoto(URL.createObjectURL(f));
          setExemple(false);
          setEnvoyee(false);
        }}
      />

      {!prete && (
        <button
          type="button"
          data-film="exemple"
          onClick={() => { setExemple(true); setPlat("La blanquette"); setQui("Mamie Jo"); }}
          className="text-[15px] underline decoration-[var(--accent)] underline-offset-4"
        >
          Pas de photo sous la main&nbsp;? Essaie avec la page de Mamie Jo (exemple)
        </button>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-[14px] font-medium">Le plat</span>
          <input value={plat} onChange={(e) => setPlat(e.target.value)} placeholder="La blanquette" className="w-full rounded-xl border border-[var(--trait)] bg-[var(--carte)] px-4 h-12 placeholder:text-[var(--doux)]" />
        </label>
        <label className="block space-y-1.5">
          <span className="text-[14px] font-medium">Qui te l&apos;a transmis&nbsp;?</span>
          <input value={qui} onChange={(e) => setQui(e.target.value)} placeholder="Ta grand-mère, ton oncle…" className="w-full rounded-xl border border-[var(--trait)] bg-[var(--carte)] px-4 h-12 placeholder:text-[var(--doux)]" />
        </label>
      </div>

      {envoyee ? (
        <div role="status" className="rounded-xl border border-[var(--accent)] bg-[var(--carte)] p-4 space-y-1">
          <p className="font-[family-name:var(--titres)] text-[24px]">Recette reçue&nbsp;: {plat || "ta recette"}{qui ? ` de ${qui}` : ""}.</p>
          <p className="text-[14px] text-[var(--doux)]">
            On t&apos;appellerait pour fixer l&apos;essai n° 1. Démonstration : rien n&apos;est envoyé, ta photo reste sur ton téléphone.
          </p>
        </div>
      ) : (
        <button
          type="submit"
          disabled={!prete}
          className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] text-[15px] font-medium text-[var(--sur-accent)] disabled:bg-[var(--trait)] disabled:text-[var(--encre)] disabled:cursor-not-allowed"
        >
          Envoyer ma recette
        </button>
      )}
      <p className="text-[13px] leading-relaxed text-[var(--doux)]">
        Ta photo ne quitte pas ton téléphone. Sur un vrai site, elle ne servirait qu&apos;à préparer les essais, et te serait rendue.
      </p>
    </form>
  );
}
