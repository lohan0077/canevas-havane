import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { NomMarque } from "./Blocs";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le bas de chaque page : la région, le téléphone, les pages, et le nom en géant. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-4">
          <NomMarque />
          <p className="font-[family-name:var(--titres)] text-3xl italic">{entreprise.signature}</p>
        </div>
        <div className="space-y-1.5">
          <p className="pb-1 text-xs font-medium uppercase tracking-[0.3em] text-[var(--accent)]">{entreprise.metier} · {entreprise.region}</p>
          <p>{entreprise.adresse}</p>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-block pt-1 text-lg underline underline-offset-4">{entreprise.telephone}</a>
          <p className="pt-2 text-sm">Prix TTC d&apos;exemple. Premier rendez-vous gratuit.</p>
          <p className="pt-2 text-sm">Aucune photo de mariés sur ce site : leurs images leur appartiennent. Aucune prévision météo non plus : le ciel, on le regarde à J-7, ensemble.</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="font-[family-name:var(--titres)] text-xl italic underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Et s'il pleut" chasse={2.9} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[var(--accent)]" />
    </footer>
  );
}
