import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { NomMarque } from "./Blocs";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : la marque, la région, le téléphone, les pages, et le nom en très grand. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-20 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <NomMarque />
          <p className="max-w-xs leading-relaxed">{entreprise.metier}, {entreprise.region}. {entreprise.signature}</p>
          <p className="leading-relaxed">
            {entreprise.adresse}
            <br />
            <a href={`tel:${entreprise.telephoneLien}`} className="esp-trait font-semibold tabular-nums">{entreprise.telephone}</a>
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-xl italic">À savoir</p>
          <p className="leading-relaxed">Prix TTC d&apos;exemple. Premier rendez-vous gratuit.</p>
          <p className="leading-relaxed">Aucune photo de mariés sur ce site : leurs images leur appartiennent. Aucune prévision météo non plus : le ciel, on le regarde à J-7, ensemble.</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="esp-trait">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Le nom, d'un bord à l'autre : décoratif, il est écrit plus haut. */}
      <MotGeant texte="Et s'il pleut" chasse={2.2} className="-mb-[0.06em] px-4 font-[family-name:var(--titres)] italic text-[color-mix(in_oklab,var(--sur-sombre)_12%,transparent)]" />
    </footer>
  );
}
