import Link from "next/link";
import { DOSSIER, NAVIGATION, marque } from "./donnees";

/** Le pied du site : le nom en très grand, les liens, le service client (numéro fictif). */
export default function PiedDuSite() {
  return (
    <div className="border-t-2 border-[var(--encre)] bg-[var(--fond)]">
      <div className="mx-auto max-w-6xl space-y-10 px-5 py-14 sm:px-6">
        <p className="font-[family-name:var(--titres)] text-[64px] font-black leading-none tracking-tighter sm:text-[140px]">
          L&apos;Addition<span className="text-[var(--accent-texte)]">.</span>
        </p>
        <div className="grid gap-8 text-sm sm:grid-cols-3">
          <p className="max-w-xs">Des vêtements sans promo. Sur chaque fiche, le prix décomposé, la date de livraison et le vrai stock.</p>
          <div className="space-y-1">
            <p className="font-bold uppercase tracking-[0.16em]">Service client</p>
            <p>
              <a href={`tel:${marque.telephoneLien}`} className="underline underline-offset-4">{marque.telephone}</a>
            </p>
            <p>{marque.horaires}</p>
          </div>
          <ul className="space-y-1">
            {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline underline-offset-4">{l.libelle}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
