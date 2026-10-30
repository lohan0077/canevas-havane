import Link from "next/link";
import { Lisere, Marque } from "./Blocs";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : la signature, les numéros d'exemple, les pages. */
export default function Pied() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <Lisere />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-20 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Marque />
          <p className="font-[family-name:var(--titres)] text-xl font-bold tracking-[-0.02em] text-[var(--vert-clair)]">{entreprise.signature}</p>
          <p className="max-w-sm text-[15px] leading-relaxed">
            Pompes à chaleur et panneaux solaires, {entreprise.zone} (exemple). Qualification RGE n°&nbsp;{entreprise.rge} et
            assurance décennale n°&nbsp;{entreprise.decennale} : numéros d&apos;exemple.
          </p>
        </div>
        <div className="space-y-3 text-[15px]">
          <p className="font-[family-name:var(--titres)] text-lg font-bold tracking-[-0.02em]">Nous joindre</p>
          <p className="font-medium tabular-nums">{entreprise.telephone}</p>
          <p>Du lundi au samedi, aux heures dites</p>
          <p>{entreprise.adresse}</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
