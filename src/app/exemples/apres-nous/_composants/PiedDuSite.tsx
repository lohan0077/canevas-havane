import Link from "next/link";
import { DOSSIER, NAVIGATION, atelier } from "./donnees";
import { Monogramme } from "./EnTete";

/** Le pied du site, en colonnes comme une page de garde : l'atelier, le site, la phrase. */
export default function PiedDuSite() {
  return (
    <div className="border-t border-[var(--encre)] bg-[var(--fond)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-3">
            <Monogramme taille={42} />
            <span className="font-[family-name:var(--titres)] text-2xl uppercase tracking-[0.28em]">Après Nous</span>
          </p>
          <p className="font-[family-name:var(--titres)] text-2xl italic">Pour ceux qui viendront après.</p>
          <p className="max-w-sm text-sm text-[var(--doux)]">Ébénisterie. Tables, bureaux et bancs en bois massif, faits sur mesure, un numéro gravé sous chacun.</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">L&apos;atelier</p>
          <p>{atelier.adresse}</p>
          <p>{atelier.horaires}</p>
          <p>
            <a href={`tel:${atelier.telephoneLien}`} className="underline underline-offset-4">{atelier.telephone}</a>
          </p>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="text-xs font-semibold uppercase tracking-[0.2em]">Le site</li>
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline underline-offset-4">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
