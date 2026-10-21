import Link from "next/link";
import { DOSSIER, NAVIGATION, marque } from "./donnees";
import { Nom } from "./EnTete";

/** Le pied du site : la phrase de la marque, l'atelier (numéro fictif), les liens. */
export default function PiedDuSite() {
  return (
    <div className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-2">
          <Nom className="text-5xl [&>span]:text-[#E9D8B4]" />
          <p className="text-lg italic text-[#E9D8B4]">L&apos;outil qui revient.</p>
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-semibold uppercase tracking-[0.14em]">L&apos;atelier de gravure</p>
          <p>{marque.adresse}</p>
          <p>{marque.horaires}</p>
          <p>
            <a href={`tel:${marque.telephoneLien}`} className="underline underline-offset-4">{marque.telephone}</a>
          </p>
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
