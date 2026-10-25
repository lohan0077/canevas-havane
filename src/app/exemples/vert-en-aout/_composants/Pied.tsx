import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { Marque } from "./Blocs";
import { CONTACT, DOSSIER, NAVIGATION, SAP } from "./donnees";

/** Le pied du site : la marque, ses pages, comment la joindre, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Marque />
          <p className="max-w-xs leading-relaxed">Des jardins qui ont peu soif. On les dessine pour la vue depuis ta fenêtre, et on les juge le 15 août.</p>
        </div>
        <ul className="space-y-2 font-[family-name:var(--titres)] font-semibold">
          {[
            { href: DOSSIER, libelle: "Accueil" },
            ...NAVIGATION,
            { href: `${DOSSIER}#photos`, libelle: "Trois photos" },
            { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="space-y-2 leading-relaxed">
          <p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Nous appeler</p>
          <p>{CONTACT.adresse}</p>
          <p>{CONTACT.zone}</p>
          <p className="font-bold tabular-nums">{CONTACT.telephone}</p>
          <p className="pt-2 text-[14px]">
            L&apos;entretien est assuré par {SAP.entreprise}, entreprise déclarée services à la personne ({SAP.numero}).
          </p>
        </div>
      </div>
      <MotGeant texte="Vert en Août" chasse={1.62} className="px-4 pb-2 pt-[5vw] font-[family-name:var(--titres)] font-black text-[var(--accent)]" />
    </footer>
  );
}
