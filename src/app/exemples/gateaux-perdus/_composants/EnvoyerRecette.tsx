"use client";

import { useEffect, useState } from "react";
import { FICHES } from "./donnees";
import Fiche from "./Fiche";

/**
 * Le seul bouton du site : « Envoyer la photo ». La fiche d'exemple est déjà là ; on
 * peut la remplacer par sa propre photo, qui reste sur le téléphone (aperçu local,
 * rien n'est téléversé). On laisse un numéro, on envoie : « Photo reçue. On t'appelle. »
 */
export default function EnvoyerRecette() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [numero, setNumero] = useState("");
  const [erreur, setErreur] = useState(false);
  const [envoye, setEnvoye] = useState(false);

  // L'aperçu local est libéré quand on en change ou qu'on quitte la page.
  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo); }, [photo]);

  return (
    <form
      id="formulaire-recette"
      className="scroll-mt-24 space-y-5 rounded-[2rem] bg-[var(--carte)] p-5 text-[var(--encre)] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (numero.replace(/\D/g, "").length !== 10) return setErreur(true);
        setErreur(false);
        setEnvoye(true);
      }}
    >
      <div className="relative">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- aperçu d'un fichier local (blob:), que next/image ne sait pas servir
          <img src={photo} alt="Ta photo de la fiche, en aperçu sur ton téléphone" className="max-h-80 w-full rounded-[6px] object-contain" />
        ) : (
          <div className="px-3 py-2">
            <Fiche fiche={FICHES[0]} angle={-2} />
            <p className="mt-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--doux)]">Exemple : la fiche de Mamie Jeanne</p>
          </div>
        )}
      </div>
      <label className="block cursor-pointer text-center text-[15px] font-bold underline underline-offset-4">
        {photo ? "Choisir une autre photo" : "Choisir ma photo (elle reste sur mon téléphone)"}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setPhoto(URL.createObjectURL(f));
          }}
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-[15px] font-bold">Ton numéro, pour qu&apos;on t&apos;appelle</span>
        <input
          id="numero-rappel"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="06 39 98 00 00"
          value={numero}
          readOnly={envoye}
          onChange={(e) => setNumero(e.target.value)}
          className="w-full rounded-full border-2 border-[var(--trait)] bg-[var(--fond)] px-5 py-3 text-lg tabular-nums outline-none placeholder:text-[var(--doux)] focus:border-[var(--encre)]"
        />
      </label>
      {envoye ? (
        <div role="status" className="rounded-[20px] bg-[#F3D88A] p-4 text-center">
          <p className="font-[family-name:var(--titres)] text-2xl">Photo reçue. On t&apos;appelle.</p>
          <p className="text-sm">Démonstration : rien n&apos;est envoyé, la photo reste sur ton téléphone.</p>
        </div>
      ) : (
        <button type="submit" className="flex w-full items-center justify-between gap-4 rounded-full bg-[var(--encre)] py-2 pl-7 pr-2 text-[var(--fond)] transition-transform hover:-rotate-1">
          <span className="font-[family-name:var(--titres)] text-2xl">Envoyer la photo</span>
          <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-[#F3D88A] text-xl text-[var(--encre)]">→</span>
        </button>
      )}
      {erreur && <p role="alert" className="text-center text-sm font-bold text-[var(--accent-texte)]">Un numéro à dix chiffres, pour que le pâtissier puisse t&apos;appeler.</p>}
      <p className="text-center text-[13px] text-[var(--doux)]">Ton numéro ne sert qu&apos;à cet appel. Rien d&apos;autre.</p>
    </form>
  );
}
