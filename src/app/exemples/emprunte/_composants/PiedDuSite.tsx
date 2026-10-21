import Link from "next/link";
import { DOSSIER, NAVIGATION, marque } from "./donnees";
import { Monogramme } from "./EnTete";

/** Le pied du site : la phrase de la marque, le service client (numéro fictif), les liens. */
export default function PiedDuSite() {
  return (
    <div className="bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <p className="flex items-center gap-3">
            <Monogramme taille={44} />
            <span className="font-[family-name:var(--titres)] text-3xl font-extrabold tracking-tight">Emprunté</span>
          </p>
          <p className="font-[family-name:var(--f-caveat)] text-3xl text-[var(--accent-texte)]">Jamais rendu.</p>
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-bold uppercase tracking-[0.14em]">Service client</p>
          <p>
            <a href={`tel:${marque.telephoneLien}`} className="underline underline-offset-4">{marque.telephone}</a>
          </p>
          <p>{marque.horaires}</p>
        </div>
        <ul className="space-y-1 text-sm">
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
