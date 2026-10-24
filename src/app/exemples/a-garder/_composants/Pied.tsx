import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, atelier } from "./donnees";

/** Le bas de chaque page : l'atelier, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer id="contact" className="scroll-mt-24 overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-4xl italic">On n&apos;imprime que ce qu&apos;on garde.</p>
          <p className="leading-relaxed">Faire-part, menus, cartes du frigo. Et l&apos;enseigne de ta boutique.</p>
        </div>
        <div className="space-y-1.5">
          <p className="pb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#F5C76A]">L&apos;atelier</p>
          {atelier.adresse.map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p>{atelier.horaires}</p>
          <a href={`tel:${atelier.telephoneLien}`} className="inline-block pt-1 text-lg font-bold underline underline-offset-4">{atelier.telephone}</a>
          <p className="pt-2 text-sm">Prix TTC pour les particuliers, HT pour les commerces. SIRET {atelier.siret} (exemple).</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="font-[family-name:var(--titres)] text-xl italic underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="À Garder" chasse={1.95} className="px-4 pb-3 pt-[7vw] font-[family-name:var(--titres)] italic text-[var(--accent)]" />
    </footer>
  );
}
