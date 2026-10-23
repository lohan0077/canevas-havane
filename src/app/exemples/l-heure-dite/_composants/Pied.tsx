import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { Monogramme } from "./Blocs";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : la signature, les numéros d'exemple, les pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="flex items-center gap-2.5 font-[family-name:var(--titres)] text-3xl"><Monogramme /> {entreprise.nom}</p>
          <p className="font-[family-name:var(--titres)] text-xl italic text-[#F2B27A]">{entreprise.signature}</p>
          <p className="max-w-sm text-[15px] leading-relaxed text-[var(--sur-sombre)]/90">
            Pompes à chaleur et panneaux solaires, {entreprise.zone} (exemple). Qualification RGE n°&nbsp;{entreprise.rge} et
            assurance décennale n°&nbsp;{entreprise.decennale} : numéros d&apos;exemple.
          </p>
        </div>
        <ul className="space-y-2.5">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
        <div className="space-y-2 text-[15px]">
          <p className="font-semibold">Nous joindre</p>
          <p className="tabular-nums">{entreprise.telephone}</p>
          <p className="text-[var(--sur-sombre)]/90">Du lundi au samedi, aux heures dites</p>
          <p className="text-[var(--sur-sombre)]/90">{entreprise.adresse}</p>
        </div>
      </div>
      <MotGeant texte="L'Heure Dite" chasse={2.1} className="px-4 pb-4 font-[family-name:var(--titres)] text-[var(--accent)]" />
    </footer>
  );
}
