import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { NomMarque } from "./Blocs";
import MentionCnaps from "./MentionCnaps";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/**
 * Le pied de chaque page : les pages, le téléphone, et les deux mentions que la loi
 * impose — en évidence, pas en petits caractères (CSI, art. L612-15, al. 1).
 */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto max-w-6xl space-y-14 px-6 pb-10 pt-20 sm:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <NomMarque />
            <p className="font-[family-name:var(--titres)] text-3xl">{entreprise.signature}</p>
          </div>
          <div className="space-y-1.5">
            <p className="pb-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Nantes et alentours</p>
            <p>{entreprise.adresse}</p>
            <p>{entreprise.horaires}</p>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-block pt-1 text-lg font-bold underline underline-offset-4">{entreprise.telephone}</a>
          </div>
          <ul className="space-y-2">
            {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/gardiennage-de-chantier`, libelle: "Gardiennage de chantier" }, { href: `${DOSSIER}/agent-de-securite-mariage`, libelle: "Agent de sécurité pour un mariage" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
              </li>
            ))}
          </ul>
        </div>
        <MentionCnaps evidence />
      </div>
      <MotGeant texte="Veilleuse" chasse={1.8} className="px-4 pb-2 font-[family-name:var(--titres)] text-[var(--accent)]" />
    </footer>
  );
}
