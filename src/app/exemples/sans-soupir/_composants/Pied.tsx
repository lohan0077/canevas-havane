import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { NomMarque } from "./Blocs";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le bas de chaque page : l'atelier, ses heures, ses pages, et le nom en géant. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-4">
          <NomMarque />
          <p className="font-[family-name:var(--titres)] text-2xl font-bold leading-snug">{entreprise.signature}</p>
        </div>
        <div className="space-y-1.5">
          <p className="pb-1 text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent)]">{entreprise.zone}</p>
          <p>{entreprise.adresse}</p>
          <p>{entreprise.horaires}</p>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-block pt-1 text-xl font-bold underline underline-offset-4">{entreprise.telephone}</a>
          <p className="pt-2 text-sm">Déclaration services à la personne n° {entreprise.declarationSap} (exemple). Prix HT et TTC d&apos;exemple.</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/gouter-numerique`, libelle: "Le goûter numérique" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="font-semibold underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Sans Soupir" chasse={1.75} className="px-4 pb-3 font-[family-name:var(--titres)] font-extrabold text-[var(--accent)]" />
    </footer>
  );
}
