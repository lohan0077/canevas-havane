import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, bureau } from "./donnees";

/** Le pied du site : le cabinet, ses mentions, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer id="contact" className="overflow-hidden border-t-2 border-[var(--encre)] bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-12 pt-20 sm:px-8 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-2xl font-black uppercase">{bureau.nom}</p>
          <p className="leading-relaxed text-[var(--sur-sombre)]/90">{bureau.titre}<br />{bureau.adresse.join(", ")} (exemple)</p>
          <p><a href={`tel:${bureau.telephoneLien}`} className="font-bold tabular-nums underline underline-offset-4">{bureau.telephone}</a></p>
          <p className="text-sm text-[var(--sur-sombre)]/85">{bureau.horaires}</p>
        </div>
        <div className="space-y-2 text-sm leading-relaxed text-[var(--sur-sombre)]/85">
          <p>Géomètre-expert inscrit au tableau de l&apos;Ordre, n° {bureau.inscription} (exemple). SIRET {bureau.siret}. Assurance : {bureau.assurance}.</p>
          <p>Ce site informe sur notre activité, avec modération, comme le veut la déontologie des géomètres-experts (décret n° 96-478, art. 53). Il a été communiqué au conseil régional de l&apos;Ordre.</p>
        </div>
        <ul className="space-y-2 text-sm font-bold uppercase tracking-[0.1em]">
          {[...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Belle Portée" chasse={1.72} className="px-4 pb-3 pt-4 font-[family-name:var(--titres)] font-black text-[var(--accent)]" />
    </footer>
  );
}
